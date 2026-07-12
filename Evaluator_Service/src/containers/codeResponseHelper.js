const MAX_DOCKER_LOG_BYTES = 1024 * 1024;

export const codeResponseHelper = async(loggerStream, rawLogBuffer, decodeDockerStream, timeout) => {
    return new Promise(async(res, rej) => {
        const cleanup = () => {
            clearTimeout(timeoutId);
            loggerStream.removeAllListeners('end');
            loggerStream.removeAllListeners('error');
            loggerStream.removeAllListeners('data');
        };

        const timeoutId = setTimeout(() => {
            cleanup();
            rej({
                verdict: "TLE",
                error: "Time Limit Exceeded",
                status: "Failed"
            });
        }, timeout);

        loggerStream.on('end', () => {
            cleanup();

            console.log("Stream ended. Total chunks:", rawLogBuffer.length);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            console.log("Complete buffer length:", completeBuffer.length, "content:", completeBuffer.toString('utf-8'));
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
                return;
            }
            if(stderr) {
                rej ({
                    verdict: "RE",
                    error:stderr,
                    status: "Failed"
                });
                return;
            }
            res(stdout);
        });

        loggerStream.on('error', (error) => {
            cleanup();
            rej({
                verdict: "RE",
                error: error?.message || String(error),
                status: "Failed"
            });
        });
})  ;
};

export const MAX_DOCKER_LOG_SIZE = MAX_DOCKER_LOG_BYTES;