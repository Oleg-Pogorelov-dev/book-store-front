import React, { useState, useMemo } from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import classes from "./Basket.module.css";
import {
  setNotificationFalse,
  createOrder,
  setMessage,
} from "../../../store/actions/actionCreators";

function Basket(props) {
  const { setNotificationFalse, user, createOrder } = props;

  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );

  const sumOrder = useMemo(
    () => books.reduce((sum, book) => sum + book.price, 0),
    [books]
  );

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
    createOrder({ formData });
    setBooks([]);
    setNotificationFalse();
  };

  if (!books.length) {
    return <div className={classes.main}>Корзина пуста :(</div>;
  }

  return (
    <div className={classes.main}>
      <h1>Корзина</h1>
      {!user.email ? (
        <div>Зарегистрируйтесь или войдите, чтобы оформить заказ</div>
      ) : (
        <div></div>
      )}
      <Card className={classes.card_order}>
        <CardContent>
          <Typography className={classes.text_left} variant="h5" component="h2">
            Товары:
          </Typography>
          {books.map((book, index) => (
            <div className={classes.book} key={index}>
              <div>{book.title}</div>
              <div>Цена {book.price} руб.</div>
            </div>
          ))}
          <Typography className={classes.text_left} variant="h5" component="h2">
            Сумма заказа: {sumOrder} руб.
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.btn}>
        <Button onClick={onBtnRemoveClick} variant="contained" color="primary">
          Очистить корзину
        </Button>
      </div>
      <br />
      <div className={classes.btn}>
        <Button
          onClick={(e) => onBtnPayClick(e)}
          variant="contained"
          color="primary"
        >
          Заказать
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({ message: store.message });

const mapDispatchToProps = {
  setNotificationFalse,
  createOrder,
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
