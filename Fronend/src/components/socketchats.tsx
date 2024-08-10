import { useEffect, useState } from 'react';
import { connect, chat, disconnect, } from './socket';

interface ReceiveMessageFormat {
  type: string;
  sender_username: string;
  receiver_username: string;
  sender_message: string;
  receiver_message: string;
}

export default function Socketchats() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState<ReceiveMessageFormat[]>([]);
    const [username] = useState('');

    useEffect(() => {
      connect('ws://127.0.0.1:8000/ws/chat'); // Replace with your server URL

      chat(undefined, (msg:ReceiveMessageFormat) => {
        setChatLog((prevChat) => [...prevChat, msg]);
      });


  }, []);

  const handleSendMessage = () => {
    const sendMessageData = {
      sender_username: username,
      sender_message: message,
    };
    chat(sendMessageData);
    setMessage(message);
  };

  return (
    <div className="chatbox h-[30rem] w-[60rem] bg-white rounded-lg overflow-x-hidden pt-[1rem] flex justify-center items-center flex-col">
      <p className="text-center flex justify-center mb-4 text-2xl md:text-4xl underline">Chat Box</p>
        <div className="w-[90%] h-[70%] gap-y-4 flex flex-col justify-evenly items-center">
            <div className='flex flex-col justify-evenly items-center h-full w-[70%] bg-yellow-400'>
              {
                  chatLog.map((msg)=>(
                    <><div className="b1">
                      <p className='h-1/4 w-full text-base font-bold text-black'>{msg.sender_username}</p>
                      <div className="msg h-[8rem] text-base bg-slate-400 text-black">{msg.sender_message}</div>
                    </div><div className="b2">
                        <p className='h-1/4 w-full text-base font-bold text-black'>{msg.receiver_username}</p>
                        <div className="msg h-[8rem] text-base bg-slate-400 text-black">{msg.receiver_message}</div>
                      </div></>
                  ))
              }
            </div>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='h-[6rem] w-full bg-slate-400  px-[1rem] rounded-lg' placeholder='write your message'/>
          <button onClick={handleSendMessage} className='h-[3.5rem] w-[9rem] text-center bg-green-800 text-white text-lg rounded-lg'>Send Message</button>
        </div>
    </div>
  );
};