'use client';
export default function AssetInventoryPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">资产盘点</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-2xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-500">数字资产</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-2xl font-bold text-purple-600">56</p>
          <p className="text-sm text-gray-500">物理介质</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-2xl font-bold text-orange-600">89</p>
          <p className="text-sm text-gray-500">云端存储</p>
        </div>
      </div>
    </div>
  );
}
