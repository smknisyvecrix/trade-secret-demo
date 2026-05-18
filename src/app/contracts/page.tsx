'use client';

export default function ContractsPage() {
  const contracts = [
    { id: 1, name: '保密协议 - 客户 A', type: 'NDA', status: 'active', expire: '2027-12-31' },
    { id: 2, name: '技术合作合同', type: '合作', status: 'active', expire: '2026-10-15' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900">合同管理</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">合同名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">到期日</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {contracts.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                <td className="px-6 py-4 text-sm">{c.type}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">生效中</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.expire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
