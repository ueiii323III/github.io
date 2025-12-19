'use client'

import { Mail, Phone, Github, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 联系信息区域 */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">联系我</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              欢迎通过以下方式与我联系，期待与您的交流合作
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="tel:13154715568"
                className="flex items-center px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span>131****5568</span>
              </a>
              
              <a 
                href="mailto:sunkexin@example.com"
                className="flex items-center px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>sunkexin@example.com</span>
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">快速导航</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-200">
                    首页
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-white transition-colors duration-200">
                    技能特长
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-gray-400 hover:text-white transition-colors duration-200">
                    实践经历
                  </a>
                </li>
                <li>
                  <a href="#education" className="text-gray-400 hover:text-white transition-colors duration-200">
                    教育背景
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">专业技能</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Excel数据处理</li>
                <li>SPSS统计分析</li>
                <li>Python数据分析</li>
                <li>经济学理论</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">实践领域</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>学生会工作</li>
                <li>社区调研</li>
                <li>课程项目</li>
                <li>数据分析</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">关于我</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                武汉理工大学经济学专业大二学生，专注于经济学理论学习和实践应用，
                具备扎实的数据分析能力和良好的沟通协调能力。
              </p>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* 版权信息 */}
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                <p>
                  © {currentYear} 孙可馨. 保留所有权利.
                </p>
                <p className="mt-1">
                  基于 Next.js 构建 · 部署在 Vercel
                </p>
              </div>

              {/* 社交媒体 */}
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* 致谢信息 */}
            <div className="text-center mt-6 text-gray-500 text-xs">
              <p className="flex items-center justify-center">
                Made with <Heart className="w-3 h-3 mx-1 text-red-500" /> by 孙可馨
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}