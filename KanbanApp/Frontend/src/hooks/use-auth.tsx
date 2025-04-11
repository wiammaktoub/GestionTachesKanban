import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "./use-toast";

// Type pour l'utilisateur
type User = {
  id: number;
  username: string;
  name: string;
};

// Type pour les données d'inscription
type InsertUser = {
  username: string;
  password: string;
  name: string;
};

// Type pour les données de connexion
type LoginData = {
  username: string;
  password: string;
};

// Type pour le contexte d'authentification
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: InsertUser) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vérifie si l'utilisateur est connecté au chargement
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/user", {
          credentials: "include",
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else if (res.status !== 401) {
          // Ne pas traiter 401 comme une erreur - c'est juste que l'utilisateur n'est pas connecté
          throw new Error("Erreur lors de la vérification de l'utilisateur");
        }
      } catch (err) {
        setError("Erreur de connexion au serveur");
        console.error("Erreur lors de la vérification de l'utilisateur:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  // Fonction de connexion
  const login = async (credentials: LoginData) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/login", credentials);
      const userData = await res.json();
      setUser(userData);
      queryClient.setQueryData(["/api/user"], userData);
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${userData.name}!`,
      });
    } catch (err) {
      setError("Échec de connexion");
      toast({
        title: "Échec de la connexion",
        description: "Vérifiez vos identifiants",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (userData: InsertUser) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/register", userData);
      const newUser = await res.json();
      setUser(newUser);
      queryClient.setQueryData(["/api/user"], newUser);
      
      toast({
        title: "Inscription réussie",
        description: `Bienvenue, ${newUser.name}!`,
      });
      
      // Redirection automatique vers le tableau de bord après inscription
      window.location.href = "/"; // Utilisation de window.location pour un rechargement complet
    } catch (err) {
      setError("Échec d'inscription");
      toast({
        title: "Échec de l'inscription",
        description: "Cet utilisateur existe peut-être déjà",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/logout");
      setUser(null);
      queryClient.setQueryData(["/api/user"], null);
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt!",
      });
    } catch (err) {
      setError("Échec de déconnexion");
      toast({
        title: "Échec de la déconnexion",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}