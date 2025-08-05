'use client';

import React from 'react';
import { useRef, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import HomeIcon from '../public/img/home.png';
import Atlanta from '../public/img/Atlanta_Hawks_logo.svg.png';
import Boston from '../public/img/Boston_Celtics.svg.png';
import Brooklyn from '../public/img/Brooklyn_Nets_primary_icon_logo_2024.svg.png';
import Charlotte from '../public/img/Charlotte_Hornets_(2014).svg.png';
import Chicago from '../public/img/Chicago_Bulls_logo.svg.png';
import Cleveland from '../public/img/Cleveland_Cavaliers_logo.svg.png';
import Dallas from '../public/img/Dallas_Mavericks_logo.svg.png';
import Denver from '../public/img/Denver_Nuggets.svg.png';
import Warriors from '../public/img/Golden_State_Warriors_logo.svg.png';
import Houston from '../public/img/Houston_Rockets.svg.png';
import Indiana from '../public/img/Indiana_Pacers.svg.png';
import Detroit from '../public/img/Logo_of_the_Detroit_Pistons.svg.png';
import Clippers from '../public/img/Los_Angeles_Clippers_(2024).svg.png';
import Lakers from '../public/img/Los_Angeles_Lakers_logo.svg.png';
import Memphis from '../public/img/Memphis_Grizzlies.svg.png';
import Miami from '../public/img/Miami_Heat_logo.svg.png';
import Milwaukee from '../public/img/Milwaukee_Bucks_logo.svg.png';
import Minnesota from '../public/img/Minnesota_Timberwolves_logo.svg.png';
import Pelicans from '../public/img/New_Orleans_Pelicans_logo.svg.png';
import Knicks from '../public/img/New_York_Knicks_logo.svg.png';
import Thunder from '../public/img/Oklahoma_City_Thunder.svg.png';
import Orlando from '../public/img/Orlando_Magic_logo.svg.png';
import Philadelphia from '../public/img/Philadelphia_76ers_logo.svg.png';
import Phoenix from '../public/img/Phoenix_Suns_logo.svg.png';
import Portland from '../public/img/Portland_Trail_Blazers_logo.svg.png';
import Sacramento from '../public/img/SacramentoKings.svg.png';
import Spurs from '../public/img/San_Antonio_Spurs.svg.png';
import Toronto from '../public/img/Toronto_Raptors_logo.svg.png';
import Utah from '../public/img/Utah_Jazz_logo_2025.svg.png';
import Washington from '../public/img/Washington_Wizards_logo.svg.png';

export default function Home() {
  const logos = [
    { src: Atlanta, width: 80 },
    { src: Boston, width: 70 },
    { src: Brooklyn, width: 80 },
    { src: Charlotte, width: 80 },
    { src: Chicago, width: 80 },
    { src: Cleveland, width: 70 },
    { src: Dallas, width: 80 },
    { src: Denver, width: 70 },
    { src: Detroit, width: 80 },
    { src: Warriors, width: 70 },
    { src: Houston, width: 70 },
    { src: Indiana, width: 80 },
    { src: Clippers, width: 90 },
    { src: Lakers, width: 120 },
    { src: Memphis, width: 70 },
    { src: Miami, width: 70 },
    { src: Milwaukee, width: 70 },
    { src: Minnesota, width: 80 },
    { src: Pelicans, width: 90 },
    { src: Knicks, width: 90 },
    { src: Thunder, width: 70 },
    { src: Orlando, width: 80 },
    { src: Philadelphia, width: 70 },
    { src: Phoenix, width: 70 },
    { src: Portland, width: 80 },
    { src: Sacramento, width: 70 },
    { src: Spurs, width: 100 },
    { src: Toronto, width: 70 },
    { src: Utah, width: 80 },
    { src: Washington, width: 70 },
  ];

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const half = Math.ceil(trackRef.current.scrollWidth / 2);
    trackRef.current.style.setProperty('--shift', `${half}px`);
  }, [])

  return (
    <div className='
      bg-gradient-to-b 
       from-orange-500
       via-pink-500
       to-blue-500
       '
       >
      <nav className='w-full flex'>
        <a href='/'>
          <Image 
            src={HomeIcon} 
            alt="Website Icon Clipart - Website Home Logo @flaticon.com" 
          />
        </a>
      </nav>
      <div
        className="
          h-screen content-center text-center text-white
        "
      >
          <div className="text-6xl font-bold">
            Hi, I'm (insert app name here).
          </div>

          <div className="text-xl mt-10 max-w-lg">
            I am an AI trained on advanced NBA statistics spanning from the 1996 season.
            Give me a season to predict and I'll tell you who I think won (or will win)!
          </div>

          {/* Season dropdown */}
          <Menu as="div" className="relative inline-block text-left mt-10">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                Select Season:
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-25 origin-top-right overflow-auto h-40 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                {[
                  '2016-17','2017-18','2018-19','2019-20',
                  '2020-21','2021-22','2022-23','2023-24','2024-25'
                ].map((season) => (
                  <MenuItem 
                    key={season}
                    as={Link}
                    href={`predictions/${season}`}
                    className="block px-4 py-2 text-sm text-gray-700 ui-active:bg-gray-100 ui-active:text-gray-900"
                  >
                    {season}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>

          {/* Auto-scrolling logos */}
          {/* Flickering occurs when the logos wrap around completely, must fix */}
          <div className="overflow-hidden mt-10">
            <div ref={trackRef}
            className="flex flex-nowrap animate-infinite-scroll pause-on-hover">
              {[...logos, ...logos].map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  width={logo.width}
                  height={60}
                  className="flex-shrink-0 mx-1.5"
                  alt=""
                  aria-hidden={i >= logos.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
