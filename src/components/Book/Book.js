import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import {
  getBook,
  setNotificationTrue,
  deleteBook,
} from "../../actions/actionCreators";
import classes from "./Book.module.css";
import { Button, Modal } from "@material-ui/core";
import UpdateBookModal from "../UpdateBookModal/UpdateBookModal";

function Book(props) {
  const { book, setNotificationTrue, getBook, deleteBook, user } = props;

  const idBook = +props.match.params.book.split("_")[1];
  const [message, setMessage] = useState("");
  const [num_img, setNumImg] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

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

  const onDeleteBook = () => {
    deleteBook(book.id);
    setRedirect(true);
  };

  const onUpdateBook = () => {
    setOpenModal(true);
  };

  const onMoveImg = (index) => {
    setNumImg(index);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getBook(idBook);
  }, [getBook, idBook]);

  if (redirect) {
    return <Redirect to="/books" />;
  }
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
            {user.email === "admin" ? (
              <div>
                <div className={classes.btn}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onUpdateBook}
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
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className={classes.discription}>
          <div>
            Автор:
            <Link
              className={classes.link_author}
              to={`/author/author_${book.author_id}`}
            >
              {book.author}
            </Link>
          </div>
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
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <UpdateBookModal book={book} />
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (store) => {
  return { book: store.book };
};

const mapDispatchToProps = {
  getBook,
  setNotificationTrue,
  deleteBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Book));
