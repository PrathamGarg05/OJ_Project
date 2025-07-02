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

        let script = `
echo "${code.replace(/"/g, '\\"')}" > main.cpp
g++ main.cpp -o main
if [ $? -ne 0 ]; then
  echo "__COMPILE_ERROR__"
else
  ${testcases.map(tc => `echo '${tc.input}' | ./main; echo "---"`).join('\n')}
fi
`;

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

                    const stdout = decodeStream.stdout.toString();
                    const stderr = decodeStream.stderr.toString();
                    if (stdout.includes("__COMPILE_ERROR__")) {
                        rej({
                            verdict: "CE",
                            error: stderr, 
                            status: "Failed"
                        });
                    }
                    if(stderr) {
                        rej ({
                            verdict: "RE",
                            error:stderr,
                            status: "Failed"
                        });
                    }
                    res(stdout);
                });
            });
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
            return err;
        } finally{
            await cppDocker.remove();
        }
    };
}

export default CppExecutor;