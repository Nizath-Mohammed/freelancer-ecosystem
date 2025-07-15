import { Link } from "wouter";
import { Network, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Network className="text-white h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-white">Conectify</span>
            </div>
            <p className="text-slate-400 mb-6">
              The AI-powered freelancer ecosystem transforming the $1.27 trillion gig economy.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Github className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* For Freelancers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Freelancers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Find Projects
                </Link>
              </li>
              <li>
                <Link href="/profile/edit" className="hover:text-white transition-colors">
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link href="/profile/edit" className="hover:text-white transition-colors">
                  Portfolio Builder
                </Link>
              </li>
              <li>
                <Link href="/dashboard/freelancer" className="hover:text-white transition-colors">
                  Business Tools
                </Link>
              </li>
              <li>
                <Link href="/qa" className="hover:text-white transition-colors">
                  Learning Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link href="/projects/post" className="hover:text-white transition-colors">
                  Project Management
                </Link>
              </li>
              <li>
                <Link href="/dashboard/agency" className="hover:text-white transition-colors">
                  Team Building
                </Link>
              </li>
              <li>
                <Link href="/dashboard/agency" className="hover:text-white transition-colors">
                  Agency Solutions
                </Link>
              </li>
              <li>
                <Link href="/dashboard/enterprise" className="hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <Link href="/qa" className="hover:text-white transition-colors">
                  Q&A Community
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm">
            © 2024 Conectify. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
