export const dynamic = 'force-dynamic';

export default function RecyclePage() {
  const deleted = [
    { id: 1, name: '过期合同 2025', deletedBy: '管理员', deletedAt: '2026-05-15', daysLeft: 15 },
    { id: 2, name: '临时文件备份', deletedBy: '系统', deletedAt: '2026-05-10', daysLeft: 10 },
    { id: 3, name: '测试数据', deletedBy: '管理员', deletedAt: '2026-05-05', daysLeft: 5 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">回收站</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
          清空回收站
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-700">
          ️ 回收站中的文件将在 30 天后自动永久删除，请及时恢复重要文件。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">文件名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">删除人</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">删除时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">剩余天数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deleted.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.deletedBy}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.deletedAt}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.daysLeft <= 7 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.daysLeft} 天
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">恢复</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">彻底删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
