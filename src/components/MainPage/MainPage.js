import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/actionCreators';
import classes from './MainPage.module.css';
import { Redirect, Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

function MainPage(props) {
  useEffect(() => {
    if (localStorage.token && !props.books.books.length) {
      props.getBooks();
    }
  },[]);

  if (!localStorage.token) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div className={classes.book_list}>
        {props.books.books.map((book, index) => {
          return (
            <div key={index} className={classes.book}>
              {book.title}
            </div>
          )
        })}
        <br/>
      </div>
      <Link to='/add_book'> Book store </Link>
      <Pagination 
        className={classes.pagination}
        count={props.books.books.length} 
        color="primary"
      />
    </div>
  );
}
  
const mapStateToProps = store => {
	return {books: store.books}
}

const mapDispatchToProps = {
  getBooks,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
  