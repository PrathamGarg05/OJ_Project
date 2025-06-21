import { useEffect, useState } from "react";
import ProbelmList from "../../components/Problem/ProblemList";
import { getProblems } from "../../services/problem.js";

function ProbelmsPage(){

    const [problems, setProblems] = useState([]);

    const fetchProblems = async () => {
      try {
        const res = await getProblems(); 
        const data = res.data.data;
        setProblems(data);
      } catch (err) {
        console.error('Failed to fetch problems', err);
      }
    };

    useEffect(() => {
        fetchProblems();
    },[]);

    return (
        <ProbelmList problems={problems}/>
    )
}

export default ProbelmsPage;