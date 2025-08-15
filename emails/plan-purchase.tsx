import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PlanPurchaseEmailProps {
  planType: "Pro" | "Business";
  customerName?: string;
}

export const PlanPurchaseEmail = ({
  planType,
  customerName = "Valued Customer",
}: PlanPurchaseEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for purchasing our {planType} plan!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://mark-ai-prod.vercel.app/_static/logo.png"
          width="100"
          height="100"
          alt="logo"
          style={logo}
        />
        <Heading style={heading}>Thank you for your purchase!</Heading>

        <Section style={body}>
          <Text style={paragraph}>Hi {customerName},</Text>

          <Text style={paragraph}>
            Thank you for choosing the {planType} plan from FWDLUX. We’re
            thrilled to have you on board and are committed to providing you
            with the best possible experience.
          </Text>

          <Text style={paragraph}>
            You can get started right away by accessing your dashboard.{" "}
            {`We're`} excited to see how the {planType} plan helps you achieve
            your goals with FWDLUX!
          </Text>

          <Button
            style={button}
            href="https://mark-ai-prod.vercel.app/dashboard"
          >
            Access Your Dashboard
          </Button>

          <Hr style={hr} />

          <Text style={footer}>
            If you have any questions, feel free to reach out to our support
            team at{" "}
            <Link href="mailto:support@fwdlux.com">support@fwdlux.com</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PlanPurchaseEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
  textAlign: "center" as const,
};

const body = {
  backgroundColor: "#f4f4f4",
  padding: "24px",
  borderRadius: "8px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#3c3f44",
  margin: "16px 0",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "20px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "1.5",
  textAlign: "center" as const,
};
