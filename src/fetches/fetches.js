import axios from "axios"

export const fetchAuth = (url, email, password, setMessage, setRedirect) => {
  axios({
    url: url,
    method: 'POST',
    data: {
      login: email,
      password: password
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => { 
    localStorage.setItem('token', response.data.token)
    setRedirect(true);
  })
  .catch(err => setMessage(err.response.data.message))
}
