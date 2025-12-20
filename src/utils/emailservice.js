import transporter from '../utils/mailer.js'



export const sendEamil=async(to,subject,html,text="")=>{
    try{
        

        const mailOptions={
            from:process.env.SMTP_FROM,
            to,
            subject,
            html,
            text

        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };

    }
    catch(error){
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
} 