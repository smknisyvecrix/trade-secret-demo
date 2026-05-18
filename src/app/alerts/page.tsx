export const dynamic = 'force-dynamic';

export default function AlertsPage() {
  const alerts = [
    { id: 1, level: 'high', title: '异常下载行为', desc: '用户李四在 1 小时内下载了 5 个核心机密文件', time: '10 分钟前' },
    { id: 2, level: 'medium', title: '异地登录警告', desc: '用户张三从新 IP 地址登录系统', time: '30 分钟前' },
    { id: 3, level: 'low', title: '权限即将过期', desc: '用户王五的访问权限将在 3 天后过期', time: '2 小时前' },
    { id: 4, level: 'high', title: '批量导出检测', desc: '检测到用户赵六尝试批量导出客户数据', time: '1 小时前' },
  ];

  const levelConfig = {
    high: { bg: 'bg-red-50', border: 'border-red-200', icon: '🔴', text: 'text-red-700', label: '高危' },
    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '🟡', text: 'text-yellow-700', label: '中危' },
    low: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '', text: 'text-blue-700', label: '低危' },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">风险预警</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
          标记全部已读
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-red-700">2</p>
          <p className="text-sm text-red-600">高危预警</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-yellow-700">1</p>
          <p className="text-sm text-yellow-600">中危预警</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-700">1</p>
          <p className="text-sm text-blue-600">低危预警</p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const config = levelConfig[alert.level as keyof typeof levelConfig];
          return (
            <div key={alert.id} className={`${config.bg} ${config.border} border rounded-lg p-6 hover:shadow-md transition-shadow`}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">{config.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-semibold ${config.text}`}>{alert.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{alert.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">查看详情</button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">标记已读</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
