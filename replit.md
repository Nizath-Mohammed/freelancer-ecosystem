# Conectify - AI-Powered Freelancer Ecosystem

## Overview

Conectify is a comprehensive full-stack web application designed to disrupt the $1.27 trillion gig economy. It's an AI-powered freelancer ecosystem that connects freelancers, clients, agencies, and enterprises through intelligent matching, project management, and collaboration tools.

## User Preferences

Preferred communication style: Simple, everyday language.
UI Design Preference: Professional, enterprise-grade design suitable for Fortune 500 companies and industry professionals. Avoid childish elements, use professional logos and corporate-friendly aesthetics.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful APIs with WebSocket integration
- **Authentication**: OpenID Connect (OIDC) with Replit Auth
- **Session Management**: Express sessions with PostgreSQL storage

### Database Architecture
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Driver**: Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- **Provider**: Replit Auth with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Authorization**: Role-based access control (RBAC) for different user types
- **User Roles**: Freelancer, Client, Agency, Enterprise

### User Management
- **Profile System**: Comprehensive user profiles with skills, portfolio, and certifications
- **Badge System**: Gamification with XP points, levels, and achievement badges
- **Verification**: User verification system for trust and credibility

### Project Management
- **Project Lifecycle**: Complete project workflow from posting to completion
- **Proposal System**: Freelancer bidding and proposal submission
- **Milestone Tracking**: Project progress monitoring with status updates
- **Real-time Collaboration**: WebSocket-based live updates and notifications

### AI Matching Engine
- **Compatibility Scoring**: AI-powered matching with 94% accuracy target
- **Skill Assessment**: Automated skill evaluation and recommendation
- **Smart Recommendations**: Personalized project and talent suggestions

### Q&A Community
- **Knowledge Sharing**: Stack Overflow-style Q&A platform
- **Voting System**: Community-driven content curation
- **Badge Integration**: Q&A contributions tied to user reputation

### Real-time Features
- **WebSocket Integration**: Live notifications, messages, and updates
- **Notifications**: Real-time alerts for bids, messages, and project updates
- **Live Collaboration**: Real-time document editing and communication

## Data Flow

### Authentication Flow
1. User initiates login through Replit Auth
2. OIDC provider validates credentials
3. Session created and stored in PostgreSQL
4. User data fetched and cached on client

### Project Workflow
1. Client posts project with requirements
2. AI engine analyzes and suggests matching freelancers
3. Freelancers submit proposals
4. Client reviews and selects freelancer
5. Project progresses through milestones
6. Real-time updates via WebSocket

### Real-time Communication
1. WebSocket connection established on authentication
2. Events broadcast to relevant users
3. Client updates UI reactively
4. Persistent storage in PostgreSQL

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL for primary data storage
- **Authentication**: Replit Auth for OIDC authentication
- **File Storage**: AWS S3 (planned) for file uploads and portfolios
- **CDN**: CloudFront (planned) for static asset delivery

### Development Tools
- **Type Safety**: TypeScript for full-stack type safety
- **Schema Validation**: Zod for runtime type validation
- **Code Quality**: ESLint and Prettier (implied by structure)
- **Development**: Hot module replacement via Vite

### UI/UX Libraries
- **Component Library**: Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reloading**: Full-stack hot reload with file watching
- **Environment Variables**: DATABASE_URL, SESSION_SECRET, REPL_ID
- **Database**: Neon serverless PostgreSQL connection

### Production Build
- **Frontend**: Vite build with static asset optimization
- **Backend**: ESBuild bundling for Node.js deployment
- **Assets**: Static file serving through Express
- **Process Management**: Single process serving both frontend and API

### Scalability Considerations
- **Database**: Connection pooling for high concurrency
- **WebSocket**: Clustered WebSocket support for horizontal scaling
- **Caching**: Redis integration planned for session and data caching
- **CDN**: Static asset delivery optimization

The application follows a monorepo structure with shared types and schemas, enabling type safety across the full stack while maintaining clear separation of concerns between client and server code.

## Recent Changes

### Comprehensive Platform Features Implementation (January 2025)
- **Dashboard Widget System**: Implemented modular dashboard with stats, activity, projects, and AI recommendations widgets
- **Advanced Notification System**: Created comprehensive notification management with real-time alerts, filtering, and action capabilities
- **Q&A Community Platform**: Built complete question detail pages with voting, answer submission, and user interactions
- **Enterprise UI Components**: Enhanced all components with professional styling and enterprise-grade design patterns
- **Real-time Features**: Added WebSocket integration support for live notifications and updates
- **Navigation Enhancement**: Connected all pages with proper routing and seamless user experience
- **Performance Optimization**: Fixed syntax errors and improved component efficiency

### UI Design Overhaul (January 2025)
- **Professional Enterprise Theme**: Updated entire UI to professional, enterprise-grade design
- **Color Scheme**: Implemented new corporate color palette with Conectify primary blue (#007bff) and professional neutrals
- **Logo Design**: Replaced childish logo with professional Globe icon in enterprise-styled container
- **Typography**: Enhanced branding with "Conectify Enterprise" styling and professional taglines
- **Component Updates**: 
  - Header: Professional navigation with improved search and user profile dropdown
  - Footer: Enterprise-focused sections with compliance badges (SOC 2, ISO 27001)
  - Cards: New enterprise-card style with professional shadows and hover effects
  - Dashboard: Updated to "Professional Dashboard" with enterprise styling
  - Landing Page: Complete redesign with Fortune 500 focus and enterprise positioning
- **Professional Language**: Updated all copy to use professional, enterprise-focused language
- **Accessibility**: Added proper SEO meta tags and professional favicon