import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  const [progress, setProgress] = useState(0)

  
  const pageSize = 8
  const api_key = process.env.REACT_APP_NEWS_API
    return (
      <div>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} api_key={api_key} key="general" pageSize={pageSize} country = "us" category="general"/>} />
        <Route exact path="/business" element={<News setProgress={setProgress} api_key={api_key} key="business" pageSize={pageSize} country = "us" category="business"/>} />
        <Route exact path="/india" element={<News setProgress={setProgress} api_key={api_key} key="india" pageSize={pageSize} country = "us" category="india"/>} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} api_key={api_key} key="entertainment" pageSize={pageSize} country = "us" category="entertainment"/>} />
        <Route exact path="/health" element={<News setProgress={setProgress} api_key={api_key} key="health" pageSize={pageSize} country = "us" category="health"/>} />
        <Route exact path="/science" element={<News setProgress={setProgress} api_key={api_key} key="science" pageSize={pageSize} country = "us" category="science"/>} />
        <Route exact path="/sports" element={<News setProgress={setProgress} api_key={api_key} key="sports" pageSize={pageSize} country = "us" category="sports"/>} />
        <Route exact path="/technology" element={<News setProgress={setProgress} api_key={api_key} key="technology" pageSize={pageSize} country = "us" category="technology"/>} />
        </Routes>
      </div>
    )
  
}

export default App
