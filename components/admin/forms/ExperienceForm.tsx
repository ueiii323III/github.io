'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Experience } from '@/types'
import { Save, Plus, Trash2, Briefcase, Trophy, Calendar, MapPin } from 'lucide-react'

interface ExperienceFormProps {
  data: Experience[]
  onSave: (data: Experience[]) => void
  saving: boolean
}

export default function ExperienceForm({ data, onSave, saving }: ExperienceFormProps) {
  const [isDirty, setIsDirty] = useState(false)
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty: formIsDirty },
    watch,
    reset
  } = useForm<{
    experiences: Experience[]
  }>({
    defaultValues: { experiences: data }
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'experiences'
  })

  const watchedExperiences = watch('experiences')
  
  useEffect(() => {
    setIsDirty(formIsDirty)
  }, [formIsDirty])

  const onSubmit = (formData: { experiences: Experience[] }) => {
    const experiencesWithIds = formData.experiences.map((exp, index) => ({
      ...exp,
      id: exp.id || `exp_${Date.now()}_${index}`
    }))
    onSave(experiencesWithIds)
    reset({ experiences: experiencesWithIds })
    setIsDirty(false)
  }

  const handleReset = () => {
    reset({ experiences: data })
    setIsDirty(false)
  }

  const addExperience = () => {
    append({
      id: `exp_${Date.now()}`,
      startDate: '',
      endDate: '',
      title: '',
      organization: '',
      role: '',
      description: '',
      achievements: ''
    })
  }

  const removeExperience = (index: number) => {
    remove(index)
  }

  const moveExperience = (fromIndex: number, toIndex: number) => {
    move(fromIndex, toIndex)
  }

  const getExperienceIcon = (title: string) => {
    if (title.includes('学生会')) return <Briefcase className="w-4 h-4" />
    if (title.includes('调研')) return <Briefcase className="w-4 h-4" />
    if (title.includes('项目')) return <Trophy className="w-4 h-4" />
    return <Briefcase className="w-4 h-4" />
  }

  const validateDateRange = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return true
    if (endDate === '至今') return true
    
    const start = new Date(startDate)
    const end = new Date(endDate)
    return start <= end
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          实践经历管理
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={addExperience}
            className="flex items-center px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加经历
          </button>
          
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
        {/* 经历列表 */}
        <div className="space-y-6 mb-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex items-start space-x-4 mb-4">
                {/* 拖拽手柄 */}
                <div className="flex flex-col items-center space-y-1 mt-4 opacity-50">
                  <button
                    type="button"
                    onClick={() => moveExperience(index, Math.max(0, index - 1))}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <button
                    type="button"
                    onClick={() => moveExperience(index, Math.min(fields.length - 1, index + 1))}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === fields.length - 1}
                  >
                    ↓
                  </button>
                </div>

                {/* 经历内容 */}
                <div className="flex-1">
                  {/* 第一行：标题、机构、删除按钮 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        经历标题 *
                      </label>
                      <div className="flex items-center space-x-2">
                        {getExperienceIcon(watchedExperiences[index]?.title)}
                        <input
                          {...register(`experiences.${index}.title`, { 
                            required: '请输入经历标题',
                            maxLength: {
                              value: 50,
                              message: '标题不能超过50个字符'
                            }
                          })}
                          type="text"
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.experiences?.[index]?.title ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="经历标题"
                        />
                      </div>
                      {errors.experiences?.[index]?.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.experiences[index]?.title?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        机构名称 *
                      </label>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <input
                          {...register(`experiences.${index}.organization`, { 
                            required: '请输入机构名称',
                            maxLength: {
                              value: 50,
                              message: '机构名称不能超过50个字符'
                            }
                          })}
                          type="text"
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.experiences?.[index]?.organization ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="机构名称"
                        />
                      </div>
                      {errors.experiences?.[index]?.organization && (
                        <p className="mt-1 text-sm text-red-600">{errors.experiences[index]?.organization?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        角色
                      </label>
                      <input
                        {...register(`experiences.${index}.role`)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="担任角色"
                        maxLength={50}
                      />
                    </div>
                  </div>

                  {/* 第二行：时间 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        开始时间 *
                      </label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <input
                          {...register(`experiences.${index}.startDate`, { 
                            required: '请选择开始时间'
                          })}
                          type="month"
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.experiences?.[index]?.startDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.experiences?.[index]?.startDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.experiences[index]?.startDate?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        结束时间 *
                      </label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <input
                          {...register(`experiences.${index}.endDate`, { 
                            required: '请选择结束时间',
                            validate: (value) => validateDateRange(watchedExperiences[index]?.startDate, value) || '结束时间不能早于开始时间'
                          })}
                          type="month"
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.experiences?.[index]?.endDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`current-${index}`}
                            {...register(`experiences.${index}.endDate`)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                // 如果勾选"至今"，清空日期字段并设置特殊值
                                const event = { target: { value: '至今' } }
                                register(`experiences.${index}.endDate`).onChange(event)
                              }
                            }}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`current-${index}`} className="ml-2 text-sm text-gray-600">
                            至今
                          </label>
                        </div>
                      </div>
                      {errors.experiences?.[index]?.endDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.experiences[index]?.endDate?.message}</p>
                      )}
                    </div>
                  </div>

                  {/* 描述 */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      职责描述 *
                    </label>
                    <textarea
                      {...register(`experiences.${index}.description`, { 
                        required: '请输入职责描述',
                        maxLength: {
                          value: 500,
                          message: '职责描述不能超过500个字符'
                        }
                      })}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
                        errors.experiences?.[index]?.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="请描述在该经历中的主要职责和工作内容"
                    />
                    {errors.experiences?.[index]?.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.experiences[index]?.description?.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {watchedExperiences[index]?.description?.length || 0}/500 字符
                    </p>
                  </div>

                  {/* 成果 */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      主要成果 *
                    </label>
                    <div className="flex items-start space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-500 mt-2" />
                      <div className="flex-1">
                        <textarea
                          {...register(`experiences.${index}.achievements`, { 
                            required: '请输入主要成果',
                            maxLength: {
                              value: 500,
                              message: '成果描述不能超过500个字符'
                            }
                          })}
                          rows={2}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
                            errors.experiences?.[index]?.achievements ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="请描述在该经历中取得的具体成果和亮点，最好包含量化数据"
                        />
                        {errors.experiences?.[index]?.achievements && (
                          <p className="mt-1 text-sm text-red-600">{errors.experiences[index]?.achievements?.message}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          {watchedExperiences[index]?.achievements?.length || 0}/500 字符
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 删除按钮 */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      删除经历
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">暂无实践经历</p>
            <button
              type="button"
              onClick={addExperience}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加第一段经历
            </button>
          </div>
        )}

        {/* 说明信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">使用说明：</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 支持拖拽调整经历显示顺序，建议按时间倒序排列</li>
            <li>• 时间支持选择"至今"表示当前正在进行</li>
            <li>• 成果描述建议包含量化数据，如"参与人数200+"</li>
            <li>• 描述和成果字段分别限制500字符</li>
          </ul>
        </div>
      </form>
    </div>
  )
}