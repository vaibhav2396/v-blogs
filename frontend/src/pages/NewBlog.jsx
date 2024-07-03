import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NewBlog(){
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    async function publish(){
        if(post && post.title && post.content){
            const response = await axios.post("http://localhost:3000/api/v1/blog",post,{
                headers:{
                    authorization: localStorage.getItem("token")
                },
            })
            navigate("/blogs")
        }
    }
    return (
        <div className="mt-20 mx-80">
            <div className="min-w-full">
                <input type="text" onChange={(e)=>{
                    setPost(oltPost =>({
                        ...oltPost,
                        title: e.target.value
                    }))
                }} placeholder="Title" className="block w-full p-4 text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50 text-base" />
                <div className="w-full mt-6 mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="px-4 py-2  rounded-b-lg bg-gray-50 ">
                        <textarea id="editor" onChange={(e)=>{
                            setPost(oldPost => ({
                                ...oldPost,
                                content: e.target.value
                            }))
                        }}
                        rows="22" className="block w-full px-0 bg-gray-50 text-gray-900 border-0 text-base focus:outline-none" placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
                <button onClick={publish} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    )
}