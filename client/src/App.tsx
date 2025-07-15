import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import CreateProject from "@/pages/create-project";
import ProjectDetail from "@/pages/project-detail";
import QA from "@/pages/qa";
import Profile from "@/pages/profile";
import Agency from "@/pages/agency";
import Freelancers from "@/pages/freelancers";
import Enterprise from "@/pages/enterprise";
import Messages from "@/pages/messages";
import Notifications from "@/pages/notifications";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import QuestionDetail from "@/pages/qa/question-detail";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/freelancers" component={Freelancers} />
          <Route path="/enterprise" component={Enterprise} />
          <Route path="/register" component={Register} />
        </>
      ) : (
        <Layout>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/create" component={CreateProject} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/qa" component={QA} />
          <Route path="/qa/question/:id" component={QuestionDetail} />
          <Route path="/profile/:id?" component={Profile} />
          <Route path="/agency" component={Agency} />
          <Route path="/freelancers" component={Freelancers} />
          <Route path="/enterprise" component={Enterprise} />
          <Route path="/messages" component={Messages} />
          <Route path="/notifications" component={Notifications} />
        </Layout>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
