import Docker from 'dockerode';

export default function pullImage(imageName) {
    try{
        const docker = new Docker();
        return new Promise((res,rej) => {
            docker.pull(imageName, (err, stream) => {
                if(err) throw err;
                docker.modem.followProgress(stream, (err, response) => err ? rej(err) : res(response), (event) => {
                });
            });
        });
    } catch(error){
        console.log(error);
        throw error;
    }
}