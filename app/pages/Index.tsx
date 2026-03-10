export function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-scarce-green-50 via-white to-scarce-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-scarce-green-300 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-scarce-green-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Rare medications.<br className="hidden md:block" />
            <p className="md:hidden text-scarce-green-600">Delivered nationwide.</p>
            <span className="hidden md:block text-scarce-green-600">Delivered nationwide.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Scarce Medix bridges the gap — sourcing and delivering hard-to-find drugs, genuine medications, and essential supplements across every corner of Nigeria.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-lg mx-auto">
            <input 
              type="text" 
              placeholder="Search for medication..." 
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-scarce-green-500 focus:border-transparent shadow-sm text-lg"
            />
            <button className="bg-scarce-green-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-scarce-green-700 transition shadow-md hover:shadow-xl">
              Search
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="text-scarce-green-600 mr-2">✓</span> 100% Authentic
            </div>
            <div className="flex items-center">
              <span className="text-scarce-green-600 mr-2">✓</span> Nationwide Delivery
            </div>
            <div className="flex items-center">
              <span className="text-scarce-green-600 mr-2">✓</span> Discreet Packaging
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stats */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: "Rare items sourced monthly", value: "500+" },
              { label: "States covered", value: "36" },
              { label: "Average rating", value: "4.9" },
              { label: "Fulfillment rate", value: "98%" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-5xl font-bold text-scarce-green-600 mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-scarce-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-scarce-green-800">Why patients and doctors choose us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card 
              icon="🔍" 
              title="We Find What Others Can't" 
              text="Specialized sourcing network for orphan drugs, discontinued lines, and critical short-supply medications." 
            />
            <Card 
              icon="🚀" 
              title="Fast. Reliable. Nationwide." 
              text="2–5 day delivery to Lagos, Abuja, PH, Kano — and everywhere in between. Real-time tracking included." 
            />
            <Card 
              icon="🛡️" 
              title="Trust & Transparency" 
              text="NAFDAC-verified products only. Full batch & expiry visibility. Secure payments. Zero hidden fees." 
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-scarce-green-600 to-scarce-green-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need it now? We probably have it.</h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10">Search once. Get it delivered. Life-saving shouldn't be hard.</p>
          <a href="#" className="inline-block bg-white text-scarce-green-700 px-12 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
            Start Your Search →
          </a>
        </div>
      </section>
    </>
  );
}

// Simple internal component to keep the code clean
function Card({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition border border-gray-100">
      <div className="w-16 h-16 bg-scarce-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-semibold text-scarce-green-700 mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{text}</p>
    </div>
  );
}