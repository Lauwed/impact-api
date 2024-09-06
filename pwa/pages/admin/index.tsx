import {
  CreateGuesser,
  HydraAdmin,
  ResourceGuesser,
} from "@api-platform/admin";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FileField, FileInput } from "react-admin";

const MediaObjectsCreate = (props: any) => {
  console.log(props);

  return (
    <CreateGuesser {...props}>
      Kakou
      {/* <FileInput source="file">
      <FileField source="src" title="title" />
    </FileInput> */}
    </CreateGuesser>
  );
};

const Admin = () => {
  // Load the admin client-side
  const [DynamicAdmin, setDynamicAdmin] = useState(<p>Loading...</p>);
  useEffect(() => {
    setDynamicAdmin(
      <HydraAdmin entrypoint={window.origin}>
        <ResourceGuesser name={"categories"} />
        <ResourceGuesser name={"companies"} />
        <ResourceGuesser name={"jobs"} />
        <ResourceGuesser name="media_objects" create={MediaObjectsCreate} />
        <ResourceGuesser name={"people"} />
        <ResourceGuesser name={"person_categories"} />
        <ResourceGuesser name={"person_identity_fields"} />
        <ResourceGuesser name={"person_jobs"} />
        <ResourceGuesser name={"person_pictures"} />
        <ResourceGuesser name={"person_relatives"} />
        <ResourceGuesser name={"person_schools"} />
        <ResourceGuesser name={"person_social_statuses"} />
        <ResourceGuesser name={"schools"} />
        <ResourceGuesser name={"sources"} />
        <ResourceGuesser name={"source_medias"} />
        <ResourceGuesser name={"type_identity_fields"} />
        <ResourceGuesser name={"type_medias"} />
        <ResourceGuesser name={"type_relatives"} />
        <ResourceGuesser name={"type_social_statuses"} />
        <ResourceGuesser name={"type_sources"} />
      </HydraAdmin>
    );
  }, []);

  return (
    <>
      <Head>
        <title>API Platform Admin</title>
      </Head>

      {DynamicAdmin}
    </>
  );
};
export default Admin;
