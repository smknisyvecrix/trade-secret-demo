'use client';

export default function TicketsPage() {
  const tickets = [
    { id: 'TK-001', title: '无法下载证书', priority: 'high', status: 'open', creator: '李四' },
    { id: 'TK-002', title: '权限申请慢', priority: 'medium', status: 'in_progress', creator: '王五' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">工单系统</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ 提交工单</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">工单号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">优先级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建人</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{t.id}</td>
                <td className="px-6 py-4 text-sm">{t.title}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${t.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.priority === 'high' ? '高' : '中'}</span></td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${t.status === 'open' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{t.status === 'open' ? '待处理' : '处理中'}</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.creator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
