import { cn } from '~/lib/utils';
import { Icons } from '~/components/icons';

type RatingProps = React.HTMLAttributes<HTMLDivElement> & {
  rating: number | null | undefined;
};

export function Rating({ rating, className, ...props }: RatingProps) {
  const filledStars = rating ? Math.floor(rating) : 0;
  const halfStars = rating ? Math.ceil(rating - filledStars) : 0;
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <div className={cn('flex space-x-1 text-lg text-yellow-500', className)} {...props}>
      {Array(filledStars)
        .fill(null)
        .map((_, index) => (
          <Icons.starFill key={index} />
        ))}
      {Array(halfStars)
        .fill(null)
        .map((_, index) => (
          <Icons.starHalf key={index} />
        ))}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <Icons.star key={index} />
        ))}
    </div>
  );
}
