import Link from "next/link"

export function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-stone-700">Cat & Rob's Ultra Challenge</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="#story"
                className="text-stone-600 hover:bg-stone-200 transition-all hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                The Story
              </Link>
              <Link
                href="#dashboard"
                className="text-stone-600 hover:bg-stone-200 transition-all hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Live Dashboard
              </Link>
              <Link
                href="#updates"
                className="text-stone-600 hover:bg-stone-200 transition-all hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Updates
              </Link>
              <Link
                href="#pledge"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all transform active:scale-95"
              >
                Pledge Now
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <Link
              href="#pledge"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all transform active:scale-95"
            >
              Pledge
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
