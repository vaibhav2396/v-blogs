import Avatar from "../components/Avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Blog(){
    const [blog, setBlog] = useState({})
    const {id} = useParams()
    
    useEffect(()=>{
        const response = axios.get(`http://localhost:3000/api/v1/blog/${id}`,{
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        response.then((res)=>{
            setBlog(res.data.post)
        })
    },[])
    console.log("render")

    return (
        <div>
            {blog?
            <div className="flex mx-40 my-20 p-10">
                <div className="w-3/4">
                    <div className="text-7xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="mt-4 text-sm font-light text-slate-400">
                        {blog.publishedDate}
                    </div>
                    <div className="mt-4 text-lg tracking-normal">
                        {blog.content}
                    </div>
                </div>
                <div className="w-1/4 ml-14">
                    {blog.author? <div>
                    <div className="">
                        Author
                    </div> 
                    <div className="flex mt-6">
                        <div className="flex items-center">
                            <Avatar className="flex flex-col justify-center" initial={blog.author.firstName[0]} size={8}/>
                        </div>
                        <div className="mx-4">
                            <div className="font-bold text-3xl mb-3">
                                {`${blog.author.firstName} ${blog.author.lastName}` }
                            </div>
                            <div className="text-slate-400">
                                Master of mirth, purveyor of puns, and the funniest person in the kingdom
                            </div>
                        </div>
                    </div>
                    </div>: ""}
                    
                </div>
            </div>
             : null}
        </div>
    )   
}