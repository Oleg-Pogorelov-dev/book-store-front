import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getBook, setNotificationTrue } from "../../actions/actionCreators";
import classes from "./Book.module.css";
import { Button } from "@material-ui/core";

function Book(props) {
  console.log("BOOK", props.book);
  const { book, setNotificationTrue, getBook } = props;

  const idBook = +props.match.params.book.split("_")[1];
  const [message, setMessage] = useState("");

  const onBtnClick = () => {
    let order = [];

    if (localStorage.getItem("basket")) {
      order = JSON.parse(localStorage.getItem("basket"));
    }

    const currentBook = order.find((item) => item.id === book.id);

    if (!currentBook) {
      order.push(book);
      localStorage.setItem("basket", JSON.stringify(order));
      setNotificationTrue();
    } else {
      setMessage("Данный товар уже находится в корзине");
    }
  };

  useEffect(() => {
    getBook(idBook);
  }, [getBook, idBook]);

  return (
    <div>
      <h1>{book.title}</h1>
      <img
        className={classes.book_cover}
        src={`http://localhost:3000/${book.img[0]}`}
        alt="Oops!"
      />
      <div>Цена {book.price} руб.</div>
      <div>Автор: {book.author}</div>
      <label hidden={!message}>{message}</label>
      <Button onClick={onBtnClick} variant="contained" color="primary">
        Добавить в корзину
      </Button>
    </div>
  );
}

const mapStateToProps = (store) => {
  return { book: store.book };
};

const mapDispatchToProps = {
  getBook,
  setNotificationTrue,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Book));
