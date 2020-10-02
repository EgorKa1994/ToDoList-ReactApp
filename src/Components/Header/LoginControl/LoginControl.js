import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../Common/Context/Context';

export const LoginControl = () => {
  const { user, logOut } = useContext(UserContext);
  const history = useHistory();

  return (
    <div className='login'>
      <div className='login_info'>
        <div>{user ? `Hello, ${user.displayName}!` : 'Hello, user!'}</div>
      </div>
      <div className='login_control'>
        {user == null ? (
          <LogIn />
        ) : (
          <LogOut logOut={logOut} history={history} />
        )}
      </div>
    </div>
  );
};

const LogIn = () => {
  return (
    <>
      <div className='login_control__btn reg'>
        <span>
          <Link to='/registration'>Register</Link>
        </span>
      </div>
      <div className='login_control__btn in'>
        <span>
          <Link to='/login'>LogIn</Link>
        </span>
      </div>
    </>
  );
};

const LogOut = ({ logOut, history }) => {
  return (
    <>
      <div className='login_control__btn info'>
        <span>
          <Link to='/account'>Account info</Link>
        </span>
      </div>
      <div className='login_control__btn out'>
        <span
          onClick={async () => {
            await logOut();
            history.push('/start');
          }}
          style={{ cursor: 'pointer' }}
        >
          LogOut
        </span>
      </div>
    </>
  );
};
