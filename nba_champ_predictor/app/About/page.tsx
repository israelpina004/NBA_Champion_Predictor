import React from 'react'

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This predictor is powered by a logistic regression model, random forest model, and XGBoost model. The models are then
        ensembled into one (VotingClassifier/StackingClassifier) model. The data used to train the models was scraped from the
        official NBA website (and BasketballReference).
      </p>
    </div>
  )
}

export default About;