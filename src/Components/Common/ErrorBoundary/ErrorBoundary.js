import React, { useContext } from 'react';
import { dictionaries } from '../../../Dictionaries/Dictionaries';
import { LanguageContext } from '../Context/Context';

export class ErrorBoundary extends React.Component {
  state = {
    isError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      isError: true,
    };
  }

  componentDidCatch(error, info) {}

  render() {
    return this.state.isError ? <Error /> : this.props.children;
  }
}

const Error = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className='start'>
      <h2>{dictionaries[language].ErrorPage}</h2>
      <div className='errorPage'></div>
    </div>
  );
};
