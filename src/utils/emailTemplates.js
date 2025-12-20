const emailTemplates = {
    welcome: (userName) => ({
      subject: `Welcome to Our App, ${userName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Our App!</h2>
          <p>Hello ${userName},</p>
          <p>Thank you for joining us. We're excited to have you on board!</p>
          <p>Start exploring our features today.</p>
          <br>
          <p>Best regards,<br>The App Team</p>
        </div>
      `,
      text: `Welcome to Our App, ${userName}!\n\nThank you for joining us. We're excited to have you on board!\n\nBest regards,\nThe App Team`
    }),

    resetPassword: (userName, resetLink) => ({
        subject: 'Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset</h2>
            <p>Hello ${userName},</p>
            <p>We received a request to reset your password. Click the link below to proceed:</p>
            <p><a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <br>
            <p>Best regards,<br>The App Team</p>
          </div>
        `,
        text: `Password Reset\n\nHello ${userName},\n\nClick this link to reset your password: ${resetLink}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.`
      })
    };



    export const BidWinnerEmailTemplate = (userName, auctionName, bidAmount) => {
        return {
          subject: `🎉 Congratulations! You won the auction for ${auctionName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #2c7be5;">Congratulations, ${userName}!</h2>
              
              <p>
                We’re happy to inform you that you are the <strong>winning bidder</strong> for the auction:
              </p>
      
              <p style="font-size: 16px;">
                <strong>Auction:</strong> ${auctionName}<br>
                <strong>Winning Bid:</strong> ${bidAmount}
              </p>
      
              <p>
                Please log in to your account to complete the next steps and finalize the process.
              </p>
      
              <br />
      
              <p>
                Best regards,<br />
                <strong>The Auction Team</strong>
              </p>
            </div>
          `,
          text: `Congratulations ${userName}!
      
      You have won the auction "${auctionName}".
      
      Winning Bid: ${bidAmount}
      
      Please log in to your account to complete the next steps.
      
      Best regards,
      The Auction Team`,
        };
      };
      