export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 导航栏骨架 */}
      <div className="h-16 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="skeleton w-24 h-6 rounded"></div>
          <div className="hidden md:flex space-x-8">
            <div className="skeleton w-12 h-4 rounded"></div>
            <div className="skeleton w-16 h-4 rounded"></div>
            <div className="skeleton w-16 h-4 rounded"></div>
            <div className="skeleton w-16 h-4 rounded"></div>
            <div className="skeleton w-16 h-4 rounded"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 基础信息骨架 */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="skeleton w-32 h-32 rounded-full mx-auto mb-8"></div>
            <div className="skeleton w-48 h-8 rounded mx-auto mb-4"></div>
            <div className="skeleton w-64 h-6 rounded mx-auto mb-8"></div>
            <div className="flex justify-center space-x-4 mb-8">
              <div className="skeleton w-20 h-8 rounded-full"></div>
              <div className="skeleton w-20 h-8 rounded-full"></div>
              <div className="skeleton w-24 h-8 rounded-full"></div>
            </div>
            <div className="skeleton w-96 h-6 rounded mx-auto mb-4"></div>
            <div className="skeleton w-80 h-6 rounded mx-auto"></div>
          </div>
        </div>

        {/* 技能骨架 */}
        <div className="py-12">
          <div className="text-center mb-8">
            <div className="skeleton w-48 h-10 rounded mx-auto mb-4"></div>
            <div className="skeleton w-96 h-6 rounded mx-auto"></div>
          </div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow">
                <div className="skeleton w-32 h-8 rounded mb-4"></div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2].map((j) => (
                    <div key={j} className="border rounded-lg p-4">
                      <div className="skeleton w-24 h-5 rounded mb-2"></div>
                      <div className="skeleton w-16 h-4 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 经历骨架 */}
        <div className="py-12">
          <div className="text-center mb-8">
            <div className="skeleton w-48 h-10 rounded mx-auto mb-4"></div>
            <div className="skeleton w-96 h-6 rounded mx-auto"></div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow">
                <div className="skeleton w-48 h-6 rounded mb-2"></div>
                <div className="skeleton w-64 h-5 rounded mb-4"></div>
                <div className="skeleton w-32 h-4 rounded mb-2"></div>
                <div className="skeleton w-full h-20 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 教育背景骨架 */}
        <div className="py-12">
          <div className="text-center mb-8">
            <div className="skeleton w-48 h-10 rounded mx-auto mb-4"></div>
            <div className="skeleton w-96 h-6 rounded mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow">
              <div className="skeleton w-64 h-8 rounded mb-4"></div>
              <div className="skeleton w-96 h-6 rounded mb-4"></div>
              <div className="skeleton w-32 h-5 rounded mb-4"></div>
              <div className="skeleton w-48 h-5 rounded mb-4"></div>
              <div className="border-t pt-4">
                <div className="skeleton w-24 h-6 rounded mb-4"></div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border rounded p-3">
                      <div className="skeleton w-32 h-5 rounded mb-1"></div>
                      <div className="skeleton w-40 h-4 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}