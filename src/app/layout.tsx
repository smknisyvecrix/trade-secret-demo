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
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
        isActive 
          ? 'bg-blue-50 text-blue-600 font-semibold' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {isActive && <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></span>}
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="w-60 bg-white border-r border-gray-200 h-screen sticky top-0 p-4 flex flex-col">
      <div className="mb-4 px-2">
        <h1 className="text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          🔐 商业秘密保护
        </h1>
        <p className="text-[10px] text-gray-400 mt-0.5">联合信任时间戳服务中心</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto space-y-1">
        {/* 基础模块类 */}
        <div className="mb-1">
          <p className="text-[10px] text-gray-400 px-2 py-1.5 font-bold uppercase tracking-wider">基础模块</p>
          <NavItem href="/" icon="" label="仪表盘" />
          <NavItem href="/secrets" icon="📁" label="秘密库" />
          <NavItem href="/users" icon="" label="用户管理" />
          <NavItem href="/logs" icon="📝" label="操作日志" />
          <NavItem href="/settings" icon="⚙️" label="系统设置" />
        </div>
        
        {/* 核心模块类 */}
        <div className="mb-1">
          <p className="text-[10px] text-blue-500 px-2 py-1.5 font-bold uppercase tracking-wider">核心模块</p>
          <NavItem href="/certifications" icon="🔒" label="认证中心" />
          <NavItem href="/rules" icon="📋" label="规则管理" />
          <NavItem href="/evidence" icon="📸" label="证据保全" />
        </div>
        
        {/* 增值模块类 */}
        <div className="mb-1">
          <p className="text-[10px] text-purple-500 px-2 py-1.5 font-bold uppercase tracking-wider">增值模块</p>
          <NavItem href="/intelligence" icon="🎯" label="情报监控" />
          <NavItem href="/rights-protection" icon="⚖️" label="维权中心" />
          <NavItem href="/approvals" icon="✅" label="审批流程" />
          <NavItem href="/alerts" icon="️" label="风险预警" />
          <NavItem href="/dashboard" icon="📊" label="数据看板" />
        </div>
        
        {/* 扩展模块类 */}
        <div className="mb-1">
          <p className="text-[10px] text-gray-400 px-2 py-1.5 font-bold uppercase tracking-wider">扩展模块</p>
          <NavItem href="/contracts" icon="📄" label="合同管理" />
          <NavItem href="/collaboration" icon="🤝" label="外部协作" />
          <NavItem href="/batch-import" icon="" label="批量导入" />
          <NavItem href="/tags" icon="🏷️" label="标签管理" />
          <NavItem href="/recycle" icon="🗑️" label="回收站" />
        </div>
      </nav>
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
