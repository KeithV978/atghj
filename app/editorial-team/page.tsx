import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const editorialTeam = [
  {
    name: "Dr. Jane Smith",
    role: "Editor-in-Chief",
    affiliation: "University of Science",
    bio: "Leading expert in the field with over 20 years of research experience.",
    avatar: "/avatars/jane-smith.jpg"
  },
  {
    name: "Prof. John Doe",
    role: "Associate Editor",
    affiliation: "Tech Institute",
    bio: "Specializes in advanced research methodologies and theoretical frameworks.",
    avatar: "/avatars/john-doe.jpg"
  },
  // Add more team members as needed
]

export default function EditorialTeamPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Editorial Team</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {editorialTeam.map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">
                {member.affiliation}
              </p>
              <p className="text-sm">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}