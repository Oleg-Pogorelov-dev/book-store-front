import React from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import classes from "./AddBookModal.module.css";
import { connect } from "react-redux";
import { addBook } from "../../actions/actionCreators";

function AddBook(props) {
  const { addBook } = props;

  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [price, setPrice] = React.useState(null);
  const [img, setImg] = React.useState({});
  console.log("img", img);

  const genres = ["comedy", "detective", "esoterics", "novel", "fantasy"];

  const onInputChange = (e) => {
    e.currentTarget.name === "title"
      ? setTitle(e.currentTarget.value)
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
    formData.append("genre", genre);
    formData.append("price", price);
    addBook({ formData, setMessage });
  };

  const onFileChange = (e) => {
    setImg(e.target.files);
  };

  console.log("IMG", img);

  return (
    <div className={classes.main}>
      <h1>Add Book</h1>
      <label className={classes.error} hidden={!message}>
        {message}
      </label>
      <br />
      <TextField
        name="title"
        className={classes.input}
        required
        id="standard-required"
        label="Title"
        onChange={onInputChange}
      />
      <TextField
        name="price"
        type="number"
        className={classes.input}
        required
        id="standard-required"
        label="Price (RUB)"
        onChange={onInputChange}
      />
      <FormControl className={classes.input}>
        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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

      <input type="file" multiple onChange={onFileChange} />
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
};

export default connect(null, mapDispatchToProps)(AddBook);
