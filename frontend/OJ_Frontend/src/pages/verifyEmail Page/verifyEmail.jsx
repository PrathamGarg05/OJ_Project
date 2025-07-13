
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth";
import { toast } from "react-toastify";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const verifyEmailHandler = async () => {
        const response = await verifyEmail(searchParams.get("token"));
        console.log(response);
        if(response.status === 200){
            toast.success("Email verified successfully");
            navigate("/login");
        }
        else{
            toast.error("Email verification failed");
        }
    }
    

    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold">Verify Email</h1>
            <p className="text-lg">Please check your email for a verification link.</p>
            <p className="text-lg">If you don't see the email, please check your spam folder.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => verifyEmailHandler()}>Verify Email</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/login")}>Login</button>
        </div>
    )
}

export default VerifyEmail;