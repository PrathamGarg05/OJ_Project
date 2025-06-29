import NavBar from "../../components/NavBar/NavBar";
import LeftPanel from "../../components/Panels/LeftPanel";
import RightPanel from "../../components/Panels/RightPanel";


function ProblemDescription() {

    

    return (
        <div className="h-full w-full">
            <NavBar/>
            <div className="flex flex-row h-full w-full">
                <LeftPanel />
                <RightPanel theme={"dark"}/>
            </div>
            
        </div>
    )
}

export default ProblemDescription;