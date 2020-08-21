import {
  REQUESTED_AUTHOR,
  REQUESTED_AUTHOR_SUCCEEDED,
} from "../actions/actions";

const initialState = {
  id: 0,
  name: "",
  img: "",
  text: "",
  loading: false,
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
      };
    case REQUESTED_AUTHOR_SUCCEEDED:
      return {
        id: action.data.author.id,
        name: action.data.author.name,
        img: action.data.author.img,
        text: action.data.author.text,
        loading: false,
      };
    default:
      return state;
  }
}
