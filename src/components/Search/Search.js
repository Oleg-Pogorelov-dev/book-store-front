import React, { useState, useEffect } from "react";
import classes from "./Search.module.css";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { TextField, FormControl } from "@material-ui/core";
import { connect } from "react-redux";

import { getSearchBooks, getBooks } from "../../actions/actionCreators";
import useDebounce from "../../helpers/debounce";

function Search(props) {
  const {
    setSearchValue,
    getSearchBooks,
    searchValue,
    searched_books,
    setOffset,
    setCurrentPage,
  } = props;

  const [searchText, setSearchText] = useState("");

  const debouncedSearchTerm = useDebounce(searchText, 500);
  const filter = createFilterOptions();

  const setOnChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setSearchValue(newValue);
      setOffset(0);
      setCurrentPage(1);
    } else if (newValue && newValue.inputValue) {
      setSearchValue(newValue.inputValue);
      setOffset(0);
      setCurrentPage(1);
    } else if (!newValue) {
      setSearchValue("");
      setOffset(0);
      setCurrentPage(1);
    } else {
      setSearchValue(newValue.title);
      setOffset(0);
      setCurrentPage(1);
    }
  };

  const setFilterOptions = (options, params) => {
    setSearchText(params.inputValue);
    const filtered = filter(options, params);

    if (params.inputValue !== "") {
      filtered.push({
        inputValue: params.inputValue,
        title: `Add "${params.inputValue}"`,
      });
    }

    return filtered;
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSearchBooks({ search: searchText });
    }

    if (searchValue) {
      getBooks({
        booksLimit: booksLimit,
        offset: 0,
        genre: "",
        title: searchValue,
        order_item: sort.order_item,
        order_type: sort.order_type,
      });
    }
  }, [getSearchBooks, searchText, debouncedSearchTerm]);

  return (
    <FormControl>
      <Autocomplete
        className={classes.search}
        size="small"
        value={searchValue}
        onChange={(event, newValue) => setOnChange(event, newValue)}
        filterOptions={(options, params) => setFilterOptions(options, params)}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={searched_books.searched_books}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        renderOption={(option) => option.title}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search books" variant="outlined" />
        )}
      />
    </FormControl>
  );
}

const mapStateToProps = (store) => ({
  searched_books: store.searched_books,
});

const mapDispatchToProps = {
  getSearchBooks,
  getBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
