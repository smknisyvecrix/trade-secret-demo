'use client';
export default function BackupRestorePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">备份恢复</h1>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <span>自动备份状态</span>
          <span className="text-green-600 font-bold">正常</span>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded">立即备份</button>
          <button className="flex-1 bg-white border border-gray-300 py-2 rounded">数据恢复</button>
        </div>
      </div>
    </div>
  );
}
