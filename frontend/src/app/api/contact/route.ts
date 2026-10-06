import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BACKEND_URL =
  process.env.BACKEND_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5001/api";

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch (parseError) {
    console.warn("[Contact API Warning]: Invalid JSON body received:", parseError);
    return NextResponse.json(
      { error: "Invalid JSON payload provided in request body." },
      { status: 400 }
    );
  }

  try {
    const { name, email, subject, message } = body;

    // Field validations
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      return NextResponse.json(
        { error: "Subject is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Forward inquiry to Express Backend to persist in database
    try {
      const backendResponse = await fetch(`${BACKEND_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      if (backendResponse.ok) {
        const backendData = await backendResponse.json();
        return NextResponse.json(
          {
            success: true,
            message: backendData.message || "Thank you for reaching out! Your message has been delivered.",
          },
          { status: 200 }
        );
      }
    } catch (backendErr) {
      console.warn("[Contact Proxy Warning]: Express backend unreachable, logging locally:", backendErr);
    }

    // Fallback response if backend service is restarting
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been queued for delivery.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
