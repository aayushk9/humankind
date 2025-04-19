// have GET, POST
import { prisma } from "@/lib/primsa"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/auth"
import { z } from 'zod'

const gratitudeSchema = z.object({
    whom: z.string().min(2),
    story: z.string().min(10)
})

export async function GET() {
    // find available gratitude posts
    try {
        const gratitudePosts = await prisma.gratitudeBoard.findMany({
            select: {
                whom: true,
                story: true
            }
        }) // render all posts
        return NextResponse.json({
            gratitudePosts: gratitudePosts
        }, 
        { 
            status: 200 
        }
      )
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "error while fetching new"
        }, {
            status: 500
    })
    }
}

export async function POST(req: NextRequest) {
   const body = await req.json();
   const whom = body.whom;
   const story = body.story;

   const validation = gratitudeSchema.safeParse({
       whom,
       story
   })

   // check if user is already in a session in order to post something
   const session = await getServerSession(authOptions); 

   if(!session || !session?.user.id) {
    return NextResponse.json({
        message: "unauthorized"
    }, {
        status: 401 
    })
   }

   if(!validation.success) {
      return NextResponse.json({
        message: "please enter valid data from your side"
      }, {
        status: 400 // bad request
      })
   }

   /// save data to db
   await prisma.gratitudeBoard.create({
    data: {
        userId: session.user.id,  
        whom: whom,
        story: story
    }
   })

   return NextResponse.json({
    message: "post successfull"
   }, {
    status: 200
   })
}