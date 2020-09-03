import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./DropdownPanel.module.css";
import { postSearchValue } from "../../store/actions/actionCreators";

function DropdownPanel(props) {
  const {
    setOffset,
    setCurrentPage,
    sort,
    setSort,
    setGenresSelected,
    postSearchValue,
  } = props;

  const [openGenres, setOpenGenres] = useState(false);

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

  const onClickGenres = () => {
    if (!openGenres) {
      setOpenGenres(true);
    }

    if (openGenres) {
      setOpenGenres(false);
    }
  };

  const onGenreClick = (e) => {
    postSearchValue("");
    setGenresSelected(e.target.attributes[1].nodeValue);
  };

  document.onclick = function (event) {
    if (event.target.classList[1] !== "genres") {
      setOpenGenres(false);
    }
  };

  return (
    <div className={classes.filter_menu}>
      <div className={classes.filters_list}>
        <div
          className={`${classes.filter_item} genres`}
          onClick={onClickGenres}
        >
          Жанры
        </div>
        <div>Сортировать по:</div>
        <div
          className={
            sort.order_item === "price" && sort.order_type === "ASC"
              ? classes.filter_item + " " + classes.current_sort_up
              : sort.order_item === "price" && sort.order_type === "DESC"
              ? classes.filter_item + " " + classes.current_sort_down
              : classes.filter_item
          }
          name="price"
          onClick={(e) => onSortClick(e)}
        >
          Цене
        </div>
        <div
          className={
            sort.order_item === "title" && sort.order_type === "ASC"
              ? classes.filter_item + " " + classes.current_sort_up
              : sort.order_item === "title" && sort.order_type === "DESC"
              ? classes.filter_item + " " + classes.current_sort_down
              : classes.filter_item
          }
          name="title"
          onClick={(e) => onSortClick(e)}
        >
          Названию
        </div>
        <div
          className={
            sort.order_item === "genre" && sort.order_type === "ASC"
              ? classes.filter_item + " " + classes.current_sort_up
              : sort.order_item === "genre" && sort.order_type === "DESC"
              ? classes.filter_item + " " + classes.current_sort_down
              : classes.filter_item
          }
          name="genre"
          onClick={(e) => onSortClick(e)}
        >
          Жанру
        </div>
        <div
          className={
            sort.order_item === "id" && sort.order_type === "ASC"
              ? classes.filter_item + " " + classes.current_sort_up
              : sort.order_item === "id" && sort.order_type === "DESC"
              ? classes.filter_item + " " + classes.current_sort_down
              : classes.filter_item
          }
          name="id"
          onClick={(e) => onSortClick(e)}
        >
          Дате
        </div>
      </div>
      <div className={classes.genre_list} hidden={!openGenres}>
        <div className={classes.genre} name="" onClick={(e) => onGenreClick(e)}>
          Все
        </div>
        <div
          className={classes.genre}
          name="comedy"
          onClick={(e) => onGenreClick(e)}
        >
          Юмор
        </div>
        <div
          className={classes.genre}
          name="esoteric"
          onClick={(e) => onGenreClick(e)}
        >
          Эзотерика
        </div>
        <div
          className={classes.genre}
          name="detective"
          onClick={(e) => onGenreClick(e)}
        >
          Детектив
        </div>
        <div
          className={classes.genre}
          name="fantasy"
          onClick={(e) => onGenreClick(e)}
        >
          Фэнтези
        </div>
        <div
          className={classes.genre}
          name="novel"
          onClick={(e) => onGenreClick(e)}
        >
          Роман
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  postSearchValue,
};

export default connect(null, mapDispatchToProps)(DropdownPanel);
