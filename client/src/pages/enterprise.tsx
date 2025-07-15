import { useState } from "react";
import { Shield, Users, Award, TrendingUp, Building2, Globe, CheckCircle, ArrowRight, FileText, DollarSign, BarChart3, Brain, Target, Briefcase, Calendar, MessageSquare, Video, Cloud, FileSignature, PieChart, Activity, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function EnterprisePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const enterpriseFeatures = [
    {
      category: "Team & Project Management",
      icon: Users,
      color: "text-blue-600",
      items: [
        { name: "Team accounts & roles", description: "Admins, reviewers, approvers with granular permissions" },
        { name: "Project dashboard", description: "Milestone tracking and real-time progress monitoring" },
        { name: "Timesheet integration", description: "Billable hour tracking and productivity scoring" },
        { name: "Permission-based access", description: "Role-based access control for projects & data" }
      ]
    },
    {
      category: "Advanced Contracting & Legal",
      icon: FileText,
      color: "text-green-600",
      items: [
        { name: "Custom contract templates", description: "Tailored legal documents for your industry" },
        { name: "NDAs & IP agreements", description: "Automated intellectual property protection" },
        { name: "E-signature integration", description: "DocuSign, HelloSign seamless workflow" },
        { name: "Tax & compliance support", description: "Multi-country tax handling and compliance" }
      ]
    },
    {
      category: "Custom Billing & Payments",
      icon: DollarSign,
      color: "text-purple-600",
      items: [
        { name: "Consolidated invoicing", description: "Team-wide billing management" },
        { name: "Custom payment terms", description: "Weekly, monthly, milestone-based payments" },
        { name: "Multi-currency support", description: "Global payment processing" },
        { name: "Enterprise wallets", description: "Advanced budgeting and financial controls" }
      ]
    },
    {
      category: "Security & Access Control",
      icon: Shield,
      color: "text-red-600",
      items: [
        { name: "SSO/SAML login", description: "Single sign-on with enterprise identity providers" },
        { name: "Granular access control", description: "Fine-grained permissions for all resources" },
        { name: "Audit logs", description: "Complete activity tracking and forensic capabilities" },
        { name: "Compliance tools", description: "GDPR, SOC2, ISO 27001 compliance automation" }
      ]
    },
    {
      category: "Advanced Analytics & Insights",
      icon: BarChart3,
      color: "text-orange-600",
      items: [
        { name: "Performance analytics", description: "Freelancer and team performance insights" },
        { name: "Cost vs ROI dashboards", description: "Financial performance tracking" },
        { name: "Productivity scoring", description: "Time tracking and efficiency metrics" },
        { name: "Real-time reporting", description: "Live project status and resource allocation" }
      ]
    },
    {
      category: "AI-Enabled Tools",
      icon: Brain,
      color: "text-pink-600",
      items: [
        { name: "AI-powered recommendations", description: "Smart freelancer matching and suggestions" },
        { name: "Auto-proposal summaries", description: "Intelligent proposal analysis and ranking" },
        { name: "Smart task breakdown", description: "Automated project requirement analysis" },
        { name: "Behavioral profiling", description: "Freelancer personality and work style analysis" }
      ]
    }
  ];

  const integrations = [
    { name: "Slack", icon: MessageSquare, category: "Communication", status: "Active" },
    { name: "Microsoft Teams", icon: Users, category: "Communication", status: "Active" },
    { name: "Jira", icon: Briefcase, category: "Project Management", status: "Active" },
    { name: "Trello", icon: Briefcase, category: "Project Management", status: "Available" },
    { name: "Asana", icon: Target, category: "Project Management", status: "Available" },
    { name: "Google Drive", icon: Cloud, category: "File Storage", status: "Active" },
    { name: "Dropbox", icon: Cloud, category: "File Storage", status: "Active" },
    { name: "DocuSign", icon: FileSignature, category: "Legal", status: "Active" },
    { name: "Calendly", icon: Calendar, category: "Scheduling", status: "Available" },
    { name: "Zoom", icon: Video, category: "Communication", status: "Active" }
  ];

  const complianceStandards = [
    { name: "SOC 2 Type II", status: "Certified", validUntil: "2025-12-31" },
    { name: "ISO 27001", status: "Certified", validUntil: "2025-10-15" },
    { name: "GDPR", status: "Compliant", validUntil: "Ongoing" },
    { name: "HIPAA", status: "Available", validUntil: "On Request" },
    { name: "PCI DSS", status: "Compliant", validUntil: "2025-08-30" }
  ];

  const analyticsMetrics = [
    { name: "Time to Hire", value: "3.2 days", change: "-15%" },
    { name: "Project Success Rate", value: "98.5%", change: "+2.3%" },
    { name: "Cost Savings", value: "$2.4M", change: "+18%" },
    { name: "Team Productivity", value: "94%", change: "+8%" },
    { name: "Client Satisfaction", value: "4.9/5", change: "+0.2" },
    { name: "Talent Retention", value: "91%", change: "+5%" }
  ];

  const stats = [
    { value: "500+", label: "Fortune 500 Companies" },
    { value: "94%", label: "Project Success Rate" },
    { value: "48hrs", label: "Average Match Time" },
    { value: "99.9%", label: "Platform Uptime" }
  ];

  const pricing = [
    {
      name: "Professional",
      price: "$2,500",
      period: "per month",
      description: "Perfect for growing teams",
      features: [
        "Up to 50 concurrent projects",
        "Advanced matching algorithms",
        "Priority support",
        "Basic analytics",
        "Standard security"
      ]
    },
    {
      name: "Enterprise",
      price: "$7,500",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited projects",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "Enterprise security",
        "Custom onboarding"
      ],
      popular: true
    },
    {
      name: "Enterprise+",
      price: "Custom",
      period: "pricing",
      description: "Tailored for your needs",
      features: [
        "White-label solution",
        "Custom development",
        "Multi-tenant architecture",
        "Advanced compliance",
        "Global deployment",
        "24/7 premium support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-conectify-accent via-white to-conectify-accent/30">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-conectify-primary rounded-lg flex items-center justify-center mr-4 enterprise-shadow">
                <Building2 className="text-white h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-conectify-secondary">Enterprise Solutions</h1>
                <span className="text-sm text-conectify-neutral font-medium -mt-1">Powered by Conectify</span>
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold text-conectify-secondary mb-6 leading-tight">
              Enterprise-Grade{" "}
              <span className="text-conectify-primary">Talent Ecosystem</span>
            </h2>
            
            <p className="text-xl text-conectify-neutral mb-12 max-w-4xl mx-auto leading-relaxed">
              Complete enterprise solution with advanced team management, AI-powered hiring, 
              custom integrations, and enterprise-grade security for Fortune 500 companies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-conectify-primary hover:bg-conectify-primary/90 text-lg px-8 py-6">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Schedule Your Enterprise Demo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Smith" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Work Email</Label>
                      <Input id="email" type="email" placeholder="john.smith@company.com" />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Company Name" />
                    </div>
                    <div>
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10-50">10-50 employees</SelectItem>
                          <SelectItem value="50-200">50-200 employees</SelectItem>
                          <SelectItem value="200-1000">200-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea id="requirements" placeholder="Tell us about your specific needs..." />
                    </div>
                    <Button className="w-full bg-conectify-primary hover:bg-conectify-primary/90">
                      Book Demo Call
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="border-conectify-primary text-conectify-primary hover:bg-conectify-primary/10 text-lg px-8 py-6">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {analyticsMetrics.map((metric, index) => (
                  <Card key={index} className="enterprise-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-conectify-neutral">{metric.name}</p>
                          <p className="text-2xl font-bold text-conectify-secondary">{metric.value}</p>
                        </div>
                        <Badge variant={metric.change.startsWith('+') ? 'default' : 'secondary'} className="bg-conectify-success text-white">
                          {metric.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-conectify-primary" />
                      <span>Team Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-conectify-neutral">Active Teams</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-conectify-neutral">Team Members</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-conectify-neutral">Active Projects</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <Progress value={87} className="h-2" />
                      <p className="text-xs text-conectify-neutral">87% team utilization</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-conectify-primary" />
                      <span>AI Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-conectify-primary rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Recommended Talent</p>
                          <p className="text-xs text-conectify-neutral">5 new matches for React project</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-conectify-warning rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Budget Optimization</p>
                          <p className="text-xs text-conectify-neutral">Save 15% with hourly rate adjustments</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-conectify-success rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Performance Alert</p>
                          <p className="text-xs text-conectify-neutral">3 freelancers exceeding expectations</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <div className="space-y-8">
                {enterpriseFeatures.map((feature, index) => (
                  <Card key={index} className="enterprise-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center`}>
                          <feature.icon className={`h-5 w-5 ${feature.color}`} />
                        </div>
                        <span>{feature.category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feature.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                            <CheckCircle className="h-4 w-4 text-conectify-success mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-conectify-neutral">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration, index) => (
                  <Card key={index} className="enterprise-card group cursor-pointer" onClick={() => setSelectedIntegration(integration.name)}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-conectify-primary/10 rounded-lg flex items-center justify-center">
                            <integration.icon className="h-5 w-5 text-conectify-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{integration.name}</h3>
                            <p className="text-sm text-conectify-neutral">{integration.category}</p>
                          </div>
                        </div>
                        <Badge variant={integration.status === 'Active' ? 'default' : 'secondary'} className={integration.status === 'Active' ? 'bg-conectify-success text-white' : ''}>
                          {integration.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-conectify-primary group-hover:text-white">
                        {integration.status === 'Active' ? 'Configure' : 'Setup'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-8">
              <div className="space-y-8">
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-conectify-primary" />
                      <span>Security & Compliance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {complianceStandards.map((standard, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                          <div>
                            <p className="font-medium">{standard.name}</p>
                            <p className="text-sm text-conectify-neutral">Valid until {standard.validUntil}</p>
                          </div>
                          <Badge variant={standard.status === 'Certified' || standard.status === 'Compliant' ? 'default' : 'secondary'} className={standard.status === 'Certified' || standard.status === 'Compliant' ? 'bg-conectify-success text-white' : ''}>
                            {standard.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="enterprise-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Key className="h-5 w-5 text-conectify-primary" />
                        <span>Access Control</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Single Sign-On (SSO)</span>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Two-Factor Authentication</span>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Role-Based Access Control</span>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Audit Logging</span>
                          <Switch checked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="enterprise-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-conectify-primary" />
                        <span>Security Monitoring</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Real-time Monitoring</span>
                          <Badge className="bg-conectify-success text-white">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Threat Detection</span>
                          <Badge className="bg-conectify-success text-white">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Incident Response</span>
                          <Badge className="bg-conectify-success text-white">24/7</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Vulnerability Scanning</span>
                          <Badge className="bg-conectify-success text-white">Daily</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-8">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="enterprise-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-conectify-neutral">Active Projects</p>
                          <p className="text-2xl font-bold text-conectify-secondary">89</p>
                        </div>
                        <Briefcase className="h-8 w-8 text-conectify-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="enterprise-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-conectify-neutral">Total Freelancers</p>
                          <p className="text-2xl font-bold text-conectify-secondary">1,247</p>
                        </div>
                        <Users className="h-8 w-8 text-conectify-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="enterprise-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-conectify-neutral">Monthly Spend</p>
                          <p className="text-2xl font-bold text-conectify-secondary">$2.4M</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-conectify-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="enterprise-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-conectify-neutral">Success Rate</p>
                          <p className="text-2xl font-bold text-conectify-secondary">98.5%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-conectify-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5 text-conectify-primary" />
                      <span>Performance Analytics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Team Productivity</span>
                          <span className="text-sm font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Project Completion Rate</span>
                          <span className="text-sm font-medium">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Client Satisfaction</span>
                          <span className="text-sm font-medium">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Cost Efficiency</span>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-conectify-secondary mb-4">Enterprise Pricing</h2>
                  <p className="text-conectify-neutral max-w-2xl mx-auto">
                    Scalable pricing designed for enterprise teams. Get advanced features, dedicated support, and custom integrations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="enterprise-card">
                    <CardHeader>
                      <CardTitle>Professional</CardTitle>
                      <div className="text-3xl font-bold text-conectify-primary">$49<span className="text-sm text-conectify-neutral">/user/month</span></div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Up to 50 team members</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Project management tools</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Basic analytics</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Email support</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-conectify-primary hover:bg-conectify-primary/90">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="enterprise-card border-2 border-conectify-primary">
                    <CardHeader>
                      <Badge className="bg-conectify-primary text-white mb-2">Most Popular</Badge>
                      <CardTitle>Enterprise</CardTitle>
                      <div className="text-3xl font-bold text-conectify-primary">$99<span className="text-sm text-conectify-neutral">/user/month</span></div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Unlimited team members</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Advanced project management</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Full analytics suite</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Priority support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Custom integrations</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-conectify-primary hover:bg-conectify-primary/90">
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="enterprise-card">
                    <CardHeader>
                      <CardTitle>Custom</CardTitle>
                      <div className="text-3xl font-bold text-conectify-primary">Custom</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Everything in Enterprise</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Dedicated account manager</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">Custom SLA agreements</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">24/7 phone support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-conectify-success" />
                          <span className="text-sm">On-premise deployment</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-conectify-primary hover:bg-conectify-primary/90">
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-conectify-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of Fortune 500 companies using Conectify to scale their teams 
            and accelerate project delivery with world-class talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-conectify-primary hover:bg-gray-100 text-lg px-8 py-6">
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
