"use server";

import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { createSessionClient } from "./appwrite";
export const Sign_in = async function (user_data: signInProps) {
    try {
        getLoggedInUser()
    } catch (error) {
        console.error('error message : ', error);
    }
}

export const getLoggedInUser = async () => {
    try {
        const { loggedIn, account, error } = await createSessionClient();
        if (!loggedIn) {
            console.warn("User is logged out", error);
            // redirect("/login");
        } else {
            const user = await account!.get();
            console.log(user);
            return parseStringify(user);
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const signOut = async () => {
    const { loggedIn, account, error } = await createSessionClient();
    (await cookies()).delete("my-custom-session");

    if (!loggedIn) {
        console.warn("User is logged out", error);
    } else {
        const del = await account!.deleteSession("current");
        console.log(del);
        return del
    }
}
