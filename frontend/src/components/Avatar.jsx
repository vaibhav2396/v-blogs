export default function Avatar({initial}){
    return (
        <div className={"flex items-center justify-center rounded-full bg-slate-400 text-white w-8 h-8" }>
            {initial}
        </div>
    )
}