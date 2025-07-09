export const codeResponseHelper = async(loggerStream, rawLogBuffer, decodeDockerStream, timeout) => {
    return new Promise(async(res, rej) => {
        const timeoutId = setTimeout(() => {
            rej({
                verdict: "TLE",
                error: "Time Limit Exceeded",
                status: "Failed"
            });
        }, timeout);
    loggerStream.on('end', () => {
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodeStream = decodeDockerStream(completeBuffer);

        const stdout = decodeStream.stdout.toString();
        const stderr = decodeStream.stderr.toString();
        console.log(decodeStream);
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
})  ;
};