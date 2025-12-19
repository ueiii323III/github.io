'use client'

import { useState } from 'react'
import { Skill } from '@/types'
import { Code, BookOpen, Languages, Users, ChevronDown, ChevronUp } from 'lucide-react'

interface SkillsSectionProps {
  skills: Skill[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const getSkillIcon = (type: string) => {
    switch (type) {
      case '专业技能':
        return <Code className="w-5 h-5" />
      case '专业知识':
        return <BookOpen className="w-5 h-5" />
      case '语言能力':
        return <Languages className="w-5 h-5" />
      case '软技能':
        return <Users className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  const getSkillColor = (type: string) => {
    switch (type) {
      case '专业技能':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case '专业知识':
        return 'bg-green-100 text-green-700 border-green-200'
      case '语言能力':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case '软技能':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getProficiencyBadge = (proficiency: string) => {
    const colors = {
      '初级': 'bg-gray-100 text-gray-600',
      '中级': 'bg-blue-100 text-blue-600',
      '高级': 'bg-green-100 text-green-600'
    }
    return colors[proficiency as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = []
    }
    acc[skill.type].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const toggleSkill = (skillId: string) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId)
  }

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          技能特长
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          多元化的技能组合，涵盖专业技能、专业知识、语言能力和软实力
        </p>
      </div>

      <div className="grid gap-8">
        {Object.entries(groupedSkills).map(([type, typeSkills]) => (
          <div key={type} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-lg ${getSkillColor(type).split(' ')[0]} mr-3`}>
                {getSkillIcon(type)}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{type}</h3>
              <span className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {typeSkills.length} 项技能
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {typeSkills.map((skill) => (
                <div
                  key={skill.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover-scale ${
                    expandedSkill === skill.id 
                      ? 'border-primary-300 bg-primary-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => toggleSkill(skill.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getProficiencyBadge(skill.proficiency)}`}>
                        {skill.proficiency}
                      </span>
                      {expandedSkill === skill.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${
                    expandedSkill === skill.id ? 'max-h-32' : 'max-h-0 overflow-hidden'
                  }`}>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 技能概览统计 */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(groupedSkills).map(([type, typeSkills]) => {
          const highLevelCount = typeSkills.filter(s => s.proficiency === '高级').length
          return (
            <div key={type} className="text-center p-4 bg-white rounded-lg shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${getSkillColor(type).split(' ')[0]} mb-2`}>
                {getSkillIcon(type)}
              </div>
              <div className="text-2xl font-bold text-gray-900">{typeSkills.length}</div>
              <div className="text-sm text-gray-600">{type}</div>
              {highLevelCount > 0 && (
                <div className="text-xs text-green-600 mt-1">{highLevelCount} 项精通</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}