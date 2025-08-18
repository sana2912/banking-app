"use client"
import Image from 'next/image'
import logo from '../public/spotify_logo.png'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logout_field from './logout_field'
import Plaid_Link from './plaidLink'

export default function SideBar({ user }: SiderbarProps) {
    const pathname = usePathname();
    return (
        <div className='h-full flex flex-col justify-between p-2'>
            <div>
                <div className='flex gap-2 items-end'>
                    <Image
                        src={logo}
                        width={52}
                        height={52}
                        alt="Picture of the author"
                    />
                    <span className='hidden text-2xl lg:block'>sana</span>
                </div>
                <nav className='mt-4'>
                    {
                        sidebarLinks.map((item, idx) => {
                            const isactive = pathname.startsWith(item.route) && pathname.endsWith(item.route);
                            return (
                                <div key={idx} className='flex flex-col'>
                                    <Link
                                        href={!isactive ? item.route : '#'}
                                        className={isactive ?
                                            "hidden md:block mt-4 rounded-[4px] bg-indigo-50 cursor-auto"
                                            : 'hidden md:block mt-4 rounded-[4px] lg:hover:bg-neutral-100'}
                                    >
                                        <div className='flex items-center justify-center lg:justify-between lg:my-2 lg:mx-2 lg:gap-2'>
                                            <p className='hidden font-medium lg:block'>{item.label}</p>
                                            <img
                                                className='hidden w-6 h-6 md:block'
                                                src={item.imgURL}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </nav>
                <div className='flex justify-center items-center mt-6'>
                    <Plaid_Link
                        user={user}
                        variant='ghost'
                    />
                </div>
            </div >
            {!user ?
                <></>
                :
                <Logout_field
                    user={user}
                    type='desktop'
                />
            }
        </div >
    )
}