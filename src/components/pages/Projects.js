import React from 'react'
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'

const Projects = () => {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)

  useEffect(()=> {
    setTimeout(()=> {
      fetch('http://localhost:5000/projects',{
        methods: 'GET',
        headers: {
          'Content-Type': 'applicattion/json',
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch((error) => console.log(error))
    },300)
  },[])

  const location = useLocation()
  let message = ''
  if(location.state) {
    message = location.state.message
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto"/>
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 && 
          projects.map((project)=> (
            <ProjectCard 
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category ? project.category.name : project.category}
              key={project.id }
              />
          ))}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 && (
            <p className={styles.without_proejects}>Não há projetos cadastrados<span> :( </span></p>
          )}

      </Container>
    </div>
  )
}

export default Projects