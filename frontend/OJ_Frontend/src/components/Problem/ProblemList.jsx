import Problem from "./Problem";

function ProbelmList({problems}){

    // console.log(problems);

    return(
       <div>
        {
            problems.map(
                problem => <Problem 
                    key={problem._id}
                    problem={problem}
                />
            )
        }
       </div>
    )
}

export default ProbelmList;