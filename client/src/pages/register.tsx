import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building, 
  Factory, 
  Network,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Register() {
  const [selectedUserType, setSelectedUserType] = useState<string>("");

  const userTypes = [
    {
      id: "freelancer",
      title: "Freelancer",
      description: "Find amazing projects and grow your career with AI-powered matching",
      icon: Users,
      color: "bg-blue-500",
      features: [
        "AI project matching",
        "Skill assessments", 
        "Badge system",
        "Portfolio builder"
      ]
    },
    {
      id: "client",
      title: "Client", 
      description: "Hire top talent with our AI-powered recommendation engine",
      icon: Building,
      color: "bg-green-500",
      features: [
        "94% match accuracy",
        "Escrow protection",
        "Project templates",
        "Team management"
      ]
    },
    {
      id: "agency",
      title: "Agency",
      description: "Manage teams and clients with our comprehensive CRM system", 
      icon: Users,
      color: "bg-purple-500",
      features: [
        "Team management",
        "Client CRM",
        "Analytics dashboard",
        "Revenue optimization"
      ]
    },
    {
      id: "enterprise",
      title: "Enterprise",
      description: "Scale your operations with enterprise-grade tools and support",
      icon: Factory,
      color: "bg-amber-500", 
      features: [
        "Vendor management",
        "Large project oversight",
        "Custom integrations",
        "24/7 support"
      ]
    }
  ];

  const handleContinue = () => {
    if (selectedUserType) {
      // Store user type preference and redirect to auth
      localStorage.setItem('conectify_user_type', selectedUserType);
      window.location.href = "/api/login";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Network className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Conectify</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Choose Your Path on Conectify
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you're a freelancer, business, or agency, we have the perfect ecosystem for your needs.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedUserType === type.id;
            
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'hover:border-slate-300'
                }`}
                onClick={() => setSelectedUserType(type.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{type.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{type.description}</p>
                  
                  <ul className="text-sm text-slate-600 space-y-2 mb-6">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-left">
                        <CheckCircle className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {isSelected && (
                    <Badge className="bg-primary text-white">
                      Selected
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleContinue}
            disabled={!selectedUserType}
            className="min-w-[200px]"
          >
            Continue as {selectedUserType ? userTypes.find(t => t.id === selectedUserType)?.title : 'User'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          {selectedUserType && (
            <p className="text-sm text-slate-600 mt-4">
              You'll be redirected to complete your profile after signing in
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button 
              onClick={() => window.location.href = "/api/login"}
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
