import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'
import { prisma } from './lib/primsa'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.clientID || "",
      clientSecret: process.env.clientSecret || ""
    })
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      const exisitingUser = await prisma.user.findUnique({
        where: { email: user.email }
      })

      if (!exisitingUser) {
        await prisma.user.create({
          data: {
            id: user.id,
            email: user.email,
            provider: "Google"
          }
        })
      }

      return true;
    },

    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session?.user.email }
      })

      if (dbUser && session.user) {
        session.user.id = dbUser.id
      }

      return session;
    },

  },
  
  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET

}