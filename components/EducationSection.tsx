'use client'

import { useState } from 'react'
import { Education } from '@/types'
import { GraduationCap, Calendar, Award, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

interface EducationSectionProps {
  education: Education
}

export default function EducationSection({ education }: EducationSectionProps) {
  const [expandedCourses, setExpandedCourses] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
  }

  const getGradeColor = (gpa: string) => {
    const gpaNum = parseFloat(gpa)
    if (gpaNum >= 3.7) return 'text-green-600 bg-green-100'
    if (gpaNum >= 3.3) return 'text-blue-600 bg-blue-100'
    if (gpaNum >= 3.0) return 'text-yellow-600 bg-yellow-100'
    return 'text-gray-600 bg-gray-100'
  }

  const coreCourses = education.courses.filter(course => !course.isElective)
  const electiveCourses = education.courses.filter(course => course.isElective)

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          教育背景
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          扎实的经济学专业基础，持续学习和成长
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* 学校信息 */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-primary-100 rounded-full">
                <GraduationCap className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {education.university}
                </h3>
                <p className="text-lg text-gray-600">
                  {education.major} · {education.degree}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${getGradeColor(education.gpa)}`}>
                  <Award className="w-4 h-4 mr-2" />
                  GPA: {education.gpa}/{education.gpaMax}
                </div>
              </div>
            </div>
          </div>

          {/* 时间信息 */}
          <div className="flex items-center text-gray-600 mb-6">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="font-medium">
              {formatDate(education.startDate)} - {formatDate(education.endDate)}
            </span>
          </div>

          {/* 课程信息 */}
          <div className="border-t pt-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedCourses(!expandedCourses)}
            >
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                主修课程
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {education.courses.length} 门课程
                </span>
                {expandedCourses ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            <div className={`transition-all duration-300 ${
              expandedCourses ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              {/* 核心课程 */}
              {coreCourses.length > 0 && (
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">核心课程</h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    {coreCourses.map((course, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors duration-200"
                      >
                        <h6 className="font-medium text-gray-900 mb-1">{course.name}</h6>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 选修课程 */}
              {electiveCourses.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">选修课程</h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    {electiveCourses.map((course, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <h6 className="font-medium text-gray-900 mb-1">{course.name}</h6>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">选修</span>
                        </div>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 课程预览 */}
            {!expandedCourses && (
              <div className="mt-4 grid md:grid-cols-3 gap-3">
                {education.courses.slice(0, 3).map((course, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <span className="font-medium">{course.name}</span>
                  </div>
                ))}
                {education.courses.length > 3 && (
                  <div className="text-sm text-gray-400">
                    ... 还有 {education.courses.length - 3} 门课程
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 学术成就亮点 */}
          <div className="border-t pt-6 mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">学术亮点</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {coreCourses.length}+
                </div>
                <div className="text-sm text-gray-600">核心专业课程</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {education.gpa}/{education.gpaMax}
                </div>
                <div className="text-sm text-gray-600">学术表现</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {electiveCourses.length}+
                </div>
                <div className="text-sm text-gray-600">选修拓展课程</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}