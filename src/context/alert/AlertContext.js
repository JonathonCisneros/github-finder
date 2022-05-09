import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext( );

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [ state, dipatch ] = useReducer( alertReducer, initialState );

  const setAlert = ( msg, type ) => {
    dipatch({
      type: 'SET_ALERT',
      payload: { msg, type }
    });

    setTimeout( ( ) => dipatch({ type: 'REMOVE_ALERT' }), 3000 );
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }} >
      { children }
    </AlertContext.Provider>
  );
}

export default AlertContext;
