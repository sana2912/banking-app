// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

interface SessionClientResult {
    loggedIn: boolean;
    account: Account | null;
    error: unknown;
}

export async function createSessionClient(): Promise<SessionClientResult> {
    const result: SessionClientResult = {
        loggedIn: false,
        account: null,
        error: null
    };

    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = (await cookies()).get("my-custom-session");

        if (!session?.value) {
            return result; // stays loggedIn: false
        }

        client.setSession(session.value);

        result.loggedIn = true;
        result.account = new Account(client);

    } catch (err) {
        result.error = err;
    }

    return result;
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
        get user() {
            return new Users(client);
        }
    };
}
