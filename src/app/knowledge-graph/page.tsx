'use client';
export default function KnowledgeGraphPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">知识图谱</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">核心</div>
            <p className="text-sm text-gray-500">商业秘密关系网络</p>
          </div>
        </div>
      </div>
    </div>
  );
}
