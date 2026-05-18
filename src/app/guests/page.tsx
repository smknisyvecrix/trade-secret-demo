'use client';
export default function GuestsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">外部访客</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="font-medium">审计员 - 王会计</div>
          <div className="text-sm text-gray-500">权限：只读</div>
          <div className="text-sm text-green-600 mt-2">有效</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="font-medium">顾问 - 李律师</div>
          <div className="text-sm text-gray-500">权限：部分读写</div>
          <div className="text-sm text-red-600 mt-2">已过期</div>
        </div>
      </div>
    </div>
  );
}
