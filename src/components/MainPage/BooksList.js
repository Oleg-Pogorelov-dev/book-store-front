import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./MainPage.module.css";

function BooksList(props) {
  const { currentBooks, books } = props;

  const [currentBookClass, setCurrentBookClass] = useState("");
  const [numImg, setNumImg] = useState(0);

  const onMoveImg = (index) => (e) => {
    setNumImg(index);
  };

  const onMouseOverBook = (book_class) => (e) => {
    setCurrentBookClass(book_class);
  };

  return (
    <div className={classes.book_list}>
      {currentBooks.map((book, index) => {
        const book_class = `book_${book.id}`;
        return (
          <Link
            onMouseOver={onMouseOverBook(book_class)}
            className={`${classes.link} ${book_class}`}
            key={index}
            to={`/book_${book.id}`}
          >
            <div className={classes.img_blocks}>
              {book.img.map((img, index) => (
                <div
                  key={index}
                  onMouseMove={onMoveImg(index)}
                  className={classes.img_block}
                ></div>
              ))}
            </div>
            <div className={classes.book}>
              <img
                className={classes.book_cover}
                src={
                  books.books.length && currentBookClass === `book_${book.id}`
                    ? `${process.env.REACT_APP_BASE_URL}${books.books[index].img[numImg]}`
                    : books.books.length
                    ? `${process.env.REACT_APP_BASE_URL}${books.books[index].img[0]}`
                    : ""
                }
                alt="Oops!"
              />
              <div className={classes.num_img}>
                {book.img.map((img, pointIndex) => (
                  <div
                    key={pointIndex}
                    className={
                      pointIndex === numImg &&
                      currentBookClass === `book_${book.id}`
                        ? `${classes.point} ${classes.current_point}`
                        : `${classes.point}`
                    }
                  ></div>
                ))}
              </div>
              <br />
              <div className={classes.info}>
                <strong>{book.title}</strong>
                <br />
                <div>Жанр: {book.genre}</div>
                <div>Цена: {book.price} руб.</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default BooksList;
