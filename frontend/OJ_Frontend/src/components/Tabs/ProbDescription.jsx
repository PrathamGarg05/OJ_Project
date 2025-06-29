// import { useState } from "react";
import Dompurify from 'dompurify'
import ReactMarkdown from 'react-markdown'

function ProblemTab() {

    // const[problem, setProblem] = useState(null);

    const difficultyColor = {
        Easy: "bg-green-600",
        Medium: "bg-yellow-500",
        Hard: "bg-red-600",
    }

    const data = {
          title: "Two Sum",
          difficulty: "Easy",
          tags: ["Array", "HashMap"],
          description: `
Given an array of integers **nums** and an integer **target**, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
\`\`\`

### Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
          `
        };

        // data.difficulty = Dompurify(data.difficulty);

        // setProblem(data);

        return(
            <div className="p-6 overflow-y-auto bg-white text-black dark:bg-gray-900 dark:text-white h-full"> 
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">{data.title}</h1>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`text-xs text-white px-2 py-1 rounded-md font-semibold ${difficultyColor[data.difficulty]}`}>
                            {data.difficulty}
                        </span>
                        {data.tags && (
                            <span className="ml-2 text-xs">
                            {data.tags.map((tag, i) => (
                                <span key={i} className="mr-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                                {tag}
                                </span>
                            ))}
                            </span>
                        )}
                    </div>
                </div>
                <div className="prose dark:prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:text-white prose-code:before:hidden prose-code:after:hidden">
                    <ReactMarkdown>{data.description}</ReactMarkdown>
                </div>
            </div>
        )
}

export default ProblemTab;