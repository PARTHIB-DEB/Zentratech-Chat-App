import React, { useState } from 'react';

interface InputProps {
    width: string,
    smallwidth: string,
    padding: string,
    smallpadding : string,
    smallTextWeight: string,
    largeTextWeight: string,
    color :string,
    round:"rounded-lg"
}

let inputObj: InputProps = {
    width: "md:w-[50%]",
    smallwidth: "w-[90%]",
    padding: "p-[0.2rem]",
    smallpadding : "p-0",
    smallTextWeight: "text-base",
    largeTextWeight: "md:text-lg",
    color:"bg-slate-200",
    round:"rounded-lg"
}

function getcsrftoken() {
    const match = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
    return match ? match[2] : '';
}

export default function Login() {

    
    // State to store form data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const csrfToken = getcsrftoken();
            const response = await fetch('http://127.0.0.1:8000/api/authlogin/', {
                mode:"cors",
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "X-CSRFTtoken": csrfToken
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Login successful! Token: ${data.token}`);
            } else {
                alert("Login failed");
            }
        } catch (error) {
            alert(`An error occurred: ${error}`);
        }
    };

    const propsStack = `${inputObj.smallwidth} ${inputObj.width} ${inputObj.padding} ${inputObj.smallTextWeight} ${inputObj.largeTextWeight} ${inputObj.color} ${inputObj.round}`;

    return (
        <form onClick={handleSubmit} method="post" action='/register' className="user-form w-screen md:w-[50rem] h-[30rem] font-normal rounded-lg flex flex-col justify-center items-center gap-y-[2rem] bg-white">
            <p className="text-center flex justify-center text-2xl md:text-4xl underline">Login User</p>
            <div className="username flex justify-center items-center gap-x-2 w-[80%]">
                <label htmlFor="username" className="text-base md:text-2xl">Username:</label>
                <input type="text" name="username" id="username" className={propsStack} placeholder="Enter Your Username" onChange={handleChange} />
            </div>
            <div className="password flex justify-center items-center gap-x-2 w-[80%]">
                <label htmlFor="password" className="text-base md:text-2xl">Password:</label>
                <input type="password" name="password" id="password" className={propsStack} placeholder="Enter Your Password" onChange={handleChange} />
            </div>
            <button className='rounded-lg h-[1.8rem] md:h-[3rem] w-[6rem] md:w-[7rem] text-lg md:text-xl bg-blue-500 text-center' type='submit'>Submit</button>
        </form>
    )
}
