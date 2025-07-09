import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const {user, setLoading} = useContext(AuthContext);
    const [result, setResult] = useState(null);
    const [customResult, setCustomResult] = useState(null);
    const socketRef = useRef(null);
    useEffect(() => {
        if (!user?.id) return;

        // Initialize socket connection
        socketRef.current = io("http://13.203.112.48:3005", {
            withCredentials: true,
        });

        socketRef.current.emit("setUserId", user.id);

        socketRef.current.on("connect", () => {
            console.log("Socket connected:", socketRef.current.id);
        });

        socketRef.current.on("submissionPayloadResponse", (data) => {
            console.log("Submission result received:", data);
            setResult(data);
            setCustomResult(data);
            setLoading(false);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [user]);

    return (
        <SocketContext.Provider value={{socketRef, result, setResult, customResult, setCustomResult}}>
            {children}
        </SocketContext.Provider>
    );
}