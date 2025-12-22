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
      }),
    



   BidWinnerEmailTemplate :(userName, auctionName, bidAmount) => {
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
      },
      



 BidLosserEmailTemplate:(userName, auctionName, bidAmount) => {
        return {
          subject: `Update on your bid for ${auctionName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
              <h2 style="color: #6c757d;">Auction Update</h2>
              
              <p>Hi ${userName},</p>
              
              <p>
                Thank you for participating in the auction for <strong>${auctionName}</strong>. 
                We’re writing to let you know that another bidder has placed a higher bid, and the auction has now concluded.
              </p>
      
              <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2c7be5; margin: 20px 0;">
                <p style="margin: 0;"><strong>Your Bid:</strong> ${bidAmount}</p>
                <p style="margin: 0;"><strong>Refund Status:</strong> Processed to your original payment method/wallet.</p>
              </div>
      
              <p>
                Don't worry! Your bid amount of <strong>${bidAmount}</strong> has been initiated for a refund. 
                You should see the funds reflected in your account within 3-5 business days.
              </p>
      
              <p>
                Better luck next time! There are many more exciting auctions waiting for you.
              </p>
      
              <br />
      
              <p>
                Best regards,<br />
                <strong>The Auction Team</strong>
              </p>
            </div>
          `,
          text: `Hi ${userName},
      
      Thank you for participating in the auction for "${auctionName}".
      
      Another bidder has won this auction. Your bid of ${bidAmount} is being refunded to your original payment method. Please allow 3-5 business days for the funds to appear in your account.
      
      Better luck next time!
      
      Best regards,
      The Auction Team`,
        };
      },
    
    }