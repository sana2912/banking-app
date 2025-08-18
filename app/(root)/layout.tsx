import SideBar from '@/components/side_bar';
import '../globals.css'
import MobileMenu from '@/components/mobile-menu';
import logo from '../../public/spotify_logo.png'
import { getLoggedInUser } from '@/lib/server/user_actions';
import { redirect } from 'next/navigation';
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user_login = await getLoggedInUser();
    if (!user_login) {
        redirect('/sign-in');
    };
    return (
        <main className='flex h-screen w-full'>
            <div className='hidden md:block md:w-1/14 lg:block lg:w-2/14'>
                <SideBar
                    user={user_login}
                />
            </div>
            <div className='flex flex-col md:w-13/14 lg:w-12/14'>
                <div className='block w-full md:hidden'>
                    <nav className="flex justify-between h-14">
                        <img className="bg-indigo-100 rounded-full" src={logo.src} />
                        <MobileMenu user={user_login} />
                    </nav>
                </div>
                {children}
            </div>
        </main>
    );
}