import { useEffect, useState } from "react";
import ProbelmList from "../../components/Problem/ProblemList";
import { getProblems } from "../../services/problem.js";
import NavBar from "../../components/NavBar/NavBar.jsx";

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
      <div className="dark:bg-black bg-white text-black min-h-screen flex flex-col">
        <NavBar />
        <ProbelmList problems={problems}/>
      </div>
        
    )
}

export default ProbelmsPage;