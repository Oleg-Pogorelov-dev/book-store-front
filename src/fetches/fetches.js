import axios from "axios"

export const fetchAuth = (url, email, password, setMessage, setRedirect) => {
  axios({
    url: url,
    method: 'POST',
    data: {
      email: email,
      password: password
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => { 
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('refresh-token', response.data.refresh_token)
    setRedirect(true);
    window.location.reload()
  })
  .catch(err => setMessage(err.response.data.message))
}
