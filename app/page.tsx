// 'use client'

import { ArticleCard } from '@/components/article-card'
import { IssueCard } from '@/components/issue-card'
import { journalApi } from '@/lib/api'
import type { Publication, Submission } from '@/lib/api'

export interface ArticleData {
  id: number
  title: string
  abstract: string
  authorsString: Publication['authorsString']
  urlPublished: string
  doi?: string
}

export default async function Home() {
  const submissions = await journalApi.getArticles()
  
  const latestArticles: ArticleData[] = submissions
    .filter((submission): submission is Submission => 
      submission?.publications?.[0] !== undefined
    )
    .slice(0, 3)
    .map(submission => {
      const publication = submission.publications[0]
      
      return {
        id: submission.id,
        title: publication.title.en || Object.values(publication.title)[0],
        abstract: publication.abstract?.en || Object.values(publication.abstract || {})[0] || '',
        authorsString: publication.authorsString,
        urlPublished: submission.urlPublished,
        doi: publication.doi
      }
    })

  const issues = await journalApi.getIssues()
  const latestIssue = issues[0]

  return (
    <div className='container py-8'>
      <section className='mb-12'>
        <h2 className='mb-6 text-3xl font-bold'>Latest Issue</h2>
        {latestIssue && <IssueCard {...latestIssue} />}
      </section>

      <section>
        <h2 className='mb-6 text-3xl font-bold'>Featured Articles</h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>
    </div>
  )
}
