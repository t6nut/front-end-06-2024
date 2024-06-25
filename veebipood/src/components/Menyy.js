import React from 'react'
import { Link } from "react-router-dom"


function Menyy() {
  return (
    <div>
        <Link to="avaleht">
        <img className="pilt" src="https://dalton.ee/wp-content/uploads/2019/10/nobercar1.jpg" alt="" />
      </Link>

      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>

      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>

      <Link to="/halda-tooteid">
        <button>Halda tooteid</button>
      </Link>

      <Link to="/esindused">
        <button>Esindused</button>
      </Link>

      <Link to="/kinkekaardid">
        <button>Kinkekaardid</button>
      </Link>

      <Link to="/poed">
        <button>Meie poed</button>
      </Link>
			
			<Link to="/kontakteeru-meiega">
        <button>Kontakteeru meiega</button>
      </Link>
    </div>
  )
}

export default Menyy