import { quotes } from "@/zen";
import { NextResponse } from "next/server";

export function GET() {
    try {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex]

        return NextResponse.json({
            quote: randomQuote
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "some internla error occured"
        }, {
            status: 500
        })
    }
}