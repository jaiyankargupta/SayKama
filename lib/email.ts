import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@saykama.com";
const FROM_NAME = process.env.FROM_NAME || "SayKama";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!SMTP_USER || !SMTP_PASS) {
      console.warn("Email credentials not configured. Email not sent.");
      return false;
    }

    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

/**
 * Send OTP email
 */
export async function sendOTPEmail(
  email: string,
  otp: string,
  name?: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP Code</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .email-wrapper { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 20px; }
        .message { font-size: 16px; color: #64748b; margin-bottom: 30px; line-height: 1.7; }
        .otp-container { background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
        .otp-label { font-size: 14px; color: #64748b; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
        .otp-code { font-size: 36px; font-weight: 800; color: #0f172a; letter-spacing: 8px; font-family: 'Courier New', monospace; }
        .expiry { font-size: 14px; color: #ef4444; margin-top: 15px; }
        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; }
        .warning p { margin: 0; font-size: 14px; color: #92400e; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 5px 0; font-size: 13px; color: #64748b; }
        .footer a { color: #0f172a; text-decoration: none; font-weight: 600; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        @media only screen and (max-width: 600px) {
          .content { padding: 30px 20px; }
          .otp-code { font-size: 28px; letter-spacing: 4px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <div class="header">
            <h1>🔐 SayKama</h1>
            <p>Secure Login Verification</p>
          </div>

          <div class="content">
            <div class="greeting">Hello${name ? ` ${name}` : ""},</div>

            <div class="message">
              You requested to login to your SayKama account. Use the following One-Time Password (OTP) to complete your login:
            </div>

            <div class="otp-container">
              <div class="otp-label">Your OTP Code</div>
              <div class="otp-code">${otp}</div>
              <div class="expiry">⏰ Valid for 10 minutes</div>
            </div>

            <div class="warning">
              <p><strong>⚠️ Security Notice:</strong> Never share this OTP with anyone. SayKama will never ask for your OTP via phone or email.</p>
            </div>

            <div class="message">
              If you didn't request this OTP, please ignore this email or contact our support team immediately.
            </div>
          </div>

          <div class="footer">
            <p><strong>Need help?</strong></p>
            <p>Contact us at <a href="mailto:support@saykama.com">support@saykama.com</a></p>
            <p style="margin-top: 20px; color: #94a3b8;">
              © ${new Date().getFullYear()} SayKama. All rights reserved.<br>
              Natural Skincare & Haircare
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Hello${name ? ` ${name}` : ""},

    Your SayKama OTP Code: ${otp}

    This code is valid for 10 minutes.

    If you didn't request this, please ignore this email.

    Best regards,
    SayKama Team
  `;

  return await sendEmail({
    to: email,
    subject: `Your SayKama OTP Code: ${otp}`,
    html,
    text,
  });
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
  email: string,
  orderNumber: string,
  orderDetails: {
    customerName: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  }
): Promise<boolean> {
  const itemsHtml = orderDetails.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600;">₹${item.price.toLocaleString()}</td>
      </tr>
    `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .email-wrapper { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .checkmark { font-size: 48px; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .order-number { background: #f8fafc; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
        .order-number strong { font-size: 20px; color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f8fafc; padding: 12px; text-align: left; font-weight: 600; color: #0f172a; }
        .totals { margin-top: 20px; }
        .totals tr td { padding: 8px 0; }
        .totals .total { font-size: 20px; font-weight: 800; color: #0f172a; padding-top: 16px; border-top: 2px solid #e2e8f0; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 5px 0; font-size: 13px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <div class="header">
            <div class="checkmark">✓</div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase</p>
          </div>

          <div class="content">
            <p>Hi ${orderDetails.customerName},</p>

            <p>We're excited to confirm that your order has been received and is being processed. You'll receive another email when your order ships.</p>

            <div class="order-number">
              <p style="margin: 0; color: #64748b; font-size: 14px;">Order Number</p>
              <strong>#${orderNumber}</strong>
            </div>

            <h3 style="color: #0f172a; margin-top: 30px;">Order Summary</h3>

            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <table class="totals">
              <tr>
                <td>Subtotal:</td>
                <td style="text-align: right;">₹${orderDetails.subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Tax (GST 18%):</td>
                <td style="text-align: right;">₹${orderDetails.tax.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td style="text-align: right;">${orderDetails.shipping === 0 ? "FREE" : `₹${orderDetails.shipping.toLocaleString()}`}</td>
              </tr>
              <tr class="total">
                <td><strong>Total:</strong></td>
                <td style="text-align: right;"><strong>₹${orderDetails.total.toLocaleString()}</strong></td>
              </tr>
            </table>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/orders" class="btn">Track Your Order</a>
            </div>

            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              Questions about your order? Contact our support team at <a href="mailto:support@saykama.com" style="color: #0f172a;">support@saykama.com</a>
            </p>
          </div>

          <div class="footer">
            <p><strong>SayKama - Natural Skincare & Haircare</strong></p>
            <p>© ${new Date().getFullYear()} SayKama. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: `Order Confirmation - #${orderNumber}`,
    html,
    text: `Order #${orderNumber} confirmed. Total: ₹${orderDetails.total}`,
  });
}

/**
 * Send order shipped email
 */
export async function sendOrderShippedEmail(
  email: string,
  orderNumber: string,
  trackingNumber: string,
  customerName: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Shipped</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .email-wrapper { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .icon { font-size: 48px; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .tracking-box { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; }
        .tracking-number { font-size: 24px; font-weight: 700; color: #0f172a; letter-spacing: 2px; margin: 10px 0; font-family: 'Courier New', monospace; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 5px 0; font-size: 13px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <div class="header">
            <div class="icon">📦</div>
            <h1>Your Order is On Its Way!</h1>
            <p>Order #${orderNumber}</p>
          </div>

          <div class="content">
            <p>Hi ${customerName},</p>

            <p>Great news! Your order has been shipped and is on its way to you.</p>

            <div class="tracking-box">
              <p style="margin: 0; color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
              <div class="tracking-number">${trackingNumber}</div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/orders" class="btn">Track Your Package</a>
            </div>

            <p style="color: #64748b; font-size: 14px;">
              You can track your order status anytime by clicking the button above or visiting your dashboard.
            </p>
          </div>

          <div class="footer">
            <p><strong>SayKama</strong></p>
            <p>© ${new Date().getFullYear()} SayKama. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: `Your Order Has Shipped! - #${orderNumber}`,
    html,
    text: `Order #${orderNumber} has shipped. Tracking: ${trackingNumber}`,
  });
}

/**
 * Send order delivered email
 */
export async function sendOrderDeliveredEmail(
  email: string,
  orderNumber: string,
  customerName: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Delivered</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .email-wrapper { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .icon { font-size: 64px; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 5px 0; font-size: 13px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <div class="header">
            <div class="icon">🎉</div>
            <h1>Order Delivered!</h1>
            <p>Order #${orderNumber}</p>
          </div>

          <div class="content">
            <p>Hi ${customerName},</p>

            <p><strong>Your order has been delivered!</strong></p>

            <p>We hope you love your SayKama products. If you have any questions or concerns, please don't hesitate to reach out to our support team.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/shop" class="btn">Shop Again</a>
            </div>

            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              ⭐ Love your products? Leave us a review and help others discover natural skincare!
            </p>
          </div>

          <div class="footer">
            <p><strong>SayKama</strong></p>
            <p>© ${new Date().getFullYear()} SayKama. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: `Order Delivered - #${orderNumber} 🎉`,
    html,
    text: `Your order #${orderNumber} has been delivered!`,
  });
}

export default {
  sendEmail,
  sendOTPEmail,
  sendOrderConfirmationEmail,
  sendOrderShippedEmail,
  sendOrderDeliveredEmail,
};
