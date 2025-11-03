import { ArticleCard } from "@/components/article-card"
import { journalApi } from "@/lib/api"

interface IssuePageProps {
  params: {
    slug: string
  }
}

export default async function IssuePage({ params }: IssuePageProps) {
  const issue = await journalApi.getIssue(params.slug)

  return (
    <div className="container py-8">
      <h1 className="mb-2 text-4xl font-bold">{issue.title}</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Volume {issue.volume}, Issue {issue.number} ({issue.year})
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {issue.articles?.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  )
}