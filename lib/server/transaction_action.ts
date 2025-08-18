"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite";
import { parseStringify } from "../utils";
const {
    APPWRITE_DATABASE_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID,
} = process.env;

export const createTransaction = async (transaction: CreateTransactionProps) => {
    try {
        const { database } = await createAdminClient();
        const new_transaction_data = await database.createDocument(
            APPWRITE_DATABASE_ID!,
            APPWRITE_TRANSACTION_COLLECTION_ID!,
            ID.unique(),
            {
                chanel: 'online',
                category: 'Transfer',
                ...transaction
            }
        )
        return parseStringify(new_transaction_data);
    } catch (error) {
        console.log(error);
    }
}

export const getTransactionsByBankId = async ({ bankId }: getTransactionsByBankIdProps) => {
    try {
        const { database } = await createAdminClient();
        const sender_transactions = await database.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_TRANSACTION_COLLECTION_ID!,
            [Query.equal('senderBankId', bankId)],
        )
        const receiver_transactions = await database.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_TRANSACTION_COLLECTION_ID!,
            [Query.equal('receiverBankId', bankId)],
        )
        const transactions = {
            total: sender_transactions.total + receiver_transactions.total,
            documents: [
                ...sender_transactions.documents,
                ...sender_transactions.documents
            ]
        };
        return parseStringify(transactions);
    } catch (error) {
        console.log(error);
    }
}