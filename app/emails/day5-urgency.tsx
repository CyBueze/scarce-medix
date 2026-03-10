// app/emails/day5-urgency.tsx

import {
  Section,
  Text,
  Button,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./components/email-layout";

interface Day5EmailProps {
  firstName: string;
  offerUrl: string;
}

export function Day5Email({ firstName, offerUrl }: Day5EmailProps) {
  return (
    <EmailLayout preview="Last chance - Offer expires at midnight tonight">
      <Section style={content}>
        
        {/* Urgent Header */}
        <Section style={urgentHeader}>
          <Heading style={urgentTitle}>⚠️ FINAL NOTICE: OFFER EXPIRES TONIGHT ⚠️</Heading>
          <Text style={urgentSubtext}>
            Your "First-Time Family Discount" closes at 11:59 PM today
          </Text>
        </Section>

        <Text style={text}>
          {firstName},
        </Text>

        <Text style={text}>
          This is my last email to you about SOS Advance.
        </Text>

        <Text style={text}>
          In a few hours, your exclusive discount disappears forever.
        </Text>

        <Text style={text}>
          After midnight tonight:
        </Text>

        <Section style={afterBox}>
          <Text style={afterText}>
            ✗ The ₦179,900 two-bottle price becomes ₦199,800 (+₦19,900)
            <br />
            ✗ The ₦249,900 three-bottle price becomes ₦299,700 (+₦49,800)
            <br />
            ✗ The FREE bonuses (BP Journal, Recipe eBook) are removed
            <br />
            ✗ You'll never see this "guide downloader" offer again
          </Text>
        </Section>

        <Text style={text}>
          I'm not saying this to pressure you.
        </Text>

        <Text style={text}>
          I'm saying it because <strong>it's true.</strong>
        </Text>

        <Text style={text}>
          This discount was only for people who downloaded the BP Freedom Guide. A thank-you 
          for taking action.
        </Text>

        <Text style={text}>
          But the offer window closes tonight.
        </Text>

        <Hr style={divider} />

        <Heading style={h2}>Let Me Be Honest With You One Last Time</Heading>

        <Text style={text}>
          You have three options right now:
        </Text>

        <Section style={optionsBox}>
          <Section style={option}>
            <Heading style={optionHeader}>Option 1: Do Nothing</Heading>
            <Text style={optionText}>
              Close this email. Let the discount expire.
              <br /><br />
              In 90 days, your BP will likely be the same (or worse). Your medications will 
              be the same. Your fear will be the same.
              <br /><br />
              And you'll wonder: <em>"What if I had tried?"</em>
            </Text>
          </Section>

          <Section style={option}>
            <Heading style={optionHeader}>Option 2: "I'll Order Later"</Heading>
            <Text style={optionText}>
              Wait until next week or next month when you "have more time to think."
              <br /><br />
              Problem: The discount will be gone. You'll pay ₦50,000 more for the same product.
              <br /><br />
              Plus you've lost 30-60 days where you could have been healing.
            </Text>
          </Section>

          <Section style={optionGood}>
            <Heading style={optionHeaderGood}>Option 3: Take Action RIGHT NOW</Heading>
            <Text style={optionTextGood}>
              Order your SOS Advance in the next few hours.
              <br /><br />
              Lock in the ₦179,900 price (save ₦19,900). Get the free bonuses. Start supporting 
              your BP at the cellular level.
              <br /><br />
              In 30 days, you notice headaches reducing, energy returning.
              <br />
              In 60 days, your BP readings are trending down.
              <br />
              In 90 days, your doctor is asking what you did differently.
              <br /><br />
              <strong>This is the path 300+ Nigerian families chose. And they're celebrating 
              their results right now.</strong>
            </Text>
          </Section>
        </Section>

        <Hr style={divider} />

        <Heading style={h2}>Remember These Stories?</Heading>

        <Section style={quickTestimonial}>
          <Text style={quickTestimonialText}>
            <strong>Mr Alex Nduka:</strong> 180/110 → 128/82 in 90 days. Off 2 medications.
          </Text>
        </Section>

        <Section style={quickTestimonial}>
          <Text style={quickTestimonialText}>
            <strong>Mrs. Adeyemi:</strong> 170/100 → 135/85 in 8 weeks. Looks "10 years younger."
          </Text>
        </Section>

        <Section style={quickTestimonial}>
          <Text style={quickTestimonialText}>
            <strong>Elder Okonkwo:</strong> 185/115 → 140/88. No more ringing in ears. Sleeps peacefully.
          </Text>
        </Section>

        <Section style={quickTestimonial}>
          <Text style={quickTestimonialText}>
            <strong>Chief Adebayo:</strong> From 4 medications to 1. Swims twice a week at 71 years old.
          </Text>
        </Section>

        <Text style={text}>
          Every single one of them started exactly where you are right now.
        </Text>

        <Text style={text}>
          Skeptical. Uncertain. Afraid of wasting money.
        </Text>

        <Text style={text}>
          But they took the leap. And today, they're living proof that cellular support works.
        </Text>

        <Hr style={divider} />

        <Heading style={h2}>Here's What Happens When You Order Tonight</Heading>

        <Section style={processBox}>
          <Text style={processText}>
            <strong>Step 1:</strong> Click the button below, choose your package (we recommend 2-bottle starter pack)
          </Text>
          <Text style={processText}>
            <strong>Step 2:</strong> Enter your name, phone, and delivery address
          </Text>
          <Text style={processText}>
            <strong>Step 3:</strong> We process and ship within 24 hours (1-3 days delivery)
          </Text>
          <Text style={processText}>
            <strong>Step 4:</strong> Inspect the package when it arrives. Pay the delivery person only if satisfied.
          </Text>
          <Text style={processText}>
            <strong>Step 5:</strong> Start taking 2 capsules daily with food. Watch your BP transform.
          </Text>
        </Section>

        <Section style={reminderBox}>
          <Text style={reminderText}>
            <strong>REMINDER:</strong> You have our 60-day money-back guarantee. If you don't see 
            results, we refund every naira. No risk. No questions asked.
          </Text>
        </Section>

        <Hr style={divider} />

        <Section style={finalFinalCta}>
          <Heading style={finalFinalHeader}>
            This Is It. Your Last Chance.
          </Heading>
          
          <Text style={finalFinalText}>
            I've given you the science. I've shown you the testimonials. I've removed all the risk.
            <br /><br />
            The only question left is: <strong>Are you ready to take action?</strong>
            <br /><br />
            If the answer is yes, click below NOW before this offer disappears forever.
          </Text>

          <Section style={buttonContainer}>
            <Button style={buttonMassive} href={offerUrl}>
              🔥 YES! LOCK IN MY DISCOUNT NOW 🔥
            </Button>
          </Section>

          <Text style={timerText}>
            ⏰ <strong>OFFER EXPIRES AT MIDNIGHT TONIGHT</strong> ⏰
            <br />
            Don't let this opportunity slip away.
          </Text>
        </Section>

        <Hr style={divider} />

        <Text style={text}>
          {firstName}, I can't make the decision for you.
        </Text>

        <Text style={text}>
          But I can tell you this:
        </Text>

        <Section style={finalQuoteBox}>
          <Text style={finalQuoteText}>
            <em>"I wish I had started this 5 years ago. Would have saved so much suffering."</em>
            <br />
            - Elder Chukwu, 68
          </Text>
        </Section>

        <Section style={finalQuoteBox}>
          <Text style={finalQuoteText}>
            <em>"My only regret? Not getting 6 bottles from the start."</em>
            <br />
            - Mama Shade, 61
          </Text>
        </Section>

        <Section style={finalQuoteBox}>
          <Text style={finalQuoteText}>
            <em>"This is the peace my family prayed for."</em>
            <br />
            - Baba Tunde, 67
          </Text>
        </Section>

        <Text style={text}>
          Don't be the person who looks back in 6 months with regret.
        </Text>

        <Text style={text}>
          Be the person who took action today.
        </Text>

        <Section style={lastButtonContainer}>
          <Button style={lastButton} href={offerUrl}>
            ORDER MY SOS ADVANCE NOW
          </Button>
        </Section>

        <Text style={signature}>
          To your health, your transformation, and your peace of mind,
          <br />
          Pharm Sam
          <br />
          Scarce Medix
        </Text>

        <Section style={finalPsBox}>
          <Text style={finalPsText}>
            <strong>P.S.</strong> After tonight, this offer is GONE. If you email me next week asking 
            for the discount, I won't be able to help you. The system closes automatically at midnight. 
            Don't miss out.
          </Text>
        </Section>

        <Section style={finalPpsBox}>
          <Text style={finalPpsText}>
            <strong>P.P.S.</strong> Still have questions? Reply NOW and I'll personally call you within 
            the hour to answer everything. But don't wait — time is running out.
          </Text>
        </Section>

      </Section>
    </EmailLayout>
  );
}

export default Day5Email;

// Styles
const content = { padding: "0 20px" };
const urgentHeader = { backgroundColor: "#DC2626", padding: "24px", borderRadius: "8px", margin: "20px 0", textAlign: "center" as const };
const urgentTitle = { color: "#FFFFFF", fontSize: "24px", fontWeight: "700", margin: "0 0 8px 0" };
const urgentSubtext = { color: "#FEE2E2", fontSize: "14px", margin: "0" };
const h2 = { color: "#1F2937", fontSize: "22px", fontWeight: "700", lineHeight: "1.3", margin: "32px 0 16px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "16px 0" };
const afterBox = { backgroundColor: "#FEE2E2", border: "2px solid #DC2626", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const afterText = { color: "#7F1D1D", fontSize: "15px", lineHeight: "26px", margin: "0" };
const divider = { borderColor: "#E5E7EB", margin: "32px 0" };

// Options styles
const optionsBox = { margin: "24px 0" };
const option = { backgroundColor: "#F3F4F6", border: "2px solid #D1D5DB", borderRadius: "8px", padding: "20px", margin: "12px 0" };
const optionGood = { backgroundColor: "#ECFDF5", border: "3px solid #059669", borderRadius: "8px", padding: "20px", margin: "12px 0" };
const optionHeader = { color: "#6B7280", fontSize: "18px", fontWeight: "700", margin: "0 0 12px 0" };
const optionHeaderGood = { color: "#059669", fontSize: "18px", fontWeight: "700", margin: "0 0 12px 0" };
const optionText = { color: "#4B5563", fontSize: "14px", lineHeight: "22px", margin: "0" };
const optionTextGood = { color: "#065F46", fontSize: "14px", lineHeight: "22px", margin: "0" };

// Quick testimonial styles
const quickTestimonial = { backgroundColor: "#EFF6FF", borderLeft: "4px solid #3B82F6", padding: "12px 16px", margin: "10px 0" };
const quickTestimonialText = { color: "#1E40AF", fontSize: "14px", margin: "0" };

// Process styles
const processBox = { backgroundColor: "#DBEAFE", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const processText = { color: "#1E3A8A", fontSize: "15px", lineHeight: "24px", margin: "10px 0" };

// Reminder styles
const reminderBox = { backgroundColor: "#FEF3C7", border: "2px solid #F59E0B", borderRadius: "8px", padding: "16px", margin: "24px 0" };
const reminderText = { color: "#92400E", fontSize: "15px", margin: "0", textAlign: "center" as const };

// Final CTA styles
const finalFinalCta = { backgroundColor: "#1F2937", padding: "32px 24px", borderRadius: "12px", margin: "32px 0", textAlign: "center" as const };
const finalFinalHeader = { color: "#FFFFFF", fontSize: "28px", fontWeight: "700", margin: "0 0 16px 0" };
const finalFinalText = { color: "#D1D5DB", fontSize: "16px", lineHeight: "24px", margin: "0 0 24px 0" };
const buttonContainer = { textAlign: "center" as const, margin: "24px 0" };
const buttonMassive = { backgroundColor: "#F59E0B", color: "#000000", fontSize: "20px", fontWeight: "700", padding: "20px 60px", borderRadius: "8px", textDecoration: "none", display: "inline-block", textTransform: "uppercase" as const };
const timerText = { color: "#FCA5A5", fontSize: "14px", margin: "16px 0 0 0", fontWeight: "700" };

// Final quote styles
const finalQuoteBox = { backgroundColor: "#F9FAFB", borderLeft: "4px solid #6B7280", padding: "12px 16px", margin: "12px 0" };
const finalQuoteText = { color: "#4B5563", fontSize: "15px", margin: "0", fontStyle: "italic" };

// Last button
const lastButtonContainer = { textAlign: "center" as const, margin: "32px 0" };
const lastButton = { backgroundColor: "#DC2626", color: "#FFFFFF", fontSize: "18px", fontWeight: "700", padding: "18px 48px", borderRadius: "8px", textDecoration: "none", display: "inline-block" };

const signature = { ...text, marginTop: "32px", fontStyle: "italic" };
const finalPsBox = { backgroundColor: "#FEE2E2", border: "2px solid #DC2626", borderRadius: "8px", padding: "16px", margin: "24px 0" };
const finalPsText = { color: "#7F1D1D", fontSize: "14px", margin: "0" };
const finalPpsBox = { backgroundColor: "#DBEAFE", border: "2px solid #3B82F6", borderRadius: "8px", padding: "16px", margin: "16px 0" };
const finalPpsText = { color: "#1E40AF", fontSize: "14px", margin: "0" };