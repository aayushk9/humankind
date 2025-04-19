import { authOptions } from "@/auth";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'

export async function GET(request: NextRequest) {
 let dailyLogs = await prisma.dailyLog.findMany();

    return NextResponse.json({
        message: "logs got rendered",
        dailyLogs: dailyLogs
    })
}

export async function POST(request: NextRequest) {

    try {

        const body = await request.json();
        const dailyLogs = body.dailyLogs
        const session = await getServerSession(authOptions);

        if (!session?.user.id || !session) {
            return NextResponse.json({
                message: 'unauthorized'
            }, {
                status: 401
            })
        }

        const logSchema = z.string().min(4);
        const validation = logSchema.safeParse(dailyLogs);

        if(!validation.success) {
          return NextResponse.json({
            message: "enter atleast 4 words to your log"
          }, {
            status: 400 // bad request
          })
        }

        await prisma.dailyLog.create({
            data: {
                userId: session?.user.id,
                dailyLogs: dailyLogs
            }
        })

        return NextResponse.json({
            message: "log successfully shared"
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
    }
}