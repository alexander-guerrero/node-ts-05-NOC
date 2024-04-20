import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    // todo: attachments
}

// todo: Attachment 

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user:envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody } = options;

        try {

            const sentInformacion = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody
            });

            console.log(sentInformacion);

            return true;
        } catch (error) {

            return false;
        }

    }

}