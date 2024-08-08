import { useState, useEffect } from "react";
import GetReceiverNames from "./friends";

export default function Sendreq() {
    const [usernameArray, setUsernameArray] = useState<string[]>([]); // state of array - usernameArray , Function to control the state - setUsernameArray
    const [user, setUser] = useState<string>("");

    // Here the callback function uses one async function to get the username array and give its reference to usernameArray

    useEffect(() => {
        async function fetchUsernames() {
            try {
                const names = await GetReceiverNames();
                setUsernameArray(names.receivers); 
                setUser(names.user); 
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        }
        
        fetchUsernames();
    }, []);


    async function postreq(username:string) {
       try {
        
            const payload:object={
                "sender":user,
                "receiver":username
            }

            await fetch("http://127.0.0.1:8000/api/request",{
                method:"POST",
                mode:"cors",
                body:JSON.stringify(payload)
            })
       } catch (error) {
            console.log(`ERROR : ${error}`)
       } 
    }

    return (
        <div className="user-form h-1/2 w-1/2 font-normal rounded-lg flex flex-col justify-evenly items-center bg-white shadow-purple-400 shadow-md">
            <p className="text-center flex justify-center text-2xl md:text-4xl underline">People You May Know</p>
            {
                usernameArray.map((username) => (
                    <div className="fr-list flex justify-center items-center gap-x-[2rem] h-[2rem] w-[80%] md:w-[65%]">
                        <p className="Fr-Name h-full w-1/2 text-center text-xl md:text-2xl">{username}</p>
                        <button className="Send-btn h-full w-1/4 bg-blue-600 text-white hover:bg-purple-900" onClick={()=>(postreq(username))}>Send Request</button>
                    </div>
                ))
            }
        </div>
    );


}


