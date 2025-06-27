import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { CPP_IMAGE} from "../utils/constants.js";
import pullImage from "./pullImage.js";

class CppExecutor {
    execute = async(code, sampleInput, sampleOutput) => {
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
            await cppDocker.remove();
        }
    };
}

export default CppExecutor;