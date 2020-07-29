import React from 'react';
import { TextField, Button } from '@material-ui/core';
import classes from './AddBook.module.css';
import axios from 'axios';

function AddBook(props) {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  console.log(message)
  
  const onInputChange = (e) => {
    setTitle(e.currentTarget.value)
	}
	
  const onBtnClick = (e) => {
    e.preventDefault();
    axios({
      url: 'http://localhost:3000/books/add_book',
      method: 'POST',
      data: {
        title: title
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setMessage(response.data.message)
    })
    // .catch(err => setMessage(err.response))
  }
  

  return (
		<div>
      <h1>Add Book</h1>
      <label className={classes.error} hidden={!message}>{message}</label><br/>
      <TextField 
          name='title'
          className={classes.input} 
          required 
          id="standard-required" 
          label="Title"
          onChange={onInputChange}
      /><br/>
      <Button onClick={onBtnClick} variant="contained" color="primary">
        Add book
      </Button>
    </div>
  );
}

export default AddBook;
  