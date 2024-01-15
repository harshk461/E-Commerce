import { NextRequest, NextResponse } from "next/server";

interface User {
    username: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const data: User = await req.json();
    
    return NextResponse.json({ status: 400 });

}