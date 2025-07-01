import Problem from "./Problem";

function ProbelmList({problems}){

    

    return(
       <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen py-16 px-6">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    Problems
                </h1>
                <p className="mt-4 text-gray-400 text-lg">
                    Solve problems and sharpen your coding skills.
                </p>
            </header>
            <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <table className="w-full table-auto text-left">
                    <thead className="bg-gray-800 text-gray-300">
                        <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            problems.map(
                                (problem, index) => (
                                    <Problem
                                        key={problem._id}
                                        problem={problem}
                                        index={index}
                                    />
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

        
       </div>
    )
}

export default ProbelmList;