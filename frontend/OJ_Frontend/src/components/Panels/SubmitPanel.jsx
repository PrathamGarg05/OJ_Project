import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProblemContext } from "../../context/ProblemContext";
import { SocketContext } from "../../context/SocketContext";
import { getSampleTestCase } from "../../services/problem";
import { SubmitContext } from '../../context/SubmitContext';
import { CodeContext } from '../../context/CodeContext';
import CustomTCTab from '../Tabs/customTCTab';

function SubmitPanel() {

    function verdictColour(verdict) {
        if(verdict == "AC") return "text-green-500";
        else if(verdict == "WA") return "text-red-500";
        else if(verdict == "CE" || verdict == "RE") return "text-yellow-500";
        else if(verdict == "TLE") return "text-red-500";
    }

    function verdictMessage(verdict) {
        if(verdict == "AC") return "Accepted";
        else if(verdict == "WA") return "Wrong Answer";
        else if(verdict == "CE" ) return "Compilation Error";
        else if(verdict == "RE") return "Runtime Error";
        else if(verdict == "TLE") return "Time Limit Exceeded";
    }

    const {user, loading} = useContext(AuthContext);
    const {problem} = useContext(ProblemContext);
    const {result} = useContext(SocketContext);
    const {mode} = useContext(SubmitContext);
    const {aiReview} = useContext(CodeContext);

    const[sampleTestCase, setSampleTestCase] = useState([]);

    async function fetchSampleTestCase(problemId) {
        const response = await getSampleTestCase(problemId);
        setSampleTestCase(response.data.data);
    }

    useEffect(() => {
        fetchSampleTestCase(problem._id);
    },[problem]);

    return(
        <div className="h-full w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white overflow-y-auto rounded-md">
            {user ? null : <span className="text-sm">Please login to submit</span>}
            {loading ? <span className="m-4 rounded-md text-green-600">{"Your Code is Executing"}</span> : null}
            {result && result.error ? 
            <div className="m-4 p-3 rounded bg-gray-100 dark:bg-gray-800 text-medium">
                <span className="font-medium text-red-500">Error: {`${verdictMessage(result.verdict)}`}</span>
                <pre className="text-red-500">{result.error}</pre>
            </div>
            :
                <TabGroup>                
                    <TabList className="flex flex-wrap gap-2 border-b border-gray-600 py-2 mb-4 ml-2">
                        {mode === "run" && sampleTestCase?.length ? (
                        <>
                        {sampleTestCase.map((tc, idx) => {
                          const tcResult = result?.results?.find(r => r.id === tc._id);
                          return (
                            <Tab key={idx} className={({ selected }) => {
                              const base = "px-3 py-1 text-sm rounded-md font-medium";
                              const verdictColor =
                                tcResult?.passed === true
                                  ? "bg-green-600 text-white"
                                  : tcResult?.passed === false
                                  ? "bg-red-600 text-white"
                                  : selected
                                  ? "bg-gray-200 dark:bg-gray-900 text-black dark:text-white"
                                  : "text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-900";
                      
                              return `${base} ${verdictColor}`;
                            }}>
                              Testcase {idx + 1}
                            </Tab>
                          );
                        })}
                        
                        <Tab
                          className={
                            "px-3 py-1 text-sm rounded-md font-medium bg-gray-300 dark:bg-gray-900 text-black dark:text-white"
                          }
                          key={"customTC"}
                        >
                          <span className="selected:bg-gray-800 selected:text-white px-3 py-1 text-sm rounded-md text-gray-400">
                            {"Custom Testcase"}
                          </span>
                        </Tab>
                      </>
                      
                            
                        ) : mode === "submit" && result ? (
                            <Tab className={`px-3 py-1 text-sm rounded-md font-medium ${result.verdict === "AC" ? "bg-green-600 dark:bg-green-900 dark:text-white text-black" : "bg-red-600 dark:bg-red-900 dark:text-white text-black"}`}
                            key={"submit"}>
                                <span className="selected:bg-gray-300 dark:selected:bg-gray-900 selected:text-white px-3 py-1 text-sm rounded-md dark:text-gray-400 text-gray-800 hover:text-white dark:hover:text-white ">
                                    {"Result"}
                                </span>
                            </Tab>
                        ) : null}
                        {aiReview && (
                            <Tab className={`px-3 py-1 text-sm rounded-md font-medium bg-gray-300 dark:bg-gray-900 text-black dark:text-white`}
                            key={"aiReview"}>
                                <span className="selected:bg-gray-300 dark:selected:bg-gray-900 selected:text-white px-3 py-1 text-sm rounded-md text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-900 hover:text-white dark:hover:text-white ">
                                    {"AI Review"}
                                </span>
                            </Tab>
                        )}
                    </TabList>
                    <TabPanels>
                        <>
                        {mode === "run" && sampleTestCase.map((tc, idx) => {
                            const tcResult = result?.results?.find(r => r.id === tc._id);
                            return (
                                
                                <TabPanel key={idx}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 dark:bg-gray-900 p-4 rounded-md border border-gray-800 text-sm text-black dark:text-gray-100">
                                <div className="space-y-4">
                                    <div>
                                        <span className="font-medium dark:text-gray-400 text-gray-800">Input:</span>
                                        <pre className="bg-gray-300 dark:bg-gray-900 dark:text-cyan-400 text-cyan-800 p-3 rounded whitespace-pre-wrap font-mono">
                                            {tc.input}
                                        </pre>
                                    </div>
                                        <div>
                                            <span className="font-medium dark:text-gray-400 text-gray-800">Expected Output:</span>
                                            <pre className="bg-gray-300 dark:bg-gray-900 dark:text-green-400 text-green-800 p-3 rounded whitespace-pre-wrap font-mono">
                                                {tc.output}
                                            </pre>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="font-medium text-gray-400">Your Output:</span>
                                                <pre className={`bg-gray-300 dark:bg-gray-900 ${tcResult?.passed ? "dark:text-green-400 text-green-800" : "dark:text-red-400 text-red-800"} p-3 rounded whitespace-pre-wrap font-mono`}>
                                                {tcResult?.actual || "--"}
                                            </pre>
                                        </div>
                                            <div>
                                                <span className="font-medium">Verdict: </span>
                                                <span className={tcResult?.passed ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                                                    {tcResult?.passed ? "Passed" : "Failed"}
                                                </span>
                                            </div>
                                        </div>
                                </div>
                            </TabPanel>
                            
                                
                            )
                        })}
                        {mode === "run" && <CustomTCTab />}
                        </>
                        {mode === "submit" && result && (
                            <TabPanel key={"submit"}>
                                <div className="m-4 p-3 rounded bg-gray-100 dark:bg-gray-800 text-medium">
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
                            </TabPanel>
                        )}
                        {aiReview && (
                            <TabPanel key={"aiReview"}>
                                <div className="m-4 p-3 rounded bg-gray-100 dark:bg-gray-800 text-medium ">
                                    <pre className="dark:text-gray-400 text-gray-800 whitespace-pre-wrap font-mono">{aiReview}</pre>
                                </div>
                            </TabPanel>
                        )}
                    </TabPanels>
                </TabGroup>
                
            }
            

        </div>
    )
}

export default SubmitPanel;