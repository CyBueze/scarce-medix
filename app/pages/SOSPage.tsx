import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {sendTikTokEvent} from "~/utils/tiktok-events.server"
import { Form, useActionData, type ActionFunctionArgs, redirect, useNavigation } from "react-router";
import { z } from "zod";
import { Resend } from 'resend';

// Form validation schema
const OrderSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter your complete delivery address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  package: z.enum(["1-bottle", "2-bottles", "3-bottles"]),
});

// Action to handle form submission
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const result = OrderSchema.safeParse({
    fullName: formData.get("fullName"),
    phoneNumber: formData.get("phoneNumber"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    package: formData.get("package"),
  });

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  // Get package details
  const packageDetails = {
    "1-bottle": { name: "1 Bottle (30-Day Supply)", price: "₦69,500" },
    "2-bottles": { name: "2 Bottles (60-Day Supply)", price: "₦129,900" },
    "3-bottles": { name: "3 Bottles (90-Day Supply)", price: "₦189,900" },
  };

  const selectedPackage = packageDetails[data.package];

  // 1. Send Email to yourself
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Scarce Medix <contact@mg.scarcemedix.com.ng>',
      to: ['scarcemedix@gmail.com'],
      subject: `🔥 NEW SOS ADVANCE ORDER: ${selectedPackage.price} from ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="background: linear-gradient(to right, #059669, #2563EB); color: white; padding: 20px; border-radius: 8px;">
            New SOS Advance Order Received!
          </h1>
          
          <div style="padding: 20px; background: #f9fafb; border-radius: 8px; margin-top: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Customer Details:</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Package:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${selectedPackage.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Price:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: bold; font-size: 18px;">${selectedPackage.price}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>City:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.city}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>State:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.state}</td>
              </tr>
              <tr>
                <td style="padding: 10px;"><strong>Address:</strong></td>
                <td style="padding: 10px;">${data.address}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0; color: #92400e; font-weight: bold;">
              ⚡ URGENT: Process this order within 2 hours!
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Email failed:", error);
    // Don't block the order if email fails
  }
  
  // Send Tiktok event on order
  
  try{
  const packagePrices = {
  "1-bottle": 69500,
  "2-bottles": 129900,
  "3-bottles": 189900,
};

await sendTikTokEvent({
  event: "InitiateCheckout",
  user: {
    phone: data.phoneNumber,
    ip: request.headers.get("x-forwarded-for") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
  },
  properties: {
    value: packagePrices[data.package],
    currency: "NGN",
    content_id: data.package,
    content_name: selectedPackage.name,
  },
});
}catch (error) {
  console.error("TikTok event failed:", error);
  // Don't block the order
}

  // 2. Build WhatsApp redirect URL
  const message = `🔥 *NEW SOS ADVANCE ORDER*\n\n` +
                  `*Customer:* ${data.fullName}\n` +
                  `*Phone:* ${data.phoneNumber}\n` +
                  `*Package:* ${selectedPackage.name}\n` +
                  `*Price:* ${selectedPackage.price}\n` +
                  `*Location:* ${data.city}, ${data.state}\n` +
                  `*Address:* ${data.address}\n\n` +
                  `_Please process this order ASAP!_`;
  
  const whatsappUrl = `https://wa.me/2349161352715?text=${encodeURIComponent(message)}`;

  return redirect(whatsappUrl);
}

export default function SOSPage() {
  const [timeLeft, setTimeLeft] = useState(900);
  const actionData = useActionData<typeof action>();

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

  // Add product image URL here (from UploadThing)
  const productImageUrl = "https://yld4fagxsx.ufs.sh/f/IO0V5ia4o8wkVesz8l59dr0Mhba3TL18Eo6VYepIXiZqWmQl"; // Replace with actual URL
  
  const navigation = useNavigation();
  
  // This is true from the moment the user clicks until the redirect happens
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-scarce-green-100">
      {/* SECTION 1: HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-scarce-green-50 pt-10 pb-16 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
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
            <a href="#order-now">
              <Button className="w-full md:w-auto h-auto py-5 md:py-8 px-6 md:px-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-lg md:text-2xl rounded-2xl shadow-xl transition-transform active:scale-95 whitespace-normal">
                YES! SEND ME SOS ADVANCE →
              </Button>
            </a>

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

      {/* SECTION 2: THE STORY */}
      <section className="py-12 px-5 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
            "The Doctor Said My Heart Was a Ticking Time Bomb..."
          </h2>

          <div className="prose prose-slate lg:prose-lg text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg font-bold text-blue-800">
              My name is Mr. Alex Nduka. I'm 67, retired Maths teacher from
              Surulere, Lagos.
            </p>

            <p>
              For 12 years, I lived in constant fear. Every morning, I'd wake up
              with pounding headaches. My vision blurred when I stood up too
              fast. Some nights, my heart raced so hard I thought "this is it – stroke don come."
            </p>

            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-2xl text-center">
              <p className="text-sm uppercase font-bold text-red-500 mb-1">My BP Reading Was:</p>
              <p className="text-5xl md:text-7xl font-black text-red-600">180/110</p>
              <p className="text-xs font-bold text-red-400 mt-2">DANGEROUSLY HIGH</p>
            </div>

            <p className="text-lg font-semibold">
              I was on <span className="text-red-600">3 different medications</span>. ₦8,500 every month.
            </p>

            <p>
              Side effects? Weak legs. Always tired. No energy to play with my grandchildren. 
              My wife stopped allowing me to drive. My children took turns "checking on Papa" 
              like I was already half-gone.
            </p>

            <h3 className="text-xl font-bold pt-4">I tried everything Nigerians try:</h3>
            <ul className="grid gap-3 list-none p-0">
              {[
                "Bitter leaf soaked in gin (tasted like punishment, did nothing)",
                "Scent leaf and garlic morning tea (BP dropped 10 points, then bounced back)",
                "Expensive imported supplements (₦15,000 bottle – finished it, no change)",
                '"Reduce salt, reduce stress" — impossible when you\'re Nigerian!',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-red-500 font-bold text-xl">✕</span>
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
              <p className="text-lg font-semibold text-blue-900 mb-3">
                Then my younger brother (a pharmacist in Port Harcourt) told me something shocking:
              </p>
              <p className="text-blue-800 italic">
                "Alex, your body needs more than just drugs suppressing symptoms. You need 
                <strong> cellular support</strong> — something to repair the damage, not just mask it."
              </p>
            </div>

            <p className="text-lg font-bold">
              He gave me 3 bottles of something called <span className="text-scarce-green-700">SOS Advance Essential Oil Complex.</span>
            </p>

            <p>
              Not medication. Not agbo. Not some random supplement. This was <strong>8 clinically-studied 
              essential oils</strong> processed with quantum nanotechnology for 95% absorption.
            </p>

            <p>I was skeptical. But desperate.</p>
          </div>

          {/* TIMELINE */}
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-black text-center uppercase tracking-tight text-scarce-green-800">
              My 90-Day Transformation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { w: "Week 2", t: "Morning headaches reduced by half", d: "I noticed this first" },
                 { w: "Week 4", t: "BP: 160/95 → 155/92", d: "Trending down significantly" },
                 { w: "Week 8", t: "142/88 - Doctor shocked!", d: "He reduced one of my medications" },
               ].map((item, i) => (
                 <div key={i} className="bg-white border-2 border-gray-200 p-5 rounded-xl shadow-sm">
                    <span className="text-[10px] font-bold bg-scarce-green-100 text-scarce-green-800 px-2 py-1 rounded mb-2 inline-block uppercase">{item.w}</span>
                    <p className="text-lg font-bold text-gray-900 mb-1">{item.t}</p>
                    <p className="text-xs text-gray-600">{item.d}</p>
                 </div>
               ))}
               <div className="md:col-span-2 bg-gradient-to-br from-scarce-green-600 to-blue-600 p-8 rounded-2xl text-white shadow-xl text-center">
                  <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded mb-3 inline-block uppercase">Week 12 Result</span>
                  <p className="text-6xl font-black mb-2">128/82</p>
                  <p className="text-lg font-semibold mb-2">Steady. For the first time in 12 years.</p>
                  <p className="text-sm opacity-90">My grandchildren now call me "Young Papa"</p>
               </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mt-8">
              <p className="text-gray-900 font-semibold">
                Today – 6 months later – I'm on just ONE medication (low dose), my BP averages 
                <span className="text-scarce-green-700 font-bold"> 125/80</span>, and I feel like I did 15 years ago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EMPATHY */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 text-center">
            I Know You've Been Suffering in Silence
          </h2>

          <div className="relative mb-8">
            <img
              src="https://gr7ahin3tm.ufs.sh/f/gr7iLvdI7Oq1UHjWlvTQHPRs1z3jOJMwqhESoCD0xaWu9db4"
              alt="Nigerian senior checking blood pressure"
              className="rounded-2xl w-full aspect-[16/9] object-cover shadow-xl"
            />
          </div>

          <div className="space-y-4 text-base md:text-lg text-gray-700">
            <p>You've sat in that clinic waiting room too many times.</p>
            
            <p>
              Watched the nurse pump that cuff around your arm, seen her face change when she reads 
              the numbers, heard her say "Hmm... doctor go see you."
            </p>

            <p className="font-semibold text-gray-900">
              Every time your phone rings and it's family, your heart jumps: 
              <span className="text-red-600 italic"> "Wetin happen? Who collapse?"</span>
            </p>

            <p>You can't enjoy jollof rice at parties – too much fear of salt.</p>
            
            <p>You can't get angry when NEPA takes light for the 5th time today – "BP go shoot up."</p>

            <p className="font-semibold">
              You wake up with headaches. Dizzy when you stand. Tired by 11am. Fear grips you during 
              every argument, every stress, every traffic jam on Third Mainland Bridge.
            </p>

            <div className="bg-white border-2 border-red-200 p-6 rounded-xl mt-8">
              <p className="text-lg font-bold text-red-700 mb-3">And the medications?</p>
              <p className="text-gray-700">
                They work... somewhat. But the side effects drain you. And deep down, you know they're 
                managing symptoms, not fixing the root problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE TRUTH */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10 leading-tight">
            The Truth About Why Your BP Won't Stay Down (Even With Medication)
          </h2>
          
          <img
            src="https://gr7ahin3tm.ufs.sh/f/gr7iLvdI7Oq19KKDRO4vwaP2xK1RjEbqtSonudG5VQy6YmkI"
            alt="Blood pressure and arterial health"
            className="w-full rounded-3xl shadow-2xl mb-10 border border-gray-100"
          />

          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              Your doctor gives you pills that force your blood vessels to relax or reduce fluid. 
              That helps the numbers.
            </p>

            <p className="text-lg font-semibold text-gray-900">
              But here's what's really happening inside your body:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Chronic Inflammation",
                  desc: "From stress, fried foods, poor sleep, toxins. This inflames your artery walls, making them stiff and narrow.",
                  color: "red"
                },
                {
                  title: "2. Oxidative Stress",
                  desc: "Free radicals attack your blood vessel lining, creating plaque buildup and reducing flexibility.",
                  color: "orange"
                },
                {
                  title: "3. Mitochondrial Decline",
                  desc: "Your heart cells lose energy to pump efficiently. Your vessels lose strength to dilate properly.",
                  color: "yellow"
                }
              ].map((item, i) => (
                <div key={i} className={`bg-${item.color}-50 border-2 border-${item.color}-200 p-6 rounded-xl`}>
                  <h3 className={`text-lg font-bold text-${item.color}-900 mb-3`}>{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mt-8">
              <p className="text-lg font-bold text-yellow-900 mb-2">
                Standard BP medication addresses symptoms (force vessels open, reduce fluid).
              </p>
              <p className="text-yellow-800">
                But it doesn't address inflammation, oxidative damage, or cellular energy.
              </p>
            </div>

            <p className="text-xl md:text-2xl font-bold text-center text-blue-700 py-6">
              Your body needs repair at the cellular level – not just symptom suppression.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRODUCT INTRODUCTION */}
      <section className="bg-gradient-to-br from-scarce-green-50 to-blue-50 py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              Introducing: SOS Advance Essential Oil Complex
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The first Nigerian-formulated essential oil blend specifically designed for cardiovascular 
              cellular support in aging adults
            </p>
          </div>

          {/* PRODUCT IMAGE - Replace with your UploadThing URL */}
          <div className="max-w-2xl mx-auto mb-12">
            <img
              src={productImageUrl}
              alt="SOS Advance Essential Oil Complex - 60 Capsules"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              The 8 Clinically-Studied Essential Oils Inside:
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Black Seed Oil", benefit: "23+ clinical trials for BP support" },
                { name: "Neem Oil", benefit: "Protects heart tissue & arterial flexibility" },
                { name: "Oregano Oil", benefit: "Supports vascular relaxation" },
                { name: "Frankincense Oil", benefit: "Reduces arterial inflammation" },
                { name: "Clove Oil", benefit: "Supports healthy circulation" },
                { name: "Cinnamon Bark Oil", benefit: "Helps maintain healthy blood sugar" },
                { name: "Peppermint Oil", benefit: "Relaxes smooth muscles in vessels" },
                { name: "Cayenne Extract", benefit: "Improves peripheral blood flow" }
              ].map((oil, i) => (
                <div key={i} className="flex items-start gap-3 bg-scarce-green-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 text-scarce-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-scarce-green-900">{oil.name}</p>
                    <p className="text-sm text-gray-600">{oil.benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-xl mt-10 text-center">
              <h4 className="text-2xl font-bold text-yellow-300 mb-4 uppercase tracking-wide">
                Quantum Nanotechnology Processing
              </h4>
              <p className="text-lg mb-4">
                Most essential oils have poor absorption – your stomach acid destroys them before 
                they reach your bloodstream.
              </p>
              <p className="text-xl font-bold text-yellow-300">
                SOS Advance uses quantum electromagnetic processing to break essential oils into 
                nano-sized particles (1/1000th normal size).
              </p>
              <p className="text-3xl font-black text-yellow-300 mt-4">
                Up to 95% Absorption Rate
              </p>
              <p className="text-sm opacity-90 mt-2">vs. 10-15% for regular essential oils</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
            Real Nigerians, Real Results
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            This solution has helped 300+ Nigerian families support their heart health
          </p>

          <div className="space-y-8">
            {[
              {
                quote: "BP Dropped From 170/100 to 135/85 in 8 Weeks – Doctor Was Shocked",
                story: "I'm 58. Owned a printing press in Ikeja for 30 years. Stress killed my BP. Was on 3 medications, still hitting 170/100 most days. Started SOS Advance. First month, not much. But week 6, my home monitor showed 145/90. Week 8: 135/85. Now I take 1 medication instead of 3. Energy came back full force.",
                name: "Mrs. Adeyemi",
                location: "Ikeja, Lagos (Age 58)"
              },
              {
                quote: "No More Fear of Stroke – Finally Sleeping at Night Again",
                story: "As a retired civil servant, my pension small. My BP was 185/115 – doctor said 'stroke dey wait for you.' I was living in fear. By bottle 2, the constant ringing in my ears stopped. Now steady around 140/88. But the real gift? I SLEEP at night. No more fear.",
                name: "Elder Okonkwo",
                location: "Enugu (Age 65)"
              },
              {
                quote: "Both of Us Take It – Our Doctor Called It a 'Miracle'",
                story: "Both of us had high BP. Me 160/95, husband 175/105. We're both overweight, stressed running business in Aba. We started SOS Advance together. 12 weeks: My BP 138/86. His 148/92. Doctor called it 'remarkable improvement for both of you.'",
                name: "Mr. & Mrs. Nwankwo",
                location: "Aba, Abia State (Ages 54 & 52)"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-scarce-green-50 to-blue-50 p-8 rounded-xl shadow-lg border-2 border-scarce-green-200">
                <h3 className="text-xl md:text-2xl font-bold text-scarce-green-700 mb-4">
                  "{testimonial.quote}"
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 italic">
                  "{testimonial.story}"
                </p>
                <div className="border-t-2 border-scarce-green-200 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 text-white p-8 rounded-xl mt-10">
            <h3 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
              From Our Customer Feedback:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { stat: "87%", desc: "report improved BP readings within 60 days" },
                { stat: "92%", desc: "report reduced morning headaches/dizziness" },
                { stat: "78%", desc: "able to reduce medications (under doctor supervision)" },
                { stat: "94%", desc: "report increased daily energy and reduced fatigue" }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg backdrop-blur">
                  <p className="text-4xl font-black text-yellow-300">{item.stat}</p>
                  <p className="text-white text-sm mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-6 opacity-80">
              Based on 312 customer survey responses, Jan 2024-Jan 2025
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
            How SOS Advance Supports Your Cardiovascular System
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "❤️",
                title: "Blood Pressure Balance",
                desc: "Anti-inflammatory compounds calm arterial inflammation; antioxidants protect vessel lining",
                color: "blue"
              },
              {
                icon: "💪",
                title: "Heart Muscle Strength",
                desc: "Mitochondrial support increases ATP energy in heart cells; cardiac tissue becomes more resilient",
                color: "scarce-green"
              },
              {
                icon: "🔄",
                title: "Circulation Enhancement",
                desc: "Improved endothelial function and reduced plaque = better blood flow to brain, kidneys, extremities",
                color: "purple"
              },
              {
                icon: "📊",
                title: "Cholesterol Support",
                desc: "Several oils (especially Black Seed, Neem) support healthy cholesterol ratios naturally",
                color: "red"
              },
              {
                icon: "🛡️",
                title: "Inflammation Reduction",
                desc: "Essential oils are nature's most powerful anti-inflammatories for cardiovascular disease",
                color: "yellow"
              },
              {
                icon: "⚡",
                title: "Cellular Energy Boost",
                desc: "Every cell gets better energy production. You FEEL this as improved stamina and mental clarity",
                color: "indigo"
              }
            ].map((benefit, i) => (
              <div key={i} className={`bg-${benefit.color}-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-${benefit.color}-100`}>
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className={`text-xl font-bold text-${benefit.color}-700 mb-3`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING & OFFER */}
      <section id="order-now" className="py-16 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 text-center">
            Choose Your Package
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Start supporting your cardiovascular health today with our pharmaceutical-grade essential oil complex
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 1 BOTTLE */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Trial Pack</h3>
              <p className="text-sm text-gray-600 mb-4">1 Bottle (60 Capsules)</p>
              <p className="text-base text-gray-500 mb-6">30-Day Supply</p>
              
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900">₦69,500</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>FREE Delivery Lagos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>Pay on Delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>30-Day Money-Back Guarantee</span>
                </li>
              </ul>
              
              <p className="text-xs text-gray-500 italic text-center">
                Good for: Testing if SOS works for your body
              </p>
            </div>

            {/* 2 BOTTLES - RECOMMENDED */}
            <div className="bg-gradient-to-br from-scarce-green-50 to-blue-50 border-4 border-scarce-green-500 rounded-2xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-6 py-2 rounded-full text-sm shadow-lg">
                  ⭐ MOST POPULAR
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-scarce-green-700 mb-2 mt-4">Starter Pack</h3>
              <p className="text-sm text-gray-700 mb-4 font-semibold">2 Bottles (120 Capsules)</p>
              <p className="text-base text-gray-600 mb-6">60-Day Supply</p>
              
              <div className="mb-2">
                <p className="text-gray-400 line-through text-xl">₦139,000</p>
                <p className="text-5xl font-bold text-scarce-green-700">₦129,900</p>
              </div>
              <p className="text-lg font-bold text-red-600 mb-6">SAVE ₦9,100!</p>
              
              <ul className="space-y-3 mb-8 text-sm text-gray-800 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-600 text-lg">✅</span>
                  <span>FREE Delivery Nationwide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-600 text-lg">✅</span>
                  <span>Pay on Delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-600 text-lg">✅</span>
                  <span>60-Day Money-Back Guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-600 text-lg">✅</span>
                  <span>FREE BP Tracking Journal</span>
                </li>
              </ul>
              
              <p className="text-sm text-gray-700 font-medium text-center">
                Complete 60-day cycle for lasting results
              </p>
            </div>

            {/* 3 BOTTLES - BEST VALUE */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Cycle</h3>
              <p className="text-sm text-gray-600 mb-4">3 Bottles (180 Capsules)</p>
              <p className="text-base text-gray-500 mb-6">90-Day Supply</p>
              
              <div className="mb-2">
                <p className="text-gray-400 line-through text-xl">₦208,500</p>
                <p className="text-4xl font-bold text-blue-700">₦189,900</p>
              </div>
              <p className="text-lg font-bold text-red-600 mb-6">SAVE ₦18,600!</p>
              
              <ul className="space-y-3 mb-8 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>FREE Delivery Nationwide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>Pay on Delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>90-Day Money-Back Guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>FREE BP Journal + Recipe eBook</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-scarce-green-500">✅</span>
                  <span>Priority Support</span>
                </li>
              </ul>
              
              <p className="text-xs text-gray-500 italic text-center">
                Maximum transformation & best value
              </p>
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              "Pharmaceutical-Grade Processing",
              "30-Day Satisfaction Guarantee",
              "Over 2,500 Bottles Sold",
              "Secure Payment Options"
            ].map((badge, i) => (
              <div key={i} className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-sm font-semibold text-blue-900">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: GUARANTEE */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <div className="text-center">
              <p className="text-white font-bold text-3xl">30</p>
              <p className="text-white text-xs font-semibold">DAY</p>
              <p className="text-white text-xs font-semibold">GUARANTEE</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our "Feel Better or Pay Nothing" Guarantee
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Take SOS Advance consistently for 30 days. If you don't notice:
            </p>

            <ul className="space-y-2 mb-6 text-left max-w-md mx-auto">
              {[
                "Reduced headaches/dizziness",
                "Improved energy levels",
                "Better sleep quality",
                "OR trending improvement in your BP readings"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-scarce-green-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-xl font-bold text-scarce-green-700 mb-4">
              Simply return the bottles (even if empty) and we'll refund every naira.
            </p>

            <p className="text-gray-600">
              No questions. No wahala. You risk nothing. Your heart gains everything.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: ORDER FORM */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-scarce-green-600 to-blue-700 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Order Your SOS Advance Now
            </h2>
            <p className="text-scarce-green-100 text-center mb-8">
              Fill in your details below and we'll process your order immediately
            </p>

            {/* SERIOUS BUYER WARNING */}
            <div className="bg-yellow-400 border-4 border-yellow-600 rounded-xl p-6 mb-8">
              <p className="text-gray-900 font-bold text-center text-sm md:text-base leading-relaxed">
                ⚠️ <span className="uppercase">Important:</span> Only place an order if you are a SERIOUS BUYER 
                who has your cash ready and will be available at your location within 24-72 hours for delivery. 
                We have limited stock and cannot afford time-wasters. Thank you for understanding.
              </p>
            </div>

            {actionData?.success ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-scarce-green-700 mb-4">
                  Order Received Successfully!
                </h3>
                <p className="text-gray-700 mb-6">
                  Thank you {actionData.order.fullName}! We'll call you within 2 hours to confirm your order 
                  and arrange delivery to {actionData.order.city}, {actionData.order.state}.
                </p>
                <p className="text-sm text-gray-600">
                  Delivery: 1-3 business days. Payment: Cash on delivery.
                </p>
              </div>
            ) : (
              <Form method="post" className="space-y-6">
                {/* Package Selection */}
                <div>
                  <label className="block text-white font-bold mb-3 text-sm">
                    Select Your Package *
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: "1-bottle", label: "1 Bottle - ₦69,500", desc: "30-Day Supply" },
                      { value: "2-bottles", label: "2 Bottles - ₦129,900", desc: "60-Day Supply (SAVE ₦9,100)", recommended: true },
                      { value: "3-bottles", label: "3 Bottles - ₦189,900", desc: "90-Day Supply (SAVE ₦18,600)" }
                    ].map((pkg) => (
                      <label key={pkg.value} className={`flex items-start p-4 rounded-lg cursor-pointer transition-all ${
                        pkg.recommended 
                          ? 'bg-yellow-400 border-4 border-yellow-600' 
                          : 'bg-white/10 border-2 border-white/20 hover:bg-white/20'
                      }`}>
                        <input
                          type="radio"
                          name="package"
                          value={pkg.value}
                          defaultChecked={pkg.recommended}
                          className="mt-1 mr-3"
                          required
                        />
                        <div className="flex-1">
                          <div className={`font-bold ${pkg.recommended ? 'text-gray-900' : 'text-white'}`}>
                            {pkg.label}
                            {pkg.recommended && <span className="ml-2 text-xs bg-red-600 text-white px-2 py-1 rounded">RECOMMENDED</span>}
                          </div>
                          <div className={`text-sm ${pkg.recommended ? 'text-gray-700' : 'text-white/80'}`}>
                            {pkg.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {actionData?.error?.package && (
                    <p className="text-yellow-300 text-sm mt-2">⚠️ {actionData.error.package[0]}</p>
                  )}
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all"
                    />
                    {actionData?.error?.fullName && (
                      <p className="text-yellow-300 text-sm mt-2">⚠️ {actionData.error.fullName[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      placeholder="080XXXXXXXX"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all"
                    />
                    {actionData?.error?.phoneNumber && (
                      <p className="text-yellow-300 text-sm mt-2">⚠️ {actionData.error.phoneNumber[0]}</p>
                    )}
                  </div>
                </div>


                {/* Delivery Information */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm">Complete Delivery Address *</label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    placeholder="Enter street address, house number, landmark"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all resize-none"
                  />
                  {actionData?.error?.address && (
                    <p className="text-yellow-300 text-sm mt-2">⚠️ {actionData.error.address[0]}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Ikeja, Surulere"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all"
                    />
                    {actionData?.error?.city && (
                      <p className="text-yellow-300 text-sm mt-2">⚠️ {actionData.error.city[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      placeholder="e.g. Lagos"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all"
                    />
                    {actionData?.error?.state && (
                      <p className="text-yellow-300 text-sm mt-2">⚠️ {actionData.error.state[0]}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black py-7  rounded-lg shadow-lg transition-all"
                >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                      <p>Processing Your Order...</p>
                    </div>
                  ) : (
                     <div className="flex flex-col items-center">
                      <p className="text-sm">🔥 PROCESS MY ORDER NOW <br/>- Pay on Delivery</p>
                      <span className="text-[10px] font-medium opacity-90 mt-1">
                        Free Nationwide Shipping Included
                      </span>
                    </div>
                    )}
              
                </Button>

                <p className="text-white/80 text-xs text-center">
                  🔒 Your information is 100% secure. We'll call to confirm your order within 2 hours.
                </p>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section className="bg-gradient-to-br from-red-600 to-orange-600 py-20 px-5 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Heart Has Carried You This Far. Now Give It What It Needs to Keep Going.
          </h2>

          <p className="text-lg md:text-xl mb-4 leading-relaxed">
            You've raised children. Built a career. Survived Nigeria's challenges.
          </p>

          <p className="text-xl md:text-2xl font-semibold mb-8">
            You deserve to enjoy your golden years - not spend them in fear.
          </p>

          <p className="text-2xl md:text-3xl font-bold text-yellow-300 my-8">
            Feel the energy return. Watch your BP stabilize. Sleep without fear.
          </p>

          <a href="#order-now">
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold text-2xl md:text-3xl px-16 py-8 rounded-full shadow-2xl transition-all hover:scale-110">
              ORDER MY SOS ADVANCE NOW
            </Button>
          </a>

          <p className="text-sm mt-8 opacity-90">
            ⏰ Limited stock available • Free delivery • 30-day guarantee
          </p>
        </div>
      </section>

      {/* FOOTER - Facebook Compliance */}
      <footer className="bg-gray-900 text-white py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="text-sm text-gray-400 leading-relaxed">
              <p className="mb-4">
                <strong>Medical Disclaimer:</strong> SOS Advance is a food supplement, not a medication. 
                It supports cardiovascular health but does not replace medical treatment. Always consult 
                your doctor before starting any supplement, especially if on medication. Individual results 
                vary. Testimonials are personal experiences and not medical claims.
              </p>

              <p className="mb-4">
                <strong>Results Disclaimer:</strong> The testimonials and examples used are exceptional 
                results and don't apply to the average purchaser. Your results may vary based on your 
                individual circumstances, effort, and other factors. No guarantees are made that you will 
                achieve these results.
              </p>

              <div className="border-t border-gray-700 pt-6 mt-6">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  FACEBOOK DISCLAIMER
                </p>
                <p className="mt-2 text-xs leading-relaxed">
                  This site is not a part of the Facebook website or Facebook Inc. Additionally, this site 
                  is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-6 mt-6">
                <p className="text-xs">
                  © 2026 Scarce Medix. All Rights Reserved.
                </p>
                <p className="text-xs mt-2">
                  Contact: contact@scarcemedix.com.ng | Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}