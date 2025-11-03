import Link from 'next/link'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Journal</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/issues" className="flex items-center text-lg font-medium">
              Issues
            </Link>
            <Link href="/about" className="flex items-center text-lg font-medium">
              About
            </Link>
            <Link href="/editorial-team" className="flex items-center text-lg font-medium">
              Editorial Team
            </Link>
            <Link href="/announcements" className="flex items-center text-lg font-medium">
              Announcements
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}