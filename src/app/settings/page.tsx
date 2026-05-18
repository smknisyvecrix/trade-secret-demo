'use client';
import { useState } from 'react';
export default function SettingsPage() {
  const [tab, setTab] = useState('general');
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">系统设置</h1>
      <div className="flex gap-2">
        <button onClick={() => setTab('general')} className={`px-4 py-2 rounded ${tab === 'general' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>基础设置</button>
        <button onClick={() => setTab('security')} className={`px-4 py-2 rounded ${tab === 'security' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>安全设置</button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        {tab === 'general' && <div>
          <label className="block text-sm font-medium mb-1">系统名称</label>
          <input type="text" defaultValue="企业商业秘密保护系统" className="w-full p-2 border rounded" />
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">保存</button>
        </div>}
        {tab === 'security' && <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>开启双因素认证</span>
          </label>
        </div>}
      </div>
    </div>
  );
}
 
