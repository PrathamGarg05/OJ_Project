import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { CPP_IMAGE} from "../utils/constants.js";
import pullImage from "./pullImage.js";
import { outputMatcher } from "../utils/outputMatcher.js";
import { MAX_DOCKER_LOG_SIZE, codeResponseHelper } from "./codeResponseHelper.js";

class CppExecutor {
    execute = async(code,testcases) => {
        let rawLogBuffer = Buffer.alloc(0);

        await pullImage(CPP_IMAGE);

        let script = `
echo "${code.replace(/"/g, '\\"')}" > main.cpp
g++ main.cpp -o main
if [ $? -ne 0 ]; then
  echo "__COMPILE_ERROR__"
else
  ${testcases.map(tc => `echo '${tc.input}' | ./main; echo "---"`).join('\n')}
fi
`;

        const cppDocker = await createContainer(CPP_IMAGE, 
            ['sh', 
            '-c', 
            script]
        );

        await cppDocker.start();

        console.log("Started docker container");

        const loggerStream = await cppDocker.logs({
            stderr: true,
            stdout: true,
            timestamps: false,
            follow: true
        });

        // attach events on stream objects to stard or end reading
        loggerStream.on('data', (chunk) => {
            console.log("Received chunk, length:", chunk.length);
            rawLogBuffer = Buffer.concat([rawLogBuffer, chunk]);
            if (rawLogBuffer.length > MAX_DOCKER_LOG_SIZE) {
                loggerStream.emit('error', new Error('Docker log output exceeded the configured limit'));
            }
        }); 

        try{
            const codeResponse = await codeResponseHelper(loggerStream, rawLogBuffer, decodeDockerStream, 2000);
            console.log("Full Raw Output:\n", codeResponse);

            const {results, verdict, totalC, wrongC} = outputMatcher(codeResponse, testcases);

            console.log("Results:", results);

            return {
                status: 'Completed',
                verdict: verdict,
                results,
                passed: totalC- wrongC,
                total: totalC,
            };

        } catch(err){
    console.error("Execution failed:", err);
    if(err.verdict === "TLE"){
        await cppDocker.kill();
    }
    return {
        status: "Failed",
        verdict: err.verdict || "IE",
        error: err.message || String(err),
        passed: 0,
        total: testcases.length,
    };
} finally{
    await cppDocker.remove();
}
    };
}

export default CppExecutor;