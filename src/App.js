import React from 'react';
import { AppWrap } from './Components/AppWrap';
import { useFirebaseUser } from './firebase/firebase';
import { UserProvider } from './Components/Common/Context/Context';
import { PreLoader } from './Components/Common/Components/Preloader';

export const App = () => {
  const {
    user,
    isLoadingUser,
    errorLoadingUser,
    register,
    logIn,
    logOut,
    update,
    errorLogin,
    errorRegistration,
  } = useFirebaseUser();

  if (isLoadingUser) {
    return <PreLoader />;
  }

  if (errorLoadingUser) {
    return `There is error ${errorLoadingUser}`;
  }

  return (
    <>
      <UserProvider
        value={{
          user,
          register,
          logIn,
          logOut,
          update,
          errorLogin,
          errorRegistration,
        }}
      >
        <AppWrap />
      </UserProvider>
    </>
  );
};
