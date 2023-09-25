import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls()
    .then(data => setUrls(data.urls))
    .catch(error => console.log(error))
  },[])

  function addUrl(newUrl) {
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUrl)
    })
    .then(response => response.json())
    .then(data => setUrls([...urls, data]))
    .catch(error => console.log(error.message))
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl}/>
      </header>

      <UrlContainer urls={urls}/>
    </main>
  );
}

export default App;
