import React from 'react'
import styles from './Project.module.css'

import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../layout/Loading'
import Container from '../layout/Container'

const Project = () => {

  const {id} = useParams ()
  
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)

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

  function toggleProjectForm() {

  }

  return (
    <>
      {project.name ? (
        <div> 
          <Container customClass="column">
            <div>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm}>Editar Project</button>
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project