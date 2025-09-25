import { IContextAuth } from 'contexts/interfaces';
import { initAuthState } from 'contexts/reducers/AuthReducer';
import { createContext } from 'react';

export const AuthContext = createContext<IContextAuth>({
  state: initAuthState,
  dispatch: () => null,
});
