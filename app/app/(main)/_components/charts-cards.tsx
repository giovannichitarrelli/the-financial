import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ReactElement } from "react";

interface CardsProps {
  title: string;
  month?: ReactElement<any>;
  component: ReactElement<any, any>;
}

const ChartsCards = ({ title, component, month }: CardsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md flex items-center gap-2">
          {title} {month}
        </CardTitle>
      </CardHeader>
      <CardContent>{component}</CardContent>
    </Card>
  );
};

export default ChartsCards;
