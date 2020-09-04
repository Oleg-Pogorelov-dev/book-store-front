import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  Modal,
  Backdrop,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

import {
  getBook,
  setNotificationTrue,
  deleteBook,
  setMessage,
} from "../../store/actions/actionCreators";
import classes from "./Book.module.css";
import UpdateBookModal from "../Modals/UpdateBookModal/UpdateBookModal";
import DeleteBookModal from "../Modals/DeleteBookModal/DeleteBookModal";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Book(props) {
  const { book, setNotificationTrue, getBook, user, setMessage } = props;

  const idBook = +props.match.params.book.split("_")[1];
  const [error, setError] = useState("");
  const [num_img, setNumImg] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

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
      setMessage(`Книга ${book.title} добавлена в корзину`);
    } else {
      setError("Данный товар уже находится в корзине");
    }
  };

  const onDeleteBook = () => {
    setConfirmModal(true);
  };

  const onUpdateBook = () => {
    setOpenModal(true);
  };

  const onMoveImg = (index) => {
    setNumImg(index);
  };

  const handleClose = () => {
    setOpenModal(false);
    setConfirmModal(false);
  };

  useEffect(() => {
    getBook(idBook);
  }, [getBook, idBook]);

  const classesMUI = useStyles();

  if (!book.title) {
    return (
      <Backdrop className={classesMUI.backdrop} open={book.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className={classes.main}>
      <h1>{book.title}</h1>
      <div className={classes.book_info}>
        <div className={classes.images}>
          <div className={classes.all_images_book}>
            {book.img.length
              ? book.img.map((img, index) => (
                  <div key={index} className={classes.img_wrapper}>
                    <img
                      className={classes.book_img}
                      onMouseMove={() => onMoveImg(index)}
                      src={`${process.env.REACT_APP_BASE_URL}${img}`}
                      alt="Oops!"
                    />
                  </div>
                ))
              : ""}
          </div>
          <div className={classes.cover_wrapper}>
            <img
              className={classes.book_cover}
              src={`${process.env.REACT_APP_BASE_URL}${book.img[num_img]}`}
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
          <p hidden={!error}>{error}</p>
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

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <UpdateBookModal book={book} setOpenModal={setOpenModal} />
        </div>
      </Modal>
      <Modal
        open={confirmModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <DeleteBookModal bookId={book.id} setConfirmModal={setConfirmModal} />
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (store) => ({
  book: store.book,
});

const mapDispatchToProps = {
  getBook,
  setNotificationTrue,
  deleteBook,
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Book));
