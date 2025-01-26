import Heading from "@/components/common/Heading";
import CounterAnimation from "@/components/CounterAnimation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface WomenNumberCardProps {
  count: number;
}

const WomenNumberCard: React.FC<WomenNumberCardProps> = ({ count }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Heading level="h2" customStyle="mb-0">
            Number of women
          </Heading>
        </CardTitle>
        <CardDescription>Encoded at the moment</CardDescription>
      </CardHeader>
      <CardContent>
        <CounterAnimation target={count} />
      </CardContent>
    </Card>
  );
};

export default WomenNumberCard;
