import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import { PYTHON_IMAGE } from "../utils/constants.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";

async function runPython(code, sampleInput, sampleOutput){

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

    await new Promise((res) => {
        loggerStream.on('end', () => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodeStream = decodeDockerStream(completeBuffer);
            console.log(decodeStream);
            console.log(decodeStream.stdout);
            res(decodeStream);
        });

    });

    await pythonDocker.remove();

}

export default runPython;