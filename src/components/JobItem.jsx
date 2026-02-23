import { useState } from "react";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net"

function JobItem({ job, candidate }) {
    const [repoUrl, setRepoUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(
                `${BASE_URL}/api/candidate/apply-to-job`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uuid: candidate.uuid,
                        jobId: job.id,
                        candidateId: candidate.candidateId,
                        applicationId: candidate.applicationId,
                        repoUrl: repoUrl
                    })
                }
            );
            console.log(candidate.uuid);
            console.log(job.id);
            console.log(candidate.candidateId);
            console.log(repoUrl);
            
            if (!response.ok) {
                throw new Error("Error al enviar la postulación");
            }

            const data = await response.json()

            if (data.ok) {
                setSuccess(true)
            }

        } catch (error) {
            setError(error.message)
            
        } finally {
            setLoading(false)
        }
    };

    return (
        <li>
            <h3>{job.title}</h3>
            <input
                type="text"
                name="repoUrl"
                id="repoUrl"
                value={repoUrl}
                placeholder="URL del repositorio de GitHub"
                onChange={(event) => setRepoUrl(event.target.value)} />
            <button type="submit" onClick={handleSubmit}>{loading ? "Enviando..." : "Enviar"}</button>
            {success && <p className="success">Postulación enviada!</p>}
            {error && <p className="error">{error}</p>}
        </li>
    )
}

export default JobItem;