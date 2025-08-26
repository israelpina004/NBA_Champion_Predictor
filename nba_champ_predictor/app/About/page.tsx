import React from 'react'

import Navbar from '../components/navbar'

const About = () => {
  return (
    <div
      className="
        bg-gradient-to-b 
        from-orange-500 via-pink-500 to-blue-500
        min-h-screen w-full 
        flex flex-col
        text-white
      "
    >
      <div className='pl-1'>
        <Navbar />
      </div>
      <div className="justify-between content-center text-center text-white">
        <div className="text-6xl font-bold m-5">
          About
        </div>
        <div className="text-2xl m-5">
          This app uses the predictive power of three models (logistic regression, random forest, XGBoost) to
          make its predictions. As already mentioned in the homepage, the models make predictions based on advanced season
          data (retrieved from the official NBA website), but when they make predictions on a particular year, they ignore that year's playoff results. In other words, 
          no cheating!<br/><br/>You will notice that some of these predictions are incorrect.  We are working on
          improving the predictive power of these models, but remember that sports is at the
          mercy of chance and "luck." Players may get injured at the wrong time or they just have a bad day.
          Or they have an uncharacteristically good day. At the end of the day, there will never be a perfect model for this.
          But if we were able to perfectly predict every season, there wouldn't be much reason to watch the NBA anymore, would there?
          <br/><br/><b>We do NOT endorse the usage of this website to aid in sports betting decisions!</b>
          <br/><br/>Home icon used from flaticons.com.
        </div>
      </div>
    </div>
  )
}

export default About;