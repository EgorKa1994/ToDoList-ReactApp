import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext, LanguageContext } from '../../Common/Context/Context';
import { dictionaries } from '../../../Dictionaries/Dictionaries';

export const LoginControl = () => {
  const { user, logOut } = useContext(UserContext);
  const history = useHistory();
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <div className='login'>
      <div className='language'>
        <label>EN</label>
        <input
          type='radio'
          name='language'
          value='EN'
          checked={language == 'EN'}
          onChange={(e) => {
            changeLanguage(e.target.value);
          }}
        />
        <label>RU</label>
        <input
          type='radio'
          name='language'
          value='RU'
          checked={language == 'RU'}
          onChange={(e) => {
            changeLanguage(e.target.value);
          }}
        />
      </div>
      <div className='login_info'>
        <div>
          {user
            ? `${dictionaries[language].Hello}, ${
                user.displayName == null
                  ? dictionaries[language].User
                  : user.displayName
              }!`
            : dictionaries[language].Phrase}
        </div>
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
  const { language } = useContext(LanguageContext);
  return (
    <>
      <div className='login_control__btn reg'>
        <span>
          <Link to='/registration'>{dictionaries[language].Registration}</Link>
        </span>
      </div>
      <div className='login_control__btn in'>
        <span>
          <Link to='/login'>{dictionaries[language].LogIn}</Link>
        </span>
      </div>
    </>
  );
};

const LogOut = ({ logOut, history }) => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <div className='login_control__btn info'>
        <span>
          <Link to='/account'>{dictionaries[language].AccountInfo}</Link>
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
          {dictionaries[language].LogOut}
        </span>
      </div>
    </>
  );
};
