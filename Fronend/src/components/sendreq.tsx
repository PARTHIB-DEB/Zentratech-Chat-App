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
                setUsernameArray(names.receivers || []); // Ensure that names.receivers is always an array
                setUser(names.user || ""); // Fallback to an empty string if user is undefined
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        }
        
        fetchUsernames();
    }, []);

    async function postreq(username: string) {
        try {
            const payload = {
                sender: user,
                receiver: username
            };

            await fetch("http://127.0.0.1:8000/api/request", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.log(`ERROR : ${error}`);
        } 
    }

    return (
        <div className="user-form h-[30rem] w-[60rem] font-normal rounded-lg flex flex-col justify-evenly items-center bg-white">
            <p className="text-center flex justify-center text-2xl md:text-4xl underline">People You May Know</p>
            {
                usernameArray.length > 0 ? (
                    usernameArray.map((username) => (
                        <div key={username} className="fr-list flex justify-center items-center gap-x-[2rem] h-[2rem] w-[80%] md:w-[65%]">
                            <p className="Fr-Name h-full w-1/2 text-center text-xl md:text-2xl">{username}</p>
                            <button className="Send-btn h-full w-1/4 bg-blue-600 text-white hover:bg-purple-900" onClick={() => postreq(username)}>Send Request</button>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )
            }
        </div>
    );
}
