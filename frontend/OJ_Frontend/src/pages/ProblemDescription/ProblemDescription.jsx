import { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import LeftPanel from "../../components/Panels/LeftPanel";
import RightPanel from "../../components/Panels/RightPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SubmitPanel from "../../components/Panels/SubmitPanel";
import { getProblemDetails } from "../../services/problem";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProblemContext } from "../../context/ProblemContext";
import { CodeContext } from "../../context/CodeContext";
import { languagesMap } from "../../utils/constants";
import { defaultCodeMap } from "../../utils/constants";

function ProblemDescription() {

    const {id} = useParams();

    const {problem, setProblem} = useContext(ProblemContext);
    const{setCode, language, setLanguage} = useContext(CodeContext);

    const fetchProblem = async (id) => {
        if(id === "undefined") {
            console.log("No id found");
            throw new Error("No id found");
        };
        try {
            const res = await getProblemDetails(id); 
            const data = res.data.data;
            setProblem(data);
        } catch (err) {
            console.error('Failed to fetch problem', err);
        }
    };

    useEffect(() => {
        fetchProblem(id);
        setLanguage(languagesMap[0]);
        setCode(defaultCodeMap[language.value] || "");
    }, []);

    return (
        <div className="flex flex-col h-dvh w-full dark:bg-black bg-white">
            <NavBar
            />
            <main className="flex-1 overflow-hidden dark:bg-black bg-gray-200">
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