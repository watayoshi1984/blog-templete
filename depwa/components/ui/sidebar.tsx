"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MessageSquare,
  HelpCircle,
  Mail,
  Menu,
  X
} from 'lucide-react';

const routes = [
  {
    label: 'ダッシュボード',
    icon: LayoutDashboard,
    href: '/',
    color: 'text-sky-500',
  },
  {
    label: '使い方',
    icon: HelpCircle,
    href: '/usage',
    color: 'text-violet-500',
  },
  {
    label: 'FAQ',
    icon: MessageSquare,
    href: '/faq',
    color: 'text-pink-500',
  },
  {
    label: 'お問い合わせ',
    icon: Mail,
    href: '/contact',
    color: 'text-orange-500',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed top-4 z-50 rounded-lg p-2 transition-all duration-300',
          isOpen ? 'left-64' : 'left-4',
          'bg-gray-900 text-white hover:bg-gray-800'
        )}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-4 py-4 flex flex-col h-full">
          <div className="px-3 py-2 flex-1">
            <Link href="/" className="flex flex-col items-center pl-3 mb-14">
              <h1 className="text-2xl font-bold text-center">
                Diagram AI
              </h1>
              <p className="text-sm text-gray-400 mt-2 text-center">
                マーメイド記法・PlantUMLの作図をAIが支援！
              </p>
            </Link>
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                    pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400',
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
