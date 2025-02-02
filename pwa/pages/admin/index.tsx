// import {
//   CreateGuesser,
//   HydraAdmin,
//   ResourceGuesser,
// } from "@api-platform/admin";
// import Head from "next/head";
// import { ReactNode, useEffect, useState } from "react";
// import { FileField, FileInput } from "react-admin";

import Heading from "@/components/common/Heading";
import Main from "@/components/common/Main";
import Section from "@/components/common/Section";
import ItemsList from "@/components/ItemList";
import { withAuthServerSideProps } from "@/components/utils/authUtils";
import { GetServerSideProps } from "next";
import Head from "next/head";

// const MediaObjectsCreate = (props: any) => {
//   return (
//     <CreateGuesser {...props}>
//       <FileInput source="file">
//         <FileField source="src" title="title" />
//       </FileInput>
//     </CreateGuesser>
//   );
// };

// // const entrypoint = "http://php";

// export function ClientOnly({ children }: { children: ReactNode }) {
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   if (!hasMounted) {
//     return null;
//   }

//   return <>{children}</>;
// }

// const Admin = () => {
//   return (
//     <>
//       <Head>
//         <title>API Platform Admin</title>
//       </Head>

//       <ClientOnly>
//         <HydraAdmin entrypoint={"https://localhost"}>
//           <ResourceGuesser name={"categories"} />
//           <ResourceGuesser name={"companies"} />
//           <ResourceGuesser name={"jobs"} />
//           <ResourceGuesser name="media_objects" create={MediaObjectsCreate} />
//           <ResourceGuesser name={"people"} />
//           <ResourceGuesser name={"person_categories"} />
//           <ResourceGuesser name={"person_identity_fields"} />
//           <ResourceGuesser name={"person_jobs"} />
//           <ResourceGuesser name={"person_pictures"} />
//           <ResourceGuesser name={"person_relatives"} />
//           <ResourceGuesser name={"person_schools"} />
//           <ResourceGuesser name={"person_social_statuses"} />
//           <ResourceGuesser name={"schools"} />
//           <ResourceGuesser name={"sources"} />
//           <ResourceGuesser name={"source_medias"} />
//           <ResourceGuesser name={"type_identity_fields"} />
//           <ResourceGuesser name={"type_medias"} />
//           <ResourceGuesser name={"type_relatives"} />
//           <ResourceGuesser name={"type_social_statuses"} />
//           <ResourceGuesser name={"type_sources"} />
//         </HydraAdmin>
//       </ClientOnly>
//     </>
//   );
// };
// export default Admin;

const Admin = () => {
  return (
    <Main>
      <Head>
        <title>IMPACT project - Admin</title>
        <meta
          property="og:title"
          content="IMPACT project - Admin"
          key="title"
        />
      </Head>

      <Heading>Admin</Heading>

      <Section customClass="grid grid-cols-2 gap-10">
        <Heading level="h2" customStyle="col-span-2">
          Descriptive data
        </Heading>

        <div>
          <Heading level="h3">Categories</Heading>
          <ItemsList url="/categories" />
        </div>

        <div>
          <Heading level="h3">Type social status</Heading>
          <ItemsList url="/type_social_statuses" />
        </div>

        <div>
          <Heading level="h3">Type identity fields</Heading>
          <ItemsList url="/type_identity_fields" />
        </div>

        <div>
          <Heading level="h3">Type medias</Heading>
          {/* <ItemsList url="/type_medias" /> */}
        </div>
      </Section>

      <Section customClass="grid grid-cols-2 gap-10">
        <Heading level="h2" customStyle="col-span-2">
          Sources
        </Heading>

        <div>
          <Heading level="h3">Sources</Heading>
          <ItemsList url="/sources" />
        </div>

        <div>
          <Heading level="h3">Source medias</Heading>
          {/* <ItemsList url="/source_medias" /> */}
        </div>

        <div>
          <Heading level="h3">Type sources</Heading>
          <ItemsList url="/type_sources" />
        </div>
      </Section>

      <Section customClass="grid grid-cols-2 gap-10">
        <Heading level="h2" customStyle="col-span-2">
          Other
        </Heading>

        <div>
          <Heading level="h3">Companies</Heading>
          <ItemsList url="/companies" />
        </div>

        <div>
          <Heading level="h3">Schools</Heading>
          <ItemsList url="/schools" />
        </div>

        <div>
          <Heading level="h3">Type relatives</Heading>
          <ItemsList url="/type_relatives" />
        </div>
      </Section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await withAuthServerSideProps(context, "ROLE_ADMIN");
};

export default Admin;
