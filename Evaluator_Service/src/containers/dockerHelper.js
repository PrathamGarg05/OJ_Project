import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants.js";

export default function decodeDockerStream(buffer) {
    let offset = 0; //current position in buffer
    const output = {stdout: '', stderr: ''}; 
    while(offset < buffer.length) {

        const channel = buffer[offset];

        // this var hold the length of value
        const length = buffer.readUint32BE(offset + 4);

        offset += DOCKER_STREAM_HEADER_SIZE;

        if(channel == 1) {
            //stdout stream
            output.stdout += buffer.toString('utf-8', offset, offset + length);
        } else if( channel == 2) {
            //stderr stream
            output.stderr += buffer.toString('utf-8', offset, offset + length);

        }
        offset += length;  //move to next chunk
    }

    return output;
}