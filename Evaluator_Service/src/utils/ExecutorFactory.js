import CppExecutor from "../containers/runCppDocker.js";
import JavaExecutor from "../containers/runJavaDocker.js";
import PythonExecutor from "../containers/runPythonDocker.js";

export default function createExecutor (language) {
    if(language == "CPP") {
        return new CppExecutor();
    } else if(language == "Java") {
        return new JavaExecutor();
    } else if(language == "Python") {
        return new PythonExecutor();
    }
}