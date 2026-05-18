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
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 p-4 flex flex-col">
      <div className="mb-4 px-3">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          🔐 商业秘密保护
        </h1>
        <p className="text-xs text-gray-500 mt-1">联合信任时间戳服务中心</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto space-y-1">
        <p className="text-xs text-gray-400 px-3 py-2 font-medium">核心功能</p>
        <NavItem href="/" icon="" label="仪表盘" />
        <NavItem href="/secrets" icon="📁" label="商业秘密库" />
        <NavItem href="/rules" icon="📋" label="保护规则" />
        <NavItem href="/certifications" icon="🔒" label="认证中心" />
        <NavItem href="/logs" icon="📝" label="操作日志" />
        
        <p className="text-xs text-gray-400 px-3 py-2 mt-4 font-medium">运营管理</p>
        <NavItem href="/users" icon="" label="用户管理" />
        <NavItem href="/approvals" icon="✅" label="审批流程" />
        <NavItem href="/dashboard" icon="📊" label="数据看板" />
        <NavItem href="/alerts" icon="️" label="风险预警" />
        <NavItem href="/batch-import" icon="" label="批量导入" />
        
        <p className="text-xs text-gray-400 px-3 py-2 mt-4 font-medium">安全合规</p>
        <NavItem href="/stats" icon="📈" label="数据统计" />
        <NavItem href="/audit" icon="" label="审计报告" />
        <NavItem href="/contracts" icon="📄" label="合同管理" />
        <NavItem href="/collaboration" icon="🤝" label="外部协作" />
        <NavItem href="/watermark" icon="💧" label="水印管理" />
        <NavItem href="/encryption" icon="🔐" label="加密管理" />
        
        <p className="text-xs text-gray-400 px-3 py-2 mt-4 font-medium">高级功能</p>
        <NavItem href="/intelligence" icon="🎯" label="情报监控" />
        <NavItem href="/evidence" icon="📸" label="证据保全" />
        <NavItem href="/rights-protection" icon="⚖️" label="维权中心" />
        <NavItem href="/smart-analysis" icon="🤖" label="智能分析" />
        <NavItem href="/knowledge-graph" icon="🕸️" label="知识图谱" />
        <NavItem href="/versions" icon="🔄" label="版本对比" />
        <NavItem href="/tags" icon="🏷️" label="标签管理" />
        
        <p className="text-xs text-gray-400 px-3 py-2 mt-4 font-medium">系统设置</p>
        <NavItem href="/templates" icon="📜" label="证书模板" />
        <NavItem href="/settings" icon="⚙️" label="系统设置" />
        <NavItem href="/help" icon="" label="帮助中心" />
        <NavItem href="/notifications" icon="🔔" label="消息通知" />
        <NavItem href="/recycle" icon="🗑️" label="回收站" />
        <NavItem href="/tickets" icon="🎫" label="工单系统" />
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
