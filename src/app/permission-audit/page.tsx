'use client';
export default function PermissionAuditPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">权限审计</h1>
      <div className="bg-white p-4 rounded shadow">
        <p className="font-medium mb-2">待审查权限列表</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>张三 - 核心机密访问权</span>
            <button className="text-blue-600 text-sm">复核</button>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>李四 - 数据库导出权</span>
            <button className="text-blue-600 text-sm">复核</button>
          </div>
        </div>
      </div>
    </div>
  );
}
