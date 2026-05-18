'use client';
export default function MessagesPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">消息中心</h1>
      <div className="bg-white rounded shadow divide-y">
        <div className="p-4 hover:bg-gray-50 cursor-pointer">
          <div className="font-medium">系统通知：即将进行例行维护</div>
          <div className="text-sm text-gray-500">10 分钟前</div>
        </div>
        <div className="p-4 hover:bg-gray-50 cursor-pointer">
          <div className="font-medium">审批提醒：您有一个待审批的申请</div>
          <div className="text-sm text-gray-500">1 小时前</div>
        </div>
      </div>
    </div>
  );
}
