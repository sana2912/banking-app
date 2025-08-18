"use client"

import { useActionState, useState } from "react"
import Image from "next/image"
import Link from "next/link";
import logo from '../public/spotify_logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
} from "@/components/ui/form";
import Form_reuse from "./reusable_form";
import { authformSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Plaid_Link from "./plaidLink";



export default function Form_component({ auth }: { auth: string }) {
    const router = useRouter();
    const formSchema = authformSchema(auth);
    const [user, set_user] = useState(null); // user for check if user login 
    const [loading, set_loading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            dateOfBirth: "",
            postalCode: "",
            ssn: "",
            state: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        set_loading(true);
        try {
            if (auth === 'sign up') {
                const response = await fetch("/api/sign-up", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Signup failed");
                }

                const data = await response.json();
                set_user(data.user);
            }

            if (auth === 'sign in') {
                const response = await fetch("/api/sign-in", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            email: values.email,
                            password: values.password
                        }
                    ),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Signup failed");
                }
                const data = await response.json();
                set_user(data);
                //if (response) router.push('/');
            }

        } catch (error) {
            console.error(error);
        }
        finally {
            set_loading(false);
        }
    }

    return (
        <section className="flex flex-col gap-4 p-4 rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            {/* header section */}
            <header className="flex flex-col">
                <Link className="mb-4" href='/'>
                    <Image
                        src={logo}
                        width={32}
                        height={32}
                        alt="Picture of the author"
                    />
                </Link>
                {auth === 'sign in' ?
                    <h1 className="text-2xl font-semibold">sign in</h1>
                    :
                    <h1 className="text-2xl font-semibold">sign up</h1>
                }
                {user ?
                    <h2 className="text-sm  text-neutral-600 font-medium cursor-pointer hover:text-neutral-800">
                        you already login please go toyour account
                    </h2>
                    :
                    <h2 className="text-sm text-neutral-600 font-medium cursor-pointer hover:text-neutral-800">
                        you not have an account yet please enter your detial
                    </h2>
                }
            </header>
            {/* not login need to login section */}
            <div className="flex flex-col gap-4">
                {user ?
                    <div className="flex flex-col">
                        <Plaid_Link
                            user={user!}
                            variant="primary"
                        />
                    </div>
                    :
                    <div className="flex flex-col">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {auth === 'sign up' &&
                                    <>
                                        <div className="flex gap-4">
                                            <Form_reuse
                                                control={form.control}
                                                label={'firstName'}
                                                name={'firstName'}
                                                placeHolder={'your first name'}
                                            />
                                            <Form_reuse
                                                control={form.control}
                                                label={'lastName'}
                                                name={'lastName'}
                                                placeHolder={'your last name'}
                                            />
                                        </div>
                                        <Form_reuse
                                            control={form.control}
                                            label={'address1'}
                                            name={'address1'}
                                            placeHolder={'your address1'}
                                        />
                                        <Form_reuse
                                            control={form.control}
                                            label={'city'}
                                            name={'city'}
                                            placeHolder={'your city'}
                                        />
                                        <div className="flex gap-4">
                                            <Form_reuse
                                                control={form.control}
                                                label={'state'}
                                                name={'state'}
                                                placeHolder={'your country'}
                                            />
                                            <Form_reuse
                                                control={form.control}
                                                label={'postal code'}
                                                name={'postalCode'}
                                                placeHolder={'your postal code'}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <Form_reuse
                                                control={form.control}
                                                label={'birth day'}
                                                name={'dateOfBirth'}
                                                placeHolder={'yyyy-mm-dd'}
                                            />
                                            <Form_reuse
                                                control={form.control}
                                                label={'ssn'}
                                                name={'ssn'}
                                                placeHolder={'ssn'}
                                            />
                                        </div>
                                    </>
                                }

                                <Form_reuse
                                    control={form.control}
                                    label={'email'}
                                    name={'email'}
                                    placeHolder={'our email address1'}
                                />
                                <Form_reuse
                                    control={form.control}
                                    label={'password'}
                                    name={'password'}
                                    placeHolder={'password'}
                                />
                                <Button disabled={loading} className="bg-indigo-50 w-full hover:bg-indigo-200" type="submit">
                                    {!loading ?
                                        <span>{auth}</span>
                                        :
                                        <span className="w-6 h-6 border-r-indigo-50 border-3 rounded-full border-neutral-700 animate-spin"></span>
                                    }
                                </Button>
                            </form>
                        </Form>
                        <footer className="mt-4 flex justify-center gap-2">
                            <p className="text-neutral-600 text-[14px] font-medium">
                                {auth !== 'sign in' ?
                                    'you already have an acount please login'
                                    : 'you not have an account yet please sign up'}
                            </p>
                            <Link href={auth !== 'sign in' ? '/sign-in' : '/sign-up'}
                                className="text-red-500 text-[14px] font-medium">
                                {auth !== 'sign in' ? 'Sign-in' : 'Sign-up'}
                            </Link>
                        </footer>
                    </div>
                }
            </div>
        </section>
    )
}