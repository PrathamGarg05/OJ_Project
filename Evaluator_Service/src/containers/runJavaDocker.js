import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { JAVA_IMAGE } from "../utils/constants.js";
import pullImage from "./pullImage.js";
import { outputMatcher } from "../utils/outputMatcher.js";
import { MAX_DOCKER_LOG_SIZE, codeResponseHelper } from "./codeResponseHelper.js";

class JavaExecutor {
    execute = async(code, testcases) => {
        let rawLogBuffer = Buffer.alloc(0);

        await pullImage(JAVA_IMAGE);

        let script = `
echo "${code.replace(/"/g, '\\"')}" > Main.java
javac Main.java
if [ $? -ne 0 ]; then
  echo "__COMPILE_ERROR__"
else
${testcases.map(tc => `  echo '${tc.input}' | java Main; echo "---"`).join('\n')}
fi
`;
        const javaDocker = await createContainer(JAVA_IMAGE, 
            ['sh', 
            '-c', 
            script
        ]);

        await javaDocker.start();

        console.log("Started docker container");

        const loggerStream = await javaDocker.logs({
            stderr: true,
            stdout: true,
            timestamps: false,
            follow: true
        });

        // attach events on stream objects to stard or end reading
        loggerStream.on('data', (chunk) => {
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
            if(err.verdict === "TLE"){
                await javaDocker.kill();
            }
            return err;
        } finally{
            try {
                await javaDocker.remove();
            } catch (removeError) {
                console.log("Container remove skipped:", removeError?.message || removeError);
            }
        }
    };
}

export default JavaExecutor;