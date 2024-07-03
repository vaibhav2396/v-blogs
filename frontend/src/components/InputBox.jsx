export default function InputBox({label, placeholder, type, onChange}){
    return (
        <div className="flex flex-col mt-4">
            <label className="font-semibold text-sm" htmlFor="">{label}</label>
            <input onChange={(e)=>{
                onChange(e)
            }} type={type} placeholder={placeholder} className="p-2 border rounded-md outline-none"/>
        </div>
    )
}