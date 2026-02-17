import { useEffect, useState } from 'react'
import './App.css'
import LoadingMessage from './Loading';
import ErrorMessage from './Error';
import JobList from './components/JobList';

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";
const EMAIL = "chonacholopez99@gmail.com";

function App() {
  const [candidate, setCandidate] = useState(null)
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCandidate() {
      try {
        const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${EMAIL}`)
        if (!response.ok) {
          throw new Error("Error al obtener la información del candidato.")
        }
        const result = await response.json()
        setCandidate(result)

      } catch (error) {
        setError(error.message)

      }
    }

    fetchCandidate()
  }, [])
  useEffect(() => {

    async function fetchPositions() {
      try {
        const response = await fetch(`${BASE_URL}/api/jobs/get-list`)
        if (!response.ok) {
          throw new Error("Error al traer las posiciones laborales.")
        }
        const result = await response.json()
        setPositions(result)

      } catch (error) {
        setError(error.message)

      } finally {
        setLoading(false)
      }

    }
    fetchPositions()
  }, [])

  if (loading) {
    return <LoadingMessage />
  }
  if (error) {
    return <ErrorMessage />
  }
  if (!candidate) {
    return <p>No hay posiciones abiertas en este momento.</p>
  }

  return (
    <div>
      <h1>Posiciones</h1>
      <JobList positions={positions} candidate={candidate} />
    </div>
  )
}

export default App;
