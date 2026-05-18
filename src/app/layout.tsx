import './globals.css';
import Link from 'next/link';

export const metadata = { title: '企业商业秘密保护系统' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 flex h-screen overflow-hidden">
        {/* 左侧侧边栏 */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700">
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span></span> 商业秘密保护
            </h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <NavItem href="/" icon="" label="仪表盘" />
            <NavItem href="/rules" icon="" label="规则管理" />
            <NavItem href="/secrets" icon="🔐" label="商业秘密库" />
            <NavItem href="/certifications" icon="✅" label="认证中心" />
          </nav>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                管
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">管理员</div>
                <div className="text-xs text-gray-500">admin@tsa.cn</div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* 右侧内容区 */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

// 侧边栏导航项组件
function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all group"
    >
      <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
