import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyProfile } from '../../actions/actionCreators';
import { Link, Redirect, withRouter } from 'react-router-dom';

function Header(props) {
  const [redirect, setRedirect] = React.useState(false);

  useEffect(() => {
    if (localStorage.token) {
      props.getMyProfile()
    }
  },[]);

	const logOut = (e) => {
    e.preventDefault();
    localStorage.setItem('token', '');
    setRedirect(true);
  }

  console.log('user', props)

  if (redirect) {
    return <Redirect to="/login" />
  } else {
    return (
      <div>
        <h1>Welcome!</h1>
        {
          props.user ? 
          <div>
            <Link to={{ pathname: '/profile' }}>{props.user}</Link>
            <button onClick={logOut}>Выйти</button> 
          </div> : ''
        }
      </div>
    );
  }
}

const mapStateToProps = store => {
    return {user: store.user.email}
  }
  
  const mapDispatchToProps = {
    getMyProfile,
  }
  
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));