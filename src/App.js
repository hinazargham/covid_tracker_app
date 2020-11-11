import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Panel from './components/Panel';
import Footer from './components/Footer';


function App() {

  const screenConfig = useState(0);
  return (
    <div>

      <NavBar />
      <Panel currentScreen={screenConfig[0]}/>
      <br/>
      <Footer screenConfig={screenConfig} />



    </div>
  );
}

export default App;
