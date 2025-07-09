import axios from 'axios';
import { INTERNAL_API_KEY, PROBLEM_URL } from '../config/serverConfig.js';

export async function getTestcases(problemId) {
  const response = await axios.get(
    `${PROBLEM_URL}/problems/${problemId}/testcases`,
    {
      headers: {
        'x-internal-api-key': INTERNAL_API_KEY,
      },
    }
  );
  return response.data;
}

export async function getSampleTestcases(problemId) {
  const response = await axios.get(
    `${PROBLEM_URL}/problems/${problemId}/sampleTestcases`,
    {
      headers: {
        'x-internal-api-key': INTERNAL_API_KEY,
      },
    }
  );
  return response.data;
}