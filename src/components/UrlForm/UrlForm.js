import React, { useState } from 'react';

function UrlForm({addUrl}) {
  const [title, setTitle] = useState('');
  const [long_url, setLong_url] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newUrl = {
      long_url,
      title,
    }
    addUrl(newUrl)
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setLong_url('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='long_url'
        value={long_url}
        onChange={event => setLong_url(event.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
