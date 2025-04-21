## Human Kind

### A gentle reminder that we're still present for each other

## Purpose

The motive behind building this website is simple to keep human connections alive.  
We, as humans share an innate sense of connectivity, but often tend to forget it.  
So I thought of creating a nice app that spreads positivity, nurtures human connection and promotes a better state of mind for everyone.

## Tech Stack

- **Frontend**: 
  - Next.js 14 (React)
  - TypeScript
  - Tailwind CSS
  - shadcn/ui for UI components

- **Backend**: 
  - Next.js API Routes
  - Prisma ORM

- **Database**: 
  - PostgreSQL 

- **Authentication**: 
  - NextAuth.js with Google provider

- **Deployment**: 
  - Vercel

## Getting Started

### Prerequisites

#### Required Versions

- Node.js (v18 or later)
- npm 
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/humankind.git
   cd humankind
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   GOOGLE_CLIENT_ID = "your google_client_id"
   GOOGLE_CLIENT_SECRET = "your google_client_secret"
   NEXT_PUBLIC_API = http://localhost:3000/api (after deployment replace it with your deployed link)
   DATABASE_URL= "your postgresql connection string
   NEXTAUTH_SECRET = "generate random string"
   ```
   
4. Set up the database:
   ```
   npm i prisma
   npx prisma init
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Got an idea or feature suggestion?

If you have an idea or a feature that you think could make a meaningful impact on humankind,  
please feel free to raise a feature request in the [Issues](../../issues) section or DM me on [Twitter/X](https://x.com/aayushk999).

### Useful resources

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)