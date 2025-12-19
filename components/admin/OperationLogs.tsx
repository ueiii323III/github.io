'use client'

import { useState, useEffect } from 'react'
import { OperationLog } from '@/types'
import { X, Download, RefreshCw, Settings } from 'lucide-react'

interface OperationLogsProps {
  onClose: () => void
}

export default function OperationLogs({ onClose }: OperationLogsProps) {
  const [logs, setLogs] = useState<OperationLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      // 这里应该从API获取日志，现在使用模拟数据
      const mockLogs: OperationLog[] = [
        {
          id: '1',
          timestamp: '2025-12-19 14:30:25',
          operation: '更新基础信息',
          type: 'update',
          details: '修改了手机号码和邮箱地址'
        },
        {
          id: '2',
          timestamp: '2025-12-19 10:15:18',
          operation: '添加技能',
          type: 'create',
          details: '新增技能：Python数据分析'
        },
        {
          id: '3',
          timestamp: '2025-12-18 16:45:32',
          operation: '更新实践经历',
          type: 'update',
          details: '修改了学生会外联部的职责描述'
        },
        {
          id: '4',
          timestamp: '2025-12-18 09:20:11',
          operation: '备份恢复',
          type: 'create',
          details: '从备份文件恢复了简历数据'
        },
        {
          id: '5',
          timestamp: '2025-12-17 15:30:45',
          operation: '删除技能',
          type: 'delete',
          details: '删除了技能：基础编程'
        }
      ]
      
      setLogs(mockLogs)
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportLogs = () => {
    const logText = logs.map(log => 
      `${log.timestamp} [${log.type.toUpperCase()}] ${log.operation}: ${log.details}`
    ).join('\n')
    
    const blob = new Blob([logText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `operation_logs_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'create':
        return '➕'
      case 'update':
        return '✏️'
      case 'delete':
        return '🗑️'
      default:
        return '📝'
    }
  }

  const getOperationColor = (type: string) => {
    switch (type) {
      case 'create':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'update':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'delete':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            操作日志
          </h2>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchLogs}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title="刷新"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            
            <button
              onClick={exportLogs}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title="导出日志"
            >
              <Download className="h-4 w-4" />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 内容 */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-gray-600">加载中...</p>
              </div>
            </div>
          ) : logs.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">暂无操作日志</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* 统计信息 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{logs.length}</div>
                    <div className="text-sm text-gray-600">总操作数</div>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {logs.filter(log => log.type === 'create').length}
                    </div>
                    <div className="text-sm text-gray-600">新增操作</div>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {logs.filter(log => log.type === 'update').length}
                    </div>
                    <div className="text-sm text-gray-600">更新操作</div>
                  </div>
                  
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {logs.filter(log => log.type === 'delete').length}
                    </div>
                    <div className="text-sm text-gray-600">删除操作</div>
                  </div>
                </div>

                {/* 日志列表 */}
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        {/* 操作类型图标 */}
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg border ${getOperationColor(log.type)}`}>
                          <span className="text-lg">{getOperationIcon(log.type)}</span>
                        </div>
                        
                        {/* 日志内容 */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900">{log.operation}</h3>
                            <span className="text-sm text-gray-500">{log.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600">{log.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部 */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              显示最近 {logs.length} 条操作记录
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={exportLogs}
                className="px-4 py-2 text-sm text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                导出日志
              </button>
              
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}