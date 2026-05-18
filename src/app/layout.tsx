import './globals.css';
import Link from 'next/link';
import { ToastProvider } from '@/components/ToastContainer';

export const metadata = { title: '企业商业秘密保护系统' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 flex h-screen overflow-hidden">
        <ToastProvider>
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
            <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700">
              <h1 className="text-lg font-bold text-white"> 商业秘密保护</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <NavItem href="/" icon="" label="仪表盘" />
              <NavItem href="/rules" icon="" label="规则管理" />
              <NavItem href="/secrets" icon="🔐" label="商业秘密库" />
              <NavItem href="/certifications" icon="✅" label="认证中心" />
            </nav>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">管</div>
                <div>
                  <div className="text-sm font-medium">管理员</div>
                  <div className="text-xs text-gray-500">admin@tsa.cn</div>
                </div>
              </div>
            </div>
          </aside>
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}

// 侧边栏导航项（客户端组件，支持高亮）
import { usePathname } from 'next/navigation';

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
  
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive 
          ? 'bg-blue-50 text-blue-600 font-bold shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'hover:scale-110'}`}>{icon}</span>
      <span>{label}</span>
      {isActive && <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></span>}
    </Link>
  );
}
