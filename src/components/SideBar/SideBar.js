import React, { useState, useEffect, useMemo } from "react";
import classes from "./SideBar.module.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Search from "../Search/Search";

function SideBar(props) {
  const [genresSelected, setGenresSelected] = useState([]);
  const [checkboxes, setCheckboxes] = React.useState({
    comedy: false,
    detective: false,
  });

  const checkGenres = () => {
    let genres = [];
    for (var key in checkboxes) {
      if (checkboxes[key]) {
        genres.push(key);
      }
    }
    setGenresSelected(genres);
  };

  useMemo(() => checkGenres(), [checkboxes]);

  useEffect(() => {
    props.getBooks({ offset: props.offset, genre: genresSelected });
  }, [props.offset, genresSelected]);

  const handleChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.drawer}>
      <Search books={props.books} getBooks={props.getBooks} />
      <div className={classes.genre}>
        <div>Жанры</div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.checkedA}
              onChange={handleChange}
              name="comedy"
              color="primary"
            />
          }
          label="Юмор"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.checkedB}
              onChange={handleChange}
              name="detective"
              color="primary"
            />
          }
          label="Детектив"
        />
      </div>
    </div>
  );
}

export default SideBar;
