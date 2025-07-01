import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProblemContext } from "../../context/ProblemContext";
import { getSubmissions } from "../../services/submit";
import { useEffect } from "react";
import { useState } from "react";
import Submission from "./Submission";

function Submissions() {

    const {user} = useContext(AuthContext);
    const {problem} = useContext(ProblemContext);
    const [submissions, setSubmissions] = useState([]);

    const mySubmissions = async(userId, problemId) => {
        const res = await getSubmissions(userId, problemId);
        console.log(res.data.data);
        setSubmissions(res.data.data);
    }

    useEffect(() => {
        mySubmissions(user.id, problem._id);
    },[])

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Your Submissions</h2>
            <div className="space-y-3">
                {submissions.map(
                    sub => <Submission
                        key={sub._id}
                        sub={sub}
                        problem={problem}
                        />
                )}
            </div>
        </div>
    )
}

export default Submissions;