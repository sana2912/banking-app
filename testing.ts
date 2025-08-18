import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import axios from 'axios';

// Setup Plaid client
const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox, // หรือ production
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
            'PLAID-SECRET': process.env.PLAID_SECRET!,
            'Plaid-Version': '2020-09-14',
        },
    },
});
const plaidClient = new PlaidApi(configuration);

// ฟังก์ชันแลก public_token เป็น access_token
async function exchangePublicToken({ publicToken1, publicToken2 }: { publicToken1: string, publicToken2: string }) {
    const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken1,
    });
    const response2 = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken2,
    });
    return {
        res1: response.data.access_token,
        res2: response2.data.access_token
    };
}

// ฟังก์ชันขอ processor_token จาก access_token และ account_id
async function createProcessorToken(accessToken: string, accountId: string) {
    const response = await plaidClient.processorTokenCreate({
        access_token: accessToken,
        account_id: accountId,
        processor: 'dwolla',
    });
    return response.data.processor_token;
}

// ฟังก์ชันสร้าง Funding Source กับ Dwolla
async function createFundingSource(customerId: string, processorToken: string) {
    const response = await axios.post(
        `https://api.dwolla.com/customers/${customerId}/funding-sources`,
        { plaidToken: processorToken },
        {
            headers: {
                Authorization: `Bearer ${process.env.DWOLLA_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
}

// ฟังก์ชันสร้าง Transfer โอนเงินใน Dwolla
async function createTransfer(
    sourceFundingSourceUrl: string,
    destinationFundingSourceUrl: string,
    amount: number
) {
    const response = await axios.post(
        'https://api.dwolla.com/transfers',
        {
            _links: {
                source: { href: sourceFundingSourceUrl },
                destination: { href: destinationFundingSourceUrl },
            },
            amount: {
                currency: 'USD',
                value: amount.toFixed(2),
            },
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.DWOLLA_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
}

// ตัวอย่าง flow ใช้งานจริง
async function processPayment(
    originPublicToken: string,
    originAccountId: string,
    originCustomerId: string,
    destinationPublicToken: string,
    destinationAccountId: string,
    destinationCustomerId: string,
    amount: number
) {
    // แลก public_token เป็น access_token (origin)
    const originAccessToken = await exchangePublicToken(originPublicToken);
    // ขอ processor_token (origin)
    const originProcessorToken = await createProcessorToken(originAccessToken, originAccountId);
    // สร้าง Funding Source (origin)
    const originFundingSource = await createFundingSource(originCustomerId, originProcessorToken);

    // แลก public_token เป็น access_token (destination)
    const destinationAccessToken = await exchangePublicToken(destinationPublicToken);
    // ขอ processor_token (destination)
    const destinationProcessorToken = await createProcessorToken(destinationAccessToken, destinationAccountId);
    // สร้าง Funding Source (destination)
    const destinationFundingSource = await createFundingSource(destinationCustomerId, destinationProcessorToken);

    // สร้าง Transfer (โอนเงิน)-
    const transfer = await createTransfer(
        originFundingSource._links.self.href,
        destinationFundingSource._links.self.href,
        amount
    );

    return transfer;
}
