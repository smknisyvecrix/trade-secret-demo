'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold"> 企业商业秘密保护系统</h1>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <span></span><span className="text-sm">管理员</span>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600">商业秘密总数</div>
            <div className="text-3xl font-bold mt-2">1,234</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600">已认证数量</div>
            <div className="text-3xl font-bold mt-2">1,180</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600">生效规则数</div>
            <div className="text-3xl font-bold mt-2">12</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600">待审批</div>
            <div className="text-3xl font-bold mt-2 text-orange-600">8</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/rules" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition">
            <div className="text-2xl mb-2"></div>
            <div className="font-bold">规则管理</div>
            <div className="text-gray-600 text-sm">导入和管理认证规则</div>
          </Link>
          <Link href="/secrets" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition">
            <div className="text-2xl mb-2">🔐</div>
            <div className="font-bold">商业秘密库</div>
            <div className="text-gray-600 text-sm">查看和管理商业秘密</div>
          </Link>
          <Link href="/certifications" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-bold">认证中心</div>
            <div className="text-gray-600 text-sm">查看认证记录和证书</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
