import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Getreq from './components/getreq';
import Login from './components/login';
import Register from './components/register';
import Sendreq from './components/sendreq';
import Socketchats from './components/socketchats';

function Allbuttons() {
    const navigate = useNavigate();

    return (
        <div className='h-[90%] w-[60%] bg-white rounded-lg shadow-blue-600 shadow-md flex justify-evenly items-center'>
            <p className='text-xl md:text-2xl lg:text-4xl text-center font-bold'>React-Django Chat</p>
            <div className="button-container min-h-screen flex justify-evenly items-center h-[20rem] w-[40rem] text-base font-bold">
                <button className='bg-blue-600 text-white h-[4rem] w-[8rem]' onClick={() => navigate('/')}>Register</button>
                <button className='bg-blue-600 text-white h-[4rem] w-[8rem]' onClick={() => navigate('/getreq')}>See Requests</button>
                <button className='bg-blue-600 text-white h-[4rem] w-[8rem]' onClick={() => navigate('/sendre')}>Send Requests</button>
                <button className='bg-blue-600 text-white h-[4rem] w-[8rem]' onClick={() => navigate('/chats')}>Chat</button>
                <button className='bg-blue-600 text-white h-[4rem] w-[8rem]' onClick={() => navigate('/login')}>Login</button>
            </div>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sendre" element={<Sendreq />} />
                <Route path="/getreq" element={<Getreq />} />
                <Route path="/chats" element={<Socketchats />} />
            </Routes>
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
