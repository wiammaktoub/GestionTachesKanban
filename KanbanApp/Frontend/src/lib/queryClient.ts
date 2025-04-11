import { QueryClient } from "@tanstack/react-query";

// Fonction pour vérifier que la réponse est OK, sinon on lance une erreur
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || res.statusText || `Erreur ${res.status}`);
  }
  return res;
}

// Fonction pour effectuer les requêtes API
export async function apiRequest(
  method: string,
  endpoint: string,
  body?: unknown
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Inclure les cookies pour l'authentification
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  // URL de base de l'API - à modifier selon votre configuration
  const res = await fetch(`http://localhost:8080${endpoint}`, options);
  return throwIfResNotOk(res);
}

// Options pour le comportement en cas de code 401 (non autorisé)
type UnauthorizedBehavior = "returnNull" | "throw";

// Fonction pour obtenir un queryFn pour React Query
export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
}) => {
  return async ({ queryKey }: { queryKey: string[] }): Promise<T | undefined> => {
    const [endpoint] = queryKey;
    try {
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        credentials: "include",
      });

      if (res.status === 401) {
        if (options.on401 === "returnNull") {
          return undefined;
        } else {
          throw new Error("Non autorisé");
        }
      }

      await throwIfResNotOk(res);
      return res.json();
    } catch (err) {
      console.error(`Erreur lors de la récupération des données pour ${endpoint}:`, err);
      throw err;
    }
  };
};

// Instance du QueryClient pour React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});