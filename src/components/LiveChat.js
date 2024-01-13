import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';

const LiveChat = () => {

    const[liveMessage, setLiveMessage] = useState("");

    const dispatch = useDispatch();

    const chatMessages = useSelector((store) => store.chat.messages);

    useEffect(( ) => {
        const i = setInterval(() => {
            //API Polling

            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: makeRandomMessage(20),
                })
            );
        }, 500);
        return () => clearInterval(i);
    }, []);

  return (
    <>
        <div className='p-3 ml-2 w-full h-[600px] border-black border bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
            <div>
            {   //Dont use indexes as keys, weve done this to just save time
                chatMessages.map((c, i) => (
                    <ChatMessage key={i} name={c.name} message={c.message} />
                ))
            }
            </div>
        </div>
        <form className='w-full p-2 ml-2 border border-black' 
            onSubmit={(e) => {
                e.preventDefault();
                console.log("ON Form Submit ", liveMessage);
                dispatch(addMessage({
                    
                }))

            }}
        >
            <input className='w-[34rem] px-2' type="text" value={liveMessage} 
                onChange={(e) => {
                    setLiveMessage(e.target.value);
                }}
            />
            <button className='px-4 py-1 mx-2 bg-green-100 '>Send</button>
        </form>
    </>
    
  )
}

export default LiveChat
