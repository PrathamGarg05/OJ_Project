// pullImage.js
import Docker from 'dockerode';

const docker = new Docker(); // reuse a single client, same fix as containerFactory

export default async function pullImage(imageName) {
    try {
        const images = await docker.listImages({ filters: { reference: [imageName] } });
        if (images.length > 0) {
            return; // already present locally, skip network pull entirely
        }

        return new Promise((res, rej) => {
            docker.pull(imageName, (err, stream) => {
                if (err) return rej(err);
                docker.modem.followProgress(stream, (err, response) =>
                    err ? rej(err) : res(response)
                );
            });
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}