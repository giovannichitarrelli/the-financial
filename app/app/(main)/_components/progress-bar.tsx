"use client";
import { Progress } from "@/app/_components/ui/progress";

interface PercentProps {
  percent: string;
}
export function ProgressBar({ percent }: PercentProps) {
  return <Progress value={Number(percent)} />;
}
