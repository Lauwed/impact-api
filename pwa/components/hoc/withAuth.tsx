import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { useEffect, ComponentType } from "react";

export function withAuth<T>(
  Component: ComponentType<T>,
  role: "ROLE_USER" | "ROLE_ADMIN" = "ROLE_USER"
) {
  return function AuthComponent(props: T) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    // Si l'utilisateur est authentifié, on affiche le composant, sinon on ne renvoie rien
    // @ts-ignore
    return user ? <Component {...props} /> : null;
  };
}
