import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import db from './firebase';
import { Link } from "react-router-dom";


function SidebarChat({ id, name, addNewChart }) {

    const [messages, setmessages] = useState('');

    //for last msg...
    useEffect(()=>{
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot)=>
                setmessages(snapshot.docs.map((doc)=>
                    doc.data())
                ))
        }
    }, [id]);

    //genrating a random string
    const [seed, setseed] = useState('');
    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000));
    }, []);

    //Add New Chat...
    const createChat = () => {
        const roomName = prompt("Please Enter name for chat");
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChart ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/personas/${seed}.svg`} /> {/* For random string fr random picture */}
                <div className='sidebarChat_info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat