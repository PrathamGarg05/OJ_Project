import { Editor } from "@monaco-editor/react";
import { useState } from "react";

function CodeEditor({ theme = "vs-dark", language = "javascript", defaultCode = "" }) {

    const[code, setCode] = useState("//Your Code Here");

    function handleEditorChange(value) {
        setCode(value);
        console.log(code);
    }

    return (
    <div className="h-full w-full">
        <Editor
            height="100%"
            width="100%"
            theme={theme}
            language={language}
            defaultValue={defaultCode}
            onChange={handleEditorChange}
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
            }}
        />
    </div>
  );
}

export default CodeEditor;