// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { parseStringify } from "@/lib/utils";

export async function POST(request: Request) {
    try {
        const user_data = await request.json();
        const { firstName, lastName, email, password } = user_data;

        const { account } = await createAdminClient();

        // สร้าง user ใหม่
        const new_user_account = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        // สร้าง session login
        const session = await account.createEmailPasswordSession(email, password);

        // สร้าง cookie
        const response = NextResponse.json({
            message: "User created",
            user: parseStringify(new_user_account),
        });

        // ตั้ง cookie ใน response
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