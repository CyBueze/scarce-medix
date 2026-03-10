This is my squeeze page that I built using react router 7

// app/routes/sqsos.tsx

import { Button } from "~/components/ui/button"
import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router";
import { z } from "zod";
import { Resend } from "resend";
import { WelcomeEmail } from "~/emails/welcome";
import { Day1Email } from "~/emails/day1-story";
import { Day2Email } from "~/emails/day2-science";
import { Day3Email } from "~/emails/day3-social-proof";
import { Day4Email } from "~/emails/day4-offer";
import { Day5Email } from "~/emails/day5-urgency";

const LeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email"),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const email = formData.get("email");

  const result = LeadSchema.safeParse({
    firstName,
    email,
  });

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Create contact
    const contactResponse = await resend.contacts.create({
      email: result.data.email,
      firstName: result.data.firstName,
      unsubscribed: false,
    });

    if (contactResponse.error) {
      throw new Error(contactResponse.error.message);
    }

    // 2. Add to segment
    const segmentResponse = await resend.contacts.segments.add({
      email: result.data.email,
      segmentId: process.env.SOS_SEGMENT_ID!,
    });

    if (segmentResponse.error) {
      throw new Error(segmentResponse.error.message);
    }

    // 3. Calculate Nigerian evening send times (7:30 PM WAT)
    const getNextSendTime = (daysFromNow: number) => {
      const now = new Date();
      const sendDate = new Date(now);
      sendDate.setDate(now.getDate() + daysFromNow);
      
      // Set to 7:30 PM WAT (West Africa Time = UTC+1)
      sendDate.setUTCHours(18, 30, 0, 0); // 18:30 UTC = 19:30 WAT (7:30 PM)
      
      return sendDate.toISOString();
    };

    // 4. SEND WELCOME EMAIL IMMEDIATELY
    const welcomeResponse = await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>',
      to: result.data.email,
      subject: '✅ Your BP Freedom Guide is Ready!',
      react: WelcomeEmail({
        firstName: result.data.firstName,
        ebookUrl: 'https://yld4fagxsx.ufs.sh/f/IO0V5ia4o8wkzmcvKMTLpHqJ48O1x9LN0lXoFP3VaSmdhDiA', // Your actual ebook URL
      }),
    });

    if (welcomeResponse.error) {
      console.error("Welcome email failed:", welcomeResponse.error);
    }

    // 5. SCHEDULE DAY 1-5 EMAILS (All at 7:30 PM WAT)

    // DAY 1: Tomorrow at 7:30 PM
    await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>',
      to: result.data.email,
      subject: 'His Doctor Said: "Stroke Is Coming Any Day Now"',
      react: Day1Email({ firstName: result.data.firstName }),
      scheduledAt: getNextSendTime(1),
    });

    // DAY 2: Day after tomorrow at 7:30 PM
    await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>',
      to: result.data.email,
      subject: 'Why Your BP Medication Isn\'t Enough (The Science)',
      react: Day2Email({ firstName: result.data.firstName }),
      scheduledAt: getNextSendTime(2),
    });

    // DAY 3: 3 days from now at 7:30 PM
    await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>',
      to: result.data.email,
      subject: '"I Thought You Were Lying... Until I Saw My Own Results"',
      react: Day3Email({ firstName: result.data.firstName }),
      scheduledAt: getNextSendTime(3),
    });

    // DAY 4: 4 days from now at 7:30 PM
    await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>',
      to: result.data.email,
      subject: 'Your Exclusive Offer Expires in 48 Hours...',
      react: Day4Email({ 
        firstName: result.data.firstName,
        offerUrl: 'https://scarcemedix.com.ng/order-sos-advance',
      }),
      scheduledAt: getNextSendTime(4),
    });

    // DAY 5: 5 days from now at 7:30 PM
    await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>',
      to: result.data.email,
      subject: '⚠️ FINAL NOTICE: Offer Expires Tonight',
      react: Day5Email({ 
        firstName: result.data.firstName,
        offerUrl: 'https://scarcemedix.com.ng/order-sos-advance',
      }),
      scheduledAt: getNextSendTime(5),
    });

    console.log(`✅ Email sequence scheduled for ${result.data.email}`);
    
    return redirect("/sostyp");
    
  } catch (error) {
    console.error("❌ Resend error:", error);
    return {
      error: { 
        general: [`Failed: ${error instanceof Error ? error.message : 'Unknown error'}`] 
      },
    };
  }
}

// ... rest of your component code stays the same

export default function Sqsos() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-green-600 text-white py-3 text-center px-4 sticky top-0 z-50 shadow-sm">
        <p className="text-xs sm:text-sm md:text-base font-semibold">
          ⚡ FREE DOWNLOAD: Limited Time Only - Grab Your Copy Now!
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left Column - Visuals & Social Proof */}
          <section className="flex flex-col items-center md:items-start space-y-8">
            
            {/* Ebook Cover Mockup */}
            <div className="relative">
              <div className="w-52 h-64 sm:w-64 sm:h-80 md:w-72 md:h-96 bg-gradient-to-br from-green-600 to-blue-700 rounded-lg shadow-2xl relative z-0">
                <div className="p-5 sm:p-8 text-white h-full flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-green-200 mb-2 tracking-wider">FREE GUIDE</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3">
                      The BP Freedom Guide for Nigerian Seniors
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-green-100 italic">
                      5 Things Your Doctor Never Told You About Supporting Healthy Blood Pressure After 50
                    </p>
                  </div>
                  <div className="border-t border-white/30 pt-3">
                    <p className="text-[10px] sm:text-xs text-green-200">Plus: The Ancient Oil Secret Used by 300+ Lagos Families</p>
                  </div>
                </div>
              </div>

              {/* Responsive Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-red-500 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-xl z-10 border-2 border-white">
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold leading-none">FREE</div>
                  <div className="text-[10px] md:text-xs font-medium">₦0</div>
                </div>
              </div>
            </div>

            {/* Social Proof Box */}
            <div className="w-full max-w-md bg-white rounded-xl p-5 shadow-sm border border-green-100">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-gray-400">
                      User
                    </div>
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-gray-900">847+ Downloads</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-tight">In the last 30 days across Nigeria</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-700 font-bold">4.9/5 Rating</span>
              </div>
            </div>

            {/* Trust Badges - Improved Wrapping */}
            <div className="flex flex-wrap justify-center md:justify-start gap-y-3 gap-x-5 text-xs text-gray-600">
              {[
                { icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", label: "Instant Download" },
                { icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", label: "100% Free" },
                { icon: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z", label: "No Spam" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white/50 px-2 py-1 rounded-full border border-gray-100">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d={badge.icon} />
                  </svg>
                  <span className="font-semibold whitespace-nowrap">{badge.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column - Form & Benefits */}
          <section className="space-y-6">
            <div className="text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Download Your <span className="text-green-600">FREE Guide</span> Now
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Discover how <span className="font-bold underline decoration-green-300 underline-offset-4">300+ Lagos families</span> are supporting healthy blood pressure naturally.
              </p>
            </div>

            {/* Benefits List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                Inside This FREE Guide:
              </h2>
              <ul className="space-y-4">
                {[
                  "Why BP medication alone isn't enough",
                  "The cellular energy secret doctors omit",
                  "5 simple steps you can start TODAY",
                  "The ancient oil breakthrough for seniors",
                  "Real results: 180/110 → 128/82 in 90 days"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-0.5">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lead Form Container */}
            <div className="bg-gradient-to-br from-green-600 to-blue-700 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Get Instant Access
                  </h3>
                  <p className="text-green-100 text-xs sm:text-sm">
                    Enter your details and we'll send it to your inbox immediately
                  </p>
                </div>

                <Form method="post" className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-white font-semibold text-xs sm:text-sm ml-1">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      required
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all text-sm sm:text-base"
                    />
                    {actionData?.error?.firstName && (
                      <p className="text-yellow-300 text-[11px] font-bold px-1 uppercase tracking-wider">
                        ⚠️ {actionData.error.firstName[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-semibold text-xs sm:text-sm ml-1">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all text-sm sm:text-base"
                    />
                    {actionData?.error?.email && (
                      <p className="text-yellow-300 text-[11px] font-bold px-1 uppercase tracking-wider">
                        ⚠️ {actionData.error.email[0]}
                      </p>
                    )}
                  </div>

                  {actionData?.error?.general && (
                    <div className="bg-red-500/20 border border-red-400 rounded-xl p-3 text-center">
                      <p className="text-red-100 text-xs font-medium">
                        {actionData.error.general[0]}
                      </p>
                    </div>
                  )}

                  <Button 
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-sm sm:text-base tracking-tight py-6 sm:py-7 rounded-xl shadow-lg transition-transform active:scale-95 uppercase"
                  >
                    📥 Send My Free Guide Now
                  </Button>

                  <div className="flex items-center justify-center gap-2 opacity-80">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" /></svg>
                    <p className="text-white text-[10px] text-center">
                      Safe & Secure. No Spam. Unsubscribe anytime.
                    </p>
                  </div>
                </Form>
              </div>
            </div>

            {/* Urgency Alert */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4">
              <div className="flex gap-3">
                <span className="text-lg">⏳</span>
                <p className="text-amber-900 text-xs sm:text-sm font-medium leading-snug">
                  <span className="font-bold">Limited Availability:</span> We are providing this guide for free for a short window to help the community. Download today before the offer ends.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            Helping Nigerian families maintain healthy lifestyles through research-backed natural alternatives.
          </p>
         
 <div className="text-[10px] text-gray-400 uppercase tracking-widest">
            This Site Is Not A Part Of The Facebook Website Or Facebook Inc. Additionally, This Site Is Not Endorsed By Facebook In Any Way. FACEBOOK Is A Trademark Of FACEBOOK, Inc. © 2026 –  scarcemedix.com.ng – All Right Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

Now, we are upselling with this thank you page but it isn't complete yet. We want to add a form (using react hook form like above) to get the details like name, state, city, phone number that can be easily reached, etc.

We also want to let them know that only serious people that have their money at hand and are available to pick the product in 24hrs - 72hrs should fill the form.

Delivery is free.

I dunno if you can also try making an offer (but don't go below our price as stated below). Help me complete the page. Everything prior to this is perfect. Also add that Facebook and Tiktok disclaimer at the end.

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