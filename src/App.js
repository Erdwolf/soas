import React, {useState} from 'react';
import sampleSize from 'lodash/sampleSize'
import zip from 'lodash/zip'
import filter from 'lodash/filter'

import style from './App.module.css';

import flowers from './data/flowers.json';
import animals from './data/animals.json';
import textileBackground from './textile.png';


/** A custom hook to trigger a re-render. */
const useTrigger = () => {
  const [timesTriggered, setTimesTriggered] = useState(0)
  return () => setTimesTriggered(timesTriggered + 1)
}

function App() {
  const [number, setNumber] = useState(3)
  const [difficulties, setDifficulties] = useState({
    easy: true,
    medium: true,
    hard: true
  })

  function setDifficulty(name, value) {
    const updated = {...difficulties, [name]: value }
    if (0 === filter(updated).length) {
      // If none are selected, reset all
      return setDifficulties({
        easy: true,
        medium: true,
        hard: true
      })
    }
    return setDifficulties(updated)
  }

  const trigger = useTrigger()

  const animalsOfDesiredDifficulties =
    filter(animals, ({difficulty}) => difficulties[difficulty])

  const pairs = zip(
    sampleSize(flowers, number),
    sampleSize(animalsOfDesiredDifficulties, number)
  )
  //const m = Object.fromEntries(pairs)
  //console.log(flowers.map(f => m[f] ? `${f[0]}${m[f].number}` : '').join(''))
  //console.log(flowers.map(f => m[f] ? `${'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[m[f].number]}` : '-').join(''))

  return (
    <div
      className={style.App}
      style={{'background-image': `url(${textileBackground})`}}
      >
        <h1 className={style.heading}>
          Animal &amp; flower card setup for <a
            href="https://boardgamegeek.com/boardgame/276280/spring-string"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spring on a String
          </a>
        </h1>
        <button
            type="button"
            onClick={trigger}
          >
            Randomize!
        </button>
        <div>
          <input type="number" title="Number of animals" min="1" max="5" value={number}
                 onChange={e => setNumber(e.currentTarget.value)} />
          <input type="checkbox" title="Include easy"   checked={difficulties.easy}
                 onChange={e => setDifficulty('easy', e.currentTarget.checked)} />
          <input type="checkbox" title="Include medium" checked={difficulties.medium}
                 onChange={e => setDifficulty('medium', e.currentTarget.checked)} />
          <input type="checkbox" title="Include hard"   checked={difficulties.hard}
                 onChange={e => setDifficulty('hard', e.currentTarget.checked)} />
        </div>
        <div className={style.table}>
          {pairs.map(([flower, animal]) =>
            <div className={style.pair}>
              <span className={style.flower}>{flower}</span>
              <span className={style.animal}>{animal.name} ({animal.difficulty})</span>
            </div>
          )}
        </div>
    </div>
  );
}

export default App;