import { useRecoilState } from "recoil";
import Avatar from "../components/Avatar";
import { postsAtom } from "../atoms";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blogs(){

    const [posts, setPosts] = useRecoilState(postsAtom)

    useEffect(()=>{
        const response = axios.get("http://localhost:3000/api/v1/blog",{
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        response.then(res => {
            setPosts(res.data.posts)
        })
    },[])
    
    return(
        <div>
            <div className="flex justify-center">
                <div>
                {posts? posts.map((post =>{
                            return <Post 
                                    key = {post.id}
                                    id = {post.id} 
                                    date={post.publishedDate} 
                                    authorFirstName = {post.author.firstName} 
                                    authorLastName = {post.author.lastName} 
                                    title={post.title} 
                                    content={post.content} />
                        })) : ""}
                </div>
            </div>
        </div>
    )
}

function Post({id, date, authorFirstName, authorLastName, title, content}){
    const month = {
        "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
        "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
    }
    return (
        <div className="border-b pb-4">
            <div className="blog-header-line">
                <div className="flex mt-5">
                    <Avatar initial={authorFirstName[0].toUpperCase()} />
                    <div className="flex flex-col justify-center mx-2 text-sm font-light">
                        {`${authorFirstName} ${authorLastName}`}
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="w-0.5 h-0.5 bg-slate-400 rounded-full"></div>
                    </div>
                    <div className="flex flex-col justify-center ml-1 text-slate-400 text-xs font-normal">
                        {`${month[date.slice(5,7)]} ${date.slice(8,10)}, ${date.slice(0,4)}`}
                    </div>
                </div>
            </div>

            <Link to={`/blog/${id}`}>
                <div className="blog-content">
                    <div className="mt-2">
                        <div className="font-bold text-sm max-w-screen-lg">
                            {title}
                        </div>
                        <div className="mt-2 max-w-screen-lg text-xs font-light">
                            {content.slice(0,400)}...
                        </div>
                        <div className="text-xs font-md text-slate-400 mt-3">
                            {content.length < 1000? "5 min read": "10 min read" }
                        </div>
                    </div>
                </div>
            </Link> 
        </div>    
    )
}