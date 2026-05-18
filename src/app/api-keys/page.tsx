'use client';
export default function ApiKeysPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">API 密钥</h1>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">生产环境密钥</span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">正常</span>
        </div>
        <code className="block bg-gray-100 p-2 rounded text-sm">sk_live_51Nz... (已隐藏)</code>
      </div>
    </div>
  );
}
