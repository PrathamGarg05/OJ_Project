import express from 'express' ;
import { validate} from '../../validators/submissionValidator.js';
import { SubmissionZodSchema } from '../../validators/Schemas/SubmissionSchema.js';
import { createSubmission } from '../../controllers/submissionController.js';

const subRouter = express.Router();

subRouter.post('/', validate(SubmissionZodSchema), createSubmission);

export default subRouter;