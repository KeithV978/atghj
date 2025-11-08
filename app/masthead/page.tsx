import Image from 'next/image';

interface EditorialMember {
  name: string;
  role: string;
  affiliation: string;
  country: string;
  orcid?: string;
  profileImage?: string;
  bio?: string;
}

interface EditorialTeam {
  editorInChief: EditorialMember[];
  associateEditors: EditorialMember[];
  sectionEditors: EditorialMember[];
  editorialBoard: EditorialMember[];
  managingEditor: EditorialMember[];
  technicalEditor: EditorialMember[];
}

// This would typically come from your API
const editorialTeam: EditorialTeam = {
  editorInChief: [
    {
      name: "Prof. Sarah Mbekwa",
      role: "Editor-in-Chief",
      affiliation: "University of Cape Town",
      country: "South Africa",
      orcid: "0000-0002-1234-5678",
      profileImage: "/images/editors/sarah-mbekwa.jpg",
      bio: "Professor of Translational Medicine with 20+ years experience in biomedical research and academic publishing."
    }
  ],
  associateEditors: [
    {
      name: "Dr. Kwame Nkrumah",
      role: "Associate Editor - Clinical Research",
      affiliation: "University of Ghana Medical School",
      country: "Ghana",
      orcid: "0000-0002-2345-6789"
    },
    {
      name: "Prof. Fatima Ahmed",
      role: "Associate Editor - Public Health",
      affiliation: "Addis Ababa University",
      country: "Ethiopia",
      orcid: "0000-0002-3456-7890"
    }
  ],
  sectionEditors: [
    {
      name: "Dr. John Okonjo",
      role: "Section Editor - Biomedical Sciences",
      affiliation: "University of Ibadan",
      country: "Nigeria",
      orcid: "0000-0002-4567-8901"
    }
  ],
  editorialBoard: [
    {
      name: "Prof. Marie Diop",
      role: "Editorial Board Member",
      affiliation: "University of Dakar",
      country: "Senegal",
      orcid: "0000-0002-5678-9012"
    }
  ],
  managingEditor: [
    {
      name: "Dr. Elizabeth Nyamwaya",
      role: "Managing Editor",
      affiliation: "ATGHJ Editorial Office",
      country: "Kenya",
      orcid: "0000-0002-6789-0123"
    }
  ],
  technicalEditor: [
    {
      name: "Mr. Victor Olorunda",
      role: "Technical Editor",
      affiliation: "ATGHJ Editorial Office",
      country: "Nigeria",
      orcid: "0000-0002-7890-1234"
    }
  ]
};

function EditorialMemberCard({ member }: { member: EditorialMember }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        {member.profileImage && (
          <div className="flex-shrink-0">
            <Image
              src={member.profileImage}
              alt={member.name}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <p className="text-indigo-600 font-medium">{member.role}</p>
          <p className="text-gray-600 mt-1">{member.affiliation}</p>
          <p className="text-gray-500 text-sm">{member.country}</p>
          {member.orcid && (
            <a
              href={`https://orcid.org/${member.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-sm text-gray-600 hover:text-indigo-600"
            >
              <Image
                src="/images/orcid-logo.svg"
                alt="ORCID"
                width={16}
                height={16}
                className="mr-1"
              />
              {member.orcid}
            </a>
          )}
          {member.bio && (
            <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function EditorialSection({ title, members }: { title: string; members: EditorialMember[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {members.map((member) => (
          <EditorialMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}

export default function MastheadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Editorial Masthead</h1>
          <p className="text-xl text-blue-100">
            Meet the team behind ATGHJ
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-600">
            The African Translational & Global Health Journal (ATGHJ) is supported by an 
            international editorial team of leading researchers and practitioners in 
            biomedical sciences, translational medicine, and global health. Our editorial 
            team ensures the highest standards of peer review and scientific publishing.
          </p>
        </div>

        {/* Editorial Sections */}
        <EditorialSection title="Editor-in-Chief" members={editorialTeam.editorInChief} />
        <EditorialSection title="Associate Editors" members={editorialTeam.associateEditors} />
        <EditorialSection title="Section Editors" members={editorialTeam.sectionEditors} />
        <EditorialSection title="Editorial Board" members={editorialTeam.editorialBoard} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <EditorialSection title="Managing Editor" members={editorialTeam.managingEditor} />
          <EditorialSection title="Technical Editor" members={editorialTeam.technicalEditor} />
        </div>

        {/* Join the Team CTA */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Editorial Team
          </h2>
          <p className="text-gray-600 mb-6">
            We welcome applications from qualified researchers and practitioners to join 
            our editorial board or serve as peer reviewers.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Express Interest
          </a>
        </div>
      </div>
    </div>
  );
}
