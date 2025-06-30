import { useContext, useEffect, useState } from "react";
import CodeEditor from "../CodeEditor/CodeEditos";
import LanguageSelector from "../CodeEditor/LanguageSelector";
import { defaultCodeMap, languagesMap } from "../../utils/constants";
import { ThemeContext } from "../../context/ThemeContext";

function RightPanel() {

    const languages = languagesMap;

    const [language, setLanguage] = useState(languages[0]);

    const [code, setCode] = useState(defaultCodeMap[language.value]);

    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        setCode(defaultCodeMap[language.value]);
    }, [language]);

    return(
        <div className="h-full w-full flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto rounded-md">
            <div className="py-1 flex items-center justify-between bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
                <span className="flex items-center text-sm font-medium px-2">Code Editor</span>
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