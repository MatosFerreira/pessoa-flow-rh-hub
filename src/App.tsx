
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SimpleAuthProvider, useSimpleAuth } from "./contexts/SimpleAuthContext";
import LandingPage from "./pages/LandingPage";
import SimpleLogin from "./pages/SimpleLogin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Pipeline from "./pages/Pipeline";
import Interviews from "./pages/Interviews";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import PublicJobApplication from "./pages/PublicJobApplication";
import SimpleRecruitmentLayout from "./components/SimpleRecruitmentLayout";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRoles }: { children: React.ReactNode; requiredRoles?: string[] }) => {
  const { isAuthenticated, isLoading, hasPermission } = useSimpleAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !hasPermission(requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SimpleAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<SimpleLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vaga/:jobId/inscricao" element={<PublicJobApplication />} />
            
            {/* Rotas Protegidas com SimpleRecruitmentLayout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <SimpleRecruitmentLayout>
                  <Dashboard />
                </SimpleRecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/vagas" element={
              <ProtectedRoute requiredRoles={['admin', 'hr', 'manager']}>
                <SimpleRecruitmentLayout>
                  <Jobs />
                </SimpleRecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/candidatos" element={
              <ProtectedRoute requiredRoles={['admin', 'hr', 'manager']}>
                <SimpleRecruitmentLayout>
                  <Candidates />
                </SimpleRecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/pipeline" element={
              <ProtectedRoute requiredRoles={['admin', 'hr', 'manager']}>
                <SimpleRecruitmentLayout>
                  <Pipeline />
                </SimpleRecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/entrevistas" element={
              <ProtectedRoute requiredRoles={['admin', 'hr', 'manager']}>
                <SimpleRecruitmentLayout>
                  <Interviews />
                </SimpleRecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/colaboradores" element={
              <ProtectedRoute requiredRoles={['admin', 'hr', 'manager']}>
                <SimpleRecruitmentLayout>
                  <Employees />
                </SimpleRecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <SimpleRecruitmentLayout>
                  <Settings />
                </SimpleRecruitmentLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SimpleAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
