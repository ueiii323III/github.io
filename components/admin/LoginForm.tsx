'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User, Lock, ArrowRight } from 'lucide-react'

interface LoginFormData {
  username: string
  password: string
}

interface LoginFormProps {
  onLogin: (success: boolean) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    // 检查是否被锁定
    if (lockedUntil && new Date() < lockedUntil) {
      const remainingTime = Math.ceil((lockedUntil.getTime() - new Date().getTime()) / 60000)
      toast.error(`账户已被锁定，请在${remainingTime}分钟后重试`)
      return
    }

    setLoading(true)

    try {
      // 验证用户名和密码
      if (data.username === 'sunkx' && data.password === 'WUT2024@') {
        toast.success('登录成功！')
        setLoginAttempts(0) // 重置登录尝试次数
        setLockedUntil(null)
        onLogin(true)
      } else {
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)
        
        if (newAttempts >= 3) {
          // 锁定10分钟
          const lockTime = new Date(Date.now() + 10 * 60 * 1000)
          setLockedUntil(lockTime)
          toast.error('登录失败次数过多，账户已锁定10分钟')
        } else {
          toast.error(`用户名或密码错误！还有${3 - newAttempts}次尝试机会`)
        }
        
        reset()
        onLogin(false)
      }
    } catch (error) {
      toast.error('登录过程中发生错误')
      onLogin(false)
    } finally {
      setLoading(false)
    }
  }

  const isLocked = lockedUntil && new Date() < lockedUntil

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            管理员登录
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            请输入管理员凭据以访问后台
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('username', { 
                    required: '请输入用户名',
                    minLength: {
                      value: 2,
                      message: '用户名至少2个字符'
                    }
                  })}
                  type="text"
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请输入用户名"
                  disabled={loading || isLocked}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                密码
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password', { 
                    required: '请输入密码',
                    minLength: {
                      value: 6,
                      message: '密码至少6个字符'
                    }
                  })}
                  type="password"
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请输入密码"
                  disabled={loading || isLocked}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              <strong>默认账号：</strong> sunkx<br />
              <strong>默认密码：</strong> WUT2024@
            </p>
          </div>

          {isLocked && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">
                账户已被锁定，请稍后重试
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || isLocked}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 ${
                loading || isLocked
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {loading ? (
                  <div className="h-5 w-5 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </span>
              {loading ? '登录中...' : '登录'}
              <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
          </div>

          <div className="text-center">
            <a 
              href="/" 
              className="text-sm text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              ← 返回首页
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}