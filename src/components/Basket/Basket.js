import React, { useState } from "react";
import classes from "./Basket.module.css";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

import {
  setNotificationFalse,
  createOrder,
} from "../../actions/actionCreators";

function Basket(props) {
  const { setNotificationFalse, user, createOrder } = props;

  const [message, setMessage] = React.useState("");
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );

  console.log("message", message);

  const onBtnRemoveClick = () => {
    localStorage.removeItem("basket");
    setBooks([]);
    setNotificationFalse();
  };

  const onBtnPayClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("basket");
    const formData = {
      books: books,
      id: user.id,
    };
    createOrder({ formData, setMessage });
    setBooks([]);
  };

  return (
    <div>
      <h1>Корзина</h1>
      {!user.email ? (
        <div>Зарегистрируйтесь или войдите, чтобы оформить заказ</div>
      ) : (
        <div></div>
      )}
      {books.map((book, index) => {
        return (
          <div className={classes.book} key={index}>
            <div>{book.title}</div>
            <div>Цена {book.price}</div>
          </div>
        );
      })}
      <Button onClick={onBtnRemoveClick} variant="contained" color="primary">
        Очистить корзину
      </Button>
      <Button
        onClick={(e) => onBtnPayClick(e)}
        variant="contained"
        color="primary"
      >
        Заказать
      </Button>
    </div>
  );
}

const mapDispatchToProps = {
  setNotificationFalse,
  createOrder,
};

export default connect(null, mapDispatchToProps)(Basket);
