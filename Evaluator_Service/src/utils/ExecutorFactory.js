import CppExecutor from "../containers/runCppDocker.js";
import JavaExecutor from "../containers/runJavaDocker.js";
import PythonExecutor from "../containers/runPythonDocker.js";

export default function createExecutor (language) {
    if(language.toUpperCase() == "CPP") {
        return new CppExecutor();
    } else if(language.toUpperCase() == "JAVA") {
        return new JavaExecutor();
    } else if(language.toUpperCase() == "PYTHON") {
        return new PythonExecutor();
    }
}