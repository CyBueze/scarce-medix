// app/emails/welcome.tsx

import {
  Section,
  Text,
  Button,
  Heading,
} from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./components/email-layout";

interface WelcomeEmailProps {
  firstName: string;
  ebookUrl: string;
}

export function WelcomeEmail({ firstName, ebookUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Your BP Freedom Guide is ready to download">
      <Section style={content}>
        <Heading style={h1}>✅ Success, {firstName}!</Heading>
        
        <Text style={text}>
          Your <strong>BP Freedom Guide for Nigerian Seniors</strong> is ready.
        </Text>

        <Section style={buttonContainer}>
          <Button style={button} href={ebookUrl}>
            📥 DOWNLOAD YOUR FREE GUIDE
          </Button>
        </Section>

        <Text style={text}>
          <strong>Quick tip:</strong> Skip to Chapter 5 if you want to see what 300+ Lagos families 
          used to support their BP from 180/110 down to 128/82 in 90 days.
        </Text>

        <Text style={text}>
          I'll send you a follow-up tomorrow with Mr Alex Nduka's full story (the 67-year-old 
          retired teacher who avoided stroke and got off 3 medications).
        </Text>

        <Text style={text}>
          His family thought it was impossible. But it happened.
        </Text>

        <Text style={signature}>
          To your health,
          <br />
          Pharm. Sam
          <br />
          Scarce Medix
        </Text>

        <Section style={psBox}>
          <Text style={psText}>
            <strong>P.S.</strong> Check your spam folder if you don't see tomorrow's email. 
            We're sending you something important about the "essential oil secret" from Chapter 5.
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  );
}

export default WelcomeEmail;

// Styles
const content = { padding: "0 20px" };
const h1 = { color: "#059669", fontSize: "28px", fontWeight: "700", lineHeight: "1.3", margin: "30px 0 20px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "26px", margin: "16px 0" };
const buttonContainer = { textAlign: "center" as const, margin: "32px 0" };
const button = { backgroundColor: "#059669", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "16px 40px" };
const signature = { ...text, marginTop: "32px", fontStyle: "italic" };
const psBox = { backgroundColor: "#FEF3C7", border: "2px solid #F59E0B", borderRadius: "8px", padding: "16px", margin: "24px 0" };
const psText = { color: "#92400E", fontSize: "14px", margin: "0" };