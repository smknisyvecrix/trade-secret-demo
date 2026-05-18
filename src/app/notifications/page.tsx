export const dynamic = 'force-dynamic';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: 'system', title: '系统升级通知', desc: '系统将于今晚 22:00-23:00 进行例行维护', time: '1 小时前', read: false },
    { id: 2, type: 'approval', title: '新的审批待处理', desc: '李四提交了客户名单 Q1 的下载申请', time: '2 小时前', read: false },
    { id: 3, type: 'cert', title: '认证完成通知', desc: '技术方案 V2 已完成时间戳认证', time: '5 小时前', read: true },
    { id: 4, type: 'alert', title: '安全预警', desc: '检测到异常登录行为，请及时处理', time: '1 天前', read: true },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">消息通知</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">全部</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">未读</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">已读</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-6 border-b last:border-0 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}>
            <div className="flex items-start gap-4">
              <span className={`text-2xl ${notif.type === 'system' ? '🔔' : notif.type === 'approval' ? '📋' : notif.type === 'cert' ? '🔒' : '️'}`}></span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className={`font-medium ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>{notif.title}</h3>
                  {!notif.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                </div>
                <p className="text-sm text-gray-500">{notif.desc}</p>
                <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                {!notif.read ? '标记已读' : '删除'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
