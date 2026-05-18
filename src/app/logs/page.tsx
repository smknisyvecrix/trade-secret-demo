export const dynamic = 'force-dynamic';

export default function LogsPage() {
  const logs = [
    { id: 1, action: '新增秘密', user: '张三', target: '客户名单 Q1', time: '2026-05-19 14:30', type: 'create' },
    { id: 2, action: '完成认证', user: '系统', target: '技术方案 V2', time: '2026-05-19 12:15', type: 'certify' },
    { id: 3, action: '导入规则', user: '管理员', target: '技术信息保护规则', time: '2026-05-19 10:00', type: 'import' },
    { id: 4, action: '下载文件', user: '李四', target: '财务报表 2025', time: '2026-05-18 16:45', type: 'download' },
    { id: 5, action: '修改权限', user: '管理员', target: '客户名单 Q1', time: '2026-05-18 14:20', type: 'permission' },
    { id: 6, action: '查看秘密', user: '王五', target: '产品路线图', time: '2026-05-18 11:30', type: 'view' },
    { id: 7, action: '删除秘密', user: '管理员', target: '过期文档', time: '2026-05-17 09:00', type: 'delete' },
  ];

  const typeColors: any = {
    create: 'bg-blue-100 text-blue-700',
    certify: 'bg-green-100 text-green-700',
    import: 'bg-purple-100 text-purple-700',
    download: 'bg-orange-100 text-orange-700',
    permission: 'bg-yellow-100 text-yellow-700',
    view: 'bg-gray-100 text-gray-700',
    delete: 'bg-red-100 text-red-700',
  };

  const typeLabels: any = {
    create: '新增',
    certify: '认证',
    import: '导入',
    download: '下载',
    permission: '权限',
    view: '查看',
    delete: '删除',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">操作日志</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
            导出日志
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            筛选
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作人</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">目标对象</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[log.type]}`}>
                    {typeLabels[log.type]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.target}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
