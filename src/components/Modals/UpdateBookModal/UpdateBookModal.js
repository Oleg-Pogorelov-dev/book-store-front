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

import classes from "./UpdateBookModal.module.css";
import { updateBook } from "../../../store/actions/actionCreators";
import SearchAuthor from "../../SearchAuthor/SearchAuthor";

const useStyles = makeStyles(() => ({
  error_for_genres: {
    color: "red",
  },
}));

function UpdateBookModal(props) {
  const { book, updateBook, setOpenModal } = props;

  const [title, setTitle] = useState(book.title || "");
  const [genre, setGenre] = useState(book.genre || "");
  const [price, setPrice] = useState(book.price || null);
  const [description, setDescription] = useState(book.description || "");
  const [searchValue, setSearchValue] = useState(book.author || null);
  const [error, setError] = useState("");

  console.log(error);
  const genres = ["comedy", "detective", "esoterics", "novel", "fantasy"];

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
    const formData = {
      title,
      genre,
      price,
      description,
      author: searchValue,
      id: book.id,
    };

    if (!title || !genre || !price) {
      return setError("Данное поле не может быть пустым");
    }

    if (!searchValue) {
      return setError("Выберите автора");
    }

    updateBook(formData);
    setOpenModal(false);
  };

  const onBtnCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  const classesMUI = useStyles();

  return (
    <div className={classes.main}>
      <h1>Update book</h1>
      <br />
      <div className={classes.wrapper}>
        <TextField
          defaultValue={title}
          name="title"
          className={classes.input}
          required
          label="Title"
          onChange={onInputChange}
          error={!!error && !title}
          helperText={!title ? error : ""}
        />
      </div>
      <div className={classes.wrapper}>
        <TextField
          defaultValue={price}
          name="price"
          type="number"
          className={classes.input}
          required
          label="Price (RUB)"
          onChange={onInputChange}
          error={!!error && !price}
          helperText={!price ? error : ""}
        />
      </div>
      <div className={classes.wrapper}>
        <FormControl className={classes.input}>
          <InputLabel>Genre</InputLabel>
          <Select
            defaultValue={genre}
            labelId="demo-simple-select-label"
            value={genre}
            onChange={onSelectChange}
            error={!!error && !genre}
          >
            {genres.map((oneGenre, index) => (
              <MenuItem key={index} value={oneGenre}>
                {oneGenre}
              </MenuItem>
            ))}
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
          defaultValue={description}
          name="description"
          multiline
          rows={10}
          className={classes.input}
          required
          variant="outlined"
          label="Description"
          onChange={onInputChange}
        />
      </div>

      <div className={classes.buttons}>
        <div className={classes.button}>
          <Button onClick={onBtnClick} variant="contained" color="primary">
            Update book
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
  updateBook,
};

export default connect(null, mapDispatchToProps)(UpdateBookModal);
