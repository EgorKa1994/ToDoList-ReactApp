import React from 'react';
import { AppWrap } from './Components/AppWrap';
import { useFirebaseUser } from './firebase/firebase';
import { UserProvider } from './Components/Common/Context/Context';
import { PreLoader } from './Components/Common/Components/comComponent';

export const App = () => {
  const {
    user,
    isLoadingUser,
    errorLoadingUser,
    register,
    logIn,
    logOut,
    update,
  } = useFirebaseUser();

  if (isLoadingUser) {
    return <PreLoader />;
  }

  if (errorLoadingUser) {
    return `There is error ${errorLoadingUser}`;
  }

  return (
    <>
      <UserProvider value={{ user, register, logIn, logOut, update }}>
        <AppWrap />
      </UserProvider>
    </>
  );
};
