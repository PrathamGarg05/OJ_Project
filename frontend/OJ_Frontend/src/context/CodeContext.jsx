import { createContext, useState } from "react";
import { defaultCodeMap, languagesMap } from "../utils/constants";

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [language, setLanguage] = useState(languagesMap[0]);
  const [code, setCode] = useState(defaultCodeMap[language.value]);

  const updateLanguage = (lang) => {
    setLanguage(lang);
    setCode(defaultCodeMap[lang.value] || "");
  };

  return (
    <CodeContext.Provider value={{ language, code, setCode, setLanguage: updateLanguage }}>
      {children}
    </CodeContext.Provider>
  );
};

