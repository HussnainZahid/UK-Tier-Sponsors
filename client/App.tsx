import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Industry from "./pages/Industry";
import Location from "./pages/Location";
import Statistics from "./pages/Statistics";
import AllData from "./pages/AllData";
import RecentData from "./pages/RecentData";
import DeletedData from "./pages/DeletedData";
import TestAllData from "./pages/TestAllData";
import SimpleAllData from "./pages/SimpleAllData";
import WorkingAllData from "./pages/WorkingAllData";
import Login from "./pages/Login";
import AuthSimple from "./pages/AuthSimple";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import ReleaseNotes from "./pages/ReleaseNotes";
import Privacy from "./pages/Privacy";
import TestPage from "./pages/TestPage";
import ExportData from "./pages/ExportData";
import Download from "./pages/Download";
import Resources from "./pages/Resources";
import AuthCallback from "./pages/AuthCallback";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/industry" element={<Industry />} />
              <Route path="/location" element={<Location />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/data/all" element={<WorkingAllData />} />
              <Route path="/data/recent" element={<RecentData />} />
              <Route path="/data/deleted" element={<DeletedData />} />
              <Route path="/data/export" element={<ExportData />} />
              <Route path="/download/:type" element={<Download />} />
              <Route path="/test/all" element={<TestAllData />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/simple" element={<AuthSimple />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/releases" element={<ReleaseNotes />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

createRoot(document.getElementById("root")!).render(<App />);
