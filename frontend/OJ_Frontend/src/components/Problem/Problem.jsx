import { Link } from "react-router-dom";

function Problem({problem, index, solved}){

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
        <tr className="hover:dark:bg-gray-800 hover:bg-gray-200 transition border-t border-gray-700">
            <td className="px-6 py-4 dark:text-gray-400 text-gray-800">{index + 1}</td>
            <td className="px-6 py-4">
                <Link 
                    to={`/problems/${problem._id}`}
                    className="dark:text-cyan-400 text-cyan-800 hover:underline"
                >
                    {problem.title}
                </Link>
            </td>
            <td className={`px-6 py-4 ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
            </td>
            <td>
                {solved ? 
                    <span className="ml-2 dark:text-green-500 text-green-800 font-medium">✔ Solved</span>
                    : <span className="ml-2 dark:text-gray-600 text-gray-800 font-medium">--</span>
                }
            </td>
        </tr>
    )

}

export default Problem;