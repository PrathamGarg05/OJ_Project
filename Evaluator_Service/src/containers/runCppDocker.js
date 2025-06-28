import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { CPP_IMAGE} from "../utils/constants.js";
import pullImage from "./pullImage.js";
import { outputMatcher } from "../utils/outputMatcher.js";

class CppExecutor {
    execute = async(code,testcases) => {
        const rawLogBuffer = [];

        await pullImage(CPP_IMAGE);

        let script = `echo '${code.replace(/'/g, `\\"`)}' > main.cpp && g++ main.cpp -o main
        `;

        testcases.forEach((tc, i) => {
            script += `echo '${tc.input}' | ./main; echo '---'\n`;
        });

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
            rawLogBuffer.push(chunk); 
        }); 

        try{
            const codeResponse = await new Promise((res, rej) => {
                loggerStream.on('end', () => {
                    const completeBuffer = Buffer.concat(rawLogBuffer);
                    const decodeStream = decodeDockerStream(completeBuffer);
                    console.log(decodeStream);
                    if(decodeStream.stderr){
                        rej(decodeStream.stderr);
                    }
                    res(decodeStream.stdout);
                });
            });
            console.log("Full Raw Output:\n", codeResponse);

        const {results, verdict} = outputMatcher(codeResponse, testcases);

        console.log("Results:", results);

        return {
            status: 'Completed',
            verdict: verdict,
            results
        };

        } catch(err){
            return {output: err, status: "Failed"};
        } finally{
            await cppDocker.remove();
        }
    };
}

export default CppExecutor;