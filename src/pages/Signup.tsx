import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Github, CheckCircle, Loader2 } from 'lucide-react';

import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'freelancer' | 'client' | 'agency';

export const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('freelancer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const roles = [
    {
      id: 'freelancer' as UserRole,
      title: 'Freelancer',
      description: 'I want to find projects and offer my services',
      icon: '👨‍💻',
      benefits: ['Access to thousands of projects', 'Skill-based matching', 'Portfolio showcase']
    },
    {
      id: 'client' as UserRole,
      title: 'Client',
      description: 'I want to hire talented freelancers',
      icon: '🏢',
      benefits: ['AI-powered talent matching', 'Project management tools', 'Secure payments']
    },
    {
      id: 'agency' as UserRole,
      title: 'Agency',
      description: 'I manage a team of freelancers',
      icon: '🚀',
      benefits: ['Team management dashboard', 'Client relationship tools', 'Revenue analytics']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    const result = await signup({
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password,
      role: selectedRole
    });
    
    if (result.success) {
      toast({
        title: 'Account created!',
        description: 'Welcome to Conectify! Your account has been created successfully.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Sign up failed',
        description: result.error || 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleOAuthSignup = (provider: string) => {
    toast({
      title: 'Demo Mode',
      description: `${provider} signup is not available in demo mode. Use the email form instead.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg p-8 shadow-large bg-card/80 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Join Conectify Today
            </h1>
            <p className="text-muted-foreground">
              Start your freelancing journey or find amazing talent
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-foreground mb-4">I am a...</h3>
            <div className="grid grid-cols-1 gap-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? 'border-primary bg-primary/5 shadow-medium'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{role.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{role.title}</h4>
                        {selectedRole === role.id && (
                          <CheckCircle className="w-4 h-4 text-primary animate-scale-in" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.benefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignup('google')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignup('github')}
            >
              <Github className="w-5 h-5 mr-3" />
              Continue with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Or create account with email</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-fast ${
                    errors.name ? 'border-destructive' : 'border-border'
                  }`}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-fast ${
                    errors.email ? 'border-destructive' : 'border-border'
                  }`}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-fast ${
                    errors.password ? 'border-destructive' : 'border-border'
                  }`}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-fast ${
                    errors.confirmPassword ? 'border-destructive' : 'border-border'
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  className="mt-1 rounded border-border text-primary focus:ring-primary" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              {errors.terms && (
                <p className="text-sm text-destructive">{errors.terms}</p>
              )}
            </div>

            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};