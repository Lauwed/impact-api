import { Person } from "@/types";
import CategoryField from "./CategoryField";
import IdentityField from "./IdentityField";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Button from "./Button";

const PersonItem = ({ woman }: { woman: Person }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>
          {woman.name}
          {woman.romanizedName ? (
            <p className="mb-2">{woman.romanizedName}</p>
          ) : (
            <></>
          )}
        </CardTitle>

        {woman.personCategories.length > 0 ? (
          <CardDescription>
            <ul className="flex flex-wrap gap-2 mb-2">
              {woman.personCategories.map((category, index) => (
                <li key={index}>
                  <CategoryField uri={category} />
                </li>
              ))}
            </ul>
          </CardDescription>
        ) : (
          <></>
        )}
      </CardHeader>

      {woman.personIdentityFields.length > 0 ? (
        <CardContent>
          <ul>
            {woman.personIdentityFields.map((identityField, index) => (
              <li key={index}>
                <IdentityField uri={identityField} />
              </li>
            ))}
          </ul>
        </CardContent>
      ) : (
        <></>
      )}

      <CardFooter>
        <Button linkPath={`/people/${woman.id}`}>See more</Button>
      </CardFooter>
    </Card>
  );
};

export default PersonItem;
