'use client';
export default function CollaborationPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">外部协作</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-blue-600">8</p>
          <p className="text-sm text-gray-500">活跃协作</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-gray-500">待审批</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-red-600">2</p>
          <p className="text-sm text-gray-500">已过期</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">协作列表</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">+ 新增协作</button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left text-xs">合作方</th>
              <th className="p-3 text-left text-xs">权限</th>
              <th className="p-3 text-left text-xs">状态</th>
              <th className="p-3 text-left text-xs">到期日</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 text-sm">律师事务所 A</td>
              <td className="p-3 text-sm">只读</td>
              <td className="p-3 text-sm"><span className="text-green-600">生效中</span></td>
              <td className="p-3 text-sm text-gray-500">2026-12-31</td>
            </tr>
            <tr>
              <td className="p-3 text-sm">合作伙伴 B</td>
              <td className="p-3 text-sm">读写</td>
              <td className="p-3 text-sm"><span className="text-yellow-600">即将到期</span></td>
              <td className="p-3 text-sm text-gray-500">2026-06-30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
