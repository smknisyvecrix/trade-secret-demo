export const dynamic = 'force-dynamic';

export default function UsersPage() {
  const users = [
    { id: 1, name: '张三', email: 'zhangsan@company.com', role: '管理员', status: 'active', lastLogin: '2026-05-19 14:30' },
    { id: 2, name: '李四', email: 'lisi@company.com', role: '普通用户', status: 'active', lastLogin: '2026-05-19 10:20' },
    { id: 3, name: '王五', email: 'wangwu@company.com', role: '审计员', status: 'inactive', lastLogin: '2026-05-15 09:00' },
    { id: 4, name: '赵六', email: 'zhaoliu@company.com', role: '普通用户', status: 'active', lastLogin: '2026-05-18 16:45' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <span>➕</span>
          <span>新增用户</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-500">总用户数</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-green-600">18</p>
          <p className="text-sm text-gray-500">活跃用户</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-purple-600">3</p>
          <p className="text-sm text-gray-500">管理员</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-orange-600">6</p>
          <p className="text-sm text-gray-500">待审核</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">邮箱</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">角色</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">最后登录</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {user.name[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === '管理员' ? 'bg-purple-100 text-purple-700' :
                    user.role === '审计员' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status === 'active' ? '活跃' : '停用'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">编辑</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">停用</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
