'use client';
export default function PreviewPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">文件预览</h1>
      <div className="bg-white p-8 rounded shadow text-center border-2 border-dashed border-gray-300">
        <div className="text-4xl mb-4"></div>
        <p className="text-gray-500">选择左侧文件列表中的文件进行在线预览</p>
        <p className="text-xs text-gray-400 mt-2">支持 PDF, Word, Excel 格式</p>
      </div>
    </div>
  );
}
