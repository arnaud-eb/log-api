# Product Update Management API

A robust REST API built with TypeScript and Express.js for managing product updates, changelog entries, and user authentication. This application demonstrates enterprise-level architecture patterns with comprehensive testing, authentication, and database management.

## 🚀 Key Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Management**: CRUD operations for products with user ownership
- **Update Tracking**: Manage product updates with status tracking (IN_PROGRESS, SHIPPED, DEPRECATED)
- **Update Points**: Granular changelog entries for detailed update documentation
- **Type Safety**: Full TypeScript implementation with custom type definitions
- **Database Integration**: PostgreSQL with Prisma ORM for type-safe database operations
- **Input Validation**: Express-validator middleware for request validation
- **Comprehensive Testing**: Jest test suite with integration and unit tests
- **Environment Configuration**: Stage-specific configuration management

## 🛠 Tech Stack

**Backend:**
- Node.js with TypeScript
- Express.js with custom async request handlers
- Prisma ORM with PostgreSQL
- JWT for authentication
- bcrypt for password hashing

**Development & Testing:**
- Jest with ts-jest for testing
- Nodemon for development auto-reload
- Express-validator for input validation
- CORS support for cross-origin requests

**Architecture:**
- Layered architecture with clear separation of concerns
- Custom Express type augmentation
- Error handling middleware
- Environment-based configuration system

## 📊 Database Schema

The application manages a hierarchical data structure:

```
User → Products → Updates → UpdatePoints
```

- **Users**: Authenticated users with unique usernames
- **Products**: User-owned products with metadata
- **Updates**: Product updates with status tracking and versioning
- **UpdatePoints**: Detailed changelog entries for each update

## 🔐 Authentication & Security

- JWT-based authentication with Bearer token authorization
- Password hashing with bcrypt (configurable salt rounds)
- Protected API routes under `/api` prefix
- Input validation and sanitization
- Type guards for runtime type checking

## 🧪 Testing

Comprehensive test coverage including:
- Integration tests for API endpoints
- Unit tests for individual handlers
- Jest configuration with TypeScript support
- End-to-end HTTP testing with Supertest

## 📁 Project Structure

```
src/
├── handlers/           # Request handlers for each resource
├── modules/           # Authentication and middleware modules
├── config/            # Environment-specific configuration
├── __tests__/         # Integration tests
└── types.ts           # Custom TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone git@github.com:arnaud-eb/log-api.git
cd log-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file with:
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-jwt-secret"
STAGE="local"
```

4. Run database migrations
```bash
npx prisma migrate dev
npx prisma generate
```

5. Start development server
```bash
npm run dev
```

## 📚 API Endpoints

### Authentication
- `POST /user` - User registration
- `POST /signin` - User login

### Protected Routes (require JWT token)
- `GET/POST /api/products` - Product management
- `GET/POST/PUT/DELETE /api/updates` - Update management  
- `GET/POST/PUT/DELETE /api/updatepoints` - Update point management

## 🧰 Development Commands

```bash
npm run dev        # Start development server with auto-reload
npm test           # Run Jest test suite
npx prisma migrate dev    # Run database migrations
npx prisma generate       # Generate Prisma client
```

## 🏗 Architecture Highlights

- **Custom Request Handler Types**: Async-compatible Express handlers with proper typing
- **Middleware Pipeline**: Authentication, validation, and error handling middleware
- **Configuration Management**: Environment-specific config with lodash.merge
- **Type Safety**: Custom Express types with user augmentation
- **Error Handling**: Centralized error handling with proper HTTP status codes

---

*This project showcases modern Node.js development practices with TypeScript, comprehensive testing, and enterprise-level architecture patterns suitable for production environments.*