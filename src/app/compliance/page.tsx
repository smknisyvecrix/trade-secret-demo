'use client';
export default function CompliancePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">合规检查</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">ISO 27001 合规率</span>
          <span className="text-2xl font-bold text-green-600">92%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-green-600 h-4 rounded-full" style={{ width: '92%' }}></div>
        </div>
      </div>
    </div>
  );
}
