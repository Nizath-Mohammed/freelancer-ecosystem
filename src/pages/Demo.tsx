
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, Play, Pause, Users, Zap, Award, Shield, TrendingUp, Globe, UserCheck, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const demoSlides = [
  {
    id: 1,
    title: "Welcome to Conectify",
    subtitle: "The Future of Freelancing",
    content: "Discover how Conectify revolutionizes the way freelancers and clients connect, work, and succeed together.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    icon: <Globe className="w-12 h-12 text-primary" />,
    stats: ["100K+ Active Users", "150+ Countries", "4.8/5 Rating"]
  },
  {
    id: 2,
    title: "AI-Powered Matching",
    subtitle: "Find Perfect Projects Instantly",
    content: "Our advanced AI algorithm analyzes your skills, preferences, and work history to match you with projects that fit perfectly. No more endless scrolling through irrelevant jobs.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    icon: <Zap className="w-12 h-12 text-primary" />,
    features: ["94% Match Accuracy", "Smart Skill Analysis", "Personalized Recommendations", "Real-time Updates"]
  },
  {
    id: 3,
    title: "Verified Talent Network",
    subtitle: "Work with the Best",
    content: "Every freelancer on our platform goes through a rigorous verification process. Clients can trust they're working with skilled, reliable professionals.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    icon: <UserCheck className="w-12 h-12 text-primary" />,
    features: ["Identity Verification", "Skill Testing", "Portfolio Review", "Background Checks"]
  },
  {
    id: 4,
    title: "Badge & Level System",
    subtitle: "Gamify Your Growth",
    content: "Earn badges and level up your profile based on your work quality, client satisfaction, and community contributions. Stand out from the crowd.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
    icon: <Award className="w-12 h-12 text-primary" />,
    badges: ["Knowledge Leader", "Quality Expert", "Communication Pro", "Deadline Champion"]
  },
  {
    id: 5,
    title: "Secure Payments",
    subtitle: "Protected Transactions",
    content: "Advanced escrow system protects both freelancers and clients. Multiple payment options including traditional methods and cryptocurrency.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    icon: <Shield className="w-12 h-12 text-primary" />,
    features: ["Escrow Protection", "Multiple Payment Methods", "Crypto Support", "Instant Payouts"]
  },
  {
    id: 6,
    title: "Q&A Community",
    subtitle: "Learn & Share Knowledge",
    content: "Connect with experts, ask questions, and share your knowledge in our thriving community. Build your reputation as a thought leader.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
    icon: <MessageSquare className="w-12 h-12 text-primary" />,
    features: ["Expert Discussions", "Code Reviews", "Learning Resources", "Reputation Building"]
  },
  {
    id: 7,
    title: "Success Stories",
    subtitle: "Real Results from Real Users",
    content: "Join thousands of successful freelancers who have transformed their careers with Conectify. Your success story could be next.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    icon: <TrendingUp className="w-12 h-12 text-primary" />,
    testimonials: [
      { name: "Sarah Chen", result: "300% income increase" },
      { name: "Marcus Rodriguez", result: "Found dream team" },
      { name: "Emily Watson", result: "Level 15 Knowledge Leader" }
    ]
  },
  {
    id: 8,
    title: "Ready to Get Started?",
    subtitle: "Join Conectify Today",
    content: "Start your journey with Conectify and experience the future of freelancing. Create your account now and get matched with your first project within 24 hours.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    icon: <Users className="w-12 h-12 text-primary" />,
    cta: true
  }
];

export const Demo = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSlide();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demoSlides.length) % demoSlides.length);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = demoSlides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
          <h1 className="text-white font-semibold">Conectify Demo</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <div className="text-white text-sm">
            {currentSlide + 1} / {demoSlides.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/20">
        <div 
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${((currentSlide / demoSlides.length) * 100) + (progress / demoSlides.length)}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {demoSlides.map((slide, index) => (
            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Content */}
                  <div className="text-white space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      {slide.icon}
                      <Badge className="bg-primary/20 text-primary-foreground">
                        Slide {slide.id} of {demoSlides.length}
                      </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    
                    <h2 className="text-xl md:text-2xl text-white/80">
                      {slide.subtitle}
                    </h2>
                    
                    <p className="text-lg text-white/90 leading-relaxed">
                      {slide.content}
                    </p>

                    {/* Features List */}
                    {slide.features && (
                      <div className="grid grid-cols-2 gap-3">
                        {slide.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-white/90">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    {slide.stats && (
                      <div className="flex flex-wrap gap-6">
                        {slide.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {stat.split(' ')[0]}
                            </div>
                            <div className="text-sm text-white/80">
                              {stat.split(' ').slice(1).join(' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Badges */}
                    {slide.badges && (
                      <div className="flex flex-wrap gap-2">
                        {slide.badges.map((badge, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-primary/20 text-primary-foreground">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Testimonials */}
                    {slide.testimonials && (
                      <div className="space-y-3">
                        {slide.testimonials.map((testimonial, idx) => (
                          <Card key={idx} className="p-4 bg-white/10 border-white/20">
                            <div className="flex justify-between items-center text-white">
                              <span className="font-medium">{testimonial.name}</span>
                              <span className="text-primary font-semibold">{testimonial.result}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    {slide.cta && (
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button 
                          size="lg" 
                          className="bg-gradient-primary hover:opacity-90"
                          onClick={() => navigate('/signup')}
                        >
                          Start Your Journey
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-white text-white hover:bg-white hover:text-black"
                          onClick={() => navigate('/')}
                        >
                          Learn More
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Visual */}
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="w-full h-96 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-6">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-sm">
        {/* Previous Button */}
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-white hover:bg-white/20 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {demoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          onClick={nextSlide}
          disabled={currentSlide === demoSlides.length - 1}
          className="text-white hover:bg-white/20 disabled:opacity-50"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
