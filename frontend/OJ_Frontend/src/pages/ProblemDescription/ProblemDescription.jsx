import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import LeftPanel from "../../components/Panels/LeftPanel";
import RightPanel from "../../components/Panels/RightPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function ProblemDescription() {

    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <div className="h-full w-full overflow-hidden bg-black">
            <NavBar
                theme={theme}
                toggleTheme={toggleTheme}
            />
            <PanelGroup direction="horizontal" className="h-screen">
                <Panel defaultSize={35} minSize={10} maxSize={90}>
                    <LeftPanel />
                </Panel>
                <PanelResizeHandle className="hover:bg-neutral-700 w-1 cursor-col-resize" />
                <Panel defaultSize={65}>
                    <RightPanel theme={theme}/>
                </Panel>
            </PanelGroup>
            
        </div>
    )
}

export default ProblemDescription;