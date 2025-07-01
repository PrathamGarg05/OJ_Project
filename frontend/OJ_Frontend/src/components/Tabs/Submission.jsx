import { Button } from "@headlessui/react";
import { useContext } from "react";
import { CodeContext } from "../../context/CodeContext";

function Submission({sub, problem}) {
    const {setCode} = useContext(CodeContext);
    function handleSubmssionClick(sub) {
        setCode(sub.code);
    }
    return (
        <div
            onClick={() => handleSubmssionClick(sub)}
            className="cursor-pointer transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex justify-between items-center"
        >
            <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{problem.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Language: {sub.language}</p>
            </div>
            <div>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        sub.status === 'AC'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : sub.status === 'WA'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            : sub.status === 'CE' || sub.status === "RE"
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                >
                    {sub.status}
                </span>
            </div>
        </div>
    )
}

export default Submission;