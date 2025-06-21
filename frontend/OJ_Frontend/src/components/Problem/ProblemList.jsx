import Problem from "./Problem";

function ProbelmList({problems}){

    // console.log(problems);

    return(
       <div>
        {
            problems.map(
                problem => <Problem 
                    key={problem._id}
                    title={problem.title}
                    difficulty={problem.difficulty}
                />
            )
        }
       </div>
    )
}

export default ProbelmList;