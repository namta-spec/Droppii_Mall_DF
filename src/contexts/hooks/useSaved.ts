import { useContext, useState } from 'react';
import { AuthContext } from 'contexts/contexts/AuthContext';
import { productType } from 'constants/type';
import { isEmpty } from 'lodash';

export const useSaved = () => {
  const { state } = useContext(AuthContext);
  const [listSavedProduct, setSavedProducts] = useState<productType[]>([]);
  const { listProduct } = state.product;

  const getSavedProducts = async () => {
    if (!isEmpty(listProduct)) {
      const listSaved = listProduct.filter(item => item.saved);
      setSavedProducts(listSaved);
    }
  };

  return { listSavedProduct, getSavedProducts };
};
