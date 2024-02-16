import { format } from 'date-fns';

import { type ProductReviews } from '~/lib/fetchers/reviews';
import { getInitials } from '~/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Icons } from '~/components/icons';
import { Rating } from '~/components/rating';

type ProductReviewsProps = {
  reviews: ProductReviews;
};

export function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <div className='pt-6 md:pt-10'>
      <h2 className='text-2xl font-bold'>Product Reviews</h2>
      <div className='space-y-4 pt-4'>
        {reviews.length > 0 ? (
          reviews.map(review => <ProductReview key={review.id} review={review} />)
        ) : (
          <div>No reviews yet</div>
        )}
      </div>
    </div>
  );
}

type ProductReviewProps = {
  review: ProductReviews[number];
};

function ProductReview({ review }: ProductReviewProps) {
  return (
    <div key={review.id} className='space-y-1'>
      <div className='flex items-center space-x-2'>
        <Avatar className='size-11 font-semibold'>
          <AvatarImage src={review.user?.image ?? ''} alt={review.user?.name ?? ''} />
          <AvatarFallback>{getInitials(review.user?.name)}</AvatarFallback>
        </Avatar>
        <div>
          <div className='font-semibold'>{review.user?.name}</div>
          <div className='flex items-center space-x-3 text-sm'>
            <div>Reviewed on {format(review.createdAt ? new Date(review.createdAt) : new Date(), 'dd MMM yy')}</div>
            <span>|</span>
            <div className='flex items-center space-x-1.5'>
              <Icons.checkCircle className='size-4 text-green-600' />
              <div>Verified Purchase</div>
            </div>
          </div>
        </div>
      </div>
      <Rating rating={review.rating} />
      <p>{review.comment}</p>
    </div>
  );
}
