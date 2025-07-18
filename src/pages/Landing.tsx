import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Shield, Zap, Globe, Award, UserCheck, X, Check } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { JobFeed } from '@/components/JobFeed/JobFeed';
import { FreelancerGrid } from '@/components/FreelancerProfiles/FreelancerGrid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Landing = () => {
  const navigate = useNavigate();
  const [showPricing, setShowPricing] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "AI-Powered Matching",
      description: "Get matched with perfect opportunities using our advanced AI algorithm with 94% accuracy."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "Verified Freelancers",
      description: "Work with top-rated, verified professionals who have proven track records and expertise."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Badge & Level System",
      description: "Earn badges and level up your profile based on your work quality and community contributions."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Payments",
      description: "Protected transactions with escrow services and multiple payment options including crypto."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b6c5f14b?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Conectify transformed my freelancing career. The AI matching is incredible - I get projects that perfectly match my skills!"
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Found amazing developers for our SaaS platform. The quality of freelancers here is unmatched."
    },
    {
      name: "Emily Watson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The badge system motivated me to improve my skills. Now I'm a Level 15 Knowledge Leader!"
    }
  ];

  const stats = [
    { value: "100K+", label: "Active Freelancers" },
    { value: "94%", label: "Match Accuracy" },
    { value: "4.8/5", label: "Client Satisfaction" },
    { value: "$50M+", label: "Paid to Freelancers" }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header variant="landing" />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              🚀 The Future of Freelancing is Here
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Connect, Work, <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Succeed
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your complete freelance ecosystem. AI-powered matching, top talent, 
              and all the tools you need to grow your career or find the perfect freelancer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-large">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="shadow-medium">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Discover Amazing Opportunities
            </h2>
            <p className="text-lg text-muted-foreground">
              See what's trending in the freelance world right now
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <JobFeed variant="preview" limit={4} />
          </div>
        </div>
      </section>

      {/* Talents Section */}
      <section id="talents" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Our Top Freelancers
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover verified professionals ready to bring your projects to life
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <FreelancerGrid variant="preview" limit={6} />
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/signup')}
            >
              View All Talent
            </Button>
          </div>
        </div>
      </section>

      {/* Q&A Preview Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Knowledge Sharing Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with experts, share insights, and grow your skills through our interactive Q&A platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-medium">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop" 
                  alt="Q&A Platform Preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Expert Discussions</h3>
              <p className="text-muted-foreground">
                Engage with industry experts and get answers to your most challenging questions.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-medium">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop" 
                  alt="Code Collaboration" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Code Reviews</h3>
              <p className="text-muted-foreground">
                Share your code, get feedback, and learn from experienced developers.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-medium">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" 
                  alt="Learning Community" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Learning Hub</h3>
              <p className="text-muted-foreground">
                Access a wealth of knowledge and tutorials shared by the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">
              Features
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI-powered matching to verified talent, we've built the ultimate platform for freelancers and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover-lift bg-card/80 backdrop-blur-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Loved by Freelancers & Clients
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of successful professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover-lift bg-card/80 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">
              About Us
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Revolutionizing Freelance Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to create the world's most trusted and efficient freelance platform, connecting exceptional talent with amazing opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Connecting freelancers and clients from over 150 countries worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Growth Focused</h3>
              <p className="text-muted-foreground">
                Helping freelancers scale their careers and businesses achieve their goals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Community First</h3>
              <p className="text-muted-foreground">
                Building a supportive ecosystem where everyone can thrive and succeed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join Conectify today and discover why we're the only platform freelancers and clients need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="shadow-large">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => setShowPricing(true)}
            >
              View Pricing Plans
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Choose Your Plan</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowPricing(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Marketplace Plan */}
              <Card className="p-6 border-2 border-border">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Marketplace</h3>
                  <div className="text-3xl font-bold text-primary mb-2">3%</div>
                  <p className="text-sm text-muted-foreground">per transaction</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Basic project matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Standard support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Payment protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Profile visibility</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </Card>
              
              {/* Business Plus Plan */}
              <Card className="p-6 border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Business Plus</h3>
                  <div className="text-3xl font-bold text-primary mb-2">5%</div>
                  <p className="text-sm text-muted-foreground">per transaction</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Advanced project matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Enhanced payment protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Featured profile listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Analytics dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Team collaboration tools</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={() => navigate('/signup')}
                >
                  Choose Plan
                </Button>
              </Card>
              
              {/* Enterprise Plan */}
              <Card className="p-6 border-2 border-border">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-primary mb-2">10%</div>
                  <p className="text-sm text-muted-foreground">per transaction</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">AI-powered matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">24/7 dedicated support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Premium payment protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Top-tier profile placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Advanced analytics & insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">White-label solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Account manager</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/signup')}
                >
                  Contact Sales
                </Button>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};