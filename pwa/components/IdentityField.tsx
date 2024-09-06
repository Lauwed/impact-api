import { FC, useEffect, useState } from "react";
import { IdentityFields } from "../enums";
import { PersonTypeIdentifyField } from "../types";

type IdentityFieldNodeType = {
  uri: string;
};

const IdentityField: FC<IdentityFieldNodeType> = ({ uri }) => {
  const [field, setField] = useState<PersonTypeIdentifyField | null>(null);

  useEffect(() => {
    (async () => {
      const req = await fetch(`https://localhost${uri}`, {
        headers: {
          accept: "application/ld+json",
        },
      });
      const data = await req.json()
      console.log(data)

      setField(data);
    })();
  }, []);

  if (field == null) return <></>;
  return (
    <p>
      {IdentityFields[field.typeIdentityField.name]}: {field.value}
    </p>
  );
};

export default IdentityField;