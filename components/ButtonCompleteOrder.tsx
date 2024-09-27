import { useState } from 'react';
import { useCart } from '@/lib/providers/CartProvider';
import { Button } from '@/components/ui/button';
import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { toast } from '@/lib/hooks/use-toast';

const CompleteOrderButton = ({onCompletePurchase} : {onCompletePurchase?: () => void}) => {
  const { completePurchase } = useCart();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteOrder = async () => {
    try {
      completePurchase();
      setIsCompleted(true);
      toast({variant: 'success', title: 'Order completed successfully'});
      if(onCompletePurchase) onCompletePurchase()
    } catch (error) {
      toast({variant: 'destructive', title: 'Failed to complete order'});
    }
  };

  return (
    <Button
      onClick={handleCompleteOrder}
      className={cn({"bg-green-500": isCompleted}, 'mb-5 mt-3')}
    >
      {isCompleted ? <CheckIcon className="w-5 h-5"/> : "Complete Order"}
    </Button>
  );
};

export default CompleteOrderButton;
