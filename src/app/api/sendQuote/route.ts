import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Set up SendGrid implicitly when the file is loaded
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    const emailTo = process.env.EMAIL_TO || "hello@neuraforge.com";
    // SendGrid requires the 'from' email to be authenticated in their dashboard
    const emailFrom = process.env.EMAIL_FROM || "hello@neuraforge.com";

    console.log("------------------------");
    console.log(`Preparing to send email to ${emailTo} from ${emailFrom}...`);
    console.log("Payload:", body);
    console.log("------------------------");

    const msg = {
      to: emailTo,
      from: emailFrom,
      subject: `New Inquiry from ${name} regarding ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService/Product: ${service}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Inquiry Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Service/Product:</strong> ${service}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    if (process.env.SENDGRID_API_KEY) {
      // Send via SendGrid
      await sgMail.send(msg);
    } else {
      // Fallback local simulation if no API key is specified
      console.warn(
        "SENDGRID_API_KEY is not defined. Simulating local email delay...",
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    return NextResponse.json({
      success: true,
      message: "Quote sent successfully!",
    });
  } catch (error: any) {
    console.error("Error sending quote via SendGrid:", error);

    // Detailed SendGrid error logging
    if (error.response) {
      console.error(error.response.body);
    }

    return NextResponse.json(
      { error: "Failed to send the quote. Please try again." },
      { status: 500 },
    );
  }
}
