# Crittr - Pet Health Tracking Application

A comprehensive pet care tracking application built with Next.js, TypeScript, Redux, Python FastAPI, and PostgreSQL.

## Features

- 🐾 **Multi-Pet Support**: Track multiple pets with individual profiles
- 📝 **Digital Journal**: Rich text journal entries with media attachments
- ⚡ **One-Tap Logging**: Quick logging for common activities (feeding, walks, medication, etc.)
- 📊 **Health Trends**: Visualize weight trends, medication adherence, and symptom patterns
- 🔔 **Smart Reminders**: Custom reminders for feeding times, vet appointments, and more
- 📤 **Export & Share**: Generate comprehensive reports for veterinarians
- 🤖 **AI Insights**: OpenAI-powered health summaries and care recommendations
- 👥 **Social Features**: Connect with other pet owners and share experiences
- 📱 **Mobile Friendly**: Responsive design that works on all devices
- 🔐 **Secure Authentication**: Google OAuth authentication

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Prisma** for database ORM
- **Lucide React** for icons

### Backend
- **Python FastAPI** for API server
- **PostgreSQL** for database
- **SQLAlchemy** for ORM
- **Alembic** for migrations
- **JWT** for authentication
- **OpenAI API** for AI features

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL 12+
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd critter-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://crittr_user:crittr_password@localhost:5432/crittr"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USERNAME="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"
   SMTP_FROM_EMAIL="noreply@crittr.app"
   OPENAI_API_KEY="your-openai-api-key"
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Manual Setup (Recommended for Development)

1. **Start the database**
   ```bash
   cd ../critter-app-BE
   docker-compose up postgres
   ```

2. **Start the backend** (in a new terminal)
   ```bash
   cd ../critter-app-BE
   source venv/bin/activate
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Start the frontend** (in a new terminal)
   ```bash
   cd critter-app
   npm run dev
   ```

### Backend Setup (Docker - Alternative)

1. **Navigate to backend directory**
   ```bash
   cd ../critter-app-BE
   ```

2. **Start development environment with Docker**
   ```bash
   ./manage.sh dev-start
   ```

   This will:
   - Build the Docker image
   - Start PostgreSQL database
   - Start Redis (optional)
   - Start the FastAPI backend
   - Create all necessary database tables

3. **Access the API**
   - API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - Database: localhost:5432
   - Redis: localhost:6379

### Backend Setup (Manual)

1. **Navigate to backend directory**
   ```bash
   cd ../critter-app-BE
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL=postgresql://crittr_user:crittr_password@localhost:5432/crittr
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM_EMAIL=noreply@crittr.app
   OPENAI_API_KEY=your-openai-api-key
   FRONTEND_URL=http://localhost:3000
   ENVIRONMENT=development
   ```

5. **Start the backend server**
   ```bash
   python main.py
   ```

## Project Structure

```
critter-app/
├── critter-app/        # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── features/      # Redux slices
│   │   └── lib/           # Utilities and configurations
│   ├── prisma/            # Database schema
│   └── public/            # Static assets
└── critter-app-BE/        # Python FastAPI backend
    ├── main.py           # Main FastAPI application
    ├── requirements.txt  # Python dependencies
    ├── docker-compose.yml # Docker configuration
    └── .env.example      # Environment variables template
```

## Key Features Implementation

### Authentication
- Google OAuth authentication
- JWT tokens for session management
- Admin role support

### Pet Management
- Create and manage multiple pet profiles
- Track species, breed, weight, and other details
- Upload pet avatars

### Journal System
- Rich text journal entries
- Multiple entry types (feeding, health, training, etc.)
- Media attachments (photos/videos)
- Tagging system
- Search functionality

### Quick Logging
- One-tap logging for common activities
- Predefined activity types
- Quick notes and timestamps

### Analytics & Trends
- Weight tracking charts
- Medication adherence percentages
- Symptom frequency analysis
- AI-powered health insights

### Export & Sharing
- CSV export for vet visits
- Date range filtering
- Comprehensive health reports
- Social sharing features

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Docker - Recommended)

#### Local Production Deployment
```bash
cd ../critter-app-BE
cp env.example .env
# Update .env with production values
./manage.sh prod-start
```

#### Cloud Deployment with Docker

**Railway**
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Railway will automatically detect and deploy the Docker container

**DigitalOcean App Platform**
1. Create a new app
2. Connect your repository
3. Configure environment variables
4. Deploy with Docker

**AWS ECS/Fargate**
1. Push Docker image to ECR
2. Create ECS service
3. Configure environment variables
4. Deploy container

### Backend (Traditional Deployment)

**Railway/Heroku**
1. Create a new project on Railway or Heroku
2. Connect your GitHub repository
3. Set environment variables
4. Deploy the backend service

### Database (Supabase/Neon)
1. Create a PostgreSQL database on Supabase or Neon
2. Update DATABASE_URL in environment variables
3. Run migrations: `npx prisma db push`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@crittr.app or join our Discord community.

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Veterinary integration
- [ ] Pet insurance integration
- [ ] Advanced AI health predictions
- [ ] Community features
- [ ] Multi-language support