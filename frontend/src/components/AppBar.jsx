import { useRecoilState } from "recoil";
import { userState } from "../atoms";
import Avatar from "./Avatar";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AppBar(){
    const [user, setUser] = useRecoilState(userState)
    const navigate = useNavigate()

    useEffect(()=>{
        const response = axios.get("http://localhost:3000/api/v1/user/me",{
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        response.then((res)=> {
            setUser(res.data.user.name[0])
        })
    },[user])
    return(
        <div className="flex border-b justify-between px-8 py-4">
            <div className="flex flex-col justify-center font-bold text-lg">V-BLOGS</div>
            <div className="flex">
                <button onClick = {()=>{
                    navigate("/blog/new")
                }}
                className="mr-6 text-white bg-green-700 px-4 text-xs rounded-full">New</button>
                <Avatar initial={user}  />
            </div>
        </div>
    )
}

