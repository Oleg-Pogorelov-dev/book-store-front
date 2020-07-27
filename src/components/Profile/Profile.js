import React from 'react';

function Profile(props) {

  return (
    <div>
      <h1>My profile</h1>
        <form>
          <div>
            <label>Email: {`${props.user}`}</label>
          </div>
        </form>
    </div>
  );
}

export default Profile;