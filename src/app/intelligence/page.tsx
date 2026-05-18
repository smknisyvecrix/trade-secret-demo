'use client';
export default function IntelligencePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">情报监控</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-red-700">3</p>
          <p className="text-sm text-red-600">泄密预警</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-700">12</p>
          <p className="text-sm text-blue-600">竞品动态</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-purple-700">5</p>
          <p className="text-sm text-purple-600">舆情监测</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-4">最新预警</h3>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
            <p className="font-medium text-red-700">检测到疑似核心技术外泄</p>
            <p className="text-sm text-gray-600 mt-1">来源：某技术论坛 · 10 分钟前</p>
          </div>
        </div>
      </div>
    </div>
  );
}
