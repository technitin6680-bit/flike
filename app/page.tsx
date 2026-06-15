import Link from 'next/link';
import { Sparkles, FileText, IndianRupee } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header className="h-16 flex items-center justify-between px-10 bg-white border-b border-slate-200 z-50">
        <h1 className="text-2xl font-bold tracking-tight text-emerald-600 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
          Flike
        </h1>
        <nav className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
            <span>Services</span>
            <span>Portfolio</span>
            <span>Pricing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block bg-slate-100 px-3 py-1 rounded-md text-xs border border-slate-200 text-slate-600">
              English / हिन्दी
            </div>
            <Link href="/dashboard" className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors">Login</Link>
            <Link href="/order" className="text-sm font-semibold text-white bg-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">Start Project</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-[520px_1fr] bg-white h-[calc(100vh-64px)] overflow-y-auto lg:overflow-hidden">
        {/* Left Side */}
        <section className="p-10 lg:p-14 flex flex-col justify-between bg-gradient-to-br from-white to-emerald-50/50 border-r border-slate-200 overflow-y-auto">
          <div>
            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold w-fit mb-6">
              MADE FOR BHARAT
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 tracking-tight mb-5">
              Order your custom website in <br/><span className="text-emerald-600">minutes.</span>
            </h1>
            
            <div className="font-display text-2xl text-slate-500 opacity-60 mb-6">भारत के लिए आपकी डिजिटल पहचान</div>
            
            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-md">
              The complete website ordering platform for Indian businesses. Choose a type, pick features, and get your estimation instantly.
            </p>
            
            <div className="flex flex-col gap-4 mb-10">
               <div className="flex items-center gap-3 text-slate-800 text-[15px]">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</div>
                  <span>Fixed Pricing from ₹2,999 — No Hidden Charges</span>
               </div>
               <div className="flex items-center gap-3 text-slate-800 text-[15px]">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</div>
                  <span>Integrated Payment Gateways & WhatsApp Support</span>
               </div>
               <div className="flex items-center gap-3 text-slate-800 text-[15px]">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</div>
                  <span>Project Delivery in under 7 Days</span>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/order" className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors text-center">
                Calculate Pricing Instantly
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-sm transition-colors text-center">
                Track Existing Order
              </Link>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-slate-200 flex gap-10">
            <div>
              <div className="font-bold text-2xl text-slate-900">1,200+</div>
              <div className="text-xs text-slate-500">Websites Delivered</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-slate-900">4.9/5</div>
              <div className="text-xs text-slate-500">Client Rating</div>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section className="bg-slate-900 p-10 lg:p-14 flex items-center justify-center relative overflow-y-auto">
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs flex items-center gap-2 border border-white/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_0_4px_rgba(52,211,153,0.2)] animate-pulse"></div>
            Powered by AI Estimation
          </div>

          <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
             <div className="p-6 border-b border-slate-100 bg-[#fafafa]">
                <div className="flex gap-2 mb-3">
                   <div className="h-1 flex-1 bg-emerald-600 rounded-full"></div>
                   <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                   <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">How it works</h3>
                <p className="text-sm text-slate-500">From idea to delivered project</p>
             </div>
             
             <div className="p-6 flex flex-col gap-3 flex-1 bg-white">
                <div className="flex items-start gap-3 p-3 border-2 border-emerald-600 bg-emerald-50/50 rounded-xl cursor-default transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="text-[13px] font-bold text-slate-900 mb-0.5">1. Select Requirements</h4>
                     <p className="text-[11px] text-slate-500 leading-relaxed">Choose from E-commerce, Portfolio, Blog, and more. Add required features.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border-2 border-slate-100 rounded-xl cursor-default transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 shrink-0 flex items-center justify-center text-slate-500">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="text-[13px] font-bold text-slate-900 mb-0.5">2. Instant Pricing</h4>
                     <p className="text-[11px] text-slate-500 leading-relaxed">Our AI pricing system gives you an immediate estimated cost in INR.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border-2 border-slate-100 rounded-xl cursor-default transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 shrink-0 flex items-center justify-center text-slate-500">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="text-[13px] font-bold text-slate-900 mb-0.5">3. Fast Delivery</h4>
                     <p className="text-[11px] text-slate-500 leading-relaxed">Track progress from development to delivery securely from your client dashboard.</p>
                  </div>
                </div>
                
                <Link href="/order" className="w-full mt-4 p-3.5 bg-emerald-600 text-white border-none rounded-lg font-semibold text-[14px] text-center hover:bg-emerald-700 transition-colors">
                  Start Configuration
                </Link>
                <p className="text-center text-[11px] text-slate-500 mt-1">24-hour final quotation guarantee</p>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
