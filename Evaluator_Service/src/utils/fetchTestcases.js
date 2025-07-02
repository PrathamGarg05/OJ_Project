import axios from 'axios';
import { INTERNAL_API_KEY } from '../config/serverConfig.js';

export async function getTestcases(problemId) {
  const response = await axios.get(
    `http://localhost:4000/internal-api/internal/problems/${problemId}/testcases`,
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
    `http://localhost:4000/internal-api/internal/problems/${problemId}/sampleTestcases`,
    {
      headers: {
        'x-internal-api-key': INTERNAL_API_KEY,
      },
    }
  );
  return response.data;
}