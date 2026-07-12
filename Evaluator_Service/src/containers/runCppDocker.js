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
        const SHARED_TEMP_BASE = "/tmp/oj-submissions";
        tempDir = path.join(SHARED_TEMP_BASE, `submission-${crypto.randomUUID()}`);
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(path.join(tempDir, "main.cpp"), code, "utf-8");
await Promise.all(
            testcases.map((tc, idx) =>
                fs.writeFile(path.join(tempDir, `input_${idx}.txt`), tc.input, "utf-8")
            )
        );

        const script = `
g++ -std=c++17 -O2 /code/main.cpp -o /code/main

if [ $? -ne 0 ]; then
    echo "__COMPILE_ERROR__"
    exit 1
fi

for file in /code/input_*.txt
do
    /code/main < "$file"
    echo "---"
done
`;

        const cppDocker = await createContainer(
            CPP_IMAGE,
            ['sh', '-c', script],
            [`${tempDir}:/code`]
        );

        await cppDocker.start();
        console.log("Started docker container");

        const loggerStream = await cppDocker.logs({ stderr: true, stdout: true, timestamps: false, follow: true });

        let totalLogSize = 0;

loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
    totalLogSize += chunk.length;

    if (totalLogSize > MAX_DOCKER_LOG_SIZE) {
        loggerStream.emit(
            "error",
            new Error("Docker log output exceeded the configured limit")
        );
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
            await cppDocker.remove({
    force: true
});
            if (tempDir) {
                await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
            }
        }
    };
}

export default CppExecutor;