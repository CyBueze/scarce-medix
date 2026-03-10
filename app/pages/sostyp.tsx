import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export default function Sostyp() {
  // Simple visual timer logic for the 15-minute countdown
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans pb-20">
      {/* Top Urgency Bar */}
      <div className="bg-red-600 text-white py-2 text-center px-4 sticky top-0 z-50">
        <p className="text-xs sm:text-sm font-bold animate-pulse">
          ⚠️ SPECIAL 50% DISCOUNT EXPIRES IN: {formatTime(timeLeft)}
        </p>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-8 md:pt-12">
        {/* Success Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            I know you just downloaded the guide (thank you!).
          </h1>
        </header>

        {/* The Body Copy */}
        <section className="max-w-2xl mx-auto space-y-6 text-slate-800 leading-relaxed text-base md:text-lg">
          <p className="font-bold text-red-600">But here's the thing...</p>
          <p>Reading about BP support is great. But <span className="underline decoration-yellow-400 decoration-4">taking action is what saves lives.</span></p>
          <p>And I don't want you to wait 2 weeks to "think about it" while your parent's BP stays dangerously high.</p>
          <p className="font-bold">So let me make this ridiculously easy for you:</p>
        </section>

        {/* Product Intro Card */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 py-6 px-4 text-center">
            <h2 className="text-yellow-400 font-black text-xl md:text-3xl tracking-tight">
              INTRODUCING: THE "BP SUPPORT STARTER KIT"
            </h2>
          </div>

          <div className="p-6 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Product Image Placeholder */}
              <div className="w-full md:w-1/2">
                <div className="relative group">
                   <div className="w-full aspect-[3/4] bg-white rounded-2xl flex items-center justify-center border-2 border-slate-200 overflow-hidden shadow-2xl">
                        {/* THE IMAGE (MODIFIED TO FILL AND SPREAD EVENLY) */}
                        <img 
                          src="https://yld4fagxsx.ufs.sh/f/IO0V5ia4o8wkGni5zm2x9ijgqtKc7eJhT1BlubE3pYdR2kP6" 
                          alt="Magnesium Glycinate Supplement Bottle"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                   </div>
                   
                   {/* Scarcity Badge (RETAINED FOR CONVERSION) */}
                   <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-slate-900 font-black px-4 py-2 rounded-lg shadow-lg rotate-3 z-10 text-xs sm:text-sm">
                     60-DAY SUPPLY
                   </div>
                </div>
              </div>


              {/* Quick Hook */}
              <div className="w-full md:w-1/2 space-y-4">
                <p className="text-lg font-medium italic text-slate-600">
                  "This is Magnesium Glycinate - the #1 mineral deficiency in Nigerian adults over 50 with high BP."
                </p>
                <div className="space-y-2">
                  <p className="font-bold text-slate-900">Your parent's high BP might not just be about their heart...</p>
                  <p className="text-blue-600 font-bold text-2xl uppercase tracking-tighter">It's about magnesium deficiency.</p>
                </div>
              </div>
            </div>

            {/* Callout Box */}
            <div className="mt-12 bg-blue-50 rounded-2xl p-6 md:p-8 border border-blue-100">
              <h3 className="text-blue-900 font-black text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span> Why 78% of BP Patients Are Actually Magnesium Deficient:
              </h3>
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  "Nigerian diet (garri, rice, plantain) = LOW magnesium",
                  "BP medications DEPLETE magnesium further",
                  "Stress burns through magnesium",
                  "Poor sleep = magnesium deficiency",
                  "Age 50+ = 60% less magnesium absorption"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-800 font-medium">
                    <span className="text-blue-400">•</span> {text}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center text-blue-900 font-black border-t border-blue-200 pt-4">
                Result: Stubborn BP that won't drop, even with medication.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 text-center">What Magnesium Glycinate Does</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { t: "Relaxes blood vessel walls", d: "Natural BP support - like medication but gentler" },
                  { t: "Regulates heart rhythm", d: "Stops palpitations and irregular beats" },
                  { t: "Improves sleep quality", d: "Stress/worry is a MAJOR BP trigger" },
                  { t: "Reduces muscle cramps", d: "Especially leg cramps at night" },
                  { t: "Calms nervous system", d: "Less anxiety = lower BP" },
                  { t: "Works within 3-7 days", d: "You'll notice sleep improvement first" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-green-500 font-bold">✓</div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.t}</p>
                      <p className="text-slate-500 text-xs">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
               {[
                 {
                   name: "Chioma A., Lekki",
                   sub: "Daughter of 64-year-old",
                   text: "My mother couldn't sleep - kept waking up worried about her health. I bought her this magnesium. Within 1 WEEK, she's sleeping 6-7 hours straight. Her BP dropped from 172 to 158 just from better sleep!"
                 },
                 {
                   name: "Tunde O., Ikeja",
                   sub: "Son of 59-year-old",
                   text: "My dad's leg cramps were terrible at night. Started taking magnesium. Cramps GONE in 5 days. BP also came down 10 points. His doctor said 'whatever you're doing, continue it.'"
                 }
               ].map((t, i) => (
                 <div key={i} className="bg-slate-50 p-6 rounded-2xl italic text-slate-700 relative">
                   <span className="text-4xl text-slate-200 absolute top-2 left-2 font-serif">"</span>
                   <p className="relative z-10 text-sm mb-4 leading-relaxed">{t.text}</p>
                   <p className="text-xs font-bold text-slate-900">{t.name}</p>
                   <p className="text-[10px] text-slate-500">{t.sub}</p>
                 </div>
               ))}
            </div>

            {/* The Price Box */}
            <div className="mt-12 bg-yellow-50 rounded-3xl border-4 border-yellow-400 p-8 text-center overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-6 py-1 font-bold text-xs uppercase -rotate-45 translate-x-6 translate-y-4">
                Limited
              </div>
              <h4 className="text-slate-500 uppercase font-black text-sm mb-2 tracking-widest">60-Day Supply Magnesium Glycinate</h4>
              <div className="mb-2">
                <p className="text-2xl text-slate-400 line-through">₦38,000</p>
                <span className="text-5xl font-black text-slate-900 tracking-tighter">₦18,900</span>
              </div>
              <p className="text-red-600 font-black text-lg mb-6 tracking-tight">SAVE ₦19,100! (50% OFF!)</p>
              
              <ul className="text-left inline-block space-y-2 mb-8 text-sm md:text-base">
                {["60-Day Supply (120 capsules)", "Pharmaceutical Grade", "FREE Delivery (Nationwide)", "Pay on Delivery (Inspect First)", "30-Day Money-Back Guarantee"].map((check, i) => (
                  <li key={i} className="flex items-center gap-2 font-bold text-slate-700">
                    <span className="text-green-600">✓</span> {check}
                  </li>
                ))}
              </ul>
              </div>

          <div className="space-y-4 my-4">
          <Button className="h-auto py-8 w-full bg-green-600 hover:bg-green-700 text-white font-black rounded-xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center px-4 overflow-hidden">
            <span className="md:text-lg uppercase tracking-tight leading-tight whitespace-normal break-words text-center">
              YES! SEND ME MAGNESIUM GLYCINATE
            </span>
          </Button>
        
          <Link to="/sos-download" className="block text-slate-400 text-xs hover:underline">
            No thanks, I'll just stick with the free guide for now...
          </Link>
        </div>

            {/* Guarantee Section */}
            <div className="mt-12 border-2 border-slate-900 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 flex-shrink-0 bg-slate-900 rounded-full flex items-center justify-center text-white text-4xl">
                🛡️
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 mb-2 uppercase">My "Sleep Better or Pay Nothing" Guarantee:</h4>
                <p className="text-sm text-slate-600 italic">
                  Try Magnesium Glycinate for 30 days. If your parent doesn't sleep better, feel more relaxed, or notice their BP trending down... simply return it (even if empty) and we'll refund every naira. <span className="font-bold">You literally risk nothing.</span>
                </p>
              </div>
            </div>

            {/* Social Proof Footer */}
            <div className="mt-12 text-center pt-8 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-800">847 Lagos families have ordered in the last 30 days</p>
              <div className="flex items-center justify-center gap-1 text-yellow-500 mt-2">
                {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                <span className="text-slate-600 text-xs ml-2 font-bold">4.8/5 (312 verified reviews)</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Compliance Disclaimer */}
      <footer className="mt-20 px-4 py-10 bg-slate-100 text-[10px] text-slate-400 text-center leading-relaxed">
        <div className="max-w-3xl mx-auto">
          <p className="mb-4">
            Disclaimer: These statements have not been evaluated by NAFDAC. This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before starting any new supplement.
          </p>
          <p>© {new Date().getFullYear()} Blood Pressure Freedom Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
