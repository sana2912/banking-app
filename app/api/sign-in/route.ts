import { parseStringify } from "@/lib/utils";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_data = await request.json();
        const { email, password } = user_data;

        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(email, password);

        // สร้าง cookie
        const response = NextResponse.json({
            message: "User login",
            user: parseStringify(session),
        });
        response.cookies.set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60 * 24 * 7, // 7 วัน
        });

        return response;
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Signup failed", detail: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}