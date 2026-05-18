'use client';
export default function GuidePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">操作指引</h1>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">如何新增商业秘密？</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>点击左侧导航栏"商业秘密库"</li>
          <li>点击右上角"新增秘密"按钮</li>
          <li>填写名称、分类及上传文件</li>
          <li>点击保存即可完成录入</li>
        </ol>
      </div>
    </div>
  );
}
