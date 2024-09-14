import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'; // Utilisation de js-cookie pour le client

// Définition des types pour l'utilisateur et le contexte d'authentification
interface User {
  email: string;
  [key: string]: any; // Autres propriétés utilisateur si nécessaire
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Création du contexte avec un type générique ou null au départ
const AuthContext = createContext<AuthContextType | null>(null);

// Fournisseur d'authentification pour encapsuler l'application
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Fonction pour vérifier si un utilisateur est connecté
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  // Fonction pour récupérer les informations de l'utilisateur connecté via l'API
  const fetchUser = async (token: string) => {
    try {
      const response = await fetch("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        logout();
        throw new Error(
          "Erreur lors de la récupération des informations utilisateur"
        );
      }

      const data: User = await response.json();
      setUser({ ...data, token });
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  // Fonction pour gérer la connexion de l'utilisateur
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Gestion des erreurs
        let errorMessage = "Login failed"; // Message d'erreur par défaut
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // Si le corps de la réponse ne peut pas être converti en JSON
          errorMessage = "Login failed";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Stocker le token JWT dans les cookies
      Cookies.set("token", data.token, { expires: 7 }); // Cookie expirant dans 7 jours

      // Récupérer les informations utilisateur
      fetchUser(data.token);

      // Rediriger vers la page principale après la connexion
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error; // Propager l'erreur pour le traitement éventuel
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour accéder au contexte d'authentification
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
