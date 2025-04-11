import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../hooks/use-auth";
import { Redirect } from "wouter";
import { Loader2, CheckCircle2, ClipboardList } from "lucide-react";
import { insertUserSchema } from "../shared/schema";

const loginSchema = z.object({
  username: z.string().min(1, "L'adresse email est requise").email("Format email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { user, login, register, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (user) {
    return <Redirect to="/" />;
  }

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerSchema = z.object({
    username: z.string().min(1, "L'adresse email est requise").email("Format email invalide"),
    name: z.string().min(1, "Le nom est requis"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    try {
      await login(values);
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...userInfo } = values;
      await register(userInfo);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="m-auto w-full max-w-4xl p-4 md:p-8 flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 bg-white p-8 rounded-l-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="text-primary text-4xl">
                <ClipboardList />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">TaskFlow</h1>
            <p className="text-gray-600">
              {activeTab === "login" ? "Connectez-vous à votre compte" : "Créez votre compte"}
            </p>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab("login")}
                className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "login"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                type="button"
              >
                Connexion
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "register"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                type="button"
              >
                Inscription
              </button>
            </div>
          </div>
          
          {activeTab === "login" ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <input
                  type="email"
                  {...loginForm.register("username")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="john@example.com"
                />
                {loginForm.formState.errors.username && (
                  <p className="text-sm text-red-500">{loginForm.formState.errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  {...loginForm.register("password")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                Vous n'avez pas de compte ?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setActiveTab("register")}
                >
                  S'inscrire
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  {...registerForm.register("name")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="John Doe"
                />
                {registerForm.formState.errors.name && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <input
                  type="email"
                  {...registerForm.register("username")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="john@example.com"
                />
                {registerForm.formState.errors.username && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  {...registerForm.register("password")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  {...registerForm.register("confirmPassword")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Création du compte...
                  </>
                ) : (
                  "Créer un compte"
                )}
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                Vous avez déjà un compte ?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setActiveTab("login")}
                >
                  Se connecter
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="hidden md:flex md:flex-1 bg-primary text-white p-8 flex-col justify-center items-center rounded-r-lg">
          <div className="max-w-md space-y-6">
            <h2 className="text-3xl font-bold mb-4">Gérez vos tâches facilement</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle2 className="mr-3 h-6 w-6 text-white" />
                <div>
                  <h3 className="font-medium">Organisez vos tâches</h3>
                  <p className="text-sm opacity-90">Organisez efficacement vos tâches avec notre tableau Kanban intuitif.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-3 h-6 w-6 text-white" />
                <div>
                  <h3 className="font-medium">Collaborez</h3>
                  <p className="text-sm opacity-90">Partagez des tâches avec les membres de l'équipe et suivez les progrès ensemble.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-3 h-6 w-6 text-white" />
                <div>
                  <h3 className="font-medium">Respectez les délais</h3>
                  <p className="text-sm opacity-90">Ne manquez jamais une échéance avec le suivi des dates d'échéance et les notifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;