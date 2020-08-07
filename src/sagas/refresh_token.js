import axios from "axios";

export default function fetchRefreshToken() {
  axios({
    url: "http://localhost:3000/refresh_token",
    method: "GET",
    responseType: "json",
    headers: {
      "Refresh-Token": localStorage.getItem("refresh-token"),
    },
  })
    .then((response) => {
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refresh-token", response.data.refresh_token);
      }
      return response.data;
    })
    .catch((err) => console.log(err.response));
}
