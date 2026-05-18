'use client';
export default function EncryptionPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">加密管理</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold">文件加密</h3>
            <p className="text-sm text-gray-500">对存储的商业秘密文件进行加密保护</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">加密算法</label>
            <select className="w-full px-4 py-2 border rounded-lg">
              <option>AES-256</option>
              <option>RSA-2048</option>
              <option>SM4 (国密)</option>
            </select>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">当前密钥状态：正常</p>
            <p className="text-xs text-green-600 mt-1">上次轮换：2026-04-01 · 下次轮换：2026-07-01</p>
          </div>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">保存设置</button>
      </div>
    </div>
  );
}
