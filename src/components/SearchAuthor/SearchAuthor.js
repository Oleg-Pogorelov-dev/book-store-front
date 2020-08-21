import React, { useState, useEffect } from "react";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { TextField, FormControl, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";

import { getSearchAuthors } from "../../actions/actionCreators";
import useDebounce from "../../helpers/debounce";

function SearchAuthors(props) {
  const {
    getSearchAuthors,
    searched_authors,
    searchValue,
    setSearchValue,
  } = props;

  const [searchText, setSearchText] = useState("");

  const debouncedSearchTerm = useDebounce(searchText, 500);
  const filter = createFilterOptions();

  const setOnChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setSearchValue(newValue);
    } else if (newValue && newValue.inputValue) {
      setSearchValue(newValue.inputValue);
    } else if (!newValue) {
      setSearchValue("");
    } else {
      setSearchValue(newValue.name);
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

  const useStyles = makeStyles(() => ({
    search: {
      width: "100%",
    },
  }));

  const classesMUI = useStyles();

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSearchAuthors({ search: searchText });
    }
  }, [getSearchAuthors, searchText, debouncedSearchTerm]);

  return (
    <FormControl className={classesMUI.search}>
      <Autocomplete
        size="small"
        value={searchValue}
        onChange={(event, newValue) => setOnChange(event, newValue)}
        filterOptions={(options, params) => setFilterOptions(options, params)}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={searched_authors.searched_authors}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={(option) => option.name}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search authors" variant="outlined" />
        )}
      />
    </FormControl>
  );
}

const mapStateToProps = (store) => ({
  searched_authors: store.searched_authors,
});

const mapDispatchToProps = {
  getSearchAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAuthors);
