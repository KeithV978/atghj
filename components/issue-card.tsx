import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"

interface IssueCardProps {
  id: number
  title: string
  datePublished: string
  articles: Array<{
    id: number
    title: string
    abstract: string
    authors: Array<{
      givenName: { [locale: string]: string }
      familyName: { [locale: string]: string }
    }>
    datePublished: string
  }>
}

export function IssueCard({ title, articles, datePublished, id }: IssueCardProps) {
  return (
    <Link href={`/issue/${id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardHeader>
          <CardTitle className="line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <span>Published: {new Date(datePublished).toLocaleDateString()}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {articles.length} article{articles.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}