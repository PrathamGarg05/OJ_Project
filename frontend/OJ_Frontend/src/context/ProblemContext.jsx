import { createContext, useState } from "react";

export const ProblemContext = createContext();

export const ProblemProvider = ({children}) => {
    const [problem, setProblem] = useState({});

    return (
        <ProblemContext.Provider value={{ problem, setProblem }}>
        {children}
        </ProblemContext.Provider>
    );
}