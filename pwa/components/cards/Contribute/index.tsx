import Heading from "@/components/common/Heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArchiveIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

const ContributeCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Heading level="h2" customStyle="mb-0">
            Want to contribute ?
          </Heading>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <p className="max-w-[500px]">
          You can contribute to the project either by submitting PRs to the
          Github repository, or by helping me completing the women&nbsp;profiles
        </p>
      </CardContent>
      <CardFooter className="flex gap-4 justify-center">
        <a
          className="text-sm font-medium p-2 border hover:bg-slate-300 transition-all flex gap-2 items-center"
          href="https://github.com/Lauwed/impact-api"
        >
          <GitHubLogoIcon /> Github
        </a>
        <a
          className="text-sm font-medium p-2 border hover:bg-slate-300 transition-all flex gap-2 items-center"
          href="https://tally.so/r/waEAXW"
        >
          <ArchiveIcon /> Register to the alpha
        </a>
      </CardFooter>
    </Card>
  );
};

export default ContributeCard;
