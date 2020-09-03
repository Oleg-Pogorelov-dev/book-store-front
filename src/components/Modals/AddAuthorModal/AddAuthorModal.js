import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";

import classes from "./AddAuthorModal.module.css";
import { addAuthor } from "../../../store/actions/actionCreators";

function AddAuthor(props) {
  const { addAuthor, setOpenAuthorModal } = props;

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

    if (!name || !text) {
      return setMessage("Данное поле не может быть пустым");
    }

    addAuthor({ formData, setMessage });
    setOpenAuthorModal(false);
  };

  const onBtnCancel = (e) => {
    e.preventDefault();
    setOpenAuthorModal(false);
  };

  const onFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <div className={classes.main}>
      <h1>Add Author</h1>
      <p
        hidden={!message || message === "Данное поле не может быть пустым"}
        className={classes.error}
      >
        {message}
      </p>
      <br />
      <div className={classes.wrapper}>
        <TextField
          name="name"
          className={classes.input}
          required
          id="standard-required"
          label="Name"
          onChange={onInputChange}
          helperText={!name ? message : ""}
          error={!!message && !name}
        />
      </div>
      <div className={classes.wrapper}>
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
          helperText={!text ? message : ""}
          error={!!message && !text}
        />
      </div>
      <input type="file" onChange={onFileChange} />
      <div className={classes.buttons}>
        <div className={classes.button}>
          <Button onClick={onBtnClick} variant="contained" color="primary">
            Add author
          </Button>
        </div>
        <div className={classes.button}>
          <Button onClick={onBtnCancel} variant="contained" color="primary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  addAuthor,
};

export default connect(null, mapDispatchToProps)(AddAuthor);
