import { Resend } from 'resend';

export const sendVerificationEmail = async(email, verificationLink) => {
    try{
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: 'noreply@code-nest.live',
            to: email,
            subject: 'Verify your email',
            html: `
            <h1>Verify your email</h1>
            <p>Click <a href="${verificationLink}">here</a> to verify your email</p>
            `
        });
        if(error){
            throw error;
        }
        console.log(verificationLink);
        return data;
    }catch(error){
        throw error;
    }
};