export const dynamic = 'force-dynamic';

export default function ApprovalsPage() {
  const approvals = [
    { id: 1, type: '下载申请', user: '李四', target: '客户名单 Q1', time: '2026-05-19 14:30', status: 'pending' },
    { id: 2, type: '权限申请', user: '王五', target: '技术方案 V2', time: '2026-05-19 12:15', status: 'approved' },
    { id: 3, type: '下载申请', user: '赵六', target: '财务报表 2025', time: '2026-05-18 16:45', status: 'rejected' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">审批流程</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">全部</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">待审批</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">已通过</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">已拒绝</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-yellow-700">5</p>
          <p className="text-sm text-yellow-600">待审批</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-green-700">12</p>
          <p className="text-sm text-green-600">已通过</p>
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-red-700">2</p>
          <p className="text-sm text-red-600">已拒绝</p>
        </div>
      </div>

      <div className="space-y-4">
        {approvals.map((approval) => (
          <div key={approval.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{approval.type}</h3>
                <p className="text-sm text-gray-500 mt-1">申请人：{approval.user}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                approval.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                approval.status === 'approved' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {approval.status === 'pending' ? '待审批' : approval.status === 'approved' ? '已通过' : '已拒绝'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">目标对象：{approval.target}</p>
              <p className="text-sm text-gray-500">{approval.time}</p>
            </div>
            {approval.status === 'pending' && (
              <div className="flex gap-3 mt-4 pt-4 border-t">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">通过</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">拒绝</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
