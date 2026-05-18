'use client';
export default function RecyclePage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">回收站</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded text-sm">清空回收站</button>
      </div>
      <div className="bg-white rounded shadow divide-y">
        <div className="p-4 flex justify-between items-center">
          <span>测试数据_V1 (7 天前删除)</span>
          <button className="text-blue-600 text-sm">恢复</button>
        </div>
        <div className="p-4 flex justify-between items-center">
          <span>旧版合同模板 (15 天前删除)</span>
          <button className="text-blue-600 text-sm">恢复</button>
        </div>
      </div>
    </div>
  );
}
