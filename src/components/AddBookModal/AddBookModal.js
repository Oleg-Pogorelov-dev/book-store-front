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
  const [img, setImg] = React.useState([]);
  const [description, setDescription] = React.useState("");
  console.log("img", img);

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
    const formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      formData.append("img", img[i]);
    }
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("price", price);
    formData.append("description", description);
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
      <div className={classes.wrapper}>
        <TextField
          name="title"
          className={classes.input}
          required
          label="Title"
          onChange={onInputChange}
        />
      </div>
      <div className={classes.wrapper}>
        <TextField
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
        <FormControl className={classes.input}>
          <InputLabel>Author</InputLabel>
          <Select
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
        <TextField
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
