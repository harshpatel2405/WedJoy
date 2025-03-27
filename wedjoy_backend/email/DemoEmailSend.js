import { SendEmail } from "./SendEmail.js";
import { welcomeEmail ,passwordResetEmail,accountVerificationEmail} from "./Templates.js"; // Ensure file name matches

// ✅ Define recipient email & user name
const recipientEmail = "technorex439@gmail.com"; // Use actual recipient email
const userName = "Harsh Patel"; // Use actual user name

// ✅ Send the welcome email
const sendWelcomeEmail = async () => {
  try {
    await SendEmail(recipientEmail, "🎉 Welcome to WedJoy!", accountVerificationEmail("https://wedjoyy.vercel.app"));
    console.log("✅ Welcome email sent successfully!");
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
};

// ✅ Run the email function
sendWelcomeEmail();
