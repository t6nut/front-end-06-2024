import React, { useState } from 'react'
import tootedJSON from '../data/tooted.json'

function HaldaTooteid() {
  const [tooted, setTooted] = useState(tootedJSON);

  const kustuta = (index) => {
    tootedJSON.splice(index, 1);
    setTooted(tootedJSON.splice());
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pilt</th>
            <th>Nimi</th>
            <th>Hind</th>
            <th>Tegevused</th>
          </tr>
        </thead>
        <tbody>
          {tooted.map((t, index) => 
            <tr>
              <td><img className='pilt' src={t.pilt} alt="" /></td>
              <td>{t.nimi}</td>
              <td>{t.hind}</td>
              <td>
                <button onClick={() => kustuta(index)}>Kustuta</button>
                <button>Muuda</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default HaldaTooteid