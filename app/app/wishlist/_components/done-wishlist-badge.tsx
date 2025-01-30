import { Badge } from "@/app/_components/ui/badge";
import { Wishlist } from "@prisma/client";
import { Check, Clock } from "lucide-react";

interface DoneBadgeProps {
  wishlist: Wishlist;
}

const DoneWishlistBadge = ({ wishlist }: DoneBadgeProps) => {
  if (wishlist.done === true) {
    return (
      <Badge variant="success">
        <Check className="mr-2  size-3" />
        Concluído
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <Clock className="mr-2  size-3" />
      Pendente
    </Badge>
  );
};

export default DoneWishlistBadge;
