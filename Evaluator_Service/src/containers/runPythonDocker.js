import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import { PYTHON_IMAGE } from "../utils/constants.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";
import { outputMatcher } from "../utils/outputMatcher.js";
import { codeResponseHelper } from "./codeResponseHelper.js";

class PythonExecutor {
    execute = async(code, testcases) => {
        const rawLogBuffer = [];

        await pullImage(PYTHON_IMAGE);

        let script = `
echo "${code.replace(/"/g, '\\"')}" > main.py
if ! python3 -m py_compile main.py ; then
  echo "__COMPILE_ERROR__"
else
${testcases.map(tc => `  echo '${tc.input}' | python3 main.py ; echo "---"`).join('\n')}
fi
`;


        const pythonDocker = await createContainer(PYTHON_IMAGE, [
            'sh',
            '-c',
            script
        ]);

        await pythonDocker.start();

        console.log("Started docker container");

        const loggerStream = await pythonDocker.logs({
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
            const codeResponse = await codeResponseHelper(loggerStream, rawLogBuffer, decodeDockerStream, 4000);
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
                await pythonDocker.kill();
            }
            return err;
        } finally{
            await pythonDocker.remove();
        }
    };
}
export default PythonExecutor;