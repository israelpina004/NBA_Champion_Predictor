import Image from 'next/image';
import HomeIcon from '../../public/img/home.png';

const Navbar =()=> {
    return (
        <nav className='w-full flex pl-2'>
            <a href='/'>
                <Image 
                    src={HomeIcon} 
                    alt="Website Icon Clipart - Website Home Logo @flaticon.com" 
                />
            </a>
            <a className='pt-1.5 pl-2 text-black' href='/about'>About</a>
        </nav>
    )
}

export default Navbar;