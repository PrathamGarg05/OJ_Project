import { Editor } from "@monaco-editor/react";
import { useRef } from "react";
import LanguageSelector from "./LanguageSelector";

function CodeEditor({ theme = "vs-dark", code, onCodeChange , language="cpp"}) {

    // const[code, setCode] = useState("//Your Code Here");

    const editorRef = useRef(null);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
        editor.focus();
    }

    return (
    <div className="h-full w-full">
        <Editor
            height="100%"
            width="100%"
            theme={theme}
            language={language}
            value={code}
            onChange={(value) => onCodeChange(value)}
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
            }}
            onMount={handleEditorDidMount}
        />
    </div>
  );
}

export default CodeEditor;