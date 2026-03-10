// app/emails/day4-offer.tsx

import {
  Section,
  Text,
  Button,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./components/email-layout";

interface Day4EmailProps {
  firstName: string;
  offerUrl: string;
}

export function Day4Email({ firstName, offerUrl }: Day4EmailProps) {
  return (
    <EmailLayout preview="Your exclusive offer expires in 48 hours...">
      <Section style={content}>
        <Heading style={h1}>Here's Your Chance to Join 300+ Nigerian Families</Heading>
        
        <Text style={text}>
          {firstName},
        </Text>

        <Text style={text}>
          For the past 3 days, I've shown you:
        </Text>

        <Text style={bulletText}>✓ Mr Alex Nduka's transformation (180/110 → 128/82)</Text>
        <Text style={bulletText}>✓ The cellular science behind it</Text>
        <Text style={bulletText}>✓ Real testimonials from Lagos, Enugu, Abuja, Port Harcourt</Text>

        <Text style={text}>
          Today, I'm going to make you an offer.
        </Text>

        <Text style={text}>
          But first, let me be brutally honest with you:
        </Text>

        <Section style={honestBox}>
          <Text style={honestText}>
            <strong>SOS Advance Essential Oil Complex is NOT cheap.</strong>
            <br /><br />
            Pharmaceutical-grade essential oils processed with quantum nanotechnology for 95% 
            absorption don't come at market prices.
            <br /><br />
            A single bottle retails for ₦99,900.
            <br /><br />
            For most Nigerian families, that's a lot of money.
          </Text>
        </Section>

        <Text style={text}>
          But here's what I want you to consider:
        </Text>

        <Heading style={h2}>What's The REAL Cost of High BP?</Heading>

        <Text style={text}>
          Let's do the math together:
        </Text>

        <Section style={costBox}>
          <Text style={costText}>
            <strong>Current Monthly Costs:</strong>
          </Text>
          <Text style={costText}>
            • BP Medications (3 drugs): ₦8,500/month
            <br />
            • Doctor visits: ₦15,000 every 2-3 months = ₦5,000/month average
            <br />
            • Lab tests: ₦12,000 quarterly = ₦4,000/month average
            <br />
            <strong>Total: ₦17,500/month minimum</strong>
          </Text>
          <Hr style={smallDivider} />
          <Text style={costText}>
            <strong>Over 12 months: ₦210,000</strong>
          </Text>
          <Hr style={smallDivider} />
          <Text style={costText}>
            <strong>And that's IF nothing goes wrong.</strong>
          </Text>
          <Text style={costText}>
            One stroke episode? ₦500,000 - ₦2,000,000 in hospital bills.
            <br />
            Not to mention the suffering, disability, burden on family.
          </Text>
        </Section>

        <Text style={text}>
          Now compare that to:
        </Text>

        <Text style={text}>
          <strong>A 90-day supply of SOS Advance that could help you reduce medications, 
          lower BP naturally, and actually address the root cause.</strong>
        </Text>

        <Text style={text}>
          Suddenly ₦99,900 doesn't seem expensive. It seems like an investment.
        </Text>

        <Hr style={divider} />

        <Heading style={h2}>Here's What I'm Offering You Today</Heading>

        <Text style={text}>
          Because you downloaded the BP Freedom Guide, you qualify for our <strong>"First-Time 
          Family Discount."</strong>
        </Text>

        <Text style={text}>
          This price is ONLY available to guide downloaders. And only for the next 48 hours.
        </Text>

        {/* PRICING TABLE */}
        <Section style={pricingContainer}>
          
          {/* 2 Bottles - RECOMMENDED */}
          <Section style={pricingCardRecommended}>
            <Section style={badge}>⭐ MOST POPULAR</Section>
            
            <Heading style={packageName}>STARTER PACK</Heading>
            <Text style={packageSubtext}>2 Bottles (60-Day Supply)</Text>
            
            <Text style={oldPrice}>₦199,800</Text>
            <Heading style={newPrice}>₦179,900</Heading>
            <Text style={savings}>SAVE ₦19,900!</Text>
            
            <Hr style={cardDivider} />
            
            <Text style={benefitText}>✅ FREE Delivery Lagos</Text>
            <Text style={benefitText}>✅ Pay on Delivery</Text>
            <Text style={benefitText}>✅ 60-Day Money-Back Guarantee</Text>
            <Text style={benefitText}>✅ FREE BP Tracking Journal (₦5,000 value)</Text>
            <Text style={benefitText}>✅ WhatsApp Support Access</Text>
            
            <Section style={buttonContainer}>
              <Button style={buttonPrimary} href={offerUrl}>
                ORDER NOW - BEST VALUE
              </Button>
            </Section>
            
            <Text style={idealFor}>
              <strong>Ideal for:</strong> Getting real results in 60 days
            </Text>
          </Section>

          {/* 3 Bottles - BEST VALUE */}
          <Section style={pricingCard}>
            <Heading style={packageName}>COMPLETE CYCLE</Heading>
            <Text style={packageSubtext}>3 Bottles (90-Day Supply)</Text>
            
            <Text style={oldPrice}>₦299,700</Text>
            <Heading style={newPrice}>₦249,900</Heading>
            <Text style={savings}>SAVE ₦49,800!</Text>
            
            <Hr style={cardDivider} />
            
            <Text style={benefitText}>✅ FREE Delivery Nationwide</Text>
            <Text style={benefitText}>✅ Pay on Delivery</Text>
            <Text style={benefitText}>✅ 90-Day Money-Back Guarantee</Text>
            <Text style={benefitText}>✅ FREE BP Journal + Recipe eBook</Text>
            <Text style={benefitText}>✅ Priority WhatsApp Support</Text>
            <Text style={benefitText}>✅ FREE Monthly Check-in Calls</Text>
            
            <Section style={buttonContainer}>
              <Button style={buttonSecondary} href={offerUrl}>
                ORDER 3-BOTTLE PACK
              </Button>
            </Section>
            
            <Text style={idealFor}>
              <strong>Ideal for:</strong> Maximum transformation & lasting results
            </Text>
          </Section>

          {/* 1 Bottle - TRIAL */}
          <Section style={pricingCard}>
            <Heading style={packageName}>TRIAL PACK</Heading>
            <Text style={packageSubtext}>1 Bottle (30-Day Supply)</Text>
            
            <Text style={oldPrice}>₦99,900</Text>
            <Heading style={newPrice}>₦84,900</Heading>
            <Text style={savings}>SAVE ₦15,000!</Text>
            
            <Hr style={cardDivider} />
            
            <Text style={benefitText}>✅ FREE Delivery Lagos</Text>
            <Text style={benefitText}>✅ Pay on Delivery</Text>
            <Text style={benefitText}>✅ 30-Day Money-Back Guarantee</Text>
            
            <Section style={buttonContainer}>
              <Button style={buttonSecondary} href={offerUrl}>
                ORDER 1 BOTTLE
              </Button>
            </Section>
            
            <Text style={idealFor}>
              <strong>Ideal for:</strong> Testing if SOS works for your body
            </Text>
          </Section>

        </Section>

        <Hr style={divider} />

        <Heading style={h2}>My "Feel Better or Pay Nothing" Guarantee</Heading>

        <Section style={guaranteeBox}>
          <Text style={guaranteeText}>
            <strong>Here's my promise to you:</strong>
            <br /><br />
            Take SOS Advance for 30 days (60 days for 2+ bottles).
            <br /><br />
            If you don't notice:
          </Text>
          <Text style={guaranteeList}>• Reduced headaches and dizziness</Text>
          <Text style={guaranteeList}>• Improved energy levels</Text>
          <Text style={guaranteeList}>• Better sleep quality</Text>
          <Text style={guaranteeList}>• Trending improvement in your BP readings</Text>
          <Text style={guaranteeText}>
            <br />
            <strong>Simply return the bottles (even if empty) and I'll refund every naira.</strong>
            <br /><br />
            No questions asked. No hoops to jump through.
            <br /><br />
            You risk absolutely nothing.
          </Text>
        </Section>

        <Text style={text}>
          Why can I offer this guarantee?
        </Text>

        <Text style={text}>
          Because <strong>92% of our customers reorder.</strong>
        </Text>

        <Text style={text}>
          The product works. The results speak for themselves.
        </Text>

        <Hr style={divider} />

        <Heading style={h2}>Two Paths. One Choice.</Heading>

        <Section style={pathsBox}>
          <Section style={pathBad}>
            <Heading style={pathHeader}>Path 1: Do Nothing</Heading>
            <Text style={pathText}>
              Keep taking medications that only suppress symptoms.
              <br />
              Keep living with headaches, dizziness, and fear.
              <br />
              Keep hoping your BP magically stabilizes.
              <br />
              Keep risking stroke, heart attack, organ damage.
              <br /><br />
              In 90 days, you'll be exactly where you are now. Or worse.
            </Text>
          </Section>

          <Section style={pathGood}>
            <Heading style={pathHeader}>Path 2: Take Action Today</Heading>
            <Text style={pathText}>
              Give your body the cellular support it's been missing.
              <br />
              Work WITH your medication, not against your body.
              <br />
              See your BP readings improve week by week.
              <br />
              Reduce medications under doctor supervision.
              <br />
              Reclaim your energy, confidence, and peace of mind.
              <br /><br />
              In 90 days, your doctor will be asking what you did differently.
            </Text>
          </Section>
        </Section>

        <Text style={text}>
          The choice is yours, {firstName}.
        </Text>

        <Text style={text}>
          But I need you to understand something:
        </Text>

        <Section style={urgencyBox}>
          <Text style={urgencyText}>
            <strong>This discount expires in 48 hours.</strong>
            <br /><br />
            After that, prices return to full retail (₦99,900 per bottle).
            <br /><br />
            This "First-Time Family Discount" is a ONE-TIME offer for guide downloaders only.
            <br /><br />
            Once this email window closes, you'll never see this price again.
          </Text>
        </Section>

        <Section style={finalCtaBox}>
          <Heading style={finalCtaHeader}>
            Click Below to Order Your SOS Advance Now
          </Heading>
          <Text style={finalCtaText}>
            Choose your package, enter your delivery details, and we'll ship within 24 hours.
            <br />
            Pay when it arrives at your doorstep.
          </Text>
          <Section style={buttonContainer}>
            <Button style={buttonHuge} href={offerUrl}>
              YES! SEND MY SOS ADVANCE NOW
            </Button>
          </Section>
          <Text style={finalCtaSubtext}>
            ⏰ Offer expires in 48 hours • Limited stock available
          </Text>
        </Section>

        <Text style={signature}>
          To your health and transformation,
          <br />
          Pharm. Sam
          <br />
          Scarce Medix
        </Text>

        <Section style={psBox}>
          <Text style={psText}>
            <strong>P.S.</strong> Remember Mrs. Adeyemi? She hesitated for 3 days before ordering. 
            Later she told me: "I wish I'd started on Day 1. I wasted 72 hours I could have been 
            healing." Don't make the same mistake. Order now while the discount is still active.
          </Text>
        </Section>

        <Section style={ppsBox}>
          <Text style={ppsText}>
            <strong>P.P.S.</strong> Still have questions? Reply to this email and I'll personally 
            answer within 2 hours. Or WhatsApp us at 09161352715. We're here to help.
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  );
}

export default Day4Email;

// Styles
const content = { padding: "0 20px" };
const h1 = { color: "#DC2626", fontSize: "28px", fontWeight: "700", lineHeight: "1.3", margin: "30px 0 20px" };
const h2 = { color: "#059669", fontSize: "22px", fontWeight: "700", lineHeight: "1.3", margin: "32px 0 16px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "16px 0" };
const bulletText = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "8px 0", paddingLeft: "10px" };
const honestBox = { backgroundColor: "#FEF3C7", border: "2px solid #F59E0B", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const honestText = { color: "#92400E", fontSize: "15px", lineHeight: "24px", margin: "0" };
const costBox = { backgroundColor: "#FEE2E2", border: "2px solid #DC2626", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const costText = { color: "#7F1D1D", fontSize: "15px", lineHeight: "24px", margin: "8px 0" };
const smallDivider = { borderColor: "#DC2626", margin: "12px 0" };
const divider = { borderColor: "#E5E7EB", margin: "32px 0" };

// Pricing styles
const pricingContainer = { margin: "32px 0" };
const pricingCard = { backgroundColor: "#F9FAFB", border: "2px solid #E5E7EB", borderRadius: "12px", padding: "24px", margin: "16px 0" };
const pricingCardRecommended = { backgroundColor: "#ECFDF5", border: "4px solid #059669", borderRadius: "12px", padding: "24px", margin: "16px 0", position: "relative" as const };
const badge = { backgroundColor: "#F59E0B", color: "#FFFFFF", fontSize: "12px", fontWeight: "700", padding: "6px 12px", borderRadius: "20px", textAlign: "center" as const, marginBottom: "12px" };
const packageName = { color: "#1F2937", fontSize: "20px", fontWeight: "700", margin: "8px 0" };
const packageSubtext = { color: "#6B7280", fontSize: "14px", margin: "4px 0 16px 0" };
const oldPrice = { color: "#9CA3AF", fontSize: "16px", textDecoration: "line-through", margin: "0" };
const newPrice = { color: "#059669", fontSize: "36px", fontWeight: "700", margin: "8px 0" };
const savings = { color: "#DC2626", fontSize: "16px", fontWeight: "700", margin: "4px 0 16px 0" };
const cardDivider = { borderColor: "#E5E7EB", margin: "16px 0" };
const benefitText = { color: "#374151", fontSize: "14px", lineHeight: "20px", margin: "6px 0" };
const buttonContainer = { textAlign: "center" as const, margin: "20px 0" };
const buttonPrimary = { backgroundColor: "#059669", color: "#FFFFFF", fontSize: "16px", fontWeight: "700", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", display: "inline-block" };
const buttonSecondary = { backgroundColor: "#2563EB", color: "#FFFFFF", fontSize: "16px", fontWeight: "700", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", display: "inline-block" };
const idealFor = { color: "#6B7280", fontSize: "13px", textAlign: "center" as const, fontStyle: "italic", margin: "12px 0 0 0" };

// Guarantee styles
const guaranteeBox = { backgroundColor: "#DBEAFE", border: "2px solid #3B82F6", borderRadius: "8px", padding: "24px", margin: "24px 0" };
const guaranteeText = { color: "#1E3A8A", fontSize: "15px", lineHeight: "24px", margin: "8px 0" };
const guaranteeList = { color: "#1E40AF", fontSize: "14px", lineHeight: "22px", margin: "6px 0", paddingLeft: "10px" };

// Paths styles
const pathsBox = { margin: "24px 0" };
const pathBad = { backgroundColor: "#FEE2E2", border: "2px solid #DC2626", borderRadius: "8px", padding: "20px", margin: "12px 0" };
const pathGood = { backgroundColor: "#ECFDF5", border: "2px solid #059669", borderRadius: "8px", padding: "20px", margin: "12px 0" };
const pathHeader = { color: "#1F2937", fontSize: "18px", fontWeight: "700", margin: "0 0 12px 0" };
const pathText = { color: "#374151", fontSize: "14px", lineHeight: "22px", margin: "0" };

// Urgency styles
const urgencyBox = { backgroundColor: "#FEF3C7", border: "3px solid #F59E0B", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const urgencyText = { color: "#92400E", fontSize: "16px", lineHeight: "24px", margin: "0", textAlign: "center" as const };

// Final CTA styles
const finalCtaBox = { backgroundColor: "#1F2937", borderRadius: "12px", padding: "32px 24px", margin: "32px 0", textAlign: "center" as const };
const finalCtaHeader = { color: "#FFFFFF", fontSize: "24px", fontWeight: "700", margin: "0 0 16px 0" };
const finalCtaText = { color: "#D1D5DB", fontSize: "15px", lineHeight: "22px", margin: "0 0 24px 0" };
const buttonHuge = { backgroundColor: "#F59E0B", color: "#FFFFFF", fontSize: "18px", fontWeight: "700", padding: "18px 48px", borderRadius: "8px", textDecoration: "none", display: "inline-block" };
const finalCtaSubtext = { color: "#9CA3AF", fontSize: "13px", margin: "16px 0 0 0" };

const signature = { ...text, marginTop: "32px", fontStyle: "italic" };
const psBox = { backgroundColor: "#ECFDF5", border: "2px solid #059669", borderRadius: "8px", padding: "16px", margin: "24px 0" };
const psText = { color: "#065F46", fontSize: "14px", margin: "0" };
const ppsBox = { backgroundColor: "#EFF6FF", border: "2px solid #3B82F6", borderRadius: "8px", padding: "16px", margin: "16px 0" };
const ppsText = { color: "#1E40AF", fontSize: "14px", margin: "0" };