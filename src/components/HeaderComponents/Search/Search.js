import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { TextField, FormControl } from "@material-ui/core";
import { connect } from "react-redux";

import classes from "./Search.module.css";
import {
  getSearchBooks,
  postSearchValue,
} from "../../../store/actions/actionCreators";
import useDebounce from "../../../helpers/debounce";

function Search(props) {
  const { getSearchBooks, searched_books, postSearchValue } = props;

  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState(null);

  const debouncedSearchTerm = useDebounce(searchText, 1000);
  const filter = createFilterOptions();

  const setOnChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setSearchValue(newValue);
    } else if (newValue && newValue.inputValue) {
      setSearchValue(newValue.inputValue);
    } else if (!newValue) {
      setSearchValue("");
    } else {
      setSearchValue(newValue.title);
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
    if (searchValue) {
      typeof searchValue === "string"
        ? postSearchValue(searchValue)
        : postSearchValue(searchValue.search_value);
    }

    if (debouncedSearchTerm) {
      getSearchBooks({ search: searchText });
    }
  }, [
    getSearchBooks,
    searchText,
    debouncedSearchTerm,
    postSearchValue,
    searchValue,
  ]);

  return (
    <FormControl>
      {searchValue ? <Redirect to="/" /> : null}
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
          <TextField
            {...params}
            placeholder="Search books"
            variant="outlined"
          />
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
  postSearchValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
