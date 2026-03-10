import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Link, Form, useActionData, redirect, useNavigation, type ActionFunctionArgs } from "react-router";
import { Resend } from 'resend';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // 1. Send the Email to yourself
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>', // Use your verified domain here later
      to: ['scarcemedix@gmail.com'],
      subject: `New Order: ₦${data.package === '1_bottle' ? '18,900' : '37,800'} from ${data.fullName}`,
      html: `
        <h1>New Order Received</h1>
        <p><strong>Customer:</strong> ${data.fullName}</p>
        <p><strong>Phone:</strong> ${data.phoneNumber}</p>
        <p><strong>Package:</strong> ${data.package}</p>
        <p><strong>Location:</strong> ${data.city}, ${data.state}</p>
        <p><strong>Address:</strong> ${data.address}</p>
      `,
    });
  } catch (error) {
    console.error("Email failed:", error);
  }

  // 2. Build the WhatsApp redirect URL
  const message = `Hello, I just placed an order for the BP Support Kit (Magnesium Glycinate):\n\n` +
                  `*Name:* ${data.fullName}\n` +
                  `*Package:* ${data.package}\n` +
                  `*Phone:* ${data.phoneNumber}\n` +
                  `*Address:* ${data.address}, ${data.city}, ${data.state}`;
  
  const whatsappUrl = `https://wa.me/2349161352715?text=${encodeURIComponent(message)}`;

  return redirect(whatsappUrl);
}

export default function Sostyp() {
  const actionData = useActionData<{ error?: Record<string, string[]> }>();
  const [timeLeft, setTimeLeft] = useState(900);
  const [selectedPackage, setSelectedPackage] = useState("2_bottles");

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
  
  const navigation = useNavigation();
  
  // This is true from the moment the user clicks until the redirect happens
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Top Urgency Bar */}
      <div className="bg-red-600 text-white py-2 text-center px-4 sticky top-0 z-50 shadow-md">
        <p className="text-xs sm:text-sm font-bold animate-pulse">
          ⚠️ SPECIAL DISCOUNT EXPIRES IN: {formatTime(timeLeft)}
        </p>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-8 md:pt-12 overflow-x-hidden">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 px-2 leading-tight">
            Success! Your BP Guide is on its way to your email.
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

        {/* Digital Value Stack */}
        <div className="mt-12 bg-white rounded-3xl border-2 border-slate-900 overflow-hidden shadow-xl">
          <div className="bg-slate-900 py-4 px-4 text-center">
            <h3 className="text-white font-bold text-lg">THE BP FREEDOM TOTAL BUNDLE</h3>
          </div>
          <div className="p-6 md:p-8 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-slate-700 font-medium">✅ 60-Day Supply Magnesium Glycinate</span>
                <span className="font-bold text-slate-900">₦18,900</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-green-600 font-bold">🎁 BONUS 1: Nigerian BP Food Table (PDF)</span>
                <span className="text-slate-400 line-through text-xs">₦5,000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-green-600 font-bold">🎁 BONUS 2: 30-Day BP Tracking Journal</span>
                <span className="text-slate-400 line-through text-xs">₦3,500</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-green-600 font-bold">🎁 BONUS 3: Fast-Action Delivery</span>
                <span className="text-slate-400 font-bold text-xs uppercase">FREE</span>
              </div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-2xl text-center border-2 border-dashed border-yellow-400">
              <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Total Value: <span className="line-through">₦27,400</span></p>
              <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter">ONLY ₦18,900</p>
              <p className="text-red-600 font-bold text-sm mt-1 animate-bounce">You save ₦8,500 today!</p>
            </div>
          </div>
        </div>

        {/* Serious Warning Box */}
        <div className="mt-10 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🚫</span>
            <div>
              <h4 className="text-red-900 font-bold text-lg mb-1 tracking-tight">ATTENTION: SERIOUS BUYERS ONLY</h4>
              <p className="text-red-800 text-sm leading-relaxed font-medium">
                Please <span className="font-black">ONLY</span> fill this form if you have the cash ready and will be available to receive your order within <span className="underline">24 to 72 hours</span>. We spend significantly on logistics to offer <span className="font-bold">Free Delivery</span>—please help us serve you better by being ready.
              </p>
            </div>
          </div>
        </div>

            {/* ORDER FORM */}
            <div id="order-form" className="mt-10">
              <Form method="post" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-slate-900 uppercase">Delivery Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="fullName" required className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-green-600 outline-none transition-all autofill:shadow-[inset_0_0_0_1000px_white] [&-webkit-autofill]:shadow-[inset_0_0_0_1000px_white]" placeholder="Full Name" />
                    <input name="phoneNumber" type="tel" required className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-green-600 outline-none transition-all" placeholder="Phone Number" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="state" required className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-green-600 outline-none transition-all" placeholder="State" />
                    <input name="city" required className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-green-600 outline-none transition-all" placeholder="City" />
                  </div>
                  <textarea name="address" required rows={2} className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-green-600 outline-none transition-all" placeholder="Full Delivery Address"></textarea>
                </div>

                {/* FIXED PACKAGE SELECTION */}
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-600 uppercase">Select Your Bundle:</p>
                  <div className="grid gap-3">
                    <label className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedPackage === '1_bottle' ? 'border-green-600 bg-green-50' : 'border-slate-200 bg-white'}`}>
                      <input 
                        type="radio" 
                        name="package" 
                        value="1_bottle" 
                        className="mr-4 h-5 w-5 accent-green-600"
                        checked={selectedPackage === '1_bottle'}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                      />
                      <div className="flex-1">
                        <p className="font-black text-slate-900 uppercase">1 Bottle Bundle</p>
                        <p className="text-xs text-slate-500 italic">+ All Digital Bonuses</p>
                      </div>
                      <p className="font-black text-xl text-slate-900">₦18,900</p>
                    </label>

                    <label className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedPackage === '2_bottles' ? 'border-green-600 bg-green-50' : 'border-slate-200 bg-white'}`}>
                      <input 
                        type="radio" 
                        name="package" 
                        value="2_bottles" 
                        className="mr-4 h-5 w-5 accent-green-600"
                        checked={selectedPackage === '2_bottles'}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                      />
                      <div className="flex-1">
                        <p className="font-black text-slate-900 uppercase">2 Bottles Bundle</p>
                        <p className="text-xs text-slate-500 italic">Recommended for Results</p>
                      </div>
                      <p className="font-black text-xl text-slate-900">₦37,800</p>
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting} // Prevents multiple orders/emails
                  className="w-full h-auto py-6 bg-green-600 disabled:bg-slate-400"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      <p>Processing Your Order...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <p>Confirm Order - Pay on Delivery</p>
                      <span className="text-[10px] font-medium opacity-90 mt-1">
                        Free Nationwide Shipping Included
                      </span>
                    </div>
                  )}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </main>

            {/* Compliance Disclaimer */}
      <footer className="mt-20 px-4 py-12 bg-slate-100 text-[10px] text-slate-400 text-center leading-relaxed">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <p className="uppercase font-bold tracking-[0.2em] text-slate-500">Platform Compliance</p>
            <p className="max-w-3xl mx-auto">
              This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc. This site is not a part of the TikTok website or ByteDance Ltd. Additionally, This site is NOT endorsed by TikTok in any way. TIKTOK is a trademark of ByteDance Ltd.
            </p>
          </div>
          <p className="border-t border-slate-200 pt-6 max-w-2xl mx-auto">
            Disclaimer: These statements have not been evaluated by NAFDAC. This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person.
          </p>
          <p className="font-bold text-slate-500 pt-2 tracking-wide uppercase">
            © {new Date().getFullYear()} Blood Pressure Freedom Project – scarcemedix.com.ng – All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}