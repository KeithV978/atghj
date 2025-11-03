import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_OJS_API_URL || 'http://atghj.africa/index.php/atghj/api/v1'
const apiToken = process.env.NEXT_PUBLIC_OJS_API_KEY || ''

const api = axios.create({
  baseURL: baseUrl,
  params: {
    apiToken // Add the token as a query parameter instead of header
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export interface Publication {
  id: number
  title: { [locale: string]: string }
  fullTitle: { [locale: string]: string }
  abstract?: { [locale: string]: string }
  datePublished: string
  authorsString: Array<{
    givenName: { [locale: string]: string }
    familyName: { [locale: string]: string }
    affiliation: { [locale: string]: string }
  }>
  galleys: Array<{
    id: number
    label: string
    urlPublished: string
    file?: {
      fileName: string
      fileId: number
      fileStage: number
    }
  }>
  urlPublished: string
  status: number
  doi?: string
}

export interface Submission {
  id: number
  currentPublicationId: number
  publications: Publication[]
  status: number
  statusLabel: string
  urlPublished: string
  dateSubmitted: string
  dateLastActivity: string
  stageId: number
}

export interface PaginatedResponse<T> {
  items: T[]
  itemsMax: number
}

export const journalApi = {
  getArticles: async () => {
    try {
      const { data } = await api.get<PaginatedResponse<Submission>>('/submissions', {
        params: {
          status: 3, // STATUS_PUBLISHED = 3
          count: 100
        }
      })
      return data.items
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  },

  getArticle: async (id: number) => {
    try {
      const { data } = await api.get<Submission>(`/submissions/${id}`)
      return data
    } catch (error) {
      console.error('Error fetching article:', error)
      return null
    }
  },

  searchArticles: async (query: string) => {
    try {
      const { data } = await api.get<PaginatedResponse<Submission>>('/submissions', {
        params: {
          searchPhrase: query,
          status: 3,
          count: 10
        }
      })
      return data.items
    } catch (error) {
      console.error('Error searching articles:', error)
      return []
    }
  },

  getIssues: async () => {
    try {
      const { data } = await api.get<PaginatedResponse<Submission>>('/submissions', {
        params: {
          status: 3,
          count: 100,
          orderBy: 'datePublished',
          orderDirection: 'DESC'
        }
      })
      
      // Group submissions by issue with proper type checking
      return data.items.reduce((issues, submission) => {
        if (!submission.publications || submission.publications.length === 0) return issues
        
        const publication = submission.publications[0]
        const issueId = publication.id
        
        if (!issues.find(i => i.id === issueId)) {
          const articlesInIssue = data.items
            .filter(s => s.publications?.[0]?.id === issueId)
            .map(s => {
              const pub = s.publications[0]
              return {
                id: s.id,
                title: pub.title.en || Object.values(pub.title)[0],
                abstract: pub.abstract?.en || Object.values(pub.abstract || {})[0] || '',
                authors: pub.authorsString,
                urlPublished: s.urlPublished,
                datePublished: pub.datePublished
              }
            })
            .filter(Boolean)

          issues.push({
            id: issueId,
            title: publication.title.en || Object.values(publication.title)[0],
            datePublished: publication.datePublished,
            articles: articlesInIssue
          })
        }
        return issues
      }, [] as Array<{
        id: number;
        title: string;
        datePublished: string;
        articles: Array<{
          id: number;
          title: string;
          abstract: string;
          authors: Publication['authorsString'];
          urlPublished: string;
          datePublished: string;
        }>;
      }>)
    } catch (error) {
      console.error('Error fetching issues:', error)
      return []
    }
  },

  getIssue: async (id: number) => {
    try {
      const { data } = await api.get<Submission>(`/submissions/${id}`)
      const publication = data.publications[0]
      if (!publication) return null

      return {
        id: publication.id,
        title: publication.title.en || Object.values(publication.title)[0],
        datePublished: publication.datePublished,
        articles: [data].map(s => ({
          id: s.id,
          title: s.publications[0].title.en || Object.values(s.publications[0].title)[0],
          abstract: s.publications[0].abstract?.en || Object.values(s.publications[0].abstract || {})[0] || '',
          authors: s.publications[0].authorsString,
          urlPublished: s.urlPublished,
          datePublished: s.publications[0].datePublished
        }))
      }
    } catch (error) {
      console.error('Error fetching issue:', error)
      return null
    }
  }
}