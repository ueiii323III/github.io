'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Education, Course } from '@/types'
import { Save, Plus, Trash2, GraduationCap, Award, Calendar, BookOpen, Star } from 'lucide-react'

interface EducationFormProps {
  data: Education
  onSave: (data: Education) => void
  saving: boolean
}

export default function EducationForm({ data, onSave, saving }: EducationFormProps) {
  const [isDirty, setIsDirty] = useState(false)
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty: formIsDirty },
    watch,
    reset
  } = useForm<Education>({
    defaultValues: data
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses'
  })

  const watchedEducation = watch()
  
  useEffect(() => {
    setIsDirty(formIsDirty)
  }, [formIsDirty])

  const onSubmit = (formData: Education) => {
    const educationWithIds = {
      ...formData,
      id: formData.id || `edu_${Date.now()}`,
      courses: formData.courses.map((course, index) => ({
        ...course,
        id: course.id || `course_${Date.now()}_${index}`
      }))
    }
    onSave(educationWithIds)
    reset(educationWithIds)
    setIsDirty(false)
  }

  const handleReset = () => {
    reset(data)
    setIsDirty(false)
  }

  const addCourse = () => {
    append({
      id: `course_${Date.now()}`,
      name: '',
      description: '',
      isElective: false
    })
  }

  const removeCourse = (index: number) => {
    remove(index)
  }

  const getGradeColor = (gpa: string) => {
    const gpaNum = parseFloat(gpa)
    if (gpaNum >= 3.7) return 'text-green-600 bg-green-100 border-green-200'
    if (gpaNum >= 3.3) return 'text-blue-600 bg-blue-100 border-blue-200'
    if (gpaNum >= 3.0) return 'text-yellow-600 bg-yellow-100 border-yellow-200'
    return 'text-gray-600 bg-gray-100 border-gray-200'
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2" />
          教育背景管理
        </h2>
        
        <div className="flex space-x-2">
          {formIsDirty && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              重置
            </button>
          )}
          
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={saving || !formIsDirty}
            className={`flex items-center px-4 py-2 text-sm text-white rounded-lg transition-colors duration-200 ${
              saving || !formIsDirty
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 基本信息 */}
        <div className="border rounded-lg p-6 mb-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <GraduationCap className="h-4 w-4 mr-2" />
            基本信息
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* 学校名称 */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                学校名称 *
              </label>
              <input
                {...register('university', { 
                  required: '请输入学校名称',
                  maxLength: {
                    value: 50,
                    message: '学校名称不能超过50个字符'
                  }
                })}
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.university ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="请输入学校名称"
              />
              {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university.message}</p>
              )}
            </div>

            {/* 专业 */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                专业名称 *
              </label>
              <input
                {...register('major', { 
                  required: '请输入专业名称',
                  maxLength: {
                    value: 50,
                    message: '专业名称不能超过50个字符'
                  }
                })}
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.major ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="请输入专业名称"
              />
              {errors.major && (
                <p className="mt-1 text-sm text-red-600">{errors.major.message}</p>
              )}
            </div>

            {/* 学历类型 */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                学历类型 *
              </label>
              <select
                {...register('degree', { required: '请选择学历类型' })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.degree ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">请选择</option>
                <option value="专科">专科</option>
                <option value="本科">本科</option>
                <option value="本科在读">本科在读</option>
                <option value="硕士">硕士</option>
                <option value="硕士在读">硕士在读</option>
                <option value="博士">博士</option>
                <option value="博士在读">博士在读</option>
              </select>
              {errors.degree && (
                <p className="mt-1 text-sm text-red-600">{errors.degree.message}</p>
              )}
            </div>

            {/* GPA */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                GPA *
              </label>
              <div className="flex space-x-2">
                <input
                  {...register('gpa', { 
                    required: '请输入GPA',
                    min: {
                      value: 0,
                      message: 'GPA不能小于0'
                    },
                    max: {
                      value: 4.0,
                      message: 'GPA不能大于4.0'
                    },
                    valueAsNumber: true
                  })}
                  type="number"
                  step="0.1"
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.gpa ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="GPA"
                />
                <span className="flex items-center text-gray-500">/</span>
                <input
                  {...register('gpaMax', { 
                    required: '请输入GPA满分',
                    valueAsNumber: true
                  })}
                  type="number"
                  step="0.1"
                  className={`w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.gpaMax ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="4.0"
                />
              </div>
              {errors.gpa && (
                <p className="mt-1 text-sm text-red-600">{errors.gpa.message}</p>
              )}
              {watchedEducation.gpa && (
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getGradeColor(watchedEducation.gpa)}`}>
                  <Award className="w-3 h-3 mr-1" />
                  {watchedEducation.gpa}/{watchedEducation.gpaMax || '4.0'}
                </div>
              )}
            </div>
          </div>

          {/* 时间 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                入学时间 *
              </label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  {...register('startDate', { required: '请选择入学时间' })}
                  type="month"
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                毕业时间 *
              </label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  {...register('endDate', { required: '请选择毕业时间' })}
                  type="month"
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 课程信息 */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              主修课程
            </h3>
            
            <button
              type="button"
              onClick={addCourse}
              className="flex items-center px-3 py-1 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Plus className="h-3 w-3 mr-1" />
              添加课程
            </button>
          </div>

          <div className="space-y-3 mb-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 课程名称 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      课程名称 *
                    </label>
                    <input
                      {...register(`courses.${index}.name`, { 
                        required: '请输入课程名称',
                        maxLength: {
                          value: 30,
                          message: '课程名称不能超过30个字符'
                        }
                      })}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.courses?.[index]?.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="请输入课程名称"
                    />
                    {errors.courses?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.courses[index]?.name?.message}</p>
                    )}
                  </div>

                  {/* 课程类型 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      课程类型
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        {...register(`courses.${index}.isElective`)}
                        type="checkbox"
                        id={`elective-${index}`}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`elective-${index}`} className="text-sm text-gray-600">
                        选修课程
                      </label>
                      {!watchedEducation.courses[index]?.isElective && (
                        <Star className="h-4 w-4 text-yellow-500" title="核心课程" />
                      )}
                    </div>
                  </div>
                </div>

                {/* 课程描述 */}
                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    课程内容
                  </label>
                  <textarea
                    {...register(`courses.${index}.description`)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    placeholder="请简要描述课程的主要内容和学习重点"
                    maxLength={100}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {watchedEducation.courses[index]?.description?.length || 0}/100 字符
                  </p>
                </div>

                {/* 删除按钮 */}
                <div className="flex justify-end mt-3">
                  <button
                    type="button"
                    onClick={() => removeCourse(index)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>

          {fields.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-3">暂无课程信息</p>
              <button
                type="button"
                onClick={addCourse}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加第一门课程
              </button>
            </div>
          )}
        </div>

        {/* 说明信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="text-sm font-medium text-blue-900 mb-2">使用说明：</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• GPA范围为0-4.0分制</li>
            <li>• 课程分为核心课程和选修课程</li>
            <li>• 勾选"选修课程"表示该课程为选修</li>
            <li>• 课程描述建议不超过100个字符</li>
          </ul>
        </div>
      </form>
    </div>
  )
}