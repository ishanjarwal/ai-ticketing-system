export function generateWelcomeEmail(name: string, email: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Welcome Email</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f6f7fb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding:20px; text-align:center; background:#4f46e5; border-radius:8px 8px 0 0; color:#ffffff;">
            <h1 style="margin:0; font-size:22px;">AI Ticketing System</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:30px; color:#333333; text-align:center;">
            <h2 style="margin:0 0 15px; font-size:20px; color:#111111;">
              Welcome, ${name}!
            </h2>
            <p style="margin:0 0 25px; font-size:15px; line-height:1.6;">
              We’re excited to have you on board, <strong>${email}</strong>.  
              You can now create, track, and manage support tickets with ease.
            </p>
            <a href="#" style="display:inline-block; padding:12px 24px; background:#4f46e5; color:#ffffff; text-decoration:none; border-radius:6px; font-size:15px;">
              Get Started
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:15px; text-align:center; font-size:12px; color:#888888; background:#f6f7fb; border-radius:0 0 8px 8px;">
            © 2025 AI Ticketing System. All rights reserved.
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
