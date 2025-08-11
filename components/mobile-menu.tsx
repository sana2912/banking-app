"use client"

import { sidebarLinks } from "@/constants"
import hamberger from '../public/icons/hamburger.svg'
import logo from '../public/spotify_logo.png'
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    SheetClose,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Logout_field from "./logout_field"

export default function MobileMenu({ user }: MobileNavProps) {
    const pathname = usePathname();
    return (
        <div className="max-w-[380px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={hamberger}
                        width={32}
                        height={32}
                        alt="Picture of the author"
                    />
                </SheetTrigger>
                <SheetContent className="bg-white w-full max-w-[380px] border-none">
                    <SheetHeader>
                        <SheetTitle className="text-ml">
                            profile
                        </SheetTitle>
                        {
                            sidebarLinks.map((item, idx) => {
                                const isactive = pathname.startsWith(item.route) && pathname.endsWith(item.route);
                                return (
                                    <SheetClose asChild key={idx}>
                                        <Link
                                            href={!isactive ? item.route : '#'}
                                            className={isactive ?
                                                "mt-4 rounded-[4px] text-ml bg-fuchsia-50 cursor-auto"
                                                : 'mt-4 rounded-[4px] text-ml lg:hover:bg-neutral-100'}
                                        >
                                            <div className='flex items-center justify-between my-2 mx-2 gap-2'>
                                                <p className='block'>{item.label}</p>
                                                <img
                                                    className='w-6 h-6'
                                                    src={item.imgURL}
                                                />
                                            </div>
                                        </Link>
                                    </SheetClose>
                                )
                            })
                        }
                    </SheetHeader>
                    <div className="flex p-6">
                        <Logout_field
                            user={user}
                            type="mobile"
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}