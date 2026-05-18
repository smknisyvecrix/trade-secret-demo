'use client';
export default function ReportCenterPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">报表中心</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50">
          <div className="font-medium"> 月度安全报告</div>
          <div className="text-xs text-gray-500 mt-1">自动生成</div>
        </div>
        <div className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50">
          <div className="font-medium"> 季度合规分析</div>
          <div className="text-xs text-gray-500 mt-1">需手动生成</div>
        </div>
      </div>
    </div>
  );
}
