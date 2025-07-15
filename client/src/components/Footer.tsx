import { Globe, Shield, Award, Users, Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-conectify-secondary text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-conectify-primary rounded-lg flex items-center justify-center enterprise-shadow">
                <Globe className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Conectify</span>
                <span className="text-xs text-gray-300 font-medium -mt-1">Enterprise</span>
              </div>
            </div>
            <p className="text-conectify-neutral mb-6 leading-relaxed">
              The enterprise-grade AI-powered talent ecosystem transforming how Fortune 500 companies connect with world-class professionals.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-conectify-success" />
                <span className="text-sm text-conectify-neutral">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-conectify-warning" />
                <span className="text-sm text-conectify-neutral">ISO 27001</span>
              </div>
            </div>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              For Professionals
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Elite Talent Network</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Executive Opportunities</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Skills Certification</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Professional Development</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Industry Insights</a></li>
            </ul>
          </div>

          {/* For Enterprises */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              For Enterprises
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Strategic Consulting</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Workforce Solutions</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Global Talent Access</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Enterprise API</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Custom Integration</a></li>
            </ul>
          </div>

          {/* Enterprise Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise Support
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">24/7 Support</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Knowledge Base</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Dedicated Success Manager</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">System Status</a></li>
              <li><a href="#" className="text-conectify-neutral hover:text-white transition-colors hover:underline">Security Center</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-conectify-neutral/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-8">
              <div className="text-conectify-neutral text-sm">
                © 2025 Conectify Enterprise. All rights reserved.
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-conectify-success" />
                  <span className="text-xs text-conectify-neutral">SOC 2 Type II</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 text-conectify-warning" />
                  <span className="text-xs text-conectify-neutral">ISO 27001</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-conectify-neutral hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-conectify-neutral hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-conectify-neutral hover:text-white transition-colors">Data Processing Agreement</a>
              <a href="#" className="text-conectify-neutral hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
