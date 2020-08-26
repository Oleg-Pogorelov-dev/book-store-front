import {
  REQUESTED_AUTHOR,
  REQUESTED_AUTHOR_SUCCEEDED,
  REQUESTED_AUTHOR_ERROR,
} from "../actions/actions";

const initialState = {
  id: 0,
  name: "",
  img: "",
  text: "",
  loading: false,
  error: "",
};

export function reducerAuthor(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_AUTHOR:
      return {
        id: 0,
        name: "",
        img: "",
        text: "",
        loading: true,
        error: "",
      };
    case REQUESTED_AUTHOR_SUCCEEDED:
      return {
        id: action.data.author.id,
        name: action.data.author.name,
        img: action.data.author.img,
        text: action.data.author.text,
        loading: false,
        error: "",
      };
    case REQUESTED_AUTHOR_ERROR:
      return {
        id: 0,
        name: "",
        img: "",
        text: "",
        loading: false,
        error: action.data.message,
      };
    default:
      return state;
  }
}
