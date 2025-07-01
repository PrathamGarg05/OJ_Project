
import Dompurify from 'dompurify'
import ReactMarkdown from 'react-markdown'

function ProblemTab({problem}) {

    const difficultyColor = {
        Easy: "bg-green-600",
        Medium: "bg-yellow-500",
        Hard: "bg-red-600",
    }

        return(
            <div className="p-6 overflow-auto bg-white text-black dark:bg-gray-900 dark:text-white h-full"> 
                <div className="mb-4">
                    <h1 className="text-2xl font-bold pb-2">{problem.title}</h1>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`text-xs text-white px-2 py-1 rounded-md font-semibold ${difficultyColor[problem.difficulty]}`}>
                            {problem.difficulty}
                        </span>
                        {problem.tags && (
                            <span className="ml-2 text-xs">
                            {problem.tags.map((tag, i) => (
                                <span key={i} className="mr-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                                {tag}
                                </span>
                            ))}
                            </span>
                        )}
                    </div>
                </div>
                <div className="prose dark:prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:text-white prose-code:before:hidden prose-code:after:hidden">
                    <ReactMarkdown>{problem.description}</ReactMarkdown>
                </div>
            </div>
        )
}

export default ProblemTab;