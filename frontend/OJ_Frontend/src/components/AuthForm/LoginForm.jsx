import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Buttons/Button.jsx";
import { login } from "../../services/auth.js";

function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmitHandler(e){
        e.preventDefault();
        try{
            const res = await login({email, password});
            console.log("Login successful" , res.data);
        } catch(error){
            console.log("Login failed", error.message);
        }
    };

    function handleTextInputChange(event){
        if(event.target.placeholder == 'Email'){
            setEmail(event.target.value);
        }
        if(event.target.placeholder == 'Password'){
            setPassword(event.target.value);
        }
    }

    return(
        <form action="post" onSubmit={onSubmitHandler}>
            <div>
                <TextInput 
                    placeholder="Email"
                    label="Email"
                    onChangeHandler={handleTextInputChange}
                    type="email"
                />
            </div>
            <div>
                <TextInput 
                    placeholder="Password"
                    label="Password"
                    onChangeHandler={handleTextInputChange}
                    type="password"
                />
            </div>
            <div>
                <Button 
                    type="submit"
                    text="Submit"
                    styleType="primary"
                />
            </div>
            
        </form>
    )
}

export default LoginForm;