import { useState, useContext, useEffect } from 'react';
import { getHint } from '../../services/problem';
import { Button } from '@headlessui/react';
import { AuthContext } from '../../context/AuthContext';

function HintsTab({problem}){
    const [hint, setHint] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);
    const [hintUsed, setHintUsed] = useState(user.hintUsage.count);

    const probHint = async() => {
        setLoading(true);
        try{
            const res = await getHint(problem._id);
            console.log(res.data.data);
            setHint(res.data.data); 
            setHintUsed(prev => prev + 1);
            setLoading(false);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        setHintUsed(user.hintUsage.count);
    }, []);

    return (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white justify-center flex-col">
            {hintUsed < 3  ? (
                <>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white">
                        Hint Used: {hintUsed} / 3
                    </div>
                </>
            ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white">
                    No hints remaining today
                </div>
            )}
            <Button onClick={probHint} 
                disabled={hintUsed >= 3 || loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white">
                    {loading ? "Loading..." : "Get Hint"}
                </div>
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white">
                {hint}
            </div>
        </div>
    )
}

export default HintsTab;