'use client';

export default function AuditPage() {
  const reports = [
    { id: 1, title: '2026 年 Q1 合规审计报告', status: 'completed', date: '2026-04-15', type: '季度' },
    { id: 2, title: '2026 年年度审计报告', status: 'in_progress', date: '2026-12-31', type: '年度' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">审计报告</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ 生成报告</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">报告名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日期</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{r.title}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{r.type}</span></td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${r.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{r.status === 'completed' ? '已完成' : '进行中'}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
