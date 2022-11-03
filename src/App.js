import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Temp from './Temp';
import Login from './Login';
import { useStateValue } from './StateProvider'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  // const [user, setuser] = useState("");
  const [{ user }, dispatch] = useStateValue();

  return (

    <div className="app">
      {/* <h1>Whats App Clone</h1> */}
      {!user ? (
        <Login />
      ) : (

        <div className='app_body'>
          {/* For render without reload */}
          <Router>
            <Sidebar />
            {/* sidebar must be in router otherwise its not fetching link */}
            <Routes>
              <Route path='/rooms/:roomId'
                element={
                  <>
                    <Chat />
                  </>
                }
              />
              <Route path='/' element={<Temp />} />
            </Routes>
          </Router>

          {/* <Sidebar />
        <Chat /> */}
        </div>

      )}

    </div>

  );
}

export default App;
