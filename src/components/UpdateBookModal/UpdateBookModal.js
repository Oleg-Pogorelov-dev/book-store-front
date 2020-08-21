import React, { useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import classes from "./UpdateBookModal.module.css";
import { connect } from "react-redux";
import { updateBook } from "../../actions/actionCreators";
import SearchAuthor from "../SearchAuthor/SearchAuthor";

function UpdateBookModal(props) {
  const { book, updateBook } = props;

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [searchValue, setSearchValue] = useState(null);

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
    updateBook(formData);
  };

  return (
    <div className={classes.main}>
      <h1>Update book</h1>
      <br />
      <div className={classes.wrapper}>
        <TextField
          defaultValue={book.title || ""}
          name="title"
          className={classes.input}
          required
          label="Title"
          onChange={onInputChange}
        />
      </div>
      <div className={classes.wrapper}>
        <TextField
          defaultValue={book.price || ""}
          name="price"
          type="number"
          className={classes.input}
          required
          label="Price (RUB)"
          onChange={onInputChange}
        />
      </div>
      <div className={classes.wrapper}>
        <FormControl className={classes.input}>
          <InputLabel>Genre</InputLabel>
          <Select
            defaultValue={book.genre || ""}
            labelId="demo-simple-select-label"
            value={genre}
            onChange={onSelectChange}
          >
            {genres.map((oneGenre, index) => {
              return (
                <MenuItem key={index} value={oneGenre}>
                  {oneGenre}
                </MenuItem>
              );
            })}
          </Select>
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
          defaultValue={book.description || ""}
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
      <div className={classes.button}>
        <Button onClick={onBtnClick} variant="contained" color="primary">
          Update book
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  updateBook,
};

export default connect(null, mapDispatchToProps)(UpdateBookModal);
