'use client'

import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { journalApi, type Submission } from "@/lib/api"
import { Search } from "lucide-react"
import { FormEvent, useState } from "react"

// Define interface to match ArticleCard props
interface SearchResult {
  id: number
  title: string
  abstract: string
  authorsString: Array<{
    givenName: { [locale: string]: string }
    familyName: { [locale: string]: string }
    affiliation: { [locale: string]: string }
  }>
  urlPublished: string
  doi?: string
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    try {
      const submissions = await journalApi.searchArticles(query)
      const articles: SearchResult[] = submissions
        .filter((submission): submission is Submission => {
          return Boolean(submission?.publications?.[0])
        })
        .map(submission => {
          const publication = submission.publications[0]
          return {
            id: submission.id,
            title: publication.title.en || Object.values(publication.title)[0],
            abstract: publication.abstract?.en || Object.values(publication.abstract || {})[0] || '',
            authorsString: publication.authorsString || [],
            urlPublished: submission.urlPublished,
            doi: publication.doi
          }
        })
      setResults(articles)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Search Articles</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search by title, author, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-lg"
          />
          <Button type="submit" disabled={isSearching}>
            <Search className="mr-2 h-4 w-4" />
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      <div className="min-h-[200px]">
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <ArticleCard 
                key={article.id}
                {...article}
              />
            ))}
          </div>
        ) : query ? (
          <p className="text-muted-foreground">No articles found matching your search.</p>
        ) : null}
      </div>
    </div>
  )
}