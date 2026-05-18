import './globals.css';
import Link from 'next/link';

export const metadata = { title: '企业商业秘密保护系统' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 flex h-screen overflow-hidden">
        {/* 左侧侧边栏 */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <h1 className="text-lg font-bold text-gray-800"> 商业秘密保护</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/" className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              <span className="mr-3"></span> 仪表盘
            </Link>
            <Link href="/rules" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100">
              <span className="mr-3"></span> 规则管理
            </Link>
            <Link href="/secrets" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100">
              <span className="mr-3">🔐</span> 商业秘密库
            </Link>
            <Link href="/certifications" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100">
              <span className="mr-3">✅</span> 认证中心
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">管</div>
              <div>
                <div className="text-sm font-medium">管理员</div>
                <div className="text-xs text-gray-500">admin@tsa.cn</div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* 右侧内容区 */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
