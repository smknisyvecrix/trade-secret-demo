'use client';

export default function CollaborationPage() {
  const collaborators = [
    { id: 1, name: '外部顾问 - 张律师', org: '律师事务所 A', access: '只读', expires: '2026-12-31' },
    { id: 2, name: '合作方 - 李经理', org: '合作伙伴 B', access: '读写', expires: '2026-08-15' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900">外部协作</h1>
      <div className="space-y-4">
        {collaborators.map((c) => (
          <div key={c.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.org}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">权限：{c.access}</p>
                <p className="text-sm text-gray-500">到期：{c.expires}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
