import Link from 'next/link';

interface GuidelineSection {
  title: string;
  id: string;
  content: string | React.ReactNode;
}

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Author Guidelines</h1>
          <p className="text-xl text-blue-100">
            Guidelines for submitting to ATGHJ
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block">
            <nav className="sticky top-8 space-y-2" aria-label="Guidelines Navigation">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              {/* Quick Links */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link
                    href="/submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submit Manuscript
                  </Link>
                  <Link
                    href="/templates"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 border-indigo-600"
                  >
                    Download Templates
                  </Link>
                </div>
              </div>

              {/* Guidelines Sections */}
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-600">{section.content}</div>
                </section>
              ))}

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Need Help?
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about the submission process, please contact our editorial office:
                </p>
                <p className="text-gray-600">Email: editorial@atghj.africa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sections: GuidelineSection[] = [
  {
    title: "Scope and Focus",
    id: "scope",
    content: (
      <>
        <p>
          ATGHJ publishes high-quality research advancing the translation of scientific 
          discoveries into clinical practice and community health outcomes across Africa 
          and globally. We welcome submissions in:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Biomedical sciences</li>
          <li>Translational medicine</li>
          <li>Clinical research</li>
          <li>Neuroscience</li>
          <li>Public health</li>
          <li>Epidemiology</li>
        </ul>
      </>
    ),
  },
  {
    title: "Article Types",
    id: "article-types",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Original Research Articles</h3>
          <p>4,000-6,000 words, structured abstract (250-300 words)</p>
          <p>Sections: Introduction, Methods, Results, Discussion</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Review Articles</h3>
          <p>5,000-8,000 words, structured abstract (250-300 words)</p>
          <p>Systematic or narrative reviews with comprehensive literature analysis</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Case Reports</h3>
          <p>1,500-3,000 words, structured abstract (150-200 words)</p>
          <p>Novel or educational clinical cases with literature review</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Short Communications</h3>
          <p>2,000-3,000 words, structured abstract (150-200 words)</p>
          <p>Brief reports of significant preliminary findings</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Letters to the Editor</h3>
          <p>500-1,000 words, no abstract required</p>
          <p>Commentary on published articles or current topics</p>
        </div>
      </div>
    ),
  },
  {
    title: "Manuscript Preparation",
    id: "preparation",
    content: (
      <>
        <h3 className="text-lg font-semibold mb-4">File Format</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Submit manuscripts in DOC, DOCX, or LaTeX format</li>
          <li>Maximum file size: 50MB</li>
          <li>Use standard fonts (Times New Roman, Arial, or Calibri)</li>
          <li>12-point font size, double-spaced, with 1-inch margins</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4">Structure</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Title page (title, authors, affiliations, corresponding author)</li>
          <li>Abstract (structured according to article type)</li>
          <li>Keywords (3-6 relevant terms)</li>
          <li>Main text (following article type structure)</li>
          <li>References (Vancouver style)</li>
          <li>Tables and Figures (with legends)</li>
          <li>Supplementary materials (if applicable)</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4">Figures and Tables</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>High-resolution images (minimum 300 dpi)</li>
          <li>Acceptable formats: JPG, PNG, TIFF</li>
          <li>Clear, self-explanatory legends</li>
          <li>Tables in editable format (not images)</li>
        </ul>
      </>
    ),
  },
  {
    title: "Ethics and Policies",
    id: "ethics",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>Ethics Approval:</strong> All research involving human or animal 
            subjects must have appropriate ethical approval
          </li>
          <li>
            <strong>Consent:</strong> Written informed consent for publication of 
            clinical details/images
          </li>
          <li>
            <strong>Clinical Trials:</strong> Registration in a public trials 
            registry required
          </li>
          <li>
            <strong>Conflicts of Interest:</strong> Must be declared using the ICMJE form
          </li>
          <li>
            <strong>Plagiarism:</strong> All submissions are checked using Turnitin
          </li>
          <li>
            <strong>Data Sharing:</strong> Encourage open data practices where appropriate
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Submission Process",
    id: "submission",
    content: (
      <>
        <p className="mb-4">
          Submissions are handled through our online submission system. The process 
          includes:
        </p>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Account Creation:</strong> Register or log in to the submission system
          </li>
          <li>
            <strong>Manuscript Upload:</strong> Follow the step-by-step submission wizard
          </li>
          <li>
            <strong>Author Information:</strong> Provide details for all authors, 
            including ORCID IDs
          </li>
          <li>
            <strong>Metadata Entry:</strong> Title, abstract, keywords, and other 
            required information
          </li>
          <li>
            <strong>File Upload:</strong> Main manuscript and supplementary files
          </li>
          <li>
            <strong>Review & Submit:</strong> Verify all information before final submission
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "Publication Fees",
    id: "fees",
    content: (
      <>
        <p className="mb-4">
          ATGHJ is an open-access journal with the following publication fees:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Article Processing Charge (APC): $1,200 USD</li>
          <li>Waiver program available for authors from low-income countries</li>
          <li>No submission fees</li>
          <li>No page charges</li>
        </ul>
        <p className="mt-4">
          Payment is required only after manuscript acceptance. Detailed payment 
          instructions will be provided with the acceptance letter.
        </p>
      </>
    ),
  },
  {
    title: "Review Process",
    id: "review",
    content: (
      <>
        <p className="mb-4">Our peer review process includes:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Initial editorial screening (1-3 days)</li>
          <li>Double-blind peer review (4-6 weeks)</li>
          <li>Editorial decision based on reviews</li>
          <li>Revision opportunity if required</li>
          <li>Final decision and publication</li>
        </ol>
        <p className="mt-4">
          Authors can track their manuscript status through their account dashboard.
        </p>
      </>
    ),
  },
];
