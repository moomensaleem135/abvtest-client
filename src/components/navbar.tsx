'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/images/logo.png'

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full py-6 z-10">
      <div className="container mx-auto">
        <Link href="/" className="text-white/80 font-bold text-xl">
          <span className="inline-block">
            <Image
              src={logo}
              width={68}
              height={68}
              alt="image not found"
              className="opacity-80"
            />
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
