import { Link } from "react-router-dom";

function Problem({problem, index}){

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
        case "Easy":
            return "text-green-400";
        case "Medium":
            return "text-yellow-400";
        case "Hard":
            return "text-red-400";
        default:
            return "text-gray-400";
        }
    };
    
    return (
        <tr className="hover:bg-gray-800 transition border-t border-gray-700">
            <td className="px-6 py-4 text-gray-400">{index + 1}</td>
            <td className="px-6 py-4">
                <Link 
                    to={`/problems/${problem._id}`}
                    className="text-cyan-400 hover:underline"
                >
                    {problem.title}
                </Link>
            </td>
            <td className={`px-6 py-4 ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
            </td>
        </tr>
    )

}

export default Problem;