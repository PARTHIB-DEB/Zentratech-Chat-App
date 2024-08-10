import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Getreq from './components/getreq';
import Login from './components/login';
import Register from './components/register';
import Sendreq from './components/sendreq';
import Socketchats from './components/socketchats';
import { useState } from 'react';

function Allbuttons() {
    const [activePage, setActivePage] = useState<string>(); // Default page

    const renderPage = () => {
        switch (activePage) {
            case 'login':
                return <Login />;
            case 'register':
                return <Register />;
            case 'myreq':
                return <Getreq />;
            case 'frnd':
                return <Sendreq />;
            case 'chat':
                return <Socketchats />;
            case 'default':
                return null;
        }
    };

    return (
        <div>
            {renderPage() == null ? (
                <div className='h-[30rem] w-[50rem] bg-white rounded-lg flex flex-col items-center gap-y-5'>
                    <div className="h-full w-full button-container flex flex-col justify-center items-center text-base font-bold gap-y-4">
                        <p className='text-xl md:text-2xl lg:text-4xl text-center font-bold pt-[1rem]'>React-Django Chat</p>
                        <div className="b1 flex flex-wrap justify-between items-center gap-x-5 font-normal text-base md:text-xl px-[1rem]">
                            <button className='bg-blue-600 text-white h-[2.5rem] md:h-[2.8rem] w-[5.5rem] md:w-[8rem] text-center rounded-lg' onClick={() => setActivePage('login')}>Login</button>
                            <button className='bg-blue-600 text-white h-[2.5rem] md:h-[2.8rem] w-[5.5rem] md:w-[8rem] text-center rounded-lg' onClick={() => setActivePage('register')}>Register</button>
                        </div>
                        <div className="b2 flex flex-wrap justify-evenly items-center gap-x-5 font-normal text-base md:text-xl px-[1rem]">
                            <button className='bg-blue-600 text-white h-[2.5rem] md:h-[2.8rem] w-[5.5rem] md:w-[8rem] text-center rounded-lg' onClick={() => setActivePage('myreq')}>Requests</button>
                            <button className='bg-blue-600 text-white h-[2.5rem] md:h-[2.8rem] w-[5.5rem] md:w-[8rem] text-center rounded-lg text-wrap' onClick={() => setActivePage('frnd')}>Friends</button>
                        </div>
                        <button className='bg-blue-600 text-white h-[2.5rem] md:h-[2.8rem] w-[5.5rem] md:w-[8rem] text-center rounded-lg font-normal text-base md:text-xl' onClick={() => setActivePage('chat')}>Chat</button>
                    </div>
                </div>
            ) :  (
                // Render the active page component
                <div>
                    {activePage === 'login' && <Login />}
                    {activePage === 'register' && <Register />}
                    {activePage === 'myreq' && <Getreq />}
                    {activePage === 'frnd' && <Sendreq />}
                    {activePage === 'chat' && <Socketchats />}
                </div>
            )}
        </div>
    );
    

}


function App() {
    return (
        <Router>
            <Allbuttons />
        </Router>
    );
}

export default App;
