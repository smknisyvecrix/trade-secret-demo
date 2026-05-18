'use client';
export default function VersionsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">版本对比</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          <div className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">V3.0</span>
              <span className="text-sm text-gray-500">2026-05-19</span>
            </div>
            <p className="text-sm text-gray-600">修改人：张三 · 更新技术参数</p>
          </div>
          <div className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">V2.0</span>
              <span className="text-sm text-gray-500">2026-04-15</span>
            </div>
            <p className="text-sm text-gray-600">修改人：李四 · 修改核心算法</p>
          </div>
        </div>
      </div>
    </div>
  );
}
