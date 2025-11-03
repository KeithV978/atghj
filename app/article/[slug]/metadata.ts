import { journalApi } from "@/lib/api"
import { Metadata } from "next"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await journalApi.getArticle(params.slug)

  return {
    title: article.title,
    description: article.abstract,
    openGraph: {
      title: article.title,
      description: article.abstract,
      type: "article",
      authors: article.authors.map(a => a.name),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.abstract,
    }
  }
}