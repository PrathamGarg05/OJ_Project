import { useContext} from "react";
import CodeEditor from "../CodeEditor/CodeEditos";
import LanguageSelector from "../CodeEditor/LanguageSelector";
import { ThemeContext } from "../../context/ThemeContext";
import { CodeContext } from "../../context/CodeContext";
import SubmitButtons from "../Buttons/SubmitButtons";
import BoiletPlateButton from "../Buttons/boiletPlateButton";
import AiReviewButton from "../Buttons/aiReviewButton";

function RightPanel() {

    const {language, setLanguage, code, setCode} = useContext(CodeContext);

    const {theme} = useContext(ThemeContext);

    return(
        <div className="h-full w-full flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto rounded-md">
            <div className="py-1 flex items-center justify-between bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
                <span className="flex items-center text-sm font-medium px-2 gap-2">
                    <SubmitButtons />
                    <BoiletPlateButton />
                    <AiReviewButton />
                </span>
                <span className="flex items-center text-sm font-medium px-2"><LanguageSelector selected={language} onChange={setLanguage} /></span>
            </div>
            <div className="flex-grow">
                <CodeEditor
                theme={theme === "dark" ? "vs-dark" : "light"}
                language={language.value}
                code={code}
                onCodeChange={setCode}
                />
            </div>
            
        </div>
    )
}

export default RightPanel;