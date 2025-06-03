
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Pipeline from "./pages/Pipeline";
import Interviews from "./pages/Interviews";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import PublicJobApplication from "./pages/PublicJobApplication";
import RecruitmentLayout from "./components/RecruitmentLayout";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vaga/:jobId/inscricao" element={<PublicJobApplication />} />
            
            {/* Rotas Protegidas com RecruitmentLayout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <RecruitmentLayout>
                  <Dashboard />
                </RecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/vagas" element={
              <ProtectedRoute>
                <RecruitmentLayout>
                  <Jobs />
                </RecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/candidatos" element={
              <ProtectedRoute>
                <RecruitmentLayout>
                  <Candidates />
                </RecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/pipeline" element={
              <ProtectedRoute>
                <RecruitmentLayout>
                  <Pipeline />
                </RecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/entrevistas" element={
              <ProtectedRoute>
                <RecruitmentLayout>
                  <Interviews />
                </RecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/colaboradores" element={
              <ProtectedRoute>
                <RecruitmentLayout>
                  <Employees />
                </RecruitmentLayout>
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <RecruitmentLayout>
                  <Settings />
                </RecruitmentLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
