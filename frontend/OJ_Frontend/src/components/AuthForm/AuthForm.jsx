import { useContext, useState } from "react";
import TextInput from "../TextInput/TextInput";
import { login, myProfile, register } from "../../services/auth";
import Button from "../Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AuthForm({type = 'login'}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(AuthContext);

    const [cnfPassword, setCnfPassword] = useState('');

    const navigate = useNavigate();

    async function onSubmitHandler(e) {
        e.preventDefault();
        try{
            if(type == 'register'){
                if(password != cnfPassword) {
                    throw{
                        message: "Passwords don't match",
                        success: false
                    }
                }
                const res = await register({username, email, password});
                console.log("Registration successful", res.data);
            }
            else if(type == 'login'){
                const res = await login({email, password});
                console.log("Login successful" , res.data);
                const profile = await myProfile();
                if(profile) {
                    setUser(profile.data.data.user);
                }
            }
            {type == 'login' ? navigate('/problems') : navigate('/login')}
            
        } catch(error){
            console.log(`${type=='login' ? 'Login Failed' : 'Registration Failed'}`, error.message);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {type == 'login' ? 'Welcome Back' : 'Register'}
                </h2>
                <form action="post" onSubmit={onSubmitHandler}
                    className="space-y-4"
                >
                
                    {type == 'register' && (
                        <div>
                            <TextInput 
                                placeholder="Username"
                                label="Username"
                                type="text"
                                onChangeHandler={handleTextInputChange}
                            />
                        </div>
                    )}
                    <div>
                        <TextInput 
                            placeholder="Email"
                            label="Email"
                            type="email"
                            onChangeHandler={handleTextInputChange}
                        />
                    </div>
                    <div>
                        <TextInput 
                            placeholder="Password"
                            label="Password"
                            type="password"
                            onChangeHandler={handleTextInputChange}
                        />
                    </div>
                    {type == 'register' && (
                        <div>
                            <TextInput 
                                placeholder="Confirm Password"
                                label="Confirm Password"
                                type="password"
                                onChangeHandler={handleTextInputChange}
                            />
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
                                <Link to={{pathname:'/register'}} className="text-gray-950 hover:text-gray-800 transition" >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '} 
                                <Link to={{pathname:'/login'}} className="text-gray-950  hover:text-gray-800 transition">
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