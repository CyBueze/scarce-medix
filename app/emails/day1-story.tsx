// app/emails/day1-story.tsx

import {
  Section,
  Text,
  Button,
  Heading,
} from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./components/email-layout";

interface Day1EmailProps {
  firstName: string;
}

export function Day1Email({ firstName }: Day1EmailProps) {
  return (
    <EmailLayout preview="The doctor said his heart was a ticking time bomb...">
      <Section style={content}>
        <Heading style={h1}>His Doctor Said: "Stroke Is Coming Any Day Now"</Heading>
        
        <Text style={text}>
          {firstName},
        </Text>

        <Text style={text}>
          Yesterday I told you about Alex Nduka.
        </Text>

        <Text style={text}>
          67 years old. Retired teacher from Surulere.
        </Text>

        <Text style={text}>
          For 12 years, his BP was a nightmare: <strong style={highlight}>180/110.</strong>
        </Text>

        <Text style={text}>
          His doctor's exact words? <em>"Your heart is a ticking time bomb. Stroke go come any day."</em>
        </Text>

        <Text style={text}>
          He was on 3 different medications. ₦8,500 every month.
        </Text>

        <Text style={text}>
          Side effects? Brutal. Weak legs. Constant fatigue. Couldn't play with his grandchildren.
        </Text>

        <Text style={text}>
          His wife stopped letting him drive. His children took turns "checking on Papa" like he was 
          already half-gone.
        </Text>

        <Section style={calloutBox}>
          <Text style={calloutText}>
            Every single headache, he thought: <strong>"This is it. Stroke don come."</strong>
          </Text>
        </Section>

        <Text style={text}>
          Sound familiar?
        </Text>

        <Text style={text}>
          Maybe you're living this right now. Or your parent is.
        </Text>

        <Text style={text}>
          Here's what nobody tells you about high BP in Nigeria...
        </Text>

        <Heading style={h2}>The Medication Trap</Heading>

        <Text style={text}>
          Your BP drugs work by <strong>forcing</strong> your blood vessels to relax. Or by 
          <strong> reducing</strong> fluid in your body.
        </Text>

        <Text style={text}>
          That brings the numbers down. Temporarily.
        </Text>

        <Text style={text}>
          But here's the problem:
        </Text>

        <Text style={text}>
          <strong>Medication doesn't fix the ROOT cause.</strong>
        </Text>

        <Text style={text}>
          It doesn't address:
        </Text>

        <Text style={bulletText}>• The inflammation destroying your artery walls</Text>
        <Text style={bulletText}>• The oxidative stress aging your cardiovascular system</Text>
        <Text style={bulletText}>• The cellular energy loss making your heart struggle</Text>

        <Text style={text}>
          That's why your BP stays borderline. Why you still feel tired. Why your doctor keeps 
          adding more pills.
        </Text>

        <Text style={text}>
          <strong>You're managing symptoms. Not healing your body.</strong>
        </Text>

        <Heading style={h2}>So What Changed For Mr Nduka?</Heading>

        <Text style={text}>
          His younger brother (a pharmacist in Port Harcourt) told him something shocking:
        </Text>

        <Section style={quoteBox}>
          <Text style={quoteText}>
            "Mallam, your body needs more than drugs suppressing symptoms. You need 
            <strong> cellular support</strong> — something to repair the damage, not just mask it."
          </Text>
        </Section>

        <Text style={text}>
          He gave Mallam 3 bottles of something called <strong>SOS Advance Essential Oil Complex.</strong>
        </Text>

        <Text style={text}>
          Not medication. Not agbo. Not some random supplement.
        </Text>

        <Text style={text}>
          This was <strong>8 clinically-studied essential oils</strong> processed with quantum 
          nanotechnology for 95% absorption (vs. 10-15% for regular oils).
        </Text>

        <Text style={text}>
          Mallam was skeptical. But desperate.
        </Text>

        <Text style={text}>
          <strong>Week 2:</strong> Morning headaches cut in half.
        </Text>

        <Text style={text}>
          <strong>Week 4:</strong> BP readings dropping: 160/95... 155/92...
        </Text>

        <Text style={text}>
          <strong>Week 8:</strong> 142/88. Doctor was shocked. Reduced one medication.
        </Text>

        <Text style={text}>
          <strong>Week 12:</strong> <span style={bigNumber}>128/82.</span> Steady. 
          For the first time in 12 years.
        </Text>

        <Text style={text}>
          Today?
        </Text>

        <Text style={text}>
          He's on just ONE medication (low dose). Walks 30 minutes daily. Drove himself to Ibadan 
          last month. His grandchildren call him "Young Papa."
        </Text>

        <Section style={ctaBox}>
          <Text style={ctaText}>
            Tomorrow, I'll show you <strong>exactly</strong> how SOS Advance works at the cellular level 
            (the science your doctor doesn't talk about).
          </Text>
          <Text style={ctaText}>
            And why over 300 Lagos families are using this alongside their medication for results 
            their doctors can't explain.
          </Text>
        </Section>

        <Text style={signature}>
          To your health,
          <br />
          Pharm Sam
        </Text>

        <Section style={psBox}>
          <Text style={psText}>
            <strong>P.S.</strong> If Mr Nduka's story sounds impossible, wait till you read 
            Mrs. Adeyemi's tomorrow. She went from 170/100 to 135/85 in 8 weeks. At 58 years old. 
            Her doctor called it "remarkable."
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  );
}

export default Day1Email;

// Styles
const content = { padding: "0 20px" };
const h1 = { color: "#DC2626", fontSize: "28px", fontWeight: "700", lineHeight: "1.3", margin: "30px 0 20px" };
const h2 = { color: "#059669", fontSize: "22px", fontWeight: "700", lineHeight: "1.3", margin: "24px 0 16px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "16px 0" };
const bulletText = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "8px 0", paddingLeft: "10px" };
const highlight = { backgroundColor: "#FEE2E2", color: "#991B1B", padding: "2px 6px", borderRadius: "4px" };
const calloutBox = { backgroundColor: "#FEF3C7", borderLeft: "4px solid #F59E0B", padding: "16px", margin: "24px 0" };
const calloutText = { color: "#92400E", fontSize: "16px", margin: "0", fontStyle: "italic" };
const quoteBox = { backgroundColor: "#DBEAFE", borderLeft: "4px solid #3B82F6", padding: "16px", margin: "24px 0" };
const quoteText = { color: "#1E40AF", fontSize: "16px", margin: "0", fontStyle: "italic" };
const bigNumber = { fontSize: "32px", fontWeight: "700", color: "#059669" };
const ctaBox = { backgroundColor: "#ECFDF5", border: "2px solid #059669", borderRadius: "8px", padding: "20px", margin: "32px 0" };
const ctaText = { color: "#065F46", fontSize: "16px", margin: "12px 0" };
const signature = { ...text, marginTop: "32px", fontStyle: "italic" };
const psBox = { backgroundColor: "#FEF3C7", border: "2px solid #F59E0B", borderRadius: "8px", padding: "16px", margin: "24px 0" };
const psText = { color: "#92400E", fontSize: "14px", margin: "0" };