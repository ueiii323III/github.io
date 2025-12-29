'use client'

import { BasicInfo } from '@/types'
import { Mail, Phone, MapPin, Calendar, GraduationCap, User } from 'lucide-react'

interface BasicInfoProps {
  info: BasicInfo
}

export default function BasicInfo({ info }: BasicInfoProps) {
  const maskPhone = (phone: string) => {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* 头像区域 */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-xl">
            <User className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* 姓名和基本身份信息 */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          {info.name}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            <User className="w-4 h-4 mr-2" />
            {info.gender} · {info.age}岁
          </span>
          <span className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
            <GraduationCap className="w-4 h-4 mr-2" />
            {info.grade}
          </span>
          <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <MapPin className="w-4 h-4 mr-2" />
            {info.school}
          </span>
        </div>

        {/* 专业介绍 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {info.major}
          </h2>
          <p className="text-lg text-gray-600">
            专注于经济学理论学习和实践应用
          </p>
        </div>

        {/* 联系信息 */}
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href={`tel:${info.phone}`}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            <Phone className="w-5 h-5 mr-2" />
            <span className="font-medium">{maskPhone(info.phone)}</span>
          </a>
          
          <a 
            href={`mailto:${info.email}`}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            <Mail className="w-5 h-5 mr-2" />
            <span className="font-medium">{info.email}</span>
          </a>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="font-medium">在校时间：2024.09 - 2028.06</span>
          </div>
        </div>

        {/* 行动按钮 */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a 
            href="#skills"
            className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            查看技能特长
          </a>
          <a 
            href="#experience"
            className="px-8 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-200"
          >
            了解实践经历
          </a>
        </div>
      </div>
    </section>
  )
}