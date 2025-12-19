'use client'

import { useState, useEffect } from 'react'
import { ResumeData } from '@/types'
import toast from 'react-hot-toast'
import { Settings, Download, Upload, LogOut, Save, User, Award, Briefcase, GraduationCap } from 'lucide-react'
import BasicInfoForm from './forms/BasicInfoForm'
import SkillsForm from './forms/SkillsForm'
import ExperienceForm from './forms/ExperienceForm'
import EducationForm from './forms/EducationForm'
import OperationLogs from './OperationLogs'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [showLogs, setShowLogs] = useState(false)

  useEffect(() => {
    fetchResumeData()
  }, [])

  const fetchResumeData = async () => {
    try {
      console.log('Fetching resume data...')
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: 'WUT2024@' }),
      })

      console.log('API response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Data received:', data)
        setResumeData(data)
        toast.success('数据加载成功')
      } else {
        const errorData = await response.text()
        console.error('API Error response:', errorData)
        toast.error(`获取数据失败: ${response.status}`)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      toast.error(`数据加载错误: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (updatedData: ResumeData) => {
    setSaving(true)
    try {
      const response = await fetch('/api/resume', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password: 'WUT2024@',
          data: updatedData 
        }),
      })

      if (response.ok) {
        setResumeData(updatedData)
        toast.success('保存成功！')
      } else {
        toast.error('保存失败')
      }
    } catch (error) {
      toast.error('保存过程出错')
    } finally {
      setSaving(false)
    }
  }

  const handleBackup = async () => {
    try {
      const response = await fetch('/api/backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: 'WUT2024@' }),
      })

      if (response.ok) {
        const { data } = await response.json()
        
        // 下载文件
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `resume_backup_${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        toast.success('备份成功！')
      } else {
        toast.error('备份失败')
      }
    } catch (error) {
      toast.error('备份过程出错')
    }
  }

  const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const data = JSON.parse(text)

      const response = await fetch('/api/backup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password: 'WUT2024@',
          data 
        }),
      })

      if (response.ok) {
        toast.success('恢复成功！')
        fetchResumeData()
      } else {
        toast.error('恢复失败')
      }
    } catch (error) {
      toast.error('文件格式错误')
    }

    // 重置文件输入
    event.target.value = ''
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">数据加载失败</h1>
          <p className="text-gray-600">请刷新页面重试</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'basic', label: '基础信息', icon: User },
    { id: 'skills', label: '技能特长', icon: Award },
    { id: 'experience', label: '实践经历', icon: Briefcase },
    { id: 'education', label: '教育背景', icon: GraduationCap },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">管理后台</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackup}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-1" />
                备份
              </button>
              
              <label className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200 cursor-pointer">
                <Upload className="h-4 w-4 mr-1" />
                恢复
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestore}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={() => setShowLogs(!showLogs)}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <Settings className="h-4 w-4 mr-1" />
                日志
              </button>
              
              <button
                onClick={onLogout}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                退出
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 选项卡导航 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* 表单内容 */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'basic' && (
            <BasicInfoForm 
              data={resumeData.basicInfo} 
              onSave={(info) => saveData({ ...resumeData, basicInfo: info })}
              saving={saving}
            />
          )}
          
          {activeTab === 'skills' && (
            <SkillsForm 
              data={resumeData.skills} 
              onSave={(skills) => saveData({ ...resumeData, skills })}
              saving={saving}
            />
          )}
          
          {activeTab === 'experience' && (
            <ExperienceForm 
              data={resumeData.experiences} 
              onSave={(experiences) => saveData({ ...resumeData, experiences })}
              saving={saving}
            />
          )}
          
          {activeTab === 'education' && (
            <EducationForm 
              data={resumeData.education} 
              onSave={(education) => saveData({ ...resumeData, education })}
              saving={saving}
            />
          )}
        </div>
      </div>

      {/* 操作日志弹窗 */}
      {showLogs && (
        <OperationLogs onClose={() => setShowLogs(false)} />
      )}
    </div>
  )
}