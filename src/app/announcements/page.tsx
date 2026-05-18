'use client';
export default function AnnouncementsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">系统公告</h1>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-bold text-yellow-700">系统升级通知</p>
        <p className="text-sm text-yellow-600 mt-1">系统将于今晚 22:00 进行升级，预计耗时 1 小时。</p>
      </div>
      <div className="bg-white border-l-4 border-blue-400 p-4 shadow">
        <p className="font-bold text-gray-800">新功能上线</p>
        <p className="text-sm text-gray-600 mt-1">新增了批量导入功能，欢迎体验。</p>
      </div>
    </div>
  );
}
