import { productType } from 'constants/type';
import { debounce, isEmpty } from 'lodash';
import { useState } from 'react';

export const useSearch = () => {
  const [search, setSearch] = useState<string>('');
  const [dataResult, setDataResult] = useState<productType[]>([]);

  const handleChange = debounce((inputText: string) => {
    setSearch(inputText);
    // Call API with inputText
    if (!isEmpty(inputText)) {
      const data: productType[] = [
        {
          id: 1,
          name: 'Regular Fit Slogan',
          cost: 1190,
          categoryId: 1,
          image:
            'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        },
        {
          id: 2,
          name: 'Regular Fit Polo',
          cost: 1100,
          categoryId: 1,
          discount: -52,
          image:
            'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        },
        {
          id: 3,
          name: 'Regular Fit Black',
          cost: 1690,
          categoryId: 1,
          image:
            'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        },
        {
          id: 4,
          name: 'Regular Fit V-Neck',
          cost: 1290,
          categoryId: 1,
          image:
            'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        },
        {
          id: 5,
          name: 'Regular Fit Black',
          cost: 1690,
          categoryId: 1,
          image:
            'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        },
        {
          id: 6,
          name: 'Regular Fit V-Neck',
          cost: 1290,
          categoryId: 1,
          image:
            'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
        },
      ];
      setDataResult(data);
      return;
    }
    setDataResult([]);
  }, 500);

  return { search, dataResult, handleChange };
};
