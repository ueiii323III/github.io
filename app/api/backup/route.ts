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

export async function POST(request: NextRequest) {
  try {
    const { password }: { password: string } = await request.json()
    
    // 验证密码
    if (password !== 'WUT2024@') {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // 读取当前数据
    const data = await readResumeData()
    
    // 创建备份
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFileName = `resume_backup_${timestamp}.json`
    const backupFilePath = path.join(process.cwd(), 'data', 'backups', backupFileName)
    
    // 确保备份目录存在
    const backupDir = path.dirname(backupFilePath)
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }
    
    // 写入备份文件
    fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({
      success: true,
      backupFile: backupFileName,
      data: data // 返回数据供下载
    })
  } catch (error) {
    console.error('Backup error:', error)
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { password, data }: { password: string; data: any } = await request.json()
    
    // 验证密码
    if (password !== 'WUT2024@') {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // 验证数据格式
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }
    
    // 写入数据
    const success = await writeResumeData(data)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Data restored successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to restore data' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Restore error:', error)
    return NextResponse.json(
      { error: 'Failed to restore data' },
      { status: 500 }
    )
  }
}