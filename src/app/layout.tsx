import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/Toast';
import { ToastContainer } from '@/components/ToastContainer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '企业商业秘密保护系统',
  description: '联合信任时间戳服务中心',
};

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname ? (href === '/' ? pathname === '/' : pathname.startsWith(href)) : false;
  
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-semibold shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
      {isActive && <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>}
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 p-4 space-y-2">
      <div className="mb-6 px-3">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          🔐 商业秘密保护
        </h1>
        <p className="text-xs text-gray-500 mt-1">联合信任时间戳服务中心</p>
      </div>
      
      <nav className="space-y-1">
        <NavItem href="/" icon="" label="仪表盘" />
        <NavItem href="/secrets" icon="📁" label="商业秘密库" />
        <NavItem href="/rules" icon="📋" label="保护规则" />
        <NavItem href="/certifications" icon="🔒" label="认证中心" />
        <NavItem href="/logs" icon="📝" label="操作日志" />
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <p className="text-xs text-gray-600"> 需要帮助？</p>
        <p className="text-xs text-gray-500 mt-1">联系客服获取支持</p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ToastProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 overflow-auto">
              {children}
            </main>
          </div>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
