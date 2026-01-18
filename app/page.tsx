export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold font-display text-forest-800 mb-6">
            U Debrock Finishes
          </h1>
          <p className="text-2xl text-forest-600 mb-4 font-body">
            Custom Wood Finishing & Restoration
          </p>
          <p className="text-lg text-walnut-600 max-w-2xl mx-auto">
            Professional craftsmanship meets modern technology. 
            This site is currently under construction.
          </p>
        </div>

        {/* Status Cards */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-tactile">
            <div className="w-12 h-12 bg-forest-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-forest-800 mb-2">
              Next.js 15
            </h3>
            <p className="text-forest-600 font-body">
              Modern React framework with TypeScript and App Router configured
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-tactile">
            <div className="w-12 h-12 bg-walnut-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-forest-800 mb-2">
              Custom Design
            </h3>
            <p className="text-forest-600 font-body">
              Beautiful craftsman-inspired theme with natural color palette
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-tactile">
            <div className="w-12 h-12 bg-antique-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-forest-800 mb-2">
              Python Automation
            </h3>
            <p className="text-forest-600 font-body">
              Playwright browser automation ready for content management
            </p>
          </div>
        </div>

        {/* Theme Preview */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-semibold text-forest-800 mb-8 text-center">
            Color Palette
          </h2>
          
          <div className="space-y-6">
            {/* Forest Colors */}
            <div>
              <h3 className="text-lg font-body font-medium text-forest-700 mb-3">Forest</h3>
              <div className="flex gap-2 flex-wrap">
                <div className="w-20 h-20 bg-forest-50 rounded-lg flex items-center justify-center text-xs">50</div>
                <div className="w-20 h-20 bg-forest-100 rounded-lg flex items-center justify-center text-xs">100</div>
                <div className="w-20 h-20 bg-forest-200 rounded-lg flex items-center justify-center text-xs">200</div>
                <div className="w-20 h-20 bg-forest-300 rounded-lg flex items-center justify-center text-xs">300</div>
                <div className="w-20 h-20 bg-forest-400 rounded-lg flex items-center justify-center text-xs text-white">400</div>
                <div className="w-20 h-20 bg-forest-500 rounded-lg flex items-center justify-center text-xs text-white">500</div>
                <div className="w-20 h-20 bg-forest-600 rounded-lg flex items-center justify-center text-xs text-white">600</div>
                <div className="w-20 h-20 bg-forest-700 rounded-lg flex items-center justify-center text-xs text-white">700</div>
                <div className="w-20 h-20 bg-forest-800 rounded-lg flex items-center justify-center text-xs text-white">800</div>
                <div className="w-20 h-20 bg-forest-900 rounded-lg flex items-center justify-center text-xs text-white">900</div>
              </div>
            </div>

            {/* Walnut Colors */}
            <div>
              <h3 className="text-lg font-body font-medium text-walnut-700 mb-3">Walnut</h3>
              <div className="flex gap-2 flex-wrap">
                <div className="w-20 h-20 bg-walnut-50 rounded-lg flex items-center justify-center text-xs">50</div>
                <div className="w-20 h-20 bg-walnut-100 rounded-lg flex items-center justify-center text-xs">100</div>
                <div className="w-20 h-20 bg-walnut-200 rounded-lg flex items-center justify-center text-xs">200</div>
                <div className="w-20 h-20 bg-walnut-300 rounded-lg flex items-center justify-center text-xs">300</div>
                <div className="w-20 h-20 bg-walnut-400 rounded-lg flex items-center justify-center text-xs text-white">400</div>
                <div className="w-20 h-20 bg-walnut-500 rounded-lg flex items-center justify-center text-xs text-white">500</div>
                <div className="w-20 h-20 bg-walnut-600 rounded-lg flex items-center justify-center text-xs text-white">600</div>
                <div className="w-20 h-20 bg-walnut-700 rounded-lg flex items-center justify-center text-xs text-white">700</div>
                <div className="w-20 h-20 bg-walnut-800 rounded-lg flex items-center justify-center text-xs text-white">800</div>
                <div className="w-20 h-20 bg-walnut-900 rounded-lg flex items-center justify-center text-xs text-white">900</div>
              </div>
            </div>

            {/* Antique Colors */}
            <div>
              <h3 className="text-lg font-body font-medium text-antique-700 mb-3">Antique</h3>
              <div className="flex gap-2 flex-wrap">
                <div className="w-20 h-20 bg-antique-50 rounded-lg flex items-center justify-center text-xs">50</div>
                <div className="w-20 h-20 bg-antique-100 rounded-lg flex items-center justify-center text-xs">100</div>
                <div className="w-20 h-20 bg-antique-200 rounded-lg flex items-center justify-center text-xs">200</div>
                <div className="w-20 h-20 bg-antique-300 rounded-lg flex items-center justify-center text-xs">300</div>
                <div className="w-20 h-20 bg-antique-400 rounded-lg flex items-center justify-center text-xs">400</div>
                <div className="w-20 h-20 bg-antique-500 rounded-lg flex items-center justify-center text-xs text-white">500</div>
                <div className="w-20 h-20 bg-antique-600 rounded-lg flex items-center justify-center text-xs text-white">600</div>
                <div className="w-20 h-20 bg-antique-700 rounded-lg flex items-center justify-center text-xs text-white">700</div>
                <div className="w-20 h-20 bg-antique-800 rounded-lg flex items-center justify-center text-xs text-white">800</div>
                <div className="w-20 h-20 bg-antique-900 rounded-lg flex items-center justify-center text-xs text-white">900</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="text-forest-600 font-body">
            Project initialized and ready for development
          </p>
          <p className="text-sm text-forest-500 mt-2">
            © 2026 U Debrock Finishes. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
