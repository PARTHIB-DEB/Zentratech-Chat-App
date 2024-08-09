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

      return () => {
        disconnect();
      };
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
    <div className="chatbox h-[90%] w-[80%] bg-white rounded-lg shadow-md shadow-blue-500 overflow-x-hidden pt-[1rem] flex justify-center items-center">
        <div className="w-[90%] h-[40rem] gap-y-4">
          {
              chatLog.map((msg)=>(
                <>
                  <p className='h-1/4 w-full text-base font-bold text-black'>{msg.sender_username}</p>
                  <div className="msg h-[8rem] text-base bg-slate-400 text-black">{msg.sender_message}</div>
                  <p className='h-1/4 w-full text-base font-bold text-black'>{msg.receiver_username}</p>
                  <div className="msg h-[8rem] text-base bg-slate-400 text-black">{msg.receiver_message}</div>
                </>
              ))
          }
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='h-[12rem] w-full bg-slate-400' placeholder='write your message'/>
          <button onClick={handleSendMessage} className='h-[4rem] w-[6rem] text-center bg-green-800 text-white text-lg'>Send Message</button>
        </div>
    </div>
  );
};