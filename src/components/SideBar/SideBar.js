import React, { useState, useEffect, useMemo } from "react";
import classes from "./SideBar.module.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";

import Search from "../Search/Search";

function SideBar(props) {
  const {
    setOffset,
    setCurrentPage,
    getBooks,
    offset,
    searchValue,
    setSearchValue,
    books,
    booksLimit,
  } = props;

  const [genresSelected, setGenresSelected] = useState([]);
  const [checkboxes, setCheckboxes] = React.useState({
    comedy: false,
    detective: false,
    esoterics: false,
    novel: false,
    fantasy: false,
  });

  const [sort, setSort] = useState({
    order_item: "id",
    order_type: "DESC",
  });

  const checkGenres = () => {
    let genres = [];
    for (var key in checkboxes) {
      if (checkboxes[key]) {
        genres.push(key);
      }
    }
    setOffset(0);
    setCurrentPage(1);
    setGenresSelected(genres);
  };

  useMemo(() => checkGenres(), [checkboxes]);

  useEffect(() => {
    getBooks({
      booksLimit: booksLimit,
      offset: offset,
      genre: genresSelected,
      title: searchValue,
      order_item: sort.order_item,
      order_type: sort.order_type,
    });
  }, [offset, searchValue, genresSelected, sort, booksLimit]);

  const onSortClick = (e) => {
    setOffset(0);
    setCurrentPage(1);
    const name_sort = e.target.attributes[1].nodeValue;

    if (name_sort === sort.order_item) {
      setSort({
        order_type: sort.order_type === "ASC" ? "DESC" : "ASC",
        order_item: name_sort,
      });
    }

    if (name_sort !== sort.order_item) {
      setSort({
        order_type: "ASC",
        order_item: name_sort,
      });
    }
  };

  const handleChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.drawer}>
      <p>Сортировать по:</p>
      <div className={classes.sort}>
        <div
          className={
            sort.order_item === "price" && sort.order_type === "ASC"
              ? classes.sort_item + " " + classes.current_sort_up
              : sort.order_item === "price" && sort.order_type === "DESC"
              ? classes.sort_item + " " + classes.current_sort_down
              : classes.sort_item
          }
          name="price"
          onClick={(e) => onSortClick(e)}
        >
          Цене
        </div>
        <div
          className={
            sort.order_item === "title" && sort.order_type === "ASC"
              ? classes.sort_item + " " + classes.current_sort_up
              : sort.order_item === "title" && sort.order_type === "DESC"
              ? classes.sort_item + " " + classes.current_sort_down
              : classes.sort_item
          }
          name="title"
          onClick={(e) => onSortClick(e)}
        >
          Названию
        </div>
        <div
          className={
            sort.order_item === "genre" && sort.order_type === "ASC"
              ? classes.sort_item + " " + classes.current_sort_up
              : sort.order_item === "genre" && sort.order_type === "DESC"
              ? classes.sort_item + " " + classes.current_sort_down
              : classes.sort_item
          }
          name="genre"
          onClick={(e) => onSortClick(e)}
        >
          Жанру
        </div>
        <div
          className={
            sort.order_item === "id" && sort.order_type === "ASC"
              ? classes.sort_item + " " + classes.current_sort_up
              : sort.order_item === "id" && sort.order_type === "DESC"
              ? classes.sort_item + " " + classes.current_sort_down
              : classes.sort_item
          }
          name="id"
          onClick={(e) => onSortClick(e)}
        >
          Дате
        </div>
      </div>
      <div className={classes.genre}>
        <div>Жанры</div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.comedy}
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
              checked={checkboxes.detective}
              onChange={handleChange}
              name="detective"
              color="primary"
            />
          }
          label="Детектив"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.esoterics}
              onChange={handleChange}
              name="esoterics"
              color="primary"
            />
          }
          label="Эзотерика"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.novel}
              onChange={handleChange}
              name="novel"
              color="primary"
            />
          }
          label="Роман"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.fantasy}
              onChange={handleChange}
              name="fantasy"
              color="primary"
            />
          }
          label="Фэнтези"
        />
      </div>
    </div>
  );
}

export default SideBar;
