// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { parseStringify } from "@/lib/utils";
const {
    APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID,
} = process.env;
import { createDwollaCustomer } from "@/lib/server/dwolla";
import { extractCustomerIdFromUrl } from "@/lib/utils";

export async function POST(request: Request) {
    try {
        let newUserAccount;
        const user_data = await request.json();
        const { firstName, lastName, email, password } = user_data;

        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        if (!newUserAccount) throw new Error('Error creating user')

        const dwollaCustomerUrl = await createDwollaCustomer({
            ...user_data,
            type: 'personal'
        })

        if (!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer')

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const newUser = await database.createDocument(
            APPWRITE_DATABASE_ID!,
            APPWRITE_USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...user_data,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl
            }
        )
        const session = await account.createEmailPasswordSession(email, password);
        const response = NextResponse.json({
            message: "User created",
            user: parseStringify(newUser),
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