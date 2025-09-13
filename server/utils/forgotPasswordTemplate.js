const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0px 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #333; margin-bottom: 10px;">Password Reset Request</h2>
      <p style="color: #555; font-size: 16px;">Hello <strong>${name}</strong>,</p>
      <p style="color: #555; font-size: 16px;">
        You requested to reset your password. Use the OTP below to complete the process.
      </p>

      <div style="background-color: #f3f4f6; padding: 15px; margin: 20px auto; border-radius: 8px; font-size: 22px; font-weight: bold; letter-spacing: 2px; color: #111; display: inline-block;">
        ${otp}
      </div>

      <p style="color: #e63946; font-size: 14px; margin-top: 10px;">
        ⚠️ This OTP is valid for <strong>10 minutes</strong> only. Do not share it with anyone.
      </p>

      <p style="color: #888; font-size: 13px; margin-top: 20px;">
        If you didn't request a password reset, please ignore this email or contact support.
      </p>
    </div>
  </div>
  `;
};
export default forgotPasswordTemplate;
