import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Star, 
  Shield, 
  TrendingUp, 
  Users, 
  Building, 
  Factory, 
  Globe,
  Code,
  Brain,
  CheckCircle,
  ArrowRight,
  Target,
  Award,
  Handshake,
  Network,
  BarChart3,
  Clock,
  DollarSign
} from "lucide-react";

export default function Landing() {
  const handleGetStarted = (userType?: string) => {
    window.location.href = `/api/login${userType ? `?type=${userType}` : ''}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Enterprise Professional */}
      <section className="relative overflow-hidden bg-gradient-to-br from-conectify-accent via-white to-conectify-accent/50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-conectify-primary rounded-lg flex items-center justify-center mr-4 enterprise-shadow">
                <Globe className="text-white h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-conectify-secondary">Conectify</h1>
                <span className="text-sm text-conectify-neutral font-medium -mt-1">Enterprise</span>
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold text-conectify-secondary mb-6 leading-tight">
              World-Class Talent.{" "}
              <span className="text-conectify-primary">Exceptional Results.</span>
            </h2>
            
            <p className="text-xl text-conectify-neutral mb-12 max-w-4xl mx-auto leading-relaxed">
              The enterprise-grade AI-powered talent ecosystem trusted by Fortune 500 companies. 
              Connect with world-class professionals and deliver mission-critical projects with confidence.
            </p>

            {/* Professional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
              <div className="text-center p-6 bg-white rounded-xl enterprise-shadow">
                <div className="text-4xl font-bold text-conectify-secondary mb-2">$1.27T</div>
                <div className="text-conectify-neutral font-medium">Global Market Size</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl enterprise-shadow">
                <div className="text-4xl font-bold text-conectify-secondary mb-2">73M+</div>
                <div className="text-conectify-neutral font-medium">Verified Professionals</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl enterprise-shadow">
                <div className="text-4xl font-bold text-conectify-secondary mb-2">99.9%</div>
                <div className="text-conectify-neutral font-medium">Enterprise Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection - Enterprise Layout */}
      <section className="py-20 bg-conectify-accent/30 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-conectify-secondary mb-6">Choose Your Enterprise Solution</h2>
            <p className="text-xl text-conectify-neutral max-w-3xl mx-auto">
              Join the platform that delivers enterprise-grade talent solutions with precision and scale.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Professionals Section */}
            <Card className="enterprise-card bg-white dark:bg-gray-900 border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-conectify-primary rounded-lg flex items-center justify-center mr-4 enterprise-shadow">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-conectify-secondary">For Professionals</h3>
                    <p className="text-conectify-neutral">Join the elite talent network</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">Access Fortune 500 clients</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">AI-powered project matching</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">Professional skill verification</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">Enterprise payment protection</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-conectify-primary hover:bg-conectify-primary/90 text-white h-12 text-lg enterprise-shadow" 
                  onClick={() => handleGetStarted('freelancer')}
                >
                  Join Professional Network
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Enterprises Section */}
            <Card className="enterprise-card bg-white dark:bg-gray-900 border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-conectify-secondary rounded-lg flex items-center justify-center mr-4 enterprise-shadow">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-conectify-secondary">For Enterprises</h3>
                    <p className="text-conectify-neutral">Scale with verified talent</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">Pre-vetted professional talent</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">94% successful project completion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-conectify-success mr-3 h-5 w-5" />
                    <span className="text-conectify-neutral">Dedicated success management</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-conectify-secondary hover:bg-conectify-secondary/90 text-white h-12 text-lg enterprise-shadow" 
                  onClick={() => handleGetStarted('client')}
                >
                  Access Enterprise Talent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Agency & Enterprise Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Agencies Section */}
            <Card className="professional-shadow border-0 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-4">
                    <Network className="h-8 w-8 text-white dark:text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black dark:text-white">For Agencies</h3>
                    <p className="text-gray-600 dark:text-gray-300">Scale your operations</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Multi-client project management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Team performance analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">White-label solutions</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-12 text-lg" 
                  onClick={() => handleGetStarted('agency')}
                >
                  Start Agency
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Section */}
            <Card className="professional-shadow border-0 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-4">
                    <Factory className="h-8 w-8 text-white dark:text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black dark:text-white">Enterprise</h3>
                    <p className="text-gray-600 dark:text-gray-300">Custom solutions</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Custom integrations & APIs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Dedicated support team</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">SLA guarantees</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-12 text-lg" 
                  onClick={() => handleGetStarted('enterprise')}
                >
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade platform with professional tools for every stage of your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 professional-shadow bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-white dark:text-black h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-4">Enterprise Security</h3>
                <p className="text-gray-600 dark:text-gray-300">Bank-level encryption, SOC 2 compliance, and advanced fraud protection for all transactions.</p>
              </CardContent>
            </Card>

            <Card className="border-0 professional-shadow bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Brain className="text-white dark:text-black h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-4">AI Matching</h3>
                <p className="text-gray-600 dark:text-gray-300">Advanced algorithms analyze 200+ factors to ensure perfect matches between talent and projects.</p>
              </CardContent>
            </Card>

            <Card className="border-0 professional-shadow bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Globe className="text-white dark:text-black h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-4">Global Reach</h3>
                <p className="text-gray-600 dark:text-gray-300">Connect with professionals across 190+ countries with localized payment and support systems.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-6">Why Professionals Choose Conectify</h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Verified Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">All professionals undergo rigorous verification and skill assessment.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">Protected transactions with escrow and milestone-based payments.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-purple-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Round-the-clock professional support for critical project needs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-orange-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive insights and reporting for performance optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA */}
      <section className="py-20 bg-black dark:bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white dark:text-black mb-6">
            Ready to Transform Your Professional Network?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-700 mb-12">
            Join the platform that's reshaping how professionals connect, collaborate, and succeed globally.
          </p>
          <Button 
            size="lg"
            className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 px-8 py-4 text-lg"
            onClick={() => handleGetStarted()}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-3">
              <Building2 className="text-white dark:text-black h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-black dark:text-white">Conectify</span>
          </div>
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>&copy; 2025 Conectify. Professional freelance ecosystem for global businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}