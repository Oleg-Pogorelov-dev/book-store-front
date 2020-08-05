import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getBook } from "../../actions/actionCreators";

function Book(props) {
  const idBook = +props.match.params.book.split("_")[1];
  console.log("props", props);
  console.log("idBook", idBook);

  useEffect(() => {
    props.getBook(idBook);
  }, []);

  return (
    <div>
      <h1>{props.book.title}</h1>
      <img src={props.book.img} alt="Oops!" />
    </div>
  );
}

const mapStateToProps = (store) => {
  return { book: store.book };
};

const mapDispatchToProps = {
  getBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Book));
