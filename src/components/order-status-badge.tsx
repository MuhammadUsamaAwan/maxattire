import { Badge } from '~/components/ui/badge';

type OrderStatusBadgeProps = {
  status: string | undefined;
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge
      variant={
        status === 'AWAITING_PAYMENT'
          ? 'warning'
          : status === 'PAID'
            ? 'success'
            : status === 'PAYMENT_DECLINED'
              ? 'destructive'
              : status === 'PACKED'
                ? 'warning'
                : status === 'SHIPPED'
                  ? 'warning'
                  : status === 'DELIVERED'
                    ? 'success'
                    : 'destructive'
      }
    >
      {status
        ?.toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())}
    </Badge>
  );
}
