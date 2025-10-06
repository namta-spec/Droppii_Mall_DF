import { useContext, useState } from 'react';
import { AuthContext } from 'contexts/contexts/AuthContext';
import { categoryProductType, filterType, productType } from 'constants/type';
import { fetchCategories, fetchProducts } from 'contexts/actions/AuthAction';

export const useProduct = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { listProduct, listProductCategory } = state.product;
  const [product, setProducts] = useState<productType[]>(listProduct);

  const getCategories = async () => {
    // Call API in here
    const categories: categoryProductType[] = [
      { id: 1, value: 'All' },
      { id: 2, value: 'Tshirts' },
      { id: 3, value: 'Jeans' },
      { id: 4, value: 'Shoes' },
      { id: 5, value: 'Orther' },
    ];

    dispatch(fetchCategories(categories));
  };

  const getProducts = async () => {
    const dataProducts: productType[] = [
      {
        id: 1,
        name: 'Regular Fit Slogan',
        cost: 1190,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        categoryId: 2,
      },
      {
        id: 2,
        name: 'Regular Fit Polo',
        cost: 1100,
        discount: -52,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        categoryId: 2,
        saved: true,
      },
      {
        id: 3,
        name: 'Regular Fit Black',
        cost: 1690,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        categoryId: 3,
        saved: true,
      },
      {
        id: 4,
        name: 'Regular Fit V-Neck',
        cost: 1290,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        categoryId: 2,
      },
      {
        id: 5,
        name: 'Regular Fit Black',
        cost: 1690,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        categoryId: 4,
      },
      {
        id: 6,
        name: 'Regular Fit V-Neck',
        cost: 1290,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        categoryId: 4,
        saved: true,
      },
    ];
    setProducts(dataProducts);
    dispatch(fetchProducts(dataProducts));
  };

  function compareCost(productA: productType, productB: productType) {
    return productA.cost - productB.cost;
  }

  const filterProduct = (filterInput: filterType) => {
    let newList: productType[];
    let oldList = [...listProduct];

    if (filterInput.sortType.type === 'lowToHight' || 'hightToLow') {
      newList = oldList.sort(compareCost);
    } else {
      newList = listProduct;
    }
    if (filterInput.sortType.type === 'hightToLow') {
      newList = newList.reverse();
    }
    newList = newList.filter(
      item =>
        item.cost >= filterInput.price[0] && item.cost <= filterInput.price[1],
    );
    setProducts(newList);
  };

  return {
    product,
    listProductCategory,
    getCategories,
    getProducts,
    filterProduct,
  };
};
