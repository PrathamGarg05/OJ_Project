import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { CPP_IMAGE } from "../utils/constants.js";
import pullImage from "./pullImage.js";
import { outputMatcher } from "../utils/outputMatcher.js";
import { MAX_DOCKER_LOG_SIZE, codeResponseHelper } from "./codeResponseHelper.js";

class CppExecutor {
    execute = async (code, testcases) => {
        let rawLogBuffer = [];
        let tempDir;

        await pullImage(CPP_IMAGE);

        tempDir = path.join(os.tmpdir(), `submission-${crypto.randomUUID()}`);
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(path.join(tempDir, "main.cpp"), code, "utf-8");
await Promise.all(
            testcases.map((tc, idx) =>
                fs.writeFile(path.join(tempDir, `input_${idx}.txt`), tc.input, "utf-8")
            )
        );

        const script = `
g++ /code/main.cpp -o /code/main
if [ $? -ne 0 ]; then
  echo "__COMPILE_ERROR__"
else
  ${testcases.map((tc, idx) => `/code/main < /code/input_${idx}.txt; echo "---"`).join('\n')}
fi
`;

        const cppDocker = await createContainer(
            CPP_IMAGE,
            ['sh', '-c', script],
            [`${tempDir}:/code`]
        );

        await cppDocker.start();
        console.log("Started docker container");

        const loggerStream = await cppDocker.logs({ stderr: true, stdout: true, timestamps: false, follow: true });

        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
            const totalSize = rawLogBuffer.reduce((sum, c) => sum + c.length, 0);
            if (totalSize > MAX_DOCKER_LOG_SIZE) {
                loggerStream.emit('error', new Error('Docker log output exceeded the configured limit'));
            }
        });

        try {
            const codeResponse = await codeResponseHelper(loggerStream, rawLogBuffer, decodeDockerStream, 2000);
            const { results, verdict, totalC, wrongC } = outputMatcher(codeResponse, testcases);

            return {
                status: 'Completed',
                verdict,
                results,
                passed: totalC - wrongC,
                total: totalC,
            };
        } catch (err) {
            console.error("Execution failed:", err);
            if (err.verdict === "TLE") await cppDocker.kill();
            return {
                status: "Failed",
                verdict: err.verdict || "IE",
                error: err.message || String(err),
                passed: 0,
                total: testcases.length,
            };
        } finally {
            await cppDocker.remove();
            // Critical: clean up the temp dir, or these accumulate forever — same leak pattern as before, just on disk instead of containers
            if (tempDir) {
                await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
            }
        }
    };
}

export default CppExecutor;