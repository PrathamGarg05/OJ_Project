import { Link } from "react-router-dom";

function Problem({problem}){
    
    return (
        <div>
            {console.log(problem._id)}
            <Link to={`/problems/${problem._id}`}>{problem.title} {"      "} {problem.difficulty} </Link>
        </div>
    )

}

export default Problem;