import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyProfile } from '../../actions/actionCreators';

function Profile(props) {
  useEffect(() => {
    props.getMyProfile()
  },[]);

  console.log('props', props)
    return (
      <div>
        <h1>My profile</h1>
          <form>
            <div>
              <label>Email: {`${props.user.email}`}</label>
            </div>
          </form>
      </div>
    );
}

const mapStateToProps = store => {
  return {user: store.user}
}

const mapDispatchToProps = {
  getMyProfile,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);