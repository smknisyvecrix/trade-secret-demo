'use client';
export default function SmartAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">智能分析</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">风险画像</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">技术部门</span>
              <span className="text-sm text-red-600 font-medium">高风险</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">销售部门</span>
              <span className="text-sm text-yellow-600 font-medium">中风险</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">趋势预测</h3>
          <p className="text-gray-500 text-center py-8">图表加载中...</p>
        </div>
      </div>
    </div>
  );
}
