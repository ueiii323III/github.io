'use client'

import { useState } from 'react'
import { Experience } from '@/types'
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Trophy } from 'lucide-react'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    if (dateString === '至今') return '至今'
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
  }

  const getExperienceIcon = (title: string) => {
    if (title.includes('学生会')) return <Briefcase className="w-5 h-5" />
    if (title.includes('调研')) return <Briefcase className="w-5 h-5" />
    if (title.includes('项目')) return <Trophy className="w-5 h-5" />
    return <Briefcase className="w-5 h-5" />
  }

  const getExperienceColor = (title: string) => {
    if (title.includes('学生会')) return 'bg-blue-100 text-blue-700 border-blue-200'
    if (title.includes('调研')) return 'bg-green-100 text-green-700 border-green-200'
    if (title.includes('项目')) return 'bg-purple-100 text-purple-700 border-purple-200'
    return 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const toggleExperience = (experienceId: string) => {
    setExpandedExperience(expandedExperience === experienceId ? null : experienceId)
  }

  // 按时间倒序排列
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.endDate === '至今' ? new Date() : new Date(a.endDate)
    const dateB = b.endDate === '至今' ? new Date() : new Date(b.endDate)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          实践经历
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          通过多样化的实践活动，不断提升专业能力和综合素质
        </p>
      </div>

      <div className="relative">
        {/* 时间轴 */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 md:block hidden"></div>

        <div className="space-y-8">
          {sortedExperiences.map((experience, index) => (
            <div key={experience.id} className="relative flex items-start">
              {/* 时间轴节点 */}
              <div className="absolute left-6 w-5 h-5 bg-white border-4 border-primary-500 rounded-full -translate-x-1/2 md:block hidden"></div>

              {/* 经历卡片 */}
              <div className="ml-16 md:ml-0 flex-1">
                <div 
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    expandedExperience === experience.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => toggleExperience(experience.id)}
                >
                  {/* 头部信息 */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getExperienceColor(experience.title).split(' ')[0]} flex-shrink-0`}>
                        {getExperienceIcon(experience.title)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {experience.title}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {experience.organization}
                        </p>
                        <p className="text-sm text-gray-500">
                          {experience.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                        </span>
                      </div>
                      {expandedExperience === experience.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* 简要描述 */}
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* 详细成果 */}
                  <div className={`transition-all duration-300 ${
                    expandedExperience === experience.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                        主要成果
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {experience.achievements}
                      </p>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className={`skill-tag ${getExperienceColor(experience.title)}`}>
                      {experience.title.includes('学生会') ? '校内实践' : 
                       experience.title.includes('调研') ? '社会实践' : '课程实践'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {experiences.length}
          </div>
          <div className="text-gray-600">实践项目</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {experiences.filter(e => e.achievements.includes('200+') || e.achievements.includes('500+')).length}
          </div>
          <div className="text-gray-600">大规模项目</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {experiences.filter(e => e.achievements.includes('优秀') || e.achievements.includes('成功')).length}
          </div>
          <div className="text-gray-600">获奖项目</div>
        </div>
      </div>
    </div>
  )
}