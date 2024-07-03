import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import Quote from "../components/Quote";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Signin(){
    const [signinInfo, setSigninInfo] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    async function submit(){
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", signinInfo)
            localStorage.setItem("token", response.data.token)
            navigate('/blogs')
        }catch(e){
            //alert for user
            console.log(e)
        }
    }
    return(
        <div className="grid grid-cols-2">
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="text-4xl font-bold px-4 text-center">
                    Login
                </div>
                <div className="text-slate-400 text-xl text-center">
                    Don't have an account? <Link className="underline" to={"/signup"}>Sign up</Link>
                </div> 
                <div className="mt-4">
                    <InputBox type={"email"} placeholder={"Enter your email"} label={"Email"} onChange={(e)=>{
                        setSigninInfo(oldData => ({
                            ...oldData,
                            email: e.target.value
                        }))
                    }}/>
                    <InputBox type={"password"} placeholder={"Enter your password"} label={"Password"} onChange={(e)=>{
                        setSigninInfo(oldData => ({
                            ...oldData,
                            password: e.target.value
                        }))
                    }}/>
                </div>
                <div className="bg-black text-center mt-6 rounded-md p-2">
                    <button className="text-white" onClick={submit}>Sign in</button>
                </div>
                
            </div>
        </div>
        <Quote />
    </div>
)}
