import { createContext, useState, useEffect, useReducer } from 'react';
import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const useReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CURRENT_USER':
      return {
        currentUser: payload,
      };

    default:
  }
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
