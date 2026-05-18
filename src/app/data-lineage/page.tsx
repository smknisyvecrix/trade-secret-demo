'use client';
export default function DataLineagePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">数据血缘</h1>
      <div className="bg-white p-8 rounded shadow flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-blue-100 rounded">原始数据</div>
          <span>→</span>
          <div className="px-4 py-2 bg-purple-100 rounded">清洗加工</div>
          <span>→</span>
          <div className="px-4 py-2 bg-green-100 rounded">商业秘密</div>
        </div>
      </div>
    </div>
  );
}
