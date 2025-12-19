'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Skill } from '@/types'
import { Save, Plus, Trash2, Award, Code, BookOpen, Languages, Users, GripVertical } from 'lucide-react'

interface SkillsFormProps {
  data: Skill[]
  onSave: (data: Skill[]) => void
  saving: boolean
}

export default function SkillsForm({ data, onSave, saving }: SkillsFormProps) {
  const [isDirty, setIsDirty] = useState(false)
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty: formIsDirty },
    watch,
    reset
  } = useForm<{
    skills: Skill[]
  }>({
    defaultValues: { skills: data }
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'skills'
  })

  const watchedSkills = watch('skills')
  
  useEffect(() => {
    setIsDirty(formIsDirty)
  }, [formIsDirty])

  const onSubmit = (formData: { skills: Skill[] }) => {
    const skillsWithIds = formData.skills.map((skill, index) => ({
      ...skill,
      id: skill.id || `skill_${Date.now()}_${index}`
    }))
    onSave(skillsWithIds)
    reset({ skills: skillsWithIds })
    setIsDirty(false)
  }

  const handleReset = () => {
    reset({ skills: data })
    setIsDirty(false)
  }

  const addSkill = () => {
    append({
      id: `skill_${Date.now()}`,
      name: '',
      type: '专业技能',
      description: '',
      proficiency: '中级'
    })
  }

  const removeSkill = (index: number) => {
    remove(index)
  }

  const moveSkill = (fromIndex: number, toIndex: number) => {
    move(fromIndex, toIndex)
  }

  const getSkillIcon = (type: string) => {
    switch (type) {
      case '专业技能': return <Code className="w-4 h-4" />
      case '专业知识': return <BookOpen className="w-4 h-4" />
      case '语言能力': return <Languages className="w-4 h-4" />
      case '软技能': return <Users className="w-4 h-4" />
      default: return <Award className="w-4 h-4" />
    }
  }

  const skillTypes = ['专业技能', '专业知识', '语言能力', '软技能']
  const proficiencyLevels = ['初级', '中级', '高级']

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          技能特长管理
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={addSkill}
            className="flex items-center px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加技能
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
        {/* 技能列表 */}
        <div className="space-y-4 mb-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start space-x-4">
                {/* 拖拽手柄 */}
                <div className="flex flex-col items-center space-y-1 mt-4 opacity-50">
                  <button
                    type="button"
                    onClick={() => moveSkill(index, Math.max(0, index - 1))}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <GripVertical className="h-4 w-4" />
                  <button
                    type="button"
                    onClick={() => moveSkill(index, Math.min(fields.length - 1, index + 1))}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === fields.length - 1}
                  >
                    ↓
                  </button>
                </div>

                {/* 技能内容 */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* 技能名称 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      技能名称 *
                    </label>
                    <input
                      {...register(`skills.${index}.name`, { 
                        required: '请输入技能名称',
                        maxLength: {
                          value: 30,
                          message: '技能名称不能超过30个字符'
                        }
                      })}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.skills?.[index]?.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="技能名称"
                    />
                    {errors.skills?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.skills[index]?.name?.message}</p>
                    )}
                  </div>

                  {/* 技能类型 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      技能类型 *
                    </label>
                    <div className="flex items-center space-x-2">
                      {getSkillIcon(watchedSkills[index]?.type)}
                      <select
                        {...register(`skills.${index}.type`, { required: '请选择技能类型' })}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.skills?.[index]?.type ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {skillTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    {errors.skills?.[index]?.type && (
                      <p className="mt-1 text-sm text-red-600">{errors.skills[index]?.type?.message}</p>
                    )}
                  </div>

                  {/* 熟练度 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      熟练度 *
                    </label>
                    <select
                      {...register(`skills.${index}.proficiency`, { required: '请选择熟练度' })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.skills?.[index]?.proficiency ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {proficiencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.skills?.[index]?.proficiency && (
                      <p className="mt-1 text-sm text-red-600">{errors.skills[index]?.proficiency?.message}</p>
                    )}
                  </div>

                  {/* 删除按钮 */}
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="w-full px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      删除
                    </button>
                  </div>
                </div>
              </div>

              {/* 技能描述 */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  技能描述 *
                </label>
                <textarea
                  {...register(`skills.${index}.description`, { 
                    required: '请输入技能描述',
                    maxLength: {
                      value: 200,
                      message: '技能描述不能超过200个字符'
                    }
                  })}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
                    errors.skills?.[index]?.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请简要描述该技能的具体内容和应用场景"
                />
                {errors.skills?.[index]?.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.skills[index]?.description?.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {watchedSkills[index]?.description?.length || 0}/200 字符
                </p>
              </div>
            </div>
          ))}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">暂无技能数据</p>
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加第一个技能
            </button>
          </div>
        )}

        {/* 说明信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">使用说明：</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 支持拖拽调整技能显示顺序</li>
            <li>• 技能类型决定在前端的分类和图标显示</li>
            <li>• 技能描述建议不超过200个字符</li>
            <li>• 熟练度分为初级、中级、高级三个等级</li>
          </ul>
        </div>
      </form>
    </div>
  )
}