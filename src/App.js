import './App.css';

import React, {  useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
 Routes,
  Route,
  BrowserRouter,
  
} from "react-router-dom";

const App =()=> {
  const pageSize=15;
  const apiKey=process.env.REACT_APP_NEWS_API;
  const[progress,setProgress]=useState(0);
  

 
  
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        hight={3}
        progress={progress}
        
      />
        <Routes>

          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} category={"sports"} country={"in"}/>}></Route>
          <Route exact path="/business"  element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} category={"business"} country={"in"}/>}></Route>
          <Route exact path="/entertainment"  element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category={"entertainment"} country={"in"}/>}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} category={"general"} country={"in"}/>}></Route>
          <Route exact path="/health"  element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} category={"health"} country={"in"}/>}></Route>
          <Route exact path="/science"  element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} category={"science"} country={"in"}/>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} category={"technology"} country={"in"}/>}></Route>
          
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
  export default App


