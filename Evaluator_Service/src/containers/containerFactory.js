import Docker from 'dockerode';

const docker = new Docker(); // single reused client, not one per call

async function createContainer(image, cmd, binds = [], memory = 1024 * 1024 * 1024, cpu = 1e9) {
    const container = await docker.createContainer({
        Image: image,
        Cmd: cmd,
        Tty: false,
        AutoRemove: true,
        HostConfig: {
            Memory: memory,
            NanoCpus: cpu,
            Binds: binds
        }
    });

    return container;
}

export default createContainer;