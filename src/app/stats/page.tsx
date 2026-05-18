'use client';

export default function StatsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900">数据统计</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-500 mt-2">总秘密数</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-3xl font-bold text-green-600">987</p>
          <p className="text-sm text-gray-500 mt-2">已认证数</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-3xl font-bold text-purple-600">156</p>
          <p className="text-sm text-gray-500 mt-2">活跃用户</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-3xl font-bold text-orange-600">2,345</p>
          <p className="text-sm text-gray-500 mt-2">操作日志</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">月度认证趋势</h3>
        <div className="flex items-end justify-between h-48 gap-2">
          {[65, 78, 52, 89, 71, 95, 83, 76, 88, 92, 85, 97].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t" style={{ height: h + '%' }}></div>
              <span className="text-xs text-gray-400 mt-2">{i + 1}月</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
