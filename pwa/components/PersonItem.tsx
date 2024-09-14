import { Person } from "@/types";
import Card from "./Card";
import IdentityField from "./IdentityField";
import CategoryField from "./CategoryField";

const PersonItem = ({ woman }: { woman: Person }) => {
  return (
    <Card titleLevel="h3" title={woman.name} url={`/people/${woman.id}`}>
      {woman.romanizedName ? <p className="mb-2">{woman.romanizedName}</p> : <></>}
      {woman.personCategories.length > 0 ? (
        <ul className="flex gap-2 mb-2">
          {woman.personCategories.map((category, index) => (
            <li key={index}>
              <CategoryField uri={category} />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      {woman.personIdentityFields.length > 0 ? (
        <ul>
          {woman.personIdentityFields.map((identityField, index) => (
            <li key={index}>
              <IdentityField uri={identityField} />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default PersonItem;
