import { useContext } from 'react';
import { addressType } from 'constants/type';
import { fetchListAddress, updateAddress } from 'contexts/actions/AuthAction';
import { AuthContext } from 'contexts/contexts/AuthContext';

export const useAddress = () => {
  const { state, dispatch } = useContext(AuthContext);
  const address = state.user?.address ?? null;
  const listAddress = state.user?.listAddress ?? [];

  const getListAddress = () => {
    // Call API in here
    let dataAddress: addressType[] = [
      {
        id: 1,
        title: 'Home',
        address: '925 S Chugach St #APT 10, Alaska 99645',
        default: true,
      },
      {
        id: 2,
        title: 'Office',
        address: '2438 6th Ave, Ketchikan, Alaska 99901, USA',
      },
      {
        id: 3,
        title: 'Apartment',
        address: '2551 Vista Dr #B301, Juneau, Alaska 99801, USA',
      },
    ];

    dispatch(fetchListAddress(dataAddress));
  };

  const setAddress = (inputAddress: addressType | null) => {
    dispatch(updateAddress(inputAddress));
  };

  return { address, listAddress, getListAddress, setAddress };
};
