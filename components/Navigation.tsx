'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, Settings } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: '首页' },
    { href: '#skills', label: '技能特长' },
    { href: '#experience', label: '实践经历' },
    { href: '#education', label: '教育背景' },
    { href: '#contact', label: '联系方式' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className={`text-xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-gray-900'
            }`}>
              孙可馨
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${
                  scrolled ? 'text-gray-700' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <Settings className="w-4 h-4 mr-1" />
              管理
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/admin"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 bg-white rounded-lg mt-2 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}