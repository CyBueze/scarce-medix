import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function SOSPage() {
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-scarce-green-100">
      {/* SECTION 1: HERO - Fixed Spacing for Mobile */}
      <section className="bg-gradient-to-br from-blue-50 to-scarce-green-50 pt-10 pb-16 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Mobile-friendly tag */}
          <div className="inline-block bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 animate-pulse">
            ⚠️ Urgent Health Update for Nigerians 50+
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
            How a 67-Year-Old Retired Teacher in Surulere Avoided Stroke and Got
            Off 3 BP Medications in 90 Days
          </h1>

          <p className="text-lg md:text-2xl text-gray-700 font-medium leading-snug mb-6">
            Finally – Steady Blood Pressure, No More Morning Headaches,
            Dizziness or Fear... <span className="text-scarce-green-700 underline decoration-scarce-green-300">Without Harsh Side Effects.</span>
          </p>

          <div className="space-y-6">
            <Button className="w-full md:w-auto h-auto py-5 md:py-8 px-6 md:px-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-lg md:text-2xl rounded-2xl shadow-xl transition-transform active:scale-95 whitespace-normal">
              YES! SEND ME SOS ADVANCE →
            </Button>

            <p className="text-sm font-bold text-red-600 flex items-center justify-center md:justify-start gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              OFFER EXPIRES IN: {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE STORY - Fixed Column Spacing */}
      <section className="py-12 px-5 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
            "The Doctor Said My Heart Was a Ticking Time Bomb..."
          </h2>

          <div className="prose prose-slate lg:prose-lg text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg font-bold text-blue-800">
              My name is Mr Alex Nduka. I'm 67, retired Maths teacher from
              Surulere, Lagos.
            </p>

            <p>
              For 12 years, I lived in constant fear. Every morning, I'd wake up
              with pounding headaches. My vision blurred when I stood up too
              fast.
            </p>

            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-2xl text-center">
              <p className="text-sm uppercase font-bold text-red-500 mb-1">My BP Reading Was:</p>
              <p className="text-5xl md:text-7xl font-black text-red-600">180/110</p>
              <p className="text-xs font-bold text-red-400 mt-2">DANGEROUSLY HIGH</p>
            </div>

            <h3 className="text-xl font-bold pt-4">I tried everything Nigerians try:</h3>
            <ul className="grid gap-3 list-none p-0">
              {[
                "Bitter leaf soaked in gin",
                "Scent leaf and garlic morning tea",
                "Expensive imported supplements (₦45k/bottle)",
                '"Reduce salt, reduce stress" — Impossible!',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-red-500 font-bold">✕</span>
                  <span className="text-sm md:text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TIMELINE - Mobile Optimized Cards */}
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-black text-center uppercase tracking-tight text-scarce-green-800">
              My 90-Day Transformation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { w: "Week 2", t: "Headaches GONE", d: "Waking up feeling light" },
                 { w: "Week 4", t: "155/92", d: "Trending down significantly" },
                 { w: "Week 8", t: "142/88", d: "Doctor reduced my dosage" },
               ].map((item, i) => (
                 <div key={i} className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded mb-2 inline-block uppercase">{item.w}</span>
                    <p className="text-lg font-bold text-gray-900">{item.t}</p>
                    <p className="text-xs text-gray-500">{item.d}</p>
                 </div>
               ))}
               <div className="md:col-span-2 bg-scarce-green-600 p-6 rounded-2xl text-white shadow-lg text-center">
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded mb-2 inline-block uppercase">Week 12 Result</span>
                  <p className="text-5xl font-black">128/82</p>
                  <p className="text-sm opacity-90">"Young Papa" is back!</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE EMOTIONAL HIT */}
      <section className="bg-slate-900 text-white py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">Stop Suffering in Silence</h2>
          
          <div className="relative mb-8 group">
            <img
              src="https://gr7ahin3tm.ufs.sh/f/gr7iLvdI7Oq1UHjWlvTQHPRs1z3jOJMwqhESoCD0xaWu9db4"
              alt="Emotional health"
              className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>

          <p className="text-lg md:text-xl italic text-gray-300 leading-relaxed">
            "Every time your phone rings and it's family, your heart jumps: <span className="text-red-400 font-bold underline">Wetin happen? Who collapse?</span>"
          </p>
        </div>
      </section>

      {/* SECTION 4: SCIENCE - Clean & Medical */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10 leading-tight">
            The Truth About Why Your BP Won't Stay Down
          </h2>
          
          
          <img
            src="https://gr7ahin3tm.ufs.sh/f/gr7iLvdI7Oq19KKDRO4vwaP2xK1RjEbqtSonudG5VQy6YmkI"
            alt="Arterial health diagram"
            className="w-full rounded-3xl shadow-2xl mb-10 border border-gray-100"
          />

          <div className="bg-blue-50 p-6 md:p-10 rounded-3xl border border-blue-100">
             <p className="text-base md:text-xl text-blue-900 leading-relaxed">
               Your doctor gives you pills that force your blood vessels to relax. That helps the numbers. <strong>But it's a bandage.</strong> 
               <br /><br />
               SOS Advance Essential Oil Complex works on <strong>Arterial Elasticity</strong>—helping your blood vessels naturally pump blood without the heart working 10x harder.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}