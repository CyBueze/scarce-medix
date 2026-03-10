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
        ebookUrl: 'https://scarcemedix.com.ng/files/bp-guide.pdf', // Your actual ebook URL
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