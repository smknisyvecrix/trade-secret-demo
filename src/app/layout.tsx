import './globals.css';
import Link from 'next/link';

export const metadata = { title: '企业商业秘密保护系统' };

// 辅助函数：判断是否激活
function isActive(currentPath: string, targetPath: string) {
  if (targetPath === '/') return currentPath === '/';
  return currentPath.startsWith(targetPath);
}

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
  // 获取当前路径 (Client Component 中可以用 usePathname，这里简化处理，通过 CSS 类名判断)
  // 实际上 Next.js App Router 中 Layout 是 Server Component，不能直接用 usePathname
  // 我们可以通过传递 active prop 或者使用客户端组件。
  // 为了简单，我们这里用纯 CSS :hover，高亮逻辑留给后续优化，或者做成 Client Component
  // 修正：Next.js 14 中，可以在 Layout 中导入 usePathname 如果 Layout 是 Client Component，
  // 但 Layout 通常是 Server Component。
  // 这里为了保持简单，我们不做动态高亮，只做 Hover 效果。
  
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
