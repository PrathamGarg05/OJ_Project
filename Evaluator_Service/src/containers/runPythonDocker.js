import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import { PYTHON_IMAGE } from "../utils/constants.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";

class PythonExecutor {
    execute = async(code, sampleInput, sampleOutput) => {
        const rawLogBuffer = [];

        await pullImage(PYTHON_IMAGE);

        const pythonDocker = await createContainer(PYTHON_IMAGE, ['sh', '-c', `echo '${code.replace(/'/g, `\\"`)}' > test.py && echo "${sampleInput}" | python3 test.py`]);

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
            const codeResponse = await new Promise((res, rej) => {
                loggerStream.on('end', () => {
                    console.log(rawLogBuffer);
                    const completeBuffer = Buffer.concat(rawLogBuffer);
                    const decodeStream = decodeDockerStream(completeBuffer);
                    console.log(decodeStream);
                    console.log(decodeStream.stdout);
                    if(decodeStream.stderr){
                        rej(decodeStream.stderr);
                    }
                    res(decodeStream.stdout);
                });
            });
            return {output: codeResponse, status: "Completed"};
        } catch(err){
            return {ouput: err, status: "Failed"};
        } finally{
                await pythonDocker.remove();
        }
    };
}
export default PythonExecutor;