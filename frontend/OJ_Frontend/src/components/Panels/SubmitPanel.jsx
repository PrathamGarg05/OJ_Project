import { Button } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProblemContext } from "../../context/ProblemContext";
import { CodeContext } from "../../context/CodeContext";
import { runProblem, sendSubmission } from "../../services/submit";
import { SocketContext } from "../../context/SocketContext";
import { getSampleTestCase } from "../../services/problem";

function SubmitPanel() {

    function verdictColour(verdict) {
        if(verdict == "AC") return "text-green-500";
        else if(verdict == "WA") return "text-red-500";
        else if(verdict == "CE" || verdict == "RE") return "text-yellow-500";
    }

    function verdictMessage(verdict) {
        if(verdict == "AC") return "Accepted";
        else if(verdict == "WA") return "Wrong Answer";
        else if(verdict == "CE" ) return "Compilation Error";
        else if(verdict == "RE") return "Runtime Error";
    }

    const {user, loading, setLoading} = useContext(AuthContext);
    const {problem} = useContext(ProblemContext);
    const {code, language} = useContext(CodeContext);
    const {result, setResult} = useContext(SocketContext);

    const[sampleTestCase, setSampleTestCase] = useState([]);

    async function fetchSampleTestCase(problemId) {
        const response = await getSampleTestCase(problemId);
        setSampleTestCase(response.data.data);
        console.log(response.data.data);
    }
    
    async function onSubmitClick() { 
        setLoading(true);
        setResult([]); 
        const userId = user.id;
        const problemId = problem._id;
        const langValue = language.value;
        await sendSubmission({userId: userId, problemId: problemId, code: code, language: langValue});
    }

    async function onRun() {
        setLoading(true);
        setResult([]);
        const userId = user.id;
        const problemId = problem._id;
        const langValue = language.value;
        await runProblem({userId: userId, problemId: problemId, code: code, language: langValue, type:"run"})
    }

    useEffect(() => {
        fetchSampleTestCase(problem._id);
    },[problem]);

    return(
        <div className="h-full w-full bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto rounded-md">
            <TabGroup>
                <TabList className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 dark:bg-black pb-1 gap-0.5 bg-gray-100 items-center">
                    <Button 
                        className="px-4 py-2 text-sm dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-900 disabled:cursor-not-allowed"
                        onClick={onRun}
                        disabled={!user || loading}
                    >
                        {"Run"}
                    </Button>
                    <Button 
                        className="px-4 py-2 text-sm dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-900 disabled:cursor-not-allowed"
                        onClick={onSubmitClick}
                        disabled={!user || loading}
                    >
                        {"Submit"}
                    </Button>
                </TabList>
                <TabPanels className="px-4 py-2">
                    {sampleTestCase?.length ? (
                        <TabList className="flex flex-wrap gap-2 border-b border-gray-600 py-2 mb-4">
                        {sampleTestCase.map((tc, idx) => (
                            <Tab
                            key={idx}
                            className={({ selected}) =>
                                `px-3 py-1 text-sm rounded-md  ${
                                selected
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-800 dark:text-white hover:bg-gray-800"
                                }`
                            }
                            >
                            Testcase {idx + 1}
                            </Tab>
                        ))}
                        </TabList>
                    ) : (
                        <p className="text-sm text-gray-400">No sample testcases found.</p>
                    )}

                    {sampleTestCase.map((tc, idx) => (
                        <TabPanel key={idx}>
                        <div className="mb-4 bg-gray-900 p-4 rounded-md border border-gray-800">
                            <p className="text-gray-400">
                            <span className="font-medium">Input:</span>{" "}
                            <code className="text-cyan-400">{tc.input}</code>
                            </p>
                            <p className="text-gray-400 mt-2">
                            <span className="font-medium">Expected Output:</span>{" "}
                            <code className="text-green-400">{tc.output}</code>
                            </p>
                        </div>
                        </TabPanel>
                    ))}
                    </TabPanels>

            </TabGroup>
            {user ? null : <span className="text-sm">Please login to submit</span>}
            {loading ? <span className="m-4 rounded-md text-green-600">{"Your Code is Executing"}</span> : null}
                
            {result && (
                <div className="m-4 p-3 rounded bg-gray-100 dark:bg-gray-800 text-medium">
                    <h2 className="font-semibold">Result</h2>
                    <pre className={`${verdictColour(result.verdict)}`}>{verdictMessage(result.verdict)}</pre>
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