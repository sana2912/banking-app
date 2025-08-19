"use server";

import { ID, Query } from "node-appwrite";
import { encryptId, parseStringify } from "../utils";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { client } from "../plaid";
import { CountryCode, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import {
    ProcessorTokenCreateRequest,

} from "plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource } from "./dwolla";

const {
    APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID
} = process.env;

export const get_userInfo = async (userId: string) => {
    try {
        const { database } = await createAdminClient();
        const user = database.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_USER_COLLECTION_ID!,
            [Query.equal('userId', (userId))],
        )
        return parseStringify((await user).documents[0]);
    } catch (error) {
        console.log(error);
    }
}

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
        } else {
            const user_ = await account!.get();
            const user_data = await get_userInfo(user_.$id);
            return parseStringify(user_data);
        }
    } catch (error) {
        console.log("get user login error : ", error);
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

export const createLinkToken = async (data: User) => {
    if (!data.firstName || !data.lastName || !data.$id) {
        throw new Error('Invalid user object');
    }

    const tokenParams = {
        user: { client_user_id: data.$id },
        client_name: `${data.firstName} ${data.lastName}`,
        products: ['auth', 'transactions'] as Products[],
        language: 'en',
        country_codes: ['US'] as CountryCode[],
    };

    try {
        const createTokenResponse = await client.linkTokenCreate(tokenParams);
        console.log(createTokenResponse.data.link_token);
        return parseStringify({ link_token: createTokenResponse.data.link_token });
    } catch (error: any) {
        console.error('Plaid error:', error.response?.data || error.message);
        throw error;
    }
}

export const exchangePublicToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
    try {
        // exchange token with public token
        const response = await client.itemPublicTokenExchange({
            public_token: publicToken,
        });
        const accessToken = response.data.access_token;
        const itemID = response.data.item_id;

        // get account data
        const accountsResponse = await client.accountsGet({
            access_token: accessToken,
        });

        const account_data = accountsResponse.data.accounts[0];

        // Create a processor token for a specific account id.
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: account_data.account_id,
            processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
        };
        const processorTokenResponse = await client.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: account_data.name
        })
        if (!fundingSourceUrl) throw new Error("no funding source");
        createBankAccount({
            userId: user.$id,
            bankId: itemID,
            accountId: account_data.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(account_data.account_id)
        })

        revalidatePath('/');
        return parseStringify({
            exchangePublicToken: "complete"
        })
    } catch (error) {
        console.error(error);
    }
}

async function createBankAccount({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId
}: createBankAccountProps) {
    try {
        // create bank collection in apwrite database collection
        const { database } = await createAdminClient();
        const bank_account_data = database.createDocument(
            APPWRITE_DATABASE_ID!,
            APPWRITE_BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                sharableId
            }
        )
        return parseStringify(bank_account_data);
    } catch (error) {
        console.error(error);
    }
}

export const getBanks = async ({ userId }: getAccountsProps) => {
    try {
        const { database } = await createAdminClient();
        const bank_list = database.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_BANK_COLLECTION_ID!,
            [Query.equal('userId', (userId))],
        )
        return parseStringify((await bank_list).documents);
    } catch (error) {
        console.log(error);
    }
}
export const getBank = async ({ appwriteItemId }: getAccountProps) => {
    try {
        const { database } = await createAdminClient();
        if (appwriteItemId === undefined) return;
        const bank = database.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_BANK_COLLECTION_ID!,
            [Query.equal('$id', [appwriteItemId])],
        )
        return parseStringify((await bank).documents[0]);
    } catch (error) {
        console.log(error);
    }
}

export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_BANK_COLLECTION_ID!,
            [Query.equal('accountId', [accountId])]
        )

        if (bank.total !== 1) return null;

        return parseStringify(bank.documents[0]);
    } catch (error) {
        console.log(error)
    }
}