import React from 'react'
import styles from './Project.module.css'

import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'


const Project = () => {

  const {id} = useParams ()
  
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(()=>{
    setTimeout(()=> {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }) .then((response)=> response.json())
         .then((data) => {
          setProject(data)
         })
         .catch(error => console.log(error))
    },1000)
  }, [id])

  function editPost(project) {
    //budget validation
    if(project.budget < project.cost) {
      setMessage('O orçamento não poede ser menor que o custo do projeto!')
      setType('erro')
      return false
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado')
        setType('success')
    })
    .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}> 
          <Container customClass="column">
            {message && <Message type={type} msg={message}/> }
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span>{project.category.name}
                  </p>

                  <p>
                    <span>Total de Orçamento: </span>R${project.budget}
                  </p>

                  <p>
                    <span>Total de Utilizado: </span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm 
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Container>
          <Loading/>
        </Container>
      )}
    </>
  )
}

export default Project