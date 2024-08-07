import React, {useState} from 'react'

function Kinkekaart() {
  const [kogus, setKogus] = useState(1);
  const [sonum, setSonum] = useState("Suurenda kogust!");

	console.log("Re-renderdan");

  function vahenda() {
    setKogus(kogus - 1);
		setSonum("Vähendasid kogust!");
  }

  function suurenda() {
    setKogus(kogus + 1);
    setSonum("Suurendasid kogust!");
  }

  return (
    <div>
			<h1>learn react</h1>
      <div>{sonum}</div>
      <button disabled={kogus === 1} onClick={vahenda}>-</button>
      <span>{kogus}</span>
      <button onClick={suurenda}>+</button>
    </div>
  )
}

export default Kinkekaart