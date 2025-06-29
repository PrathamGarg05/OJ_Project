import CodeEditor from "../CodeEditor/CodeEditos";

function RightPanel({ theme }) {
    return(
        <div className="h-full w-full flex flex-col">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium border-b border-gray-300 dark:border-gray-700">
            Code Editor
        </div>
        <div className="flex-grow">
            <CodeEditor
            theme={theme === "dark" ? "vs-dark" : "light"}
            // language="cpp"
            // defaultCode={`#include <iostream>\nusing namespace std;\n\nint main() {\n  // your code here\n  return 0;\n}`}
            />
        </div>
        </div>
    )
}

export default RightPanel;