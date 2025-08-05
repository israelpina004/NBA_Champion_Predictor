import Image, { StaticImageData } from 'next/image'
import React from 'react'

import HomeIcon from '../../../public/img/home.png'
import Atlanta from '../../../public/img/Atlanta_Hawks_logo.svg.png';
import Boston from '../../../public/img/Boston_Celtics.svg.png';
import Brooklyn from '../../../public/img/Brooklyn_Nets_primary_icon_logo_2024.svg.png';
import Charlotte from '../../../public/img/Charlotte_Hornets_(2014).svg.png';
import Chicago from '../../../public/img/Chicago_Bulls_logo.svg.png';
import Cleveland from '../../../public/img/Cleveland_Cavaliers_logo.svg.png';
import Dallas from '../../../public/img/Dallas_Mavericks_logo.svg.png';
import Denver from '../../../public/img/Denver_Nuggets.svg.png';
import Warriors from '../../../public/img/Golden_State_Warriors_logo.svg.png';
import Houston from '../../../public/img/Houston_Rockets.svg.png';
import Indiana from '../../../public/img/Indiana_Pacers.svg.png';
import Detroit from '../../../public/img/Logo_of_the_Detroit_Pistons.svg.png';
import Clippers from '../../../public/img/Los_Angeles_Clippers_(2024).svg.png';
import Lakers from '../../../public/img/Los_Angeles_Lakers_logo.svg.png';
import Memphis from '../../../public/img/Memphis_Grizzlies.svg.png';
import Miami from '../../../public/img/Miami_Heat_logo.svg.png';
import Milwaukee from '../../../public/img/Milwaukee_Bucks_logo.svg.png';
import Minnesota from '../../../public/img/Minnesota_Timberwolves_logo.svg.png';
import Pelicans from '../../../public/img/New_Orleans_Pelicans_logo.svg.png';
import Knicks from '../../../public/img/New_York_Knicks_logo.svg.png';
import Thunder from '../../../public/img/Oklahoma_City_Thunder.svg.png';
import Orlando from '../../../public/img/Orlando_Magic_logo.svg.png';
import Philadelphia from '../../../public/img/Philadelphia_76ers_logo.svg.png';
import Phoenix from '../../../public/img/Phoenix_Suns_logo.svg.png';
import Portland from '../../../public/img/Portland_Trail_Blazers_logo.svg.png';
import Sacramento from '../../../public/img/SacramentoKings.svg.png';
import Spurs from '../../../public/img/San_Antonio_Spurs.svg.png';
import Toronto from '../../../public/img/Toronto_Raptors_logo.svg.png';
import Utah from '../../../public/img/Utah_Jazz_logo_2025.svg.png';
import Washington from '../../../public/img/Washington_Wizards_logo.svg.png';


type Predictions = {
  lr: number[]
  rf: number[]
  xgb: number[]
  teams: string[]
}

interface Params {
  params: { season: string }
}

// Seasons to build at compile time
export async function generateStaticParams() {
  const seasons = [
    '2016-17','2017-18','2018-19','2019-20',
    '2020-21','2021-22','2022-23','2023-24','2024-25'
  ]
  return seasons.map(season => ({ season }))
}

export default async function SeasonPage({ params }: Params) {
  const { season } = params

  // fetch from Flask API
  const res = await fetch(
    `http://127.0.0.1:5000/predictions/${season}`,
    { next: { revalidate: 60 * 60 * 24 } }
  )
  if (!res.ok) throw new Error(`Failed to fetch predictions for ${season}`)

  const data: Predictions = await res.json()
  const { teams, lr, rf, xgb } = data

  const rankArray = (probs: number[]) => {
    return probs.map((p, i) => ({ p, i }))
    .sort((a, b) => b.p - a.p)
    .map((_, idx, arr) => {
      const ogIndex = arr[idx].i
      return { index: ogIndex, rank: idx + 1 }
    })
  }

  const lrRanks = rankArray(lr)
  const rfRanks = rankArray(rf)
  const xgbRanks = rankArray(xgb)

  const avgRank = teams.map((team, i) => {
    const r1 = lrRanks.find(r => r.index === i)!.rank
    const r2 = rfRanks.find(r => r.index === i)!.rank
    const r3 = xgbRanks.find(r => r.index === i)!.rank

    return { team, avgRank: (r1 + r2 + r3) / 3 }
  })

  const top5 = avgRank.sort((a, b) => a.avgRank - b.avgRank).slice(0, 5)

  const logoMap: Record<string, StaticImageData> = {
    'Atlanta Hawks': Atlanta,
    'Boston Celtics': Boston,
    'Brooklyn Nets': Brooklyn,
    'Charlotte Hornets': Charlotte,
    'Chicago Bulls': Chicago,
    'Cleveland Cavaliers': Cleveland,
    'Dallas Mavericks': Dallas,
    'Denver Nuggets': Denver,
    'Golden State Warriors': Warriors,
    'Houston Rockets': Houston,
    'Indiana Pacers': Indiana,
    'Detroit Pistons': Detroit,
    'LA Clippers': Clippers,
    'Los Angeles Lakers': Lakers,
    'Memphis Grizzlies': Memphis,
    'Miami Heat': Miami,
    'Milwaukee Bucks': Milwaukee,
    'Minnesota Timberwolves': Minnesota,
    'New Orleans Pelicans': Pelicans,
    'New York Knicks': Knicks,
    'Oklahoma City Thunder': Thunder,
    'Orlando Magic': Orlando,
    'Philadelphia 76ers': Philadelphia,
    'Phoenix Suns': Phoenix,
    'Portland Trailblazers': Portland,
    'Sacramento Kings': Sacramento,
    'San Antonio Spurs': Spurs,
    'Toronto Raptors': Toronto,
    'Utah Jazz': Utah,
    'Washington Wizards': Washington
  }

  const [first, second, third, fourth, fifth] = top5

  return (
    <div
      className="
        bg-gradient-to-b 
        from-orange-500 via-pink-500 to-blue-500
        h-screen w-full 
        text-white
      "
    >
      <nav className='w-full flex'>
        <a href='/'>
          <Image 
            src={HomeIcon} 
            alt="Website Icon Clipart - Website Home Logo @flaticon.com" 
          />
        </a>
      </nav>
      <div className='flex content-center justify-center items-center'>
      <div className="text-center text-white">
        <div className="text-6xl font-bold m-5"> For the {season} season, I think ... </div>
        <div className='inline-block'>
          <Image
            src={logoMap[first.team]}
            alt={first.team}
            width={200}
            height={200}
          />
        </div>
        <div className="text-6xl font-bold m-5"> will win! </div>
        <div className="text-xl font-bold m-5"> Teams also in the mix (in order of decreasing odds, left to right):</div>
        <div>
          <div className='inline-block px-4'>
            <Image
              src={logoMap[second.team]}
              alt={second.team}
              width={100}
              height={100}
            />
          </div>
          <div className='inline-block px-4'>
            <Image
              src={logoMap[third.team]}
              alt={third.team}
              width={100}
              height={100}
            />
          </div>
          <div className='inline-block px-4'>
            <Image
              src={logoMap[fourth.team]}
              alt={third.team}
              width={100}
              height={100}
            />
          </div>
          <div className='inline-block px-4'>
            <Image
              src={logoMap[fifth.team]}
              alt={third.team}
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
