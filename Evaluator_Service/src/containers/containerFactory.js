import Docker from 'dockerode';

async function createContainer(image, cmd, memory = 1024 * 1024 * 1024, cpu = 1e9) {
    const docker = new Docker();

    const container = await docker.createContainer({
        Image: image,
        Cmd: cmd,
        Tty: false,
        AutoRemove: true,
        HostConfig: {
            Memory: memory,
            NanoCpus: cpu
        }

    });

    return container;
}

export default createContainer;
