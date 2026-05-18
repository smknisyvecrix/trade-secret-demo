'use client';
export default function WatermarkPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">水印管理</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold">文件水印</h3>
            <p className="text-sm text-gray-500">为下载的文件自动添加水印</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">水印内容</label>
            <input type="text" defaultValue="机密 - 仅供内部使用" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">透明度</label>
              <input type="range" min="10" max="100" defaultValue="30" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">旋转角度</label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>-45 度</option>
                <option>-30 度</option>
              </select>
            </div>
          </div>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">保存设置</button>
      </div>
    </div>
  );
}
