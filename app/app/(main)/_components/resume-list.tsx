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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{component}</CardContent>
    </Card>
  );
};

export default ResumeList;
