// have GET, POST
import { prisma } from "@/lib/primsa"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/auth"
import { z } from 'zod'

export async function GET() {
    // find available gratitude posts
    try {
        const post = await prisma.gratitudeBoard.findMany({
            select: {
                story: true
            }
        }) // render all posts
        return NextResponse.json({
            post: post
        },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "error while fetching posts"
        }, {
            status: 500
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newPost = body.newPost;

        const gratitudeSchema = z.object({
            newPost: z.string().min(10)
        })

        const validation = gratitudeSchema.safeParse({
            newPost
        })

        // check if user is already in a session in order to post something
        const session = await getServerSession(authOptions);

        if (!session || !session?.user.id) {
            return NextResponse.json({
                message: "unauthorized"
            }, {
                status: 401
            })
        }

        if (!validation.success) {
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
                story: newPost
            }
        })

        return NextResponse.json({
            message: "post successfull"
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "some internal error occured"
        }, {
            status: 500
        })
    }
}   