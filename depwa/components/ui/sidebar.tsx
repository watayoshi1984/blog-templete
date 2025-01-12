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
  X,
  MoonIcon,
  SunIcon
} from 'lucide-react';
import { useTheme } from 'next-themes';

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
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-all",
          isOpen && "left-64"
        )}
        aria-label={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Link href="/" className="flex items-center justify-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                まめお・ぷらお
              </h1>
            </Link>
            <nav className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    pathname === route.href
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300'
                  )}
                >
                  <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={cn(
                'flex items-center justify-center w-full px-4 py-2 rounded-lg transition-colors',
                'text-sm font-medium',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                'text-gray-600 dark:text-gray-300'
              )}
              aria-label={theme === 'dark' ? "ライトモードに切り替え" : "ダークモードに切り替え"}
            >
              {theme === 'dark' ? (
                <>
                  <SunIcon className="h-5 w-5 mr-2" />
                  ライトモード
                </>
              ) : (
                <>
                  <MoonIcon className="h-5 w-5 mr-2" />
                  ダークモード
                </>
              )}
            </button>
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              © 2024 まめお・ぷらお
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
