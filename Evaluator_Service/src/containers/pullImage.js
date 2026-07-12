import Docker from 'dockerode';

export default function pullImage(imageName) {
    const docker = new Docker();
    return new Promise((res, rej) => {
        docker.pull(imageName, (err, stream) => {
            if (err) return rej(err);
            docker.modem.followProgress(stream, (err, response) => 
                err ? rej(err) : res(response)
            );
        });
    });
}