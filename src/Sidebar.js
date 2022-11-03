import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SidebarChat from './SidebarChat';
import './Sidebar.css'
import { useStateValue } from './StateProvider'
import db from './firebase';


function Sidebar() {

    const [{ user }, dispatch] = useStateValue();
    {console.log(user)}
    // Firebase DataBase Connecting...
    const[rooms, setRooms]=useState([]);
    
    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            }))
            )
        ))
    },[])

    return (
        <div className='sidebar'>

            <div className='sidebar_header'>
                <Avatar src={user?._delegate.photoURL}/> {/* for google profile picture */}
               
                <div className='sidebar_headerRight'>
                    <IconButton> {/* on click effect */}
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addNewChart />
                {rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>

        </div>
    )
}

export default Sidebar;