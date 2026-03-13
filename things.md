import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Form, useActionData, redirect, useNavigation, type ActionFunctionArgs } from "react-router";
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
  const [selectedPackage, setSelectedPackage] = useState("2-bottles");
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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

  // Product image URL (from UploadThing)
  const productImageUrl = "https://utfs.io/f/YOUR_UPLOADTHING_FILE_ID"; // Replace with actual URL

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-scarce-green-100 overflow-x-hidden">
      {/* SECTION 1: HERO - MOBILE OPTIMIZED */}
      <section className="bg-gradient-to-br from-blue-50 to-scarce-green-50 pt-10 pb-16 px-4 sm:px-6 md:px-10">
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

          <div className="space-y-4">
            <a href="#order-now" className="block">
              <Button className="w-full sm:w-auto h-auto py-4 sm:py-5 md:py-8 px-6 md:px-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-base sm:text-lg md:text-2xl rounded-2xl shadow-xl transition-all active:scale-95">
                YES! SEND ME SOS ADVANCE →
              </Button>
            </a>

            <p className="text-xs sm:text-sm font-bold text-red-600 flex items-center justify-center sm:justify-start gap-2">
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
      <section className="py-12 px-4 sm:px-6 md:py-20">
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
                "Expensive imported supplements (₦45,000/bottle – finished it, no change)",
                '"Reduce salt, reduce stress" — impossible when you\'re Nigerian!',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-red-500 font-bold text-xl flex-shrink-0">✕</span>
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

      {/* SECTION 3: EMPATHY - MOBILE OPTIMIZED */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6">
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
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10 leading-tight">
            The Truth About Why Your BP Won't Stay Down (Even With Medication)
          </h2>
          
          <img
            src="https://gr7ahin3tm.ufs.sh/f/gr7iLvdI7Oq19KKDRO4vwaP2xK1RjEb