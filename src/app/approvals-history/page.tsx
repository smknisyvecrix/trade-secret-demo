'use client';
export default function ApprovalsHistoryPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">审批历史</h1>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 text-left text-xs">申请人</th>
            <th className="p-3 text-left text-xs">申请内容</th>
            <th className="p-3 text-left text-xs">审批结果</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-3 text-sm">张三</td>
            <td className="p-3 text-sm">下载客户名单</td>
            <td className="p-3 text-sm text-green-600">通过</td>
          </tr>
          <tr>
            <td className="p-3 text-sm">李四</td>
            <td className="p-3 text-sm">修改技术参数</td>
            <td className="p-3 text-sm text-red-600">拒绝</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
