import express from 'express';
import * as testcaseController from '../../controllers/testcaseController.js';
import { authenticateToken, roleAuthorization } from '../../../../shared/middlewares/authMiddleware.js';
import { JWT_SECRET } from '../../config/serverConfig.js';
import { Testcase } from '../../models/Testcase.js';
const testcaseRouter = express.Router();

testcaseRouter.put('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"), testcaseController.updateTestcase);

testcaseRouter.delete('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"), testcaseController.deleteTestcase);


testcaseRouter.post('/bulk', async (req, res) => {
  try {
    const { problemId, testcases } = req.body;

    if (!problemId || !Array.isArray(testcases)) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const formatted = testcases.map(tc => ({
      problem: problemId,
      input: tc.input,
      output: tc.output,
      isSample: tc.isSample
    }));

    await Testcase.insertMany(formatted);

    return res.status(201).json({ message: "Testcases added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add testcases" });
  }
});


export default testcaseRouter;