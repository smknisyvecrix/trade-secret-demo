'use client';

export default function VersionsPage() {
  const versions = [
    { id: 1, version: 'V3.0', date: '2026-05-19', author: '张三', changes: '更新技术参数' },
    { id: 2, version: 'V2.0', date: '2026-04-15', author: '李四', changes: '修改核心算法' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900">版本对比</h1>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {versions.map((v) => (
          <div key={v.id} className="p-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{v.version}</span>
              <span className="text-sm text-gray-500">{v.date}</span>
            </div>
            <p className="text-sm mt-2">修改人：{v.author} · {v.changes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
