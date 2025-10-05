import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { productType, ReviewType } from 'constants/type';

export const useDetailProduct = (idProduct: number | null) => {
  const [detailProduct, setDetailProduct] = useState<
    (productType & ReviewType) | null
  >(null);

  useEffect(() => {
    if (idProduct) {
      // call API get detail Product by idProduct
      const products: productType[] = [
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
      const findProduct: productType | undefined = products.find(
        item => item.id === idProduct,
      );
      if (!isEmpty(findProduct)) {
        const dataProduct: productType & ReviewType = {
          ...findProduct,
          description:
            'The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist.',
          numberOfOneStar: 3,
          numberOfTwoStar: 0,
          numberOfThreeStar: 4,
          numberOfFourStar: 10,
          numberOfFiveStar: 20,
          numberOfRatings: 37,
          numberOfReview: 20,
          rating: 4.18,
        };
        setDetailProduct(dataProduct);
      }
    }
  }, [idProduct]);

  return { detailProduct };
};
