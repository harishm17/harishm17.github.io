function Certifications({ showTitle = true }) {
  const certifications = [
    {
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services"
    },
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services"
    },
    {
      name: "DeepLearning.AI TensorFlow Developer Specialization",
      issuer: "Coursera",
      date: "Jun 2023",
      credentialId: "EMK8CANULYKT"
    },
    {
      name: "Machine Learning",
      issuer: "Coursera",
      credentialId: "A97LKX4JCMYM"
    }
  ]

  return (
    <section id="certifications">
      {showTitle && <h2>Certifications</h2>}
      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="cert-entry">
            <h4>{cert.name}</h4>
            <p className="cert-issuer">{cert.issuer}</p>
            {cert.date && <p className="cert-date">{cert.date}</p>}
            {cert.credentialId && (
              <p className="cert-credential">Credential ID: {cert.credentialId}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certifications
