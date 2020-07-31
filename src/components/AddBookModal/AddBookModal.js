import React from 'react';
import { TextField, Button } from '@material-ui/core';
import classes from './AddBookModal.module.css';
import { connect } from 'react-redux';
import { addBook } from '../../actions/actionCreators';

function AddBook(props) {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [img, setImg] = React.useState({});

  console.log(img)
  
  const onInputChange = (e) => {
    setTitle(e.currentTarget.value)
	}
	
  const onBtnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img);
    formData.append("title",title);
    props.addBook({formData, setMessage})
  }

  const onFileChange = (e) => {
    setImg(e.target.files[0])
  }
  

  return (
		<div className={classes.main}>
      <h1>Add Book</h1>
      <label className={classes.error} hidden={!message}>{message}</label><br/>
      <TextField 
          name='title'
          className={classes.input} 
          required 
          id="standard-required" 
          label="Title"
          onChange={onInputChange}
      />
      <input type="file" onChange={onFileChange}/>
      <div className={classes.button}>
        <Button onClick={onBtnClick} variant="contained" color="primary">
          Add book
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  addBook,
}

export default connect(
  null,
  mapDispatchToProps
)(AddBook);
  