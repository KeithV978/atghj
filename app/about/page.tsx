import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About ATGHJ
          </h1>
          <p className="text-xl text-blue-100">
            Bridging Research, Innovation, and Health Equity in Africa!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Journal Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Journal</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              The African Translational & Global Health Journal (ATGHJ) is an open-access, 
              peer-reviewed journal dedicated to advancing the translation of scientific 
              discoveries into clinical practice and community health outcomes across Africa 
              and globally.
            </p>
            <p>
              We publish high-quality research in biomedical sciences, translational medicine, 
              clinical research, neuroscience, public health, epidemiology, and related disciplines.
            </p>
          </div>
        </section>

        {/* Publication Info */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Publication Schedule</h3>
            <p className="text-gray-600">
              ATGHJ publishes quarterly issues in:
            </p>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>• January</li>
              <li>• April</li>
              <li>• July</li>
              <li>• October</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Indexing</h3>
            <p className="text-gray-600">ATGHJ is working towards indexing in:</p>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>• Scopus</li>
              <li>• PubMed</li>
              <li>• DOAJ (Directory of Open Access Journals)</li>
              <li>• Web of Science</li>
            </ul>
          </div>
        </section>

        {/* Article Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articleTypes.map((type) => (
              <div key={type.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Editorial Process</h2>
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p>
                ATGHJ follows a rigorous double-blind peer-review process to ensure the 
                highest quality of published research. Our editorial workflow includes:
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {editorialSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-xl font-bold text-indigo-600 mb-2">{index + 1}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Submit Your Research?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our community of researchers advancing health equity in Africa
          </p>
          <Link 
            href="/submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Submit Manuscript
          </Link>
        </section>
      </div>
    </div>
  );
}

const articleTypes = [
  {
    title: "Original Research Articles",
    description: "Primary research findings with comprehensive methodology and results analysis."
  },
  {
    title: "Review Articles",
    description: "Systematic or narrative reviews synthesizing current knowledge in the field."
  },
  {
    title: "Case Reports",
    description: "Detailed reports of unique or noteworthy clinical cases."
  },
  {
    title: "Short Communications",
    description: "Brief reports of significant preliminary or novel findings."
  },
  {
    title: "Letters to the Editor",
    description: "Scholarly correspondence regarding published articles or current topics."
  },
  {
    title: "Special Issues",
    description: "Themed collections focusing on specific areas of translational medicine."
  }
];

const editorialSteps = [
  {
    title: "Initial Screening",
    description: "Manuscripts are checked for scope alignment and technical requirements."
  },
  {
    title: "Peer Review",
    description: "Double-blind review by at least two independent experts."
  },
  {
    title: "Editorial Decision",
    description: "Based on reviewer feedback and editorial assessment."
  },
  {
    title: "Publication",
    description: "Accepted articles are prepared for publication with assigned DOI."
  }
];
