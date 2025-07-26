// app/predictions/[season]/page.tsx
import React from 'react'

type Predictions = {
  lr: number[]
  rf: number[]
  xgb: number[]
  teams: string[]
}

interface Params {
  params: { season: string }
}

// 1) Tell Next which seasons to build at compile time
export async function generateStaticParams() {
  const seasons = [
    '2016-17','2017-18','2018-19','2019-20',
    '2020-21','2021-22','2022-23','2023-24','2024-25'
  ]
  return seasons.map(season => ({ season }))
}

// 2) This is your “page” component—now a Server Component
export default async function SeasonPage({ params }: Params) {
  const { season } = params

  // fetch from your Flask API
  const res = await fetch(
    `http://127.0.0.1:5000/predictions/${season}`,
    { next: { revalidate: 60 * 60 * 24 } } // optional: revalidate every 24h
  )
  if (!res.ok) throw new Error(`Failed to fetch predictions for ${season}`)

  const data: Predictions = await res.json()
  const { teams, lr, rf, xgb } = data

  const computeTop3 = (probs: number[]) =>
    teams
      .map((team, i) => ({ team, prob: probs[i] }))
      .sort((a, b) => b.prob - a.prob)
      .slice(0, 3)

  const top3 = [
    { model: 'Logistic Regression', picks: computeTop3(lr) },
    { model: 'Random Forest',       picks: computeTop3(rf) },
    { model: 'XGBoost',             picks: computeTop3(xgb) },
  ]

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        NBA Champion Picks for {season}
      </h1>

      {top3.map(({ model, picks }) => (
        <section key={model} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{model}</h2>
          <ol className="list-decimal list-inside space-y-1">
            {picks.map(({ team, prob }) => (
              <li key={team}>
                {team} — {(prob * 100).toFixed(1)}%
              </li>
            ))}
          </ol>
        </section>
      ))}
    </main>
  )
}
