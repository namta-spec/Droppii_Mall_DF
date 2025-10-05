import { useContext } from 'react';
import { CardType } from 'constants/type';
import { AuthContext } from 'contexts/contexts/AuthContext';
import { fetchListCard, updateCard } from 'contexts/actions/AuthAction';

export const usePaymentMethod = () => {
  const { state, dispatch } = useContext(AuthContext);
  const card = state.user?.card ?? null;
  const listCard = state.user?.listCard ?? [];

  const getListCard = () => {
    // Call API in here
    const dataCards: CardType[] = [
      {
        token: 'pm_1PqABC123xyz',
        card: {
          brand: 'visa',
          last_four: 4242,
          exp_month: 12,
          exp_year: 2028,
        },
        default: true,
      },
      {
        token: 'pm_1PqABC1dknjdfd',
        card: {
          brand: 'mastercard',
          last_four: 5555,
          exp_month: 6,
          exp_year: 2027,
        },
      },
      {
        token: 'pm_1PqABD2dknjdfd',
        card: {
          brand: 'visa',
          last_four: 2512,
          exp_month: 6,
          exp_year: 2027,
        },
      },
    ];

    dispatch(fetchListCard(dataCards));
  };

  const setCard = (inputCard: CardType | null) => {
    dispatch(updateCard(inputCard));
  };

  return { card, listCard, getListCard, setCard };
};
