import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const verifyEmailHandler = async () => {
            const response = await verifyEmail(searchParams.get("token"));
            if(response.status === 200){
                navigate("/login");
            }
        }
        verifyEmailHandler();
    }, []);

    const navigate = useNavigate();
    return (
        <div>
            <h1>Verify Email</h1>
            <p>Please check your email for a verification link.</p>
            <p>If you don't see the email, please check your spam folder.</p>
        </div>
    )
}

export default VerifyEmail;