import { Button } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProblemContext } from "../../context/ProblemContext";
import { CodeContext } from "../../context/CodeContext";
import { sendSubmission } from "../../services/submit";
import { SocketContext } from "../../context/SocketContext";

function SubmitPanel() {

    function verdictColour(verdict) {
        if(verdict == "AC") return "text-green-500";
        else if(verdict == "WA") return "text-red-500";
        else if(verdict == "CE" || verdict == "RE") return "text-yellow-500";
    }

    const {user} = useContext(AuthContext);
    const {problem} = useContext(ProblemContext);
    const {code, language} = useContext(CodeContext);
    const {result} = useContext(SocketContext);
    
    async function onClick() {    
        console.log(user.id);
        console.log(problem._id);
        console.log(code, language.value);
        const userId = user.id;
        const problemId = problem._id;
        const langValue = language.value;
        await sendSubmission({userId: userId, problemId: problemId, code: code, language: langValue});
    }

    return(
        <div className="h-full w-full bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto rounded-md">
            <TabGroup>
                <TabList className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 dark:bg-black pb-1 gap-0.5 bg-gray-100 items-center">
                    <Button 
                        className="px-4 py-2 text-sm dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-900"
                        onClick={onClick}
                        disabled={!user}
                    >
                        Submit
                    </Button>
                </TabList>

            </TabGroup>
            {user ? null : <span className="text-sm">Please login to submit</span>}
            {result && (
                <div className="mt-4 p-3 rounded bg-gray-100 dark:bg-gray-800 text-sm">
                    <h2 className="font-semibold">Submission Result</h2>
                    <pre className={`${verdictColour(result.verdict)}`}>{result.verdict}</pre>
                    {result.passed >=0  &&(
                            <pre>{"Passed :"} {result.passed} </pre>
                    )}
                    {result.total &&(
                            <pre>{"Total :"} {result.total} </pre>
                    )}
                    {result.error && (
                        <pre className="text-red-500">{result.error}</pre>
                    )}
                </div>
            )}
        </div>
    )
}

export default SubmitPanel;