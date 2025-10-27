import { InventoryPage } from './pages/InventoryPage';
import { Toaster } from '@/components/ui/sonner';
import { Logo } from './components/ui/logo';

function App() {
  return (
    <>
      {/* Enhanced gradient background with multiple layers */}
      <div className="fixed inset-0 z-[-2] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(56,189,248,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_50%)]"></div>
      </div>

      <div className="min-h-screen text-foreground font-sans antialiased">
        <header className="border-b border-white/10 backdrop-blur-xl bg-slate-900/50 sticky top-0 z-50 shadow-lg shadow-black/20">
          <div className="container mx-auto px-6 py-5 flex items-center gap-3">
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <Logo className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stock<span className="text-white">Watch</span>
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px]">
          <InventoryPage />
        </main>
      </div>
      <Toaster richColors />
    </>
  );
}

export default App;