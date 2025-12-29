import { NextRequest, NextResponse } from 'next/server'
import { ResumeData } from '@/types'
import initialData from '@/data/initialData.json'
import fs from 'fs'
import path from 'path'

// 数据文件路径
const dataFilePath = path.join(process.cwd(), 'data', 'resumeData.json')

// 读取数据
async function readResumeData(): Promise<ResumeData> {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf-8')
      return JSON.parse(data)
    } else {
      // 如果数据文件不存在，使用初始数据
      return initialData as ResumeData
    }
  } catch (error) {
    console.error('Error reading resume data:', error)
    return initialData as ResumeData
  }
}

// 写入数据
async function writeResumeData(data: ResumeData): Promise<boolean> {
  try {
    const dataDir = path.dirname(dataFilePath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing resume data:', error)
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const data = await readResumeData()
    
    // 脱敏手机号
    const responseData = {
      ...data,
      basicInfo: {
        ...data.basicInfo,
        phone: data.basicInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    }
    
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password }: { password: string } = await request.json()
    
    // 简单的密码验证
    if (password !== 'WUT2024@') {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // 返回完整数据（包含未脱敏信息）
    const data = await readResumeData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { password, data: updateData }: { password: string; data: Partial<ResumeData> } = await request.json()
    
    // 验证密码
    if (password !== 'WUT2024@') {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // 读取现有数据
    const currentData = await readResumeData()
    
    // 合并更新数据
    const updatedData = { ...currentData, ...updateData }
    
    // 写入文件
    const success = await writeResumeData(updatedData)
    
    if (success) {
      return NextResponse.json({ success: true, data: updatedData })
    } else {
      return NextResponse.json(
        { error: 'Failed to save data' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to update resume data' },
      { status: 500 }
    )
  }
}