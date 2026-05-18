'use client';
export default function EvidencePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">证据保全</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-blue-600">156</p>
          <p className="text-sm text-gray-500">证据总数</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-green-600">98%</p>
          <p className="text-sm text-gray-500">固化率</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">证据列表</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">+ 采集证据</button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left text-xs">编号</th>
              <th className="p-3 text-left text-xs">类型</th>
              <th className="p-3 text-left text-xs">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 text-sm font-medium">EV-001</td>
              <td className="p-3 text-sm">网页截图</td>
              <td className="p-3 text-sm"><span className="text-green-600">已固化</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
