import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'

import styles from './NavBar.module.css'
import logo from '../../img/costs_logo.png'

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
    <Container>
      <Link>
        <img src={logo} alt="Costs" className={styles.logo}/>
      </Link>
      <ul className={styles.list}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/projects">Projetos</Link>
        </li>

        <li>
          <Link to="/company">Empresa</Link>
        </li>
        
        <li>
          <Link to="/contact">Contato</Link>
        </li>
      </ul>
    </Container>
    </nav>
  )
}

export default NavBar