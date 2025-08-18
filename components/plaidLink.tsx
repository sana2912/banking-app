import { Button } from "./ui/button";
import {
    PlaidLinkOnSuccess,
    PlaidLinkOptions,
    usePlaidLink
} from 'react-plaid-link';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/server/user_actions";
import icon from '../public/icons/connect-bank.svg'
import Image from "next/image";

export default function Plaid_Link({ user, variant }: PlaidLinkProps) {
    const [token, setToken] = useState(null);
    const route = useRouter();
    console.log(token);
    useEffect(() => {
        const get_data = async () => {
            const data = await createLinkToken(user);
            setToken(data?.link_token);
        }

        get_data();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        });
        route.push('/');
    }, [user]);

    const config: PlaidLinkOptions = {
        onSuccess,
        token
    };
    const { open, ready } = usePlaidLink(config);
    return (
        <div className="w-[100%]" >
            {variant === 'primary' ? (
                <Button className="bg-indigo-400 text-white cursor-pointer" onClick={() => open()} disabled={!ready}>
                    connect bank
                </Button>
            ) : variant === "ghost" ? (
                <Button className='bg-indigo-50 cursor-pointer hover:bg-indigo-100'
                    onClick={() => open()} disabled={!ready}>
                    connect bank
                </Button>
            ) : (
                <Button
                    className='bg-indigo-50 cursor-pointer hover:bg-indigo-100'
                    onClick={() => open()} disabled={!ready}>
                    connect bank
                </Button>
            )}
        </div>
    )
}