export const dynamic = 'force-dynamic';

export default function TemplatesPage() {
  const templates = [
    { id: 1, name: '标准证书模板', status: 'default', updated: '2026-05-15' },
    { id: 2, name: '高级证书模板', status: 'active', updated: '2026-05-10' },
    { id: 3, name: '简易证书模板', status: 'inactive', updated: '2026-04-20' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">证书模板</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + 新建模板
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <span className="text-4xl">📜</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{tpl.name}</h3>
                {tpl.status === 'default' && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">默认</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">更新于 {tpl.updated}</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">使用</button>
                <button className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">编辑</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
