import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { journalApi } from "@/lib/api"

export default async function AnnouncementsPage() {
  const announcements = await journalApi.getAnnouncements()

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Announcements</h1>
      <div className="grid gap-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <CardTitle>{announcement.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}