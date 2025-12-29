'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BasicInfo } from '@/types'
import { Save, User, Mail, Phone, MapPin, GraduationCap, Calendar } from 'lucide-react'

interface BasicInfoFormProps {
  data: BasicInfo
  onSave: (data: BasicInfo) => void
  saving: boolean
}

export default function BasicInfoForm({ data, onSave, saving }: BasicInfoFormProps) {
  const [isDirty, setIsDirty] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty: formIsDirty },
    watch,
    reset
  } = useForm<BasicInfo>({
    defaultValues: data
  })

  const watchedValues = watch()
  
  // 检查表单是否有变化
  useEffect(() => {
    setIsDirty(formIsDirty)
  }, [formIsDirty])

  const onSubmit = (formData: BasicInfo) => {
    onSave(formData)
    reset(formData)
    setIsDirty(false)
  }

  const handleReset = () => {
    reset(data)
    setIsDirty(false)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <User className="h-5 w-5 mr-2" />
          基础信息管理
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 姓名 */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 mr-1" />
              姓名 *
            </label>
            <input
              {...register('name', { 
                required: '请输入姓名',
                maxLength: {
                  value: 20,
                  message: '姓名不能超过20个字符'
                }
              })}
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入姓名"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* 性别 */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">性别 *</label>
            <select
              {...register('gender', { required: '请选择性别' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">请选择性别</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>

          {/* 年龄 */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              年龄 *
            </label>
            <input
              {...register('age', { 
                required: '请输入年龄',
                min: {
                  value: 18,
                  message: '年龄不能小于18岁'
                },
                max: {
                  value: 30,
                  message: '年龄不能大于30岁'
                },
                valueAsNumber: true
              })}
              type="number"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入年龄"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          {/* 年级 */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">年级 *</label>
            <select
              {...register('grade', { required: '请选择年级' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.grade ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">请选择年级</option>
              <option value="大一">大一</option>
              <option value="大二">大二</option>
              <option value="大三">大三</option>
              <option value="大四">大四</option>
              <option value="研究生">研究生</option>
            </select>
            {errors.grade && (
              <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
            )}
          </div>

          {/* 学校 */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <GraduationCap className="h-4 w-4 mr-1" />
              学校 *
            </label>
            <input
              {...register('school', { 
                required: '请输入学校名称',
                maxLength: {
                  value: 50,
                  message: '学校名称不能超过50个字符'
                }
              })}
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.school ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入学校名称"
            />
            {errors.school && (
              <p className="mt-1 text-sm text-red-600">{errors.school.message}</p>
            )}
          </div>

          {/* 专业 */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">专业 *</label>
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

          {/* 联系电话 */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 mr-1" />
              联系电话 *
            </label>
            <input
              {...register('phone', { 
                required: '请输入联系电话',
                pattern: {
                  value: /^1[3-9]\d{9}$/,
                  message: '请输入有效的11位手机号码'
                }
              })}
              type="tel"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入11位手机号码"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* 邮箱 */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 mr-1" />
              邮箱 *
            </label>
            <input
              {...register('email', { 
                required: '请输入邮箱地址',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '请输入有效的邮箱地址'
                }
              })}
              type="email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入邮箱地址"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* 说明信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">注意事项：</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 带有 * 的字段为必填项</li>
            <li>• 联系电话为11位手机号码</li>
            <li>• 年龄范围：18-30岁</li>
            <li>• 前端展示时，电话号码将自动脱敏处理</li>
          </ul>
        </div>
      </form>
    </div>
  )
}