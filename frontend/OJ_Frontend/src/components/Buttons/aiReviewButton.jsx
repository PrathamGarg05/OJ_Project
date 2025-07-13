import { Button } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { CodeContext } from "../../context/CodeContext";
import { getAiReview } from "../../services/problem";
import { ProblemContext } from "../../context/ProblemContext";

function AiReviewButton() {

    const [loading, setLoading] = useState(false);
    const {code, setAiReview} = useContext(CodeContext);
    const {problem} = useContext(ProblemContext);

    const generateAiReview = async () => {
        setLoading(true);
        const response = await getAiReview(problem._id, code);
        setAiReview(response.data.data);
        setLoading(false);
    }
    useEffect(() => {
        if (problem) {
            setAiReview(null);
        }
    }, [problem]);

    return (
        <Button 
            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-300 dark:hover:bg-gray-900 disabled:cursor-not-allowed"
            disabled={loading}
            onClick={generateAiReview}
        >
            <div className="flex items-center gap-2">
                AI Review
            </div>
        </Button>
    )
}

export default AiReviewButton;