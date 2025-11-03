import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Link from "next/link"

interface Author {
  givenName: { [locale: string]: string }
  familyName: { [locale: string]: string }
  affiliation: { [locale: string]: string }
}

interface ArticleCardProps {
  title: string
  authorsString: Author[] // Changed from authors to authorsString to match usage
  abstract?: string
  doi?: string
  id: number
  urlPublished: string
}

export function ArticleCard({ 
  title, 
  authorsString, 
  abstract, 
  doi, 
  urlPublished 
}: ArticleCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Link href={urlPublished}>
          <CardTitle className="line-clamp-2 hover:underline">{title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">{abstract}</p>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between">
        <div className="flex space-x-4">
          <div className="flex -space-x-2">
            {authorsString?.map((author: Author, i: number) => (
              <Avatar key={i} className="border-2 border-background">
                <AvatarFallback>
                  {(author.givenName.en?.[0] || author.givenName[Object.keys(author.givenName)[0]][0])}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {authorsString?.map((author: Author, i: number) => (
              <span key={i}>
                {author.givenName.en || author.givenName[Object.keys(author.givenName)[0]]}
                {" "}
                {author.familyName.en || author.familyName[Object.keys(author.familyName)[0]]}
                {i < (authorsString?.length || 0) - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
        {doi && <Badge variant="secondary">DOI: {doi}</Badge>}
      </CardFooter>
    </Card>
  )
}