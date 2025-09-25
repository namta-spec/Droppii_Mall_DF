import { ReactNode, useReducer } from 'react';

import AuthReducer, { initAuthState } from '@contexts/reducers/AuthReducer';
import { AuthContext } from '@contexts/contexts/AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, initAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
