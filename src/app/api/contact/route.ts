import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Validation ────────────────────────────────────────────────────────────────
// Mirrors the client-side schema so malformed/malicious requests are rejected
// at the boundary before any processing occurs.

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(150),
  message: z.string().min(20).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const data = contactSchema.parse(body);

    /**
     * TODO: Integrate your preferred email delivery service here.
     *
     * Recommended options:
     *   • Resend      → https://resend.com  (easiest Next.js integration)
     *   • SendGrid    → https://sendgrid.com
     *   • Nodemailer  → works with any SMTP provider (Gmail, Mailgun, etc.)
     *
     * Example (Resend):
     *   import { Resend } from 'resend';
     *   const resend = new Resend(process.env.RESEND_API_KEY);
     *   await resend.emails.send({
     *     from: 'portfolio@yourdomain.com',
     *     to: process.env.CONTACT_EMAIL!,
     *     subject: `[Portfolio] ${data.subject}`,
     *     text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
     *   });
     */

    // Development: log submission to console
    if (process.env.NODE_ENV === "development") {
      console.info("[Contact form]", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        messageLength: data.message.length,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: err.issues },
        { status: 400 },
      );
    }

    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Reject all other HTTP verbs on this route
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
