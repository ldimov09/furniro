import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import config from '../config/keys';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'officefurniro@gmail.com',
                pass: config.gmailAppPassword,
            },
            tls:{
                rejectUnauthorized: false,
            }
        });
    }

    async sendOrderConfirmation(email: string, orderDetails: string): Promise<void> {
        await this.transporter.sendMail({
            from: '"Furniro" officefurniro@gmail.com',
            to: email,
            subject: 'Order Placed',
            text: `Thank you for your order! Here are your order details:\n${orderDetails}`, 
            html: `<p>Thank you for your order! Here are your order details:</p><pre>${orderDetails}</pre>`,
        });
    }

    async sendOrderPaid(email: string, orderDetails: string): Promise<void> {
        await this.transporter.sendMail({
            from: '"Furniro" officefurniro@gmail.com',
            to: email,
            subject: 'Order Paid',
            text: `Thank you for your payment via Stripe! Here are your order details:\n${orderDetails}`, 
            html: `<p>Thank you for your payment via Stripe! Here are your order details:</p><pre>${orderDetails}</pre>`,
        });
    }
}
