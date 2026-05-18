'use client';
export default function TagsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">标签管理</h1>
      <div className="flex gap-4">
        <input type="text" placeholder="输入新标签名称" className="flex-1 px-4 py-2 border rounded-lg" />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">添加标签</button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="font-medium text-red-700">核心技术</p>
          <p className="text-sm text-red-600 mt-1">45 个文件</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <p className="font-medium text-blue-700">客户数据</p>
          <p className="text-sm text-blue-600 mt-1">32 个文件</p>
        </div>
      </div>
    </div>
  );
}
