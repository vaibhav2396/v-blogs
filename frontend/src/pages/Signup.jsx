import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import Quote from "../components/Quote";
import { useState } from "react";
import axios from "axios";

export default function Signup(){
    const [signupInfo, setSignupInfo] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    async function submit(){
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",signupInfo)
            localStorage.setItem("token", response.data.token)
            navigate('/blogs')
        } catch(e){
            //alert for user
        }
        
    }
    
    return <div className="grid grid-cols-2">
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="text-4xl font-bold px-4 text-center">
                    Create an account
                </div>
                <div className="text-slate-400 text-xl text-center">
                    Already have an account? <Link className="underline" to={"/signin"}>Sign in</Link>
                </div> 
                <div className="mt-4">
                    <InputBox type={"text"} placeholder={"John"} label={"First Name"} field={"firstName"} onChange={(e)=>{
                        setSignupInfo(oldData => ({
                            ...oldData,
                            firstName: e.target.value
                        }))
                    }}/>
                    <InputBox type={"text"} placeholder={"Doe"} label={"Last Name"} onChange={(e)=>{
                        setSignupInfo(oldData => ({
                            ...oldData,
                            lastName: e.target.value
                        }))
                    }}/>
                    <InputBox type={"text"} placeholder={"Enter your username"} label={"Username"} onChange={(e)=>{
                        setSignupInfo(oldData => ({
                            ...oldData,
                            userName: e.target.value
                        }))
                    }}/>
                    <InputBox type={"email"} placeholder={"johndoe@xyz.com"} label={"Email"} onChange={(e)=>{
                        setSignupInfo(oldData => ({
                            ...oldData,
                            email: e.target.value
                        }))
                    }}/>
                    <InputBox type={"password"} placeholder={"Enter your password"} label={"Password"} onChange={(e)=>{
                        setSignupInfo(oldData => ({
                            ...oldData,
                            password: e.target.value
                        }))
                    }}/>
                </div>
                <div className="bg-black text-center mt-6 rounded-md p-2">
                    <button className="text-white" onClick={submit}>Sign up</button>
                </div>
                
            </div>
        </div>
        <Quote />
    </div>

}
