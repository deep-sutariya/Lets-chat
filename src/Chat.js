import { Avatar, IconButton } from '@mui/material'
import { SearchOutlined, AttachFile, MoreVert, Today } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MoodIcon from '@mui/icons-material/Mood';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider'
import firebase from 'firebase/compat/app';

function Chat() {
    const [input, setinput] = useState('');
    const [seed, setseed] = useState('');
    const { roomId } = useParams();
    const [roomName, setroomName] = useState('');
    const [messages, setmessages] = useState('');
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            // for name
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setroomName(snapshot.data().name);
            })

            //for messages
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setmessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId]); //roomId is dependancy...so

    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000));
    }, [roomId]);
    // seed gonna change whenever roomId chnages

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user._delegate.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), //for server time not local time
        })
        setinput('');
    }

    return (
        <div className='chat'>

            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/personas/${seed}.svg`} />

                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    
                    <p>Last seen { new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString() } </p>
                </div>

                <div className='Chat_headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {/* from database */}
                {/* messages type is string so... */}
                {Array.from(messages).map((message) => (

                    <p className={`chat_message ${message.name === user._delegate.displayName && 'chat_reciever'}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'>
                            {/* {console.log(message.timestamp)} */}
                            {new Date(message.timestamp?.toDate()).toLocaleString()}
                            
                            {/* "?" for undefine and tolocalstring change timezon into device timezone */}
                        </span>
                    </p>

                ))}
            </div>

            <div className='chat_footer'>
                <IconButton>
                    < MoodIcon />
                </IconButton>
                <form>
                    <input type='text' value={input} onChange={e => setinput(e.target.value)} placeholder='Message' />
                    <button onClick={sendMessage} type='submit'>Send message</button>
                </form>
                <IconButton>
                    < MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat