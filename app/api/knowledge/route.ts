import { prisma } from "@/lib/primsa"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/auth"
import { z } from "zod"

export async function GET() {
    try {
        const knowledge = await prisma.knowledge.findMany({
            select: {
                link: true
            }
        })

        return NextResponse.json({
            knowledge: knowledge
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const link = body.link;

        const linkSchema = z.string().url();

        const validation = linkSchema.safeParse(link);
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
                message: "Enter  a valid URL"
            }, {
                status: 400 // bad request
            })
        }

        // save data in db
        await prisma.knowledge.create({
            data: {
                userId: session?.user.id,
                link: link
            }
        })

        return NextResponse.json({
            message: "knowledge link (resource) added successfully"
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