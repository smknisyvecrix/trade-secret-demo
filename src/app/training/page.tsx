'use client';
export default function TrainingPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">培训记录</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left text-xs">课程名称</th>
              <th className="p-3 text-left text-xs">参与人数</th>
              <th className="p-3 text-left text-xs">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 text-sm">商业秘密保护基础</td>
              <td className="p-3 text-sm">45 人</td>
              <td className="p-3 text-sm text-green-600">已完成</td>
            </tr>
            <tr>
              <td className="p-3 text-sm">数据防泄漏演练</td>
              <td className="p-3 text-sm">12 人</td>
              <td className="p-3 text-sm text-blue-600">进行中</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
