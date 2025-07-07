import { Button } from "@headlessui/react";
import { CodeContext } from "../../context/CodeContext";
import { ProblemContext } from "../../context/ProblemContext";
import { useContext, useState } from "react";
import { getBoilerplate } from "../../services/problem";

function BoiletPlateButton() {
    const {setCode, language} = useContext(CodeContext);
    const {problem} = useContext(ProblemContext);
    const [loading, setLoading] = useState(false);

    const generateBoilerplate = async () => {
        setLoading(true);
        const response = await getBoilerplate(problem._id, language.value);
        setCode(response.data.data);
        setLoading(false);
    }
    
    return (
        <Button 
            className="px-4 py-2 text-sm dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-900 disabled:cursor-not-allowed"
            disabled={loading}
            onClick={generateBoilerplate}
        >
            <div className="flex items-center gap-2">
                Boilerplate
            </div>
        </Button>
    )
}

export default BoiletPlateButton;