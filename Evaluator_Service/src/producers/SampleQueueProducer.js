import SampleQueue from "../queues/SampleQueue.js";

export default async function (name,payload) {

    await SampleQueue.add(name, payload);

    console.log("Successfully added new job");
}