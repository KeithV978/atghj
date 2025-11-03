import { IssueCard } from "@/components/issue-card"
import { journalApi } from "@/lib/api"

export default async function IssuesPage() {
  const issues = await journalApi.getIssues()

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Issues</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <IssueCard key={issue.id} {...issue} />
        ))}
      </div>
    </div>
  )
}