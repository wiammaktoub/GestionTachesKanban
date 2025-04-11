import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="text-7xl font-bold text-gray-200">404</div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Page non trouvée</h1>
      <p className="mt-2 text-base text-gray-500">Désolé, nous n'avons pas pu trouver la page que vous recherchez.</p>
      <div className="mt-6">
        <Link href="/" className="text-primary hover:text-primary/80">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}