import Docker from 'dockerode';

async function createContainer(image, cmd, memory = 512 * 1024 * 1024, cpu = 1e9) {
    const docker = new Docker();

    const container = await docker.createContainer({
        Image: image,
        Cmd: cmd,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        OpenStdin: true,  //keep input stream open even if no interaction is there
        HostConfig: {
            Memory: memory,
            NanoCpus: cpu
        }

    });

    return container;
}

export default createContainer;
