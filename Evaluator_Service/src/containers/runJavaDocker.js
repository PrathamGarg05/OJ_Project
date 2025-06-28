import Docker from "dockerode";

import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import { JAVA_IMAGE } from "../utils/constants.js";
import pullImage from "./pullImage.js";
import { outputMatcher } from "../utils/outputMatcher.js";

class JavaExecutor {
    execute = async(code, testcases) => {
        const rawLogBuffer = [];

        await pullImage(JAVA_IMAGE);

        let script = `echo '${code.replace(/'/g, `\\"`)}' > Main.java && javac Main.java && `;

        testcases.forEach((tc) => {
            script += `echo '${tc.input}' | java Main; echo '---'\n`;
        });

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
            const {results, verdict} = outputMatcher(codeResponse, testcases);
            
            console.log("Results:", results);
    
            return {
                status: 'Completed',
                verdict: verdict,
                results
            };
        } catch(err){
            return {ouput: err, status: "Failed"};
        } finally{
            await javaDocker.remove();
        }
    };
}

export default JavaExecutor;