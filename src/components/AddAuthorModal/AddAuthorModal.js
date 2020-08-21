import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import classes from "./AddAuthorModal.module.css";
import { connect } from "react-redux";
import { addAuthor } from "../../actions/actionCreators";

function AddAuthor(props) {
  const { addAuthor } = props;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState({});

  const onInputChange = (e) => {
    e.currentTarget.name === "name"
      ? setName(e.currentTarget.value)
      : setText(e.currentTarget.value);
  };

  const onBtnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("text", text);
    formData.append("img", img);
    addAuthor({ formData, setMessage });
  };

  const onFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <div className={classes.main}>
      <h1>Add Author</h1>
      <label className={classes.error} hidden={!message}>
        {message}
      </label>
      <br />
      <TextField
        name="name"
        className={classes.input}
        required
        id="standard-required"
        label="Name"
        onChange={onInputChange}
      />
      <TextField
        name="text"
        multiline
        rows={10}
        className={classes.input}
        required
        id="outlined-multiline-static"
        variant="outlined"
        label="Text"
        onChange={onInputChange}
      />
      <input type="file" onChange={onFileChange} />
      <div className={classes.button}>
        <Button onClick={onBtnClick} variant="contained" color="primary">
          Add author
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  addAuthor,
};

export default connect(null, mapDispatchToProps)(AddAuthor);
