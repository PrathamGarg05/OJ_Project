import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { JAVA_IMAGE } from "../utils/constants.js";

async function runJava(code, sampleInput, sampleOutput){

    const rawLogBuffer = [];

    const javaDocker = await createContainer(JAVA_IMAGE, 
        ['sh', 
        '-c', 
        `echo '${code.replace(/'/g, `\\"`)}' > Main.java && javac Main.java && echo "${sampleInput}" | java Main`]
    );

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

    await javaDocker.remove();

}

export default runJava;