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
    const user_data = {
        $id: "1996",
        email: "sana@gmail.com",
        userId: "sana1996j",
        dwollaCustomerUrl: "sanamansn",
        dwollaCustomerId: "dpspodpds",
        firstName: "sana",
        lastName: "minatozaki",
        name: user_login ? user_login.name : "none-user",
        address1: "12/japan",
        city: "souel",
        state: "korea",
        postalCode: "13326",
        dateOfBirth: "29/12/1996",
        ssn: "jojojoj"
    }
    return (
        <main className='flex h-screen w-full'>
            <div className='hidden md:block md:w-1/14 lg:block lg:w-2/14'>
                <SideBar
                    user={user_data}
                />
            </div>
            <div className='flex flex-col md:w-13/14 lg:w-12/14'>
                <div className='block w-full md:hidden'>
                    <nav className="flex justify-between h-14">
                        <img className="bg-indigo-100 rounded-full" src={logo.src} />
                        <MobileMenu user={user_data} />
                    </nav>
                </div>
                {children}
            </div>
        </main>
    );
}