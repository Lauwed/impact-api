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
import { useAuth } from "@/components/context/auth";
import Loading from "@/components/Loading";
import { withAuthServerSideProps } from "@/components/utils/authUtils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

      <Section>
        <Heading level="h2">Categories</Heading>
      </Section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await withAuthServerSideProps(context, "ROLE_ADMIN");
};

export default Admin;
