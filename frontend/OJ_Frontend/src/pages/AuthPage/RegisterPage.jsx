import AuthForm from "../../components/AuthForm/AuthForm";
import NavBar from "../../components/NavBar/NavBar";

function RegisterPage() {
    return (
        <>
            <NavBar />
            <AuthForm type="register"/>
        </>
    )
}

export default RegisterPage;