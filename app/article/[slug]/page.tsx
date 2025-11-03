import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { journalApi } from "@/lib/api"
import { FileText } from "lucide-react"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await journalApi.getArticle(params.slug)

  return (
    <div className="container py-8">
      <article className="prose prose-zinc dark:prose-invert lg:prose-lg mx-auto">
        <h1>{article.title}</h1>

        <div className="flex flex-wrap gap-4 not-prose">
          {article.authors.map((author, i) => (
            <div key={i} className="flex items-center gap-2">
              {author.name}
            </div>
          ))}
        </div>

        {article.doi && (
          <div className="not-prose mb-6">
            <Badge variant="secondary" className="text-sm">
              DOI: {article.doi}
            </Badge>
          </div>
        )}

        {article.pdfUrl && (
          <div className="not-prose mb-6">
            <Button asChild>
              <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        )}

        <div className="mt-6">
          <h2>Abstract</h2>
          <p>{article.abstract}</p>
        </div>
      </article>
    </div>
  )
}