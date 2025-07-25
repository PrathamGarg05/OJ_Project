import { useContext, useState } from "react";
import TextInput from "../TextInput/TextInput";
import { login, myProfile, register } from "../../services/auth";
import Button from "../Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthForm({type = 'login'}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(false);

    const [cnfPassword, setCnfPassword] = useState('');

    const navigate = useNavigate();

    async function onSubmitHandler(e) {
        e.preventDefault();
        try{
            if(type == 'register'){
                if(password != cnfPassword) {
                    toast.error("Passwords don't match");
                    throw{
                        message: "Passwords don't match",
                        success: false
                    }
                }
                const res = await register({username, email, password});
                console.log("Registration successful", res.data);
                toast.success("Registration successful. Please Verify your email.");
            }
            else if(type == 'login'){
                const res = await login({email, password});
                console.log("Login successful" , res.data);
                const profile = await myProfile();
                if(profile) {
                    setUser(profile.data.data.user);
                }
                toast.success("Login successful");
            }
            {type == 'login' ? navigate('/problems') : navigate('/login')}
            
        } catch(error){
            if(error.response.data.message){
                console.log(`${type=='login' ? 'Login Failed' : 'Registration Failed'}`, error.response.data.message);
                toast.error(error.response.data.message);
            }
            else{
                console.log(`${type=='login' ? 'Login Failed' : 'Registration Failed'}`, error.message);
            }
        }
    }

    function handleTextInputChange(e) {
        if(e.target.placeholder == 'Username'){
            setUsername(e.target.value);
        }
        else if(e.target.placeholder == 'Email'){
            setEmail(e.target.value)
        }
        else if(e.target.placeholder == 'Password'){
            setPassword(e.target.value);
        }
        else if(e.target.placeholder == 'Confirm Password'){
            setCnfPassword(e.target.value);
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-100 px-4">
            <div className="w-full max-w-md dark:bg-gray-900 bg-gray-100 rounded-2xl shadow-lg p-8 space-y-6 dark:text-white text-gray-800 dark:border-gray-700 border-gray-300 border-2">
                <h2 className="text-2xl font-bold text-center mb-6 dark:text-white text-gray-800">
                    {type == 'login' ? 'Welcome Back' : 'Register'}
                </h2>
                <form action="post" onSubmit={onSubmitHandler}
                    className="space-y-4"
                >
                
                    {type == 'register' && (
                        <div className="dark:bg-gray-900 dark:text-white text-gray-800 bg-gray-100">
                            <TextInput 
                                
                                placeholder="Username"
                                label="Username"
                                type="text"
                                onChangeHandler={handleTextInputChange}
                            />
                        </div>
                    )}
                    <div className="dark:bg-gray-900 dark:text-white text-gray-800 bg-gray-100">
                        <TextInput 
                            
                            placeholder="Email"
                            label="Email"
                            type="email"
                            onChangeHandler={handleTextInputChange}
                        />
                    </div>
                    <div className="dark:bg-gray-900 dark:text-white text-gray-800 bg-gray-100">
                        <TextInput 
                            className="flex items-center justify-between"
                            placeholder="Password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            onChangeHandler={handleTextInputChange}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-gray-400">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {type == 'register' && (
                        <div className="dark:bg-gray-900 dark:text-white text-gray-800 bg-gray-100">
                            <TextInput 
                                className="flex items-center justify-between"
                                placeholder="Confirm Password"
                                label="Confirm Password"
                                type={showCnfPassword ? "text" : "password"}
                                onChangeHandler={handleTextInputChange}
                            />
                            <button type="button" onClick={() => setShowCnfPassword(!showCnfPassword)} className="text-sm text-gray-400">
                                {showCnfPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    )}
                    <div>
                        <Button 
                            type="submit"
                            text={type == 'register' ? 'Register' : 'Login'}
                            styleType="primary"
                            style=" w-full hover:bg-blue-700 transition text-gray py-2 rounded-lg"
                        />
                    </div>
                    <div className= "text-sm text-center mt-4 text-gray-400">
                        {type == 'login' ? (
                            <>
                                Don't have an account?{' '} 
                                <Link to={{pathname:'/register'}} className="dark:text-gray-400 text-gray-800 hover:text-gray-800 transition" >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '} 
                                <Link to={{pathname:'/login'}} className="dark:text-gray-400 text-gray-800 hover:text-gray-800 transition">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                
                </form>
            </div>
        </div>
    )
}

export default AuthForm;