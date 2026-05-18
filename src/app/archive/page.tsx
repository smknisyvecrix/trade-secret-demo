'use client';
export default function ArchivePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">数据归档</h1>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">这里展示已归档的历史商业秘密数据。</p>
        <div className="mt-4 p-4 bg-gray-50 rounded">归档文件：2025 年度技术图纸 (已锁定)</div>
      </div>
    </div>
  );
}
