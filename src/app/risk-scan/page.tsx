'use client';
export default function RiskScanPage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">风险扫描</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded">开始扫描</button>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <div className="text-5xl mb-4">🛡️</div>
        <p className="text-lg font-medium">系统安全状态良好</p>
        <p className="text-gray-500">上次扫描时间：2026-05-19 10:00</p>
      </div>
    </div>
  );
}
