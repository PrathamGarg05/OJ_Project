import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CodeContext } from "../../context/CodeContext";
import { SocketContext } from "../../context/SocketContext";
import { runProblem, sendSubmission } from "../../services/submit";
import { Button } from "@headlessui/react";
import { ProblemContext } from "../../context/ProblemContext";
import { SubmitContext } from "../../context/SubmitContext";
import {FaPlay, FaCloudUploadAlt} from "react-icons/fa";

function SubmitButtons() {

    const {user, loading, setLoading} = useContext(AuthContext);
    const {problem} = useContext(ProblemContext);
    const {code, language} = useContext(CodeContext);
    const {setResult} = useContext(SocketContext);
    const {mode, setMode} = useContext(SubmitContext);
    
    async function onSubmitClick() { 
        setLoading(true);
        setResult(null); 
        setMode("submit");
        const userId = user.id;
        const problemId = problem._id;
        const langValue = language.value;
        await sendSubmission({userId: userId, problemId: problemId, code: code, language: langValue});
    }

    async function onRun() {
        setLoading(true);
        setResult(null);
        setMode("run");
        const userId = user.id;
        const problemId = problem._id;
        const langValue = language.value;
        await runProblem({userId: userId, problemId: problemId, code: code, language: langValue, type:"run"})
    }

    return (
        <div className="flex flex-row gap-2">
            <Button
                className="px-4 py-2 text-sm dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-900 disabled:cursor-not-allowed"
                onClick={onRun}
                disabled={!user || loading}
            >
                <div className="flex items-center gap-2">
                    <FaPlay className="w-4 h-4" />
                    <span>Run</span>
                </div>  
            </Button>
            <Button
                className="px-4 py-2 text-sm dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-900 disabled:cursor-not-allowed"
                onClick={onSubmitClick}
                disabled={!user || loading}
            >
                <div className="flex items-center gap-2">
                    <FaCloudUploadAlt className="w-4 h-4" />
                    <span>Submit</span>
                </div>
            </Button>
        </div>
    )
}

export default SubmitButtons;