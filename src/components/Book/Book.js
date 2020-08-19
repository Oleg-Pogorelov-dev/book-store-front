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
  const [num_img, setNumImg] = useState(0);

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

  const onDeleteBook = () => {};

  const onMoveImg = (index) => {
    setNumImg(index);
  };

  useEffect(() => {
    getBook(idBook);
  }, [getBook, idBook]);

  return (
    <div>
      <h1>{book.title}</h1>
      <div className={classes.book_info}>
        <div className={classes.images}>
          <div className={classes.all_images_book}>
            {book.img.length
              ? book.img.map((img, index) => {
                  return (
                    <div key={index} className={classes.img_wrapper}>
                      <img
                        className={classes.book_img}
                        onMouseMove={() => onMoveImg(index)}
                        src={`http://localhost:3000/${img}`}
                        alt="Oops!"
                      />
                    </div>
                  );
                })
              : ""}
          </div>
          <div className={classes.cover_wrapper}>
            <img
              className={classes.book_cover}
              src={`http://localhost:3000/${book.img[num_img]}`}
              alt="Oops!"
            />
            <br />
            <div className={classes.btn}>
              <Button
                variant="contained"
                color="primary"
                onClick={onDeleteBook}
              >
                Редактировать книгу
              </Button>
            </div>
            <br />
            <div className={classes.btn}>
              <Button
                variant="contained"
                color="primary"
                onClick={onDeleteBook}
              >
                Удалить книгу
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.discription}>
          <div>Автор: {book.author}</div>
          <br />
          <div>О книге:</div>
          <br />
          <div>{book.description}</div>
        </div>
        <div className={classes.order_block}>
          <div>Цена {book.price} руб.</div>
          <Button
            className={classes.order_button}
            onClick={onBtnClick}
            variant="contained"
            color="primary"
          >
            Добавить в корзину
          </Button>
        </div>
      </div>
      <label hidden={!message}>{message}</label>
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
