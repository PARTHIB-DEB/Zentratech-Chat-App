import { useState, useEffect } from "react";

interface uobj{
    "user":string,
    "senders":string[]
}
async function GetSenderNames() {
    const respone = await fetch("http://127.0.0.1:8000/api/request",{mode:'cors'})
    const responsearray:uobj =  await respone.json()
    return responsearray
}

export default function Getreq () {
    const [usernameArray, setUsernameArray]=useState<string[]>([])
    const [user, setUser] = useState<string>("");
    useEffect(()=>{
        async function UseSenderNames(){
            const name = await GetSenderNames()
            setUsernameArray(name.senders || [])
            setUser(name.user || "")
        }
        UseSenderNames()
    })
    function acceptreq(sender:string) {
        alert(`request of ${sender} is accepted`)
    }
    return (
        <div className="user-form h-[30rem] w-[60rem] font-normal rounded-lg flex flex-col justify-evenly items-center bg-white">
            <p className="text-center flex justify-center text-2xl md:text-4xl underline">{user} Friend Requests</p>
            {
                usernameArray.length > 0 ?(
                    usernameArray.map((sender)=>(
                        <div className="fr-list flex justify-center items-center gap-x-[2rem] h-[2rem] w-[90%] md:w-[80%]">
                            <p className="Fr-Name h-full w-1/2 text-center text-xl md:text-2xl">{sender}</p>
                            <button className="accept-btn h-full w-1/4 bg-blue-600 text-white hover:bg-purple-900" onClick={()=>acceptreq(sender)}>Accept</button>
                            <button className="reject-btn h-full w-1/4 bg-red-600 text-white hover:bg-orange-900">Decline</button>
                        </div>
                    ))
                ):(<p>No users found</p>)
            }
        </div>
    );
};
