import { NonRetriableError } from "inngest";
import User, { UserValues } from "../../models/User";
import { inngest } from "../client";
import sendMail from "../../utils/sendMail";
import { generateWelcomeEmail } from "../../utils/emailTemplates";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }): Promise<{ success: boolean }> => {
    try {
      const { email } = event.data;

      // check for the user
      const user = await step.run(
        "get-user-email",
        async (): Promise<UserValues> => {
          const exists = await User.findOne({ email });
          if (!exists) {
            throw new NonRetriableError("No user found for email");
          }
          return exists;
        }
      );

      await step.run("send-welcome-message", async () => {
        await sendMail(
          process.env.FROM_EMAIL as string,
          user.email,
          `Welcome Onboard ${user.name}`,
          generateWelcomeEmail(user.name, user.email)
        );
      });

      return { success: true };
    } catch (error) {
      console.log("Something went wrong : ", error);
      return { success: false };
    }
  }
);
