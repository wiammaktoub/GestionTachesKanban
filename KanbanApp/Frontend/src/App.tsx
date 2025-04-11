import { Switch, Route } from 'wouter';
import HomePage from './pages/home-page';
import AuthPage from './pages/auth-page';
import NotFound from './pages/not-found';
import { AuthProvider } from './hooks/use-auth';
import { ProtectedRoute } from './lib/protected-route';
import { Toaster } from './components/ui/toaster'; // ou votre composant Toaster personnalisé

// src/App.tsx
function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Switch>
          <ProtectedRoute path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;