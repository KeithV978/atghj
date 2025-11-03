# 🧾 Product Requirements Document (PRD)  
**Project Title:** Headless Journal Platform with OJS Backend and Next.js Frontend  
**Version:** 1.0  
**Date:** November 2025  
**Owner:** Circle of Three Technologies  
**Prepared By:** [Your Name / Team]

---

## 1. Overview

### 1.1 Summary
This project aims to create a **modern, performant, and accessible journal platform** that uses **Open Journal Systems (OJS 3.5)** as the backend for content management, submission, review, and publication workflows, while **Next.js** powers a **custom-designed, API-driven frontend** for users (readers, authors, editors).

### 1.2 Objectives
- Deliver a **fast, modern journal website** using Next.js (React + SSR/ISR).
- Integrate seamlessly with **OJS REST API** for fetching journal data.
- Improve **SEO, UX, and accessibility** compared to the default OJS interface.
- Maintain **editorial workflows** within OJS (no disruption for editors/reviewers).
- Support **multi-journal architecture** (optional phase 2).

---

## 2. Stakeholders

| Role | Responsibility |
|------|----------------|
| Product Owner | Defines vision, priorities, and success metrics |
| Developers (Frontend) | Build and maintain Next.js application |
| Developers (Backend) | Configure OJS, manage API and data models |
| Designers | Create UI/UX aligned with academic publishing norms |
| Editors / Admins | Manage content and workflows in OJS |
| Readers / Authors | Consume and interact with published content |

---

## 3. Scope

### 3.1 In Scope
- Use OJS 3.5 as backend (running on PHP + MySQL/PostgreSQL).
- Expose OJS data via **REST API endpoints** (`/api/v1/issues`, `/api/v1/articles`, `/api/v1/announcements`, etc.).
- Build a **Next.js frontend** that consumes these endpoints.
- SEO optimization via **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)**.
- Journal features:
  - Home page with featured issues and articles.
  - Journal info (About, Editorial board, Policies).
  - Browse by issue, author, category, and search.
  - Article detail pages (with metadata, PDF link, DOI).
  - Announcements, Calls for Papers.
- Integration with OJS authentication for submission/login (optional).

### 3.2 Out of Scope (for v1)
- Full submission/review functionality on the Next.js side (handled in OJS backend).
- Multi-journal management (single journal per OJS instance initially).
- Custom plugin development in OJS (only REST data access).

---

## 4. Functional Requirements

### 4.1 Data Flow
| Source | Endpoint | Consumed by | Purpose |
|---------|-----------|-------------|----------|
| OJS | `/api/v1/issues` | Next.js `/issues` | Display list of published issues |
| OJS | `/api/v1/issues/{id}/articles` | Next.js `/issue/[slug]` | Display articles in an issue |
| OJS | `/api/v1/articles/{id}` | Next.js `/article/[slug]` | Display full article details |
| OJS | `/api/v1/announcements` | Next.js `/news` | Display announcements and CFPs |
| OJS | `/api/v1/journals` | Next.js homepage | Fetch basic journal info |
| OJS | `/api/v1/sections` | Next.js | Organize content by sections/categories |

---

### 4.2 Frontend Requirements (Next.js)

#### Pages and Routes
| Page | Route | Features |
|------|--------|-----------|
| Home | `/` | Featured issues, latest articles, announcements |
| Issues | `/issues` | Paginated issue listing |
| Single Issue | `/issue/[slug]` | Issue metadata + article list |
| Article | `/article/[slug]` | Title, abstract, metadata, author(s), PDF download link, DOI |
| Announcements | `/announcements` | List and detail pages |
| About | `/about` | Static content from OJS or CMS |
| Editorial Team | `/editorial-team` | Static or API-based |
| Search | `/search` | Search OJS via REST query or local indexing |
| Login (optional) | `/login` | Redirect to OJS or handle via OAuth2 |

#### Components
- Navbar, Footer (shared branding)
- ArticleCard, IssueCard
- Pagination component
- SearchBar component
- DOI Badge component
- Rich text parser (for OJS HTML content)
- Language switcher (if multilingual journal)

#### Technical
- Next.js 15+ with App Router
- TypeScript for type safety
- Tailwind CSS + ShadCN UI for components
- Incremental Static Regeneration (ISR) for freshness
- Axios or fetch() for API calls
- Sitemap + OpenGraph + JSON-LD metadata for SEO
- Error boundaries and fallback UI for API failures

---

### 4.3 Backend Requirements (OJS 3.5)
- Enable REST API (`api_enabled = On` in config.inc.php)
- Configure CORS for Next.js domain
- Ensure all content types (articles, issues, announcements) are publicly accessible via API
- Configure HTTPS and authentication if needed
- Optional: Create custom endpoints for editorial data (via plugin)

---

### 4.4 Authentication & Access Control
- Readers: Public access to published content.
- Editors/Admins: Log in directly to OJS (`/login`).
- Optional OAuth2 integration (Next.js front-end login triggers OJS auth).

---

## 5. Non-Functional Requirements

| Category | Requirement |
|-----------|--------------|
| Performance | Pages load <2s (Lighthouse score >90) |
| SEO | SSR, canonical URLs, structured metadata |
| Accessibility | WCAG 2.1 AA compliance |
| Scalability | API-driven architecture allows multiple frontends |
| Security | HTTPS, sanitized API requests, no exposed admin endpoints |
| Maintainability | Decoupled architecture allows independent updates |
| Localization | Multi-language support (based on OJS locales) |

---

## 6. Technical Architecture

```plaintext
          ┌──────────────────────┐
          │     Next.js App      │
          │  (Frontend Layer)    │
          └─────────┬────────────┘
                    │ REST API Calls
                    ▼
          ┌──────────────────────┐
          │        OJS 3.5       │
          │  (Backend CMS Layer) │
          └─────────┬────────────┘
                    │
                    ▼
          ┌──────────────────────┐
          │ Database (MySQL/PG)  │
          └──────────────────────┘
```

- **Hosting**:  
  - OJS: cPanel / VPS (Apache, PHP 8.x)  
  - Next.js: Vercel, Netlify, or Dockerized on same VPS  
- **Data Exchange:** HTTPS REST API (JSON)
- **Caching:** Next.js ISR and client-side caching
- **CDN:** Optional for PDFs and media

---

## 7. Milestones & Deliverables

| Phase | Deliverable | Timeline |
|--------|--------------|-----------|
| Phase 1 | OJS setup and API configuration | Week 1–2 |
| Phase 2 | Next.js base structure and API integration | Week 3–5 |
| Phase 3 | UI/UX implementation and theming | Week 6–7 |
| Phase 4 | SEO, testing, and optimization | Week 8–9 |
| Phase 5 | Deployment and documentation | Week 10 |

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Page load time | < 2 seconds |
| SEO score (Lighthouse) | ≥ 90 |
| Accessibility score | ≥ 85 |
| API uptime | ≥ 99% |
| Editorial satisfaction | ≥ 90% in user survey |

---

## 9. Future Enhancements (Phase 2+)
- Multi-journal support (via `/api/v1/journals`)
- Submission and review workflow integration in frontend
- Full-text search and indexing (ElasticSearch)
- Notification and subscription features
- DOI and ORCID integration on frontend
