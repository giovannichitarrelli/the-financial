import { Badge } from "@/app/_components/ui/badge";
import { Wishlist } from "@prisma/client";
import { Check, Clock } from "lucide-react";

interface DoneBadgeProps {
  wishlist: Wishlist;
}

const DoneWishlistBadge = ({ wishlist }: DoneBadgeProps) => {
  if (wishlist.done === true) {
    return (
      <Badge>
        <Check className="mr-2  size-3" />
        Done
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <Clock className="mr-2  size-3" />
      Pending
    </Badge>
  );
};

export default DoneWishlistBadge;
