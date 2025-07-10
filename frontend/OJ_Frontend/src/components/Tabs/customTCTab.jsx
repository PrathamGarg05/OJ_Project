import { TabPanel, Button } from "@headlessui/react";
import { useState, useContext } from "react";
import { ProblemContext } from "../../context/ProblemContext";
import { AuthContext } from "../../context/AuthContext";
import { CodeContext } from "../../context/CodeContext";
import { SocketContext } from "../../context/SocketContext";
import { runProblem } from "../../services/submit";

function CustomTCTab() {

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const {problem} = useContext(ProblemContext);
    const {user, setLoading, loading} = useContext(AuthContext);
    const {code, language} = useContext(CodeContext);
    const {setCustomResult, customResult} = useContext(SocketContext);

    async function handleRun() {
        setLoading(true);
        setCustomResult(null);
        const userId = user.id;
        const problemId = problem._id;
        const langValue = language.value;
        await runProblem({userId: userId, problemId: problemId, code: code, language: langValue, type:"custom",
            testcase: [{input: input, output: ""}]
        })
        setOutput(customResult?.results[0]?.actual || "");
    }

    return (
        <TabPanel key={"customTC"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 dark:bg-gray-900 p-4 rounded-md border border-gray-800 text-sm text-black dark:text-gray-100">
                <div className="space-y-4">
                    <div >
                        <span className="font-medium dark:text-gray-400 text-gray-800 m-2">Input: </span>
                        <textarea className="bg-gray-300 dark:bg-gray-800 dark:text-gray-100 text-gray-800 p-3 rounded whitespace-pre-wrap font-mono"
                             value={input}
                             onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    {customResult && <div>
                        <span className="font-medium dark:text-gray-400 text-gray-800 m-2">Output: </span>
                        <textarea className="bg-gray-300 dark:bg-gray-800 dark:text-gray-100 text-gray-800 p-3 rounded whitespace-pre-wrap font-mono"
                            value={output}
                            disabled
                        />
                    </div>}
                </div>
                <div className="flex justify-end items-end">
                    <Button 
                        className="dark:bg-gray-800 bg-gray-300 dark:text-gray-100 text-gray-800 p-3 rounded whitespace-pre-wrap font-mono hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white disabled:cursor-not-allowed"
                        onClick={handleRun}
                        disabled={loading}
                    >Run</Button>
                </div>
            </div>
            
        </TabPanel>
    )
}

export default CustomTCTab;