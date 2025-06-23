import {Job} from 'bullmq';

export interface IJob {
    name: String
    payload?: Record<string, unknown>
    handle: (job?: Job) => void
    failed: (job?: Job) => void
}