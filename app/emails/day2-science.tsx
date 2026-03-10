// app/emails/day2-science.tsx

import {
  Section,
  Text,
  Button,
  Heading,
} from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./components/email-layout";

interface Day2EmailProps {
  firstName: string;
}

export function Day2Email({ firstName }: Day2EmailProps) {
  return (
    <EmailLayout preview="The cellular secret your doctor doesn't know about...">
      <Section style={content}>
        <Heading style={h1}>Why Your BP Medication Isn't Enough (The Science)</Heading>
        
        <Text style={text}>
          {firstName},
        </Text>

        <Text style={text}>
          Yesterday I shared Mr Alex Nduka's story.
        </Text>

        <Text style={text}>
          180/110 → 128/82 in 90 days. Off 2 medications.
        </Text>

        <Text style={text}>
          Today, I'm going to show you <strong>exactly</strong> how that's possible.
        </Text>

        <Text style={text}>
          Because if you understand the mechanism, you'll understand why this works when 
          everything else failed.
        </Text>

        <Heading style={h2}>Here's What Your Doctor Knows (But Doesn't Tell You)</Heading>

        <Text style={text}>
          Your BP medication works on ONE level: <strong>vascular pressure.</strong>
        </Text>

        <Text style={text}>
          Pills force your blood vessels to relax. Or they reduce fluid to lower volume.
        </Text>

        <Text style={text}>
          That brings the numbers down. Great.
        </Text>

        <Text style={text}>
          But here's what they DON'T address:
        </Text>

        <Section style={problemBox}>
          <Heading style={problemHeader}>The 3 Hidden Causes of Stubborn High BP:</Heading>
          
          <Text style={problemText}>
            <strong>1. Chronic Inflammation</strong>
            <br />
            Your artery walls are inflamed from stress, fried foods, poor sleep, environmental toxins.
            <br />
            Inflamed arteries = stiff arteries = high BP.
          </Text>

          <Text style={problemText}>
            <strong>2. Oxidative Stress</strong>
            <br />
            Free radicals attack your blood vessel lining (endothelium), creating plaque and 
            reducing flexibility.
            <br />
            Damaged vessels = narrow pathways = high BP.
          </Text>

          <Text style={problemText}>
            <strong>3. Mitochondrial Decline</strong>
            <br />
            Your heart cells lose energy to pump efficiently. Your vessels lose strength to 
            dilate properly.
            <br />
            Weak cells = struggling cardiovascular system = high BP.
          </Text>
        </Section>

        <Text style={text}>
          <strong>Your medication doesn't fix ANY of these.</strong>
        </Text>

        <Text style={text}>
          It just forces your body to work harder with the same broken machinery.
        </Text>

        <Text style={text}>
          That's why your BP stays borderline. That's why you're still tired. That's why your 
          doctor keeps adding more pills.
        </Text>

        <Heading style={h2}>The Missing Piece: Cellular Support</Heading>

        <Text style={text}>
          What if instead of just suppressing symptoms...
        </Text>

        <Text style={text}>
          ...you could actually <strong>repair the damage</strong> at the cellular level?
        </Text>

        <Text style={text}>
          That's where essential oils come in.
        </Text>

        <Text style={text}>
          Not the kind you buy at the market. Not the watered-down "aromatherapy" stuff.
        </Text>

        <Text style={text}>
          I'm talking about <strong>pharmaceutical-grade essential oils</strong> that have been:
        </Text>

        <Text style={bulletText}>✓ Clinically studied in over 400 peer-reviewed journals</Text>
        <Text style={bulletText}>✓ Processed with quantum nanotechnology for 95% absorption</Text>
        <Text style={bulletText}>✓ Elevated to pH 9-10 for optimal cellular uptake</Text>

        <Heading style={h2}>How SOS Advance Works (The 3-Level Approach)</Heading>

        <Section style={mechanismBox}>
          <Text style={mechanismText}>
            <strong>Level 1: Anti-Inflammation</strong>
            <br />
            Black Seed Oil, Frankincense, and Oregano Oil calm chronic inflammation in your arteries.
            <br />
            Calmer arteries = more flexible = lower BP.
          </Text>

          <Text style={mechanismText}>
            <strong>Level 2: Antioxidant Protection</strong>
            <br />
            Neem Oil, Clove Oil, and Cinnamon Bark neutralize free radicals attacking your vessels.
            <br />
            Protected vessels = healthier lining = better blood flow = lower BP.
          </Text>

          <Text style={mechanismText}>
            <strong>Level 3: Mitochondrial Energy</strong>
            <br />
            The entire blend supports ATP production in your heart and vessel cells.
            <br />
            More energy = stronger pumping = easier circulation = lower BP.
          </Text>
        </Section>

        <Text style={text}>
          <strong>Your medication works on pressure. SOS Advance works on the SYSTEM.</strong>
        </Text>

        <Heading style={h2}>The Clinical Evidence</Heading>

        <Text style={text}>
          This isn't "alternative medicine" or wishful thinking.
        </Text>

        <Text style={text}>
          <strong>Over 400 clinical studies</strong> published in peer-reviewed journals confirm:
        </Text>

        <Section style={studyBox}>
          <Text style={studyText}>
            • Black Seed Oil reduces systolic BP by average <strong>11.2 mmHg</strong>
            <br /><em>(Journal of Hypertension, 2013)</em>
          </Text>
          <Text style={studyText}>
            • Frankincense reduces inflammatory markers in heart patients
            <br /><em>(Phytotherapy Research, 2018)</em>
          </Text>
          <Text style={studyText}>
            • Oregano Oil improves endothelial function
            <br /><em>(European Journal of Nutrition, 2015)</em>
          </Text>
          <Text style={studyText}>
            • Cinnamon supports healthy blood sugar and arterial flexibility
            <br /><em>(Annals of Family Medicine, 2013)</em>
          </Text>
        </Section>

        <Text style={text}>
          In Germany, India, Turkey — essential oil therapy is part of mainstream cardiovascular treatment.
        </Text>

        <Text style={text}>
          Nigerian doctors don't recommend it because pharmaceutical companies can't patent plants.
        </Text>

        <Text style={text}>
          <strong>No profit = no awareness.</strong>
        </Text>

        <Text style={text}>
          But the science is clear. The results are real.
        </Text>

        <Section style={resultBox}>
          <Text style={resultText}>
            When you combine medication (pressure management) with SOS Advance (cellular repair), 
            you get <strong>synergistic results</strong> that shock doctors.
          </Text>
          <Text style={resultText}>
            That's how Mr Alex Nduka went from 180/110 to 128/82.
          </Text>
          <Text style={resultText}>
            That's how 300+ Lagos families are supporting their BP naturally.
          </Text>
        </Section>

        <Text style={text}>
          Tomorrow, I'll share testimonials from real Nigerian families who've used this.
        </Text>

        <Text style={text}>
          The stories will shock you.
        </Text>

        <Text style={signature}>
          To your health,
          <br />
          Pharm. Sam
        </Text>

        <Section style={psBox}>
          <Text style={psText}>
            <strong>P.S.</strong> If you're skeptical, good. You should be. That's why tomorrow's 
            email includes screenshots of BP readings, doctor's notes, and real phone numbers you 
            can call to verify. This is that real.
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  );
}

export default Day2Email;

// Styles (similar to Day 1, with some variations)
const content = { padding: "0 20px" };
const h1 = { color: "#2563EB", fontSize: "28px", fontWeight: "700", lineHeight: "1.3", margin: "30px 0 20px" };
const h2 = { color: "#059669", fontSize: "22px", fontWeight: "700", lineHeight: "1.3", margin: "24px 0 16px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "16px 0" };
const bulletText = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "8px 0", paddingLeft: "10px" };
const problemBox = { backgroundColor: "#FEE2E2", border: "2px solid #DC2626", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const problemHeader = { color: "#991B1B", fontSize: "18px", fontWeight: "700", margin: "0 0 16px 0" };
const problemText = { color: "#7F1D1D", fontSize: "15px", lineHeight: "24px", margin: "12px 0" };
const mechanismBox = { backgroundColor: "#ECFDF5", border: "2px solid #059669", borderRadius: "8px", padding: "20px", margin: "24px 0" };
const mechanismText = { color: "#065F46", fontSize: "15px", lineHeight: "24px", margin: "12px 0" };
const studyBox = { backgroundColor: "#EFF6FF", borderLeft: "4px solid #3B82F6", padding: "16px", margin: "24px 0" };
const studyText = { color: "#1E40AF", fontSize: "14px", lineHeight: "22px", margin: "10px 0" };
const resultBox = { backgroundColor: "#FEF3C7", border: "2px solid #F59E0B", borderRadius: "8px", padding: "20px", margin: "32px 0" };
const resultText = { color: "#92400E", fontSize: "16px", lineHeight: "24px", margin: "12px 0" };
const signature = { ...text, marginTop: "32px", fontStyle: "italic" };
const psBox = { backgroundColor: "#DBEAFE", border: "2px solid #3B82F6", borderRadius: "8px", padding: "16px", margin: "24px 0" };
const psText = { color: "#1E40AF", fontSize: "14px", margin: "0" };