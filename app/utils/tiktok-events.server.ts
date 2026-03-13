export async function sendTikTokEvent({
  event,
  user,
  properties,
}: {
  event: "Purchase" | "AddToCart" | "InitiateCheckout" | "ViewContent" | "CompleteRegistration";
  user: {
    email?: string;
    phone?: string;
    ip?: string;
    userAgent?: string;
    ttclid?: string;
  };
  properties?: {
    value?: number;
    currency?: string;
    content_id?: string;
    content_type?: string;
    content_name?: string;
  };
}) {
  const payload = {
    event_source: "web",
    event_source_id: process.env.PIXEL_ID,
    // test_event_code: "TEST81146",
    data: [
      {
        event,
        event_time: Math.floor(Date.now() / 1000),
        user: {
          email: user.email,
          phone: user.phone,
          ip: user.ip,
          user_agent: user.userAgent,
          ttclid: user.ttclid,
        },
        properties: {
          currency: properties?.currency ?? "NGN",
          value: properties?.value,
          content_id: properties?.content_id ?? "sos-tiktok",
          content_type: properties?.content_type ?? "product",
          content_name: properties?.content_name,
          contents: [
        {
      content_id: properties?.content_id ?? "sos-advance",
      content_type: properties?.content_type ?? "product",
      currency: properties?.currency ?? "NGN",
      price: properties?.value,
    },
    ],
        },
      },
    ],
  };

  const res = await fetch(
    "https://business-api.tiktok.com/open_api/v1.3/event/track/",
    {
      method: "POST",
      headers: {
        "Access-Token": process.env.ACCESS_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const json = await res.json();
  console.log("TikTok response:", JSON.stringify(json, null, 2));
  return json;
}