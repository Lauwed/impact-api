// utils/authUtils.ts
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Cookies from "cookies";

export async function withAuthServerSideProps(
  context: GetServerSidePropsContext,
  role: string = "ROLE_ADMIN"
): Promise<GetServerSidePropsResult<any>> {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(`http://php/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const user = await response.json();

    if (!user.roles.includes(role)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
