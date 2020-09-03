import React, { useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";

import classes from "./AddBookModal.module.css";
import { addBook } from "../../../store/actions/actionCreators";
import SearchAuthor from "../../SearchAuthor/SearchAuthor";

const useStyles = makeStyles(() => ({
  error_for_genres: {
    color: "red",
  },
}));

function AddBook(props) {
  const { addBook, setOpenBookModal } = props;

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(null);
  const [img, setImg] = useState([]);
  const [description, setDescription] = useState("");
  const [searchValue, setSearchValue] = useState(null);

  const genres = ["comedy", "detective", "esoterics", "novel", "fantasy"];

  const classesMUI = useStyles();

  const onInputChange = (e) => {
    e.currentTarget.name === "title"
      ? setTitle(e.currentTarget.value)
      : e.currentTarget.name === "description"
      ? setDescription(e.currentTarget.value)
      : setPrice(e.currentTarget.value);
  };

  const onSelectChange = (e) => {
    setGenre(e.target.value);
  };

  const onBtnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      formData.append("img", img[i]);
    }
    formData.append("title", title);
    formData.append("name", searchValue);
    formData.append("genre", genre);
    formData.append("price", price);
    formData.append("description", description);

    if (!title || !genre || !price || !description) {
      return setError("Данное поле не может быть пустым");
    }

    if (!searchValue) {
      return setError("Выберите автора");
    }

    addBook({ formData, setError });
    setOpenBookModal(false);
  };

  const onBtnCancel = (e) => {
    e.preventDefault();
    setOpenBookModal(false);
  };

  const onFileChange = (e) => {
    setImg(e.target.files);
  };

  return (
    <div className={classes.main}>
      <h1>Add Book</h1>
      <p
        hidden={!error || error === "Данное поле не может быть пустым"}
        className={classes.error}
      >
        {error}
      </p>
      <br />
      <div className={classes.wrapper}>
        <TextField
          name="title"
          className={classes.input}
          required={true}
          label="Title"
          onChange={onInputChange}
          helperText={!title ? error : ""}
          error={!!error && !title}
        />
      </div>
      <div className={classes.wrapper}>
        <TextField
          name="price"
          type="number"
          className={classes.input}
          required={true}
          label="Price (RUB)"
          onChange={onInputChange}
          helperText={!price ? error : ""}
          error={!!error && !price}
        />
      </div>
      <div className={classes.wrapper}>
        <FormControl className={classes.input}>
          <InputLabel>Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={genre}
            onChange={onSelectChange}
            error={!!error && !genre}
          >
            {genres.map((oneGenre, index) => {
              return (
                <MenuItem key={index} value={oneGenre}>
                  {oneGenre}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText className={classesMUI.error_for_genres}>
            {!genre ? error : ""}
          </FormHelperText>
        </FormControl>
      </div>
      <div className={classes.wrapper}>
        <SearchAuthor
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className={classes.wrapper}>
        <TextField
          name="description"
          multiline
          rows={10}
          className={classes.input}
          required
          variant="outlined"
          label="Description"
          onChange={onInputChange}
          helperText={!description ? error : ""}
          error={!!error && !description}
        />
      </div>
      <input type="file" multiple onChange={onFileChange} />
      <div className={classes.buttons}>
        <div className={classes.button}>
          <Button onClick={onBtnClick} variant="contained" color="primary">
            Add book
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
  addBook,
};

export default connect(null, mapDispatchToProps)(AddBook);
