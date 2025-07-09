import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { JAVA_IMAGE } from "../utils/constants.js";
import pullImage from "./pullImage.js";
import { outputMatcher } from "../utils/outputMatcher.js";
import { codeResponseHelper } from "./codeResponseHelper.js";

class JavaExecutor {
    execute = async(code, testcases) => {
        const rawLogBuffer = [];

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
            rawLogBuffer.push(chunk); 
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
            await javaDocker.remove();
        }
    };
}

export default JavaExecutor;