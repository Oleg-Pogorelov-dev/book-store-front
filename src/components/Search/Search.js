import React, { useState, useEffect } from "react";
import classes from "./Search.module.css";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";

import { getSearchBooks } from "../../actions/actionCreators";

function Search(props) {
  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState("");
  const filter = createFilterOptions();

  console.log(props);

  useEffect(() => {
    if (searchText) {
      props.getSearchBooks({ search: searchText });
    }
  }, [searchText]);

  return (
    <Autocomplete
      className={classes.search}
      size="small"
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        setSearchText(params.inputValue);
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={props.searched_books.searched_books}
      getOptionLabel={(option) => {
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search books" variant="outlined" />
      )}
    />
  );
}

const mapStateToProps = (store) => ({
  searched_books: store.searched_books,
});

const mapDispatchToProps = {
  getSearchBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
