'use client';
export default function RightsProtectionPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">维权中心</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-red-600">3</p>
          <p className="text-sm text-gray-500 mt-2">进行中案件</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-500 mt-2">已胜诉</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-blue-600">¥2.5M</p>
          <p className="text-sm text-gray-500 mt-2">获赔金额</p>
        </div>
      </div>
    </div>
  );
}
