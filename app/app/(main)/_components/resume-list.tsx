import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ReactElement } from "react";

interface CardsProps {
  title: string;
  description: string;
  component: ReactElement<any, any>;
}
const ResumeList = ({ title, component, description }: CardsProps) => {
  return (
    <Card>
      <CardHeader className="bg-muted/40">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="py-4">{component}</CardContent>
    </Card>
  );
};

export default ResumeList;
