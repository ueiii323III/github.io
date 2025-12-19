export interface BasicInfo {
  name: string
  gender: string
  age: number
  grade: string
  school: string
  major: string
  phone: string
  email: string
}

export interface Skill {
  id: string
  name: string
  type: string
  description: string
  proficiency: '初级' | '中级' | '高级'
}

export interface Experience {
  id: string
  startDate: string
  endDate: string
  title: string
  organization: string
  role: string
  description: string
  achievements: string
}

export interface Course {
  name: string
  description: string
  isElective?: boolean
}

export interface Education {
  id: string
  university: string
  major: string
  degree: string
  startDate: string
  endDate: string
  gpa: string
  gpaMax: string
  courses: Course[]
}

export interface AdminCredentials {
  username: string
  passwordHash: string
}

export interface ResumeData {
  basicInfo: BasicInfo
  skills: Skill[]
  experiences: Experience[]
  education: Education
  adminCredentials?: AdminCredentials
}

export interface LoginFormData {
  username: string
  password: string
}

export interface OperationLog {
  id: string
  timestamp: string
  operation: string
  type: 'create' | 'update' | 'delete'
  details: string
}