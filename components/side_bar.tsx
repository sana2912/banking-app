"use client"
import Image from 'next/image'
import logo from '../public/spotify_logo.png'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBar({ user }: SiderbarProps) {
    const pathname = usePathname();
    return (
        <div className='h-full flex flex-col justify-between p-5'>
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
                                            "hidden md:block mt-4 rounded-[4px] bg-fuchsia-50 cursor-auto"
                                            : 'hidden md:block mt-4 rounded-[4px] lg:hover:bg-neutral-100'}
                                    >
                                        <div className='flex items-center justify-center lg:justify-between lg:my-2 lg:mx-2 lg:gap-2'>
                                            <p className='hidden font-bold lg:block'>{item.label}</p>
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
                    USER
                </nav>
            </div >
            <footer>
                FOOTER
            </footer>
        </div >
    )
}