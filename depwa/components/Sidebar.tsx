import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, SunIcon, MoonIcon } from 'lucide-react'
import Link from 'next/link'
import { useDiagramStore } from '@/lib/store'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDiagramStore()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
          <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-lg font-semibold" onClick={() => setOpen(false)}>
            ホーム
          </Link>
          <Link href="/usage" className="text-lg" onClick={() => setOpen(false)}>
            使い方
          </Link>
          <Link href="/faq" className="text-lg" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Link href="/contact" className="text-lg" onClick={() => setOpen(false)}>
            お問い合わせ
          </Link>
        </nav>
        <div className="mt-auto pt-4">
          <Button onClick={toggleDarkMode} variant="outline" size="sm" className="w-full">
            {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem] mr-2" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem] mr-2" />}
            {isDarkMode ? 'ライトモード' : 'ダークモード'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

