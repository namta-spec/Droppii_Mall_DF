import { useEffect, useState } from 'react';
import { debounce, isEmpty } from 'lodash';
import { InputAuthName, InputStatus } from 'constants/type';
import { ValidateEmail, ValidateFullName, ValidatePassword } from 'lib/utils';

export const useAuth = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [statusFullName, setStatusFullName] = useState<InputStatus>(
    InputStatus.deafult,
  );
  const [statusEmail, setStatusEmail] = useState<InputStatus>(
    InputStatus.deafult,
  );
  const [statusPassWord, setStatusPassword] = useState<InputStatus>(
    InputStatus.deafult,
  );
  const [disableSignUp, setDisableSignUp] = useState(true);
  const [disableLogin, setDisableLogin] = useState(true);

  useEffect(() => {
    if (
      statusEmail === InputStatus.success &&
      statusPassWord === InputStatus.success
    ) {
      setDisableLogin(false);
      if (!isEmpty(fullName)) {
        setDisableSignUp(false);
      }
      return;
    }
    setDisableLogin(true);
    setDisableSignUp(true);
  }, [fullName, statusEmail, statusPassWord]);

  const onChangeInput = debounce((text: string, name: InputAuthName) => {
    switch (name) {
      case InputAuthName.fullname:
        setFullName(text);
        setStatusFullName(ValidateFullName(text));
        return;
      case InputAuthName.email:
        setEmail(text);
        setStatusEmail(ValidateEmail(text));
        return;
      case InputAuthName.password:
        setPassword(text);
        setStatusPassword(ValidatePassword(text));
        return;
      default:
        return;
    }
  }, 1000);

  return {
    fullName,
    email,
    password,
    statusFullName,
    statusEmail,
    statusPassWord,
    disableSignUp,
    disableLogin,
    onChangeInput,
  };
};
