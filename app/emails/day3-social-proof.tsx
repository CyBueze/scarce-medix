// app/emails/day3-social-proof.tsx

import {
  Section,
  Text,
  Button,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./components/email-layout";

interface Day3EmailProps {
  firstName: string;
}

export function Day3Email({ firstName }: Day3EmailProps) {
  return (
    <EmailLayout preview="Real Lagos families, real BP readings, real results...">
      <Section style={content}>
        <Heading style={h1}>"I Thought You Were Lying... Until I Saw My Own Results"</Heading>
        
        <Text style={text}>
          {firstName},
        </Text>

        <Text style={text}>
          Those were Mrs. Adeyemi's exact words when she emailed me 8 weeks ago.
        </Text>

        <Text style={text}>
          58 years old. Runs a printing press in Ikeja. Stressed beyond belief.
        </Text>

        <Text style={text}>
          Her BP? <strong style={highlight}>170/100.</strong> Even with 3 medications.
        </Text>

        <Text style={text}>
          She downloaded the guide on a Tuesday. Read it that night.
        </Text>

        <Text style={text}>
          Called me Wednesday morning with one question:
        </Text>

        <Section style={quoteBox}>
          <Text style={quoteText}>
            "Is this real, or are you selling me hope?"
          </Text>
        </Section>

        <Text style={text}>
          Fair question.
        </Text>

        <Text style={text}>
          I told her: <em>"Try it for 30 days. If your BP doesn't improve, I'll refund every naira. 
          No questions asked."</em>
        </Text>

        <Text style={text}>
          She ordered 2 bottles that day.
        </Text>

        <Heading style={h2}>Here's What Happened:</Heading>

        <Section style={timelineBox}>
          <Text style={timelineText}>
            <strong>Week 1:</strong> Headaches reducing. Sleep improving.
          </Text>
          <Text style={timelineText}>
            <strong>Week 3:</strong> BP at 160/95 (first time under 165 in 2 years)
          </Text>
          <Text style={timelineText}>
            <strong>Week 6:</strong> 145/90. Her doctor asked "wetin you dey do?"
          </Text>
          <Text style={timelineText}>
            <strong>Week 8:</strong> <span style={bigNumber}>135/85</span>
          </Text>
        </Section>

        <Text style={text}>
          Her doctor checked the reading <strong>three times.</strong>
        </Text>

        <Text style={text}>
          He couldn't believe it. Reduced her from 3 medications to just 1.
        </Text>

        <Text style={text}>
          Last week, she sent me this message:
        </Text>

        <Section style={testimonialBox}>
          <Text style={testimonialText}>
            "My husband jokes that I look 10 years younger. My energy came back. 
            I can climb stairs without panting. And for the first time in years, 
            I'm not afraid every time I check my BP.
            <br /><br />
            I thought you were lying... but this thing is real. Thank you."
          </Text>
          <Text style={attribution}>- Mrs. Adeyemi, Ikeja (Age 58)</Text>
        </Section>

        <Hr style={divider} />

        <Heading style={h2}>But She's Not Alone...</Heading>

        <Text style={text}>
          Over <strong>300 Nigerian families</strong> have used SOS Advance in the last 12 months.
        </Text>

        <Text style={text}>
          Here are just a few of their stories:
        </Text>

        {/* Testimonial 1 */}
        <Section style={testimonialCard}>
          <Heading style={testimonialHeader}>
            "BP From 185/115 to 140/88 — Doctor Said It's 'Remarkable'"
          </Heading>
          <Text style={testimonialText}>
            "My pension is small. I couldn't afford expensive treatments. But SOS Advance 
            worked better than anything I tried in 10 years. My doctor used the word 'remarkable' 
            three times during my checkup.
            <br /><br />
            The constant ringing in my ears? Gone. The fear every night before bed? Gone. 
            I sleep peacefully now. That alone is priceless."
          </Text>
          <Text style={attribution}>- Elder Okonkwo, Enugu (Age 65)</Text>
        </Section>

        {/* Testimonial 2 */}
        <Section style={testimonialCard}>
          <Heading style={testimonialHeader}>
            "Both My Husband and I Take It — Our Doctor Called It a 'Miracle'"
          </Heading>
          <Text style={testimonialText}>
            "We're both overweight, both stressed running our shop in Aba market. My BP was 160/95, 
            my husband's was 175/105.
            <br /><br />
            The medications gave him ED problems. I had a constant dry cough.
            <br /><br />
            12 weeks on SOS Advance: My BP is 138/86. His is 148/92. The ED problem resolved 
            (better blood flow). My cough completely gone.
            <br /><br />
            Our doctor literally said 'this is miracle territory' when he saw both our improvements."
          </Text>
          <Text style={attribution}>- Mr. & Mrs. Nwankwo, Aba (Ages 54 & 52)</Text>
        </Section>

        {/* Testimonial 3 */}
        <Section style={testimonialCard}>
          <Heading style={testimonialHeader}>
            "From 4 Medications to 1 — My Children Can't Believe It"
          </Heading>
          <Text style={testimonialText}>
            "At 71, I was on 4 different BP medications plus a cholesterol drug. ₦12,000 monthly. 
            Weak all the time. Dizzy. Couldn't enjoy my retirement.
            <br /><br />
            My daughter in UK researches health things online. She sent me SOS Advance.
            <br /><br />
            Three months later: BP stable at 130/82. Doctor reduced me to ONE medication. 
            I swim twice a week at Ikoyi Club now. My children are shocked at the transformation."
          </Text>
          <Text style={attribution}>- Chief Adebayo, Ikoyi, Lagos (Age 71)</Text>
        </Section>

        {/* Testimonial 4 */}
        <Section style={testimonialCard}>
          <Heading style={testimonialHeader}>
            "Swollen Feet Gone, Morning Headaches Disappeared"
          </Heading>
          <Text style={testimonialText}>
            "My feet used to swell so bad — couldn't wear my church shoes. Morning headaches 
            made me vomit sometimes. BP was still 170/102 even with medications.
            <br /><br />
            Two months on SOS Advance: Swelling GONE. Headaches maybe once a month instead of daily. 
            BP dropped to 148/90.
            <br /><br />
            I wore heels to church last Sunday for the first time in 3 years!"
          </Text>
          <Text style={attribution}>- Sister Blessing, Port Harcourt (Age 62)</Text>
        </Section>

        <Hr style={divider} />

        <Heading style={h2}>What Do All These Stories Have in Common?</Heading>

        <Section style={patternBox}>
          <Text style={patternText}>
            ✓ They all started skeptical (like you probably are right now)
          </Text>
          <Text style={patternText}>
            ✓ They all saw results within 30-60 days
          </Text>
          <Text style={patternText}>
            ✓ They all reduced medications (under doctor supervision)
          </Text>
          <Text style={patternText}>
            ✓ They all got their energy and confidence back
          </Text>
          <Text style={patternText}>
            ✓ They all wished they'd started sooner
          </Text>
        </Section>

        <Text style={text}>
          Tomorrow, I'm going to make you an offer.
        </Text>

        <Text style={text}>
          It's the same offer Mrs. Adeyemi, Elder Okonkwo, and 300+ other families accepted.
        </Text>

        <Text style={text}>
          The same one that's helping Nigerian parents support their BP naturally, reduce medications, 
          and reclaim their lives.
        </Text>

        <Text style={text}>
          But before I share it, I need you to understand something important...
        </Text>

        <Section style={warningBox}>
          <Text style={warningText}>
            This isn't a magic bullet. You still need your doctor. You still need to take your 
            medication. You still need to reduce salt and manage stress.
            <br /><br />
            <strong>SOS Advance works WITH your body and your medication — not instead of them.</strong>
            <br /><br />
            It gives your cardiovascular system the cellular support it needs to actually heal, 
            not just mask symptoms.
          </Text>
        </Section>

        <Text style={text}>
          If you're ready for that kind of transformation...
        </Text>

        <Text style={text}>
          Tomorrow's email will show you exactly how to get started.
        </Text>

        <Text style={signature}>
          To your health,
          <br />
          Pharm Sam
        </Text>

        <Section style={psBox}>
          <Text style={psText}>
            <strong>P.S.</strong> Mrs. Adeyemi now sends SOS Advance to her older sister in Abuja. 
            Elder Okonkwo bought bottles for his two brothers. When people see real results, they 
            can't help but share. That's how you know it's real.
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  );
}

export default Day3Email;

// Styles
const content = { padding: "0 20px" };
const h1 = { color: "#059669", fontSize: "28px", fontWeight: "700", lineHeight: "1.3", margin: "30px 0 20px" };
const h2 = { color: "#2563EB", fontSize: "22px", fontWeight: "700", lineHeight: "1.3", margin: "32px 0 16px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "16px 0" };
const highlight = { backgroundColor: "#FEE2E2", color: "#991B1B", padding: "2px 6px", borderRadius: "4px" };
const quoteBox = { backgroundColor: "#FEF3C7", borderLeft: "4px solid #F59E0B", padding: "16px", margin: "24px 0" };
const quoteText = { color: "#92400E", fontSize: "18px", margin: "0", fontStyle: "italic", fontWeight: "600" };
const timelineBox = { backgroundColor: "#ECFDF5", border: "2px solid #059669", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const timelineText = { color: "#065F46", fontSize: "15px", lineHeight: "24px", margin: "10px 0" };
const bigNumber = { fontSize: "28px", fontWeight: "700", color: "#059669" };
const testimonialBox = { backgroundColor: "#EFF6FF", border: "2px solid #3B82F6", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const testimonialText = { color: "#1E3A8A", fontSize: "15px", lineHeight: "24px", margin: "0", fontStyle: "italic" };
const attribution = { color: "#64748B", fontSize: "13px", marginTop: "12px", fontWeight: "600" };
const divider = { borderColor: "#E5E7EB", margin: "32px 0" };
const testimonialCard = { backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "20px", margin: "16px 0" };
const testimonialHeader = { color: "#1F2937", fontSize: "18px", fontWeight: "700", margin: "0 0 12px 0" };
const patternBox = { backgroundColor: "#DBEAFE", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const patternText = { color: "#1E40AF", fontSize: "15px", lineHeight: "24px", margin: "8px 0" };
const warningBox = { backgroundColor: "#FEF3C7", border: "2px solid #F59E0B", borderRadius: "8px", padding: "20px", margin: "32px 0" };
const warningText = { color: "#92400E", fontSize: "15px", lineHeight: "24px", margin: "0" };
const signature = { ...text, marginTop: "32px", fontStyle: "italic" };
const psBox = { backgroundColor: "#ECFDF5", border: "2px solid #059669", borderRadius: "8px", padding: "16px", margin: "24px 0" };
const psText = { color: "#065F46", fontSize: "14px", margin: "0" };