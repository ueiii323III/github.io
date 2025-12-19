'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import BasicInfo from '@/components/BasicInfo'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import EducationSection from '@/components/EducationSection'
import Footer from '@/components/Footer'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { ResumeData } from '@/types'

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/api/resume')
        if (response.ok) {
          const data = await response.json()
          setResumeData(data)
        } else {
          // 如果API不可用，使用初始数据
          const initialData = await import('@/data/initialData.json')
          setResumeData(initialData.default)
        }
      } catch (error) {
        console.error('Failed to fetch resume data:', error)
        // 降级到静态数据
        import('@/data/initialData.json').then(data => {
          setResumeData(data.default)
        })
      } finally {
        setLoading(false)
      }
    }

    fetchResumeData()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">数据加载失败</h1>
          <p className="text-gray-600">请刷新页面重试</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <BasicInfo info={resumeData.basicInfo} />
        
        <section id="skills" className="py-12">
          <SkillsSection skills={resumeData.skills} />
        </section>
        
        <section id="experience" className="py-12">
          <ExperienceSection experiences={resumeData.experiences} />
        </section>
        
        <section id="education" className="py-12">
          <EducationSection education={resumeData.education} />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}