import JobItem from "./JobItem";

function JobList({ positions, candidate }) {

    return (
        <div>
            <ul>
                {positions.map(job => (
                    <JobItem
                        key={job.id}
                        job={job}
                        candidate={candidate}
                    />
                ))}
            </ul>
        </div>
    )
}

export default JobList;