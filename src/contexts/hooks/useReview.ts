import {
  Rating,
  ReviewerType,
  ReviewSummaryType,
  ReviewType,
} from 'constants/type';
import { useEffect, useState } from 'react';

export const useReview = (idProduct: number | null) => {
  const [dataReview, setDataReview] = useState<ReviewType | null>(null);

  useEffect(() => {
    if (idProduct) {
      const reviewSummary: ReviewSummaryType = {
        numberOfOneStar: 3,
        numberOfTwoStar: 0,
        numberOfThreeStar: 4,
        numberOfFourStar: 10,
        numberOfFiveStar: 20,
        numberOfRatings: 37,
        numberOfReview: 4,
        rating: 4.18,
      };
      const reviewers: ReviewerType[] = [
        {
          rating: Rating.fourStar,
          review:
            'The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!',
          owner: 'Guy Hawkins',
          time: new Date('2025-09-29T21:54:00'),
        },
        {
          rating: Rating.fiveStar,
          review:
            'The item is very good, my son likes it very much and plays every day.',
          owner: 'Wade Warren',
          time: new Date('2025-09-22'),
        },
        {
          rating: Rating.fiveStar,
          review:
            'The item is very good, my son likes it very much and plays every day.',
          owner: 'Wade Warren',
          time: new Date('2025-09-21'),
        },
        {
          rating: Rating.fourStar,
          review:
            'I just bought it and the stuff is really good! I highly recommend it!',
          owner: 'Robert Fox',
          time: new Date('2025-09-13'),
        },
        {
          rating: Rating.fourStar,
          review: 'Good quality overall, but packaging could be better.',
          owner: 'Courtney Henry',
          time: new Date('2025-09-10'),
        },
      ];

      setTimeout(() => {
        setDataReview({
          reviewSummary: reviewSummary,
          listReview: reviewers,
        });
      }, 100);
    }
  }, [idProduct]);

  return { dataReview };
};
