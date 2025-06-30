import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import LeftPanel from "../../components/Panels/LeftPanel";
import RightPanel from "../../components/Panels/RightPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SubmitPanel from "../../components/Panels/SubmitPanel";
import { getProblemDetails } from "../../services/problem";
import { useParams } from "react-router-dom";

function ProblemDescription() {

    const {id} = useParams();

    const [problem, setProblem] = useState({});

    const fetchProblem = async (id) => {
        try {
            const res = await getProblemDetails(id); 
            const data = res.data.data;
            setProblem(data);
            console.log(data);
        } catch (err) {
            console.error('Failed to fetch problem', err);
        }
    };


    useEffect(() => {
        fetchProblem(id);
    }, []);

    return (
        <div className="flex flex-col h-dvh w-full bg-black">
            <NavBar
            />
            <main className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal" className="h-full">
                    <Panel defaultSize={35} minSize={10} maxSize={90}>
                        <LeftPanel problem={problem}/>
                    </Panel>
                    <PanelResizeHandle className="hover:bg-neutral-700 w-1 cursor-col-resize" />
                    <Panel>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={70} minSize={6}>
                                <RightPanel/>
                            </Panel>
                            <PanelResizeHandle className="h-1 hover:bg-neutral-700 cursor-row-resize" />
                            <Panel defaultSize={30} minSize={15}>
                                <SubmitPanel />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </main>
            
            
        </div>
    )
}

export default ProblemDescription;