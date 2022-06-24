//React properties
import React from 'react'
import {BrowserRouter as Router, Route,} from 'react-router-dom'

//pages
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

//layouts
import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
      </div>

      <Container customClass="min-height">
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/projects'>
          <Projects />
        </Route>

        <Route path='/contact'>
          <Contact />
        </Route>
        
        <Route path='/company'>
          <Company />
        </Route>

        <Route path='/newproject'>
          <NewProject/>
        </Route>

        <Route path='/project/:id'>
          <Project />
        </Route>
      </Container>

      <Footer />
    </Router>
  )
}

export default App