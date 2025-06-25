import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { CPP_IMAGE} from "../utils/constants.js";
import pullImage from "./pullImage.js";

async function runCpp(code, sampleInput, sampleOutput){

    const rawLogBuffer = [];

    await pullImage(CPP_IMAGE);

    const cppDocker = await createContainer(CPP_IMAGE, 
        ['sh', 
        '-c', 
        `echo '${code.replace(/'/g, `\\"`)}' > main.cpp && g++ main.cpp -o main && echo "${sampleInput}" | ./main`]
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

    await cppDocker.remove();

}

export default runCpp;