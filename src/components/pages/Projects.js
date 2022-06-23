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
  const [projectMessage, setProjectMessage] = useState('')

  useEffect(()=> {
    setTimeout(()=> {
      fetch('http://localhost:5000/projects',{
        methods: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }) .then(response => response.json())
       .then(() => {
          setProjects(projects.filter((project) => project.id !== id))
          setProjectMessage('Projeto Removido com Sucesso!')
       })
       .catch(err => console.log(err))
  }

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
      {projectMessage && <Message type="success" msg={projectMessage} />}

      <Container customClass="start">
        {projects.length > 0 && 
          projects.map((project)=> (
            <ProjectCard 
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category ? project.category.name : project.category}
              key={project.id }
              handleRemove={removeProject}
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