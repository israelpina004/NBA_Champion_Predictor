import React from 'react'
import Image from 'next/image'

import HomeIcon from '../../public/img/home.png'

const About = () => {
  return (
    <div
      className="
        bg-gradient-to-b 
        from-orange-500 via-pink-500 to-blue-500
        h-screen w-full 
        flex flex-col
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
      <div className="justify-between content-center text-center text-white">
        <div className="text-6xl font-bold m-5">
          About
        </div>
        <div className="text-2xl m-5">
          This app uses the predictive power of three models (logistic regression, random forest, XGBoost) to
          make its predictions. As already mentioned in the homepage, the models make predictions based on advanced season
          data, but when they make predictions on a particular year, they ignore that year's playoff results. In other words, 
          no cheating!<br/><br/>You may notice that some of these predictions are incorrect.  We are working on
          improving the predictive power of these models, but remember that sports is at the
          mercy of chance and "luck." Players may get injured at the wrong time or they just have a bad day.
          Or they have an uncharacteristically good day. At the end of the day, there will never be a perfect model for this.<br/><br/> 
          But isn't that part of the fun?
          <br/><br/><b>We do NOT endorse the usage of this website to aid in sports betting decisions!</b>
        </div>
      </div>
    </div>
  )
}

export default About;