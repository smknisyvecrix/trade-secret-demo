'use client';
export default function IncidentResponsePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">事件响应</h1>
      <div className="bg-red-50 border border-red-200 p-4 rounded flex justify-between items-center">
        <div>
          <p className="font-bold text-red-700">当前无活跃安全事件</p>
          <p className="text-sm text-red-600">系统运行平稳</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded text-sm">上报事件</button>
      </div>
    </div>
  );
}
