import Image from 'next/image';
import logout_logo from '../public/icons/logout.svg';
import { signOut } from '@/lib/server/user_actions';
import { useRouter } from 'next/navigation';


export default function Logout_field({ user, type = 'desktop' }: FooterProps) {
    const navigation = useRouter();

    async function logout() {
        await signOut(); // sever action 
        navigation.push('/');
    }
    return (
        <footer className='flex w-full items-center justify-between'>
            <div className='flex gap-2 justify-center items-center'>
                <div className='flex w-5 h-5 bg-indigo-400 text-white rounded-full items-center justify-center'>{user.firstName[0]}</div>
                <div className='flex flex-col'>
                    <h1 className='text-[16px] text-neutral-900s font-medium'>{`${user.firstName} ${user.lastName}`}</h1>
                    <h2 className='text-[12px] text-neutral-800'>{user.email}</h2>
                </div>
            </div>
            <div onClick={logout} className='cursor-pointer pr-1'>
                <Image
                    src={logout_logo}
                    width={20}
                    height={20}
                    alt='logout image'
                />
            </div>
        </footer>
    )
}