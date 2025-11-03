export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">About the Journal</h1>
      <div className="prose prose-zinc dark:prose-invert lg:prose-lg">
        <p>
          This is a modern academic journal dedicated to publishing high-quality research
          in the field. Our mission is to promote and disseminate scholarly work that
          advances our understanding of the discipline.
        </p>

        <h2>Aims and Scope</h2>
        <p>
          The journal publishes original research articles, review articles, and brief
          communications that contribute to the advancement of knowledge in the field.
          We welcome submissions from researchers worldwide and are committed to
          maintaining high standards of academic rigor and editorial quality.
        </p>

        <h2>Open Access Policy</h2>
        <p>
          This journal provides immediate open access to its content on the principle
          that making research freely available to the public supports a greater
          global exchange of knowledge.
        </p>

        <h2>Peer Review Process</h2>
        <p>
          All submissions undergo a rigorous peer-review process. Each manuscript is
          initially evaluated by the editorial team and then sent to at least two
          independent experts for double-blind peer review.
        </p>
      </div>
    </div>
  )
}