import { useState } from "react";
import { Search, Filter, MapPin, Star, Clock, DollarSign, Shield, Award, Zap, MessageSquare, Phone, Video, Calendar, TrendingUp, Eye, CheckCircle, Globe, Languages, Briefcase, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Enhanced mock data for freelancers with comprehensive features
const mockFreelancers = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Senior Full-Stack Developer",
    location: "San Francisco, CA",
    timezone: "PST",
    languages: ["English", "Mandarin"],
    hourlyRate: 85,
    rating: 4.9,
    completedProjects: 147,
    responseTime: "1 hour",
    responseRate: 98,
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    profileImage: null,
    description: "Expert full-stack developer with 8+ years experience building scalable web applications for Fortune 500 companies.",
    availability: "Available",
    isVerified: true,
    isPro: true,
    successScore: 96,
    clientRetentionRate: 89,
    onTimeDelivery: 95,
    totalEarnings: 485000,
    portfolioItems: 12,
    certifications: ["AWS Certified", "React Expert", "Node.js Professional"],
    badges: ["Top Rated", "Rising Talent", "Expert Verified"],
    workingHours: "9 AM - 6 PM PST",
    videoIntroUrl: null,
    lastActive: "2 hours ago",
    jobSuccessRate: 98,
    clientSatisfaction: 4.9,
    repeatClients: 67,
    avgProjectValue: 3200,
    specializations: ["E-commerce", "SaaS", "Enterprise"],
    testScores: { "JavaScript": 95, "React": 92, "Node.js": 88 }
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    title: "UI/UX Designer & Frontend Developer",
    location: "New York, NY",
    timezone: "EST",
    languages: ["English", "Spanish"],
    hourlyRate: 75,
    rating: 4.8,
    completedProjects: 92,
    responseTime: "2 hours",
    responseRate: 94,
    skills: ["Figma", "React", "TypeScript", "Tailwind CSS", "Design Systems"],
    profileImage: null,
    description: "Creative designer and developer specializing in user-centered design and modern frontend development.",
    availability: "Available",
    isVerified: true,
    isPro: false,
    successScore: 91,
    clientRetentionRate: 82,
    onTimeDelivery: 93,
    totalEarnings: 278000,
    portfolioItems: 18,
    certifications: ["Google UX Design", "Adobe Certified Expert"],
    badges: ["Design Expert", "Client Favorite"],
    workingHours: "10 AM - 7 PM EST",
    videoIntroUrl: null,
    lastActive: "1 hour ago",
    jobSuccessRate: 96,
    clientSatisfaction: 4.8,
    repeatClients: 54,
    avgProjectValue: 2100,
    specializations: ["Mobile Apps", "Web Design", "Branding"],
    testScores: { "UI/UX Design": 97, "Figma": 94, "Frontend": 85 }
  },
  {
    id: "3",
    name: "David Kim",
    title: "DevOps Engineer & Cloud Architect",
    location: "Seattle, WA",
    timezone: "PST",
    languages: ["English", "Korean"],
    hourlyRate: 95,
    rating: 5.0,
    completedProjects: 78,
    responseTime: "30 minutes",
    responseRate: 99,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    profileImage: null,
    description: "Senior DevOps engineer with expertise in cloud infrastructure and automated deployment pipelines.",
    availability: "Busy",
    isVerified: true,
    isPro: true,
    successScore: 98,
    clientRetentionRate: 95,
    onTimeDelivery: 100,
    totalEarnings: 620000,
    portfolioItems: 8,
    certifications: ["AWS Solutions Architect", "Kubernetes Administrator", "Terraform Associate"],
    badges: ["Top Rated Plus", "Expert Verified", "Enterprise Specialist"],
    workingHours: "8 AM - 5 PM PST",
    videoIntroUrl: null,
    lastActive: "30 minutes ago",
    jobSuccessRate: 100,
    clientSatisfaction: 5.0,
    repeatClients: 78,
    avgProjectValue: 8500,
    specializations: ["Cloud Migration", "Infrastructure", "Automation"],
    testScores: { "AWS": 98, "Docker": 96, "Kubernetes": 94 }
  },
  {
    id: "4",
    name: "Elena Vasquez",
    title: "Data Scientist & ML Engineer",
    location: "Austin, TX",
    timezone: "CST",
    languages: ["English", "Spanish", "Python"],
    hourlyRate: 90,
    rating: 4.9,
    completedProjects: 64,
    responseTime: "1 hour",
    responseRate: 96,
    skills: ["Python", "Machine Learning", "TensorFlow", "AWS", "Data Analysis"],
    profileImage: null,
    description: "Experienced data scientist with expertise in machine learning, predictive analytics, and AI solutions for business growth.",
    availability: "Available",
    isVerified: true,
    isPro: true,
    successScore: 94,
    clientRetentionRate: 88,
    onTimeDelivery: 97,
    totalEarnings: 395000,
    portfolioItems: 15,
    certifications: ["Google Cloud ML", "TensorFlow Developer", "AWS ML Specialty"],
    badges: ["AI Expert", "Data Specialist", "Rising Star"],
    workingHours: "9 AM - 6 PM CST",
    videoIntroUrl: null,
    lastActive: "45 minutes ago",
    jobSuccessRate: 97,
    clientSatisfaction: 4.9,
    repeatClients: 58,
    avgProjectValue: 5500,
    specializations: ["Predictive Analytics", "NLP", "Computer Vision"],
    testScores: { "Python": 96, "Machine Learning": 93, "Statistics": 91 }
  }
];

export default function FreelancersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [priceRange, setPriceRange] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [proOnly, setProOnly] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);

  const filteredFreelancers = mockFreelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      freelancer.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAvailability = !availabilityFilter || freelancer.availability === availabilityFilter;
    const matchesVerified = !verifiedOnly || freelancer.isVerified;
    const matchesPro = !proOnly || freelancer.isPro;
    
    let matchesPrice = true;
    if (priceRange) {
      const rate = freelancer.hourlyRate;
      switch (priceRange) {
        case "under-50":
          matchesPrice = rate < 50;
          break;
        case "50-100":
          matchesPrice = rate >= 50 && rate <= 100;
          break;
        case "over-100":
          matchesPrice = rate > 100;
          break;
        default:
          matchesPrice = true;
      }
    }

    return matchesSearch && matchesAvailability && matchesVerified && matchesPro && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-conectify-accent via-white to-conectify-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-conectify-secondary mb-4">
            Find World-Class Talent
          </h1>
          <p className="text-xl text-conectify-neutral max-w-3xl mx-auto">
            Connect with verified professionals who deliver exceptional results for enterprise clients
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-conectify-neutral h-4 w-4" />
              <Input
                placeholder="Search freelancers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="rate">Hourly Rate</SelectItem>
                <SelectItem value="projects">Most Projects</SelectItem>
                <SelectItem value="response">Response Time</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-conectify-primary hover:bg-conectify-primary/90">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <Card key={freelancer.id} className="enterprise-card group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={freelancer.profileImage || undefined} />
                      <AvatarFallback className="bg-conectify-primary text-white text-lg">
                        {freelancer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-conectify-secondary group-hover:text-conectify-primary transition-colors">
                        {freelancer.name}
                      </CardTitle>
                      <p className="text-conectify-neutral font-medium">{freelancer.title}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-conectify-neutral">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{freelancer.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-conectify-warning text-conectify-warning" />
                          <span>{freelancer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={freelancer.availability === "Available" ? "default" : "secondary"}
                    className={freelancer.availability === "Available" ? "bg-conectify-success text-white" : ""}
                  >
                    {freelancer.availability}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-conectify-neutral mb-4 line-clamp-2">
                  {freelancer.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-conectify-neutral">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>${freelancer.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Responds in {freelancer.responseTime}</span>
                    </div>
                  </div>
                  <span className="font-medium">{freelancer.completedProjects} projects</span>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="flex-1 bg-conectify-primary hover:bg-conectify-primary/90">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-conectify-primary text-conectify-primary hover:bg-conectify-primary/10">
            Load More Freelancers
          </Button>
        </div>
      </div>
    </div>
  );
}