import { SES } from 'aws-sdk';

import { IOrderModel } from '../models/orders';
import { ISubscriptionModel } from '../models/subscription';
import { ContactModel } from '../models/objects/contact';

export const mailer = {
    send: (subject: string, destination: string, message: string, origin: string): Promise<SES.SendEmailResponse> => {
        const ses = new SES({ region: 'eu-west-1' });

        const request: SES.SendEmailRequest = {
            Source: origin,
            Destination: {
                ToAddresses: [destination]
            },
            Message: {
                Subject: {
                    Data: subject
                },
                Body: {
                    Html: {
                        Data: message
                    }
                }
            }
        };

        return ses.sendEmail(request).promise();
    }
};

export const email = {
    header: (subject: string, subscription: ISubscriptionModel): string => `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${subject}</title>

                <style type="text/css">
                    * { font-family:Roboto, "Helvetica Neue"; }
                    html { background-color:#eee; }
                    table { background-color:#fafafa; border-collapse:collapse; border-width:1px 1px 2px 1px; border-color:#ccc; border-style:solid; margin:2em auto; width:600px; }
                    td, tr { margin:0; }
                    th, td { padding:1em; }
                    p { padding:0; margin:0; font-size:14px; }
                    a { color: #673ab7; }
                    a.btn { color:#fff; display:inline-block; border:0px; border-radius:2px; height:36px; padding:0 26px; margin:6px 0; font-size:14px; font-weight:500; line-height:36px; text-transform:uppercase; text-decoration:none; background-color:#673ab7; box-shadow:0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12); }
                    a.btn:hover { background-color:#8565c3; box-shadow:none; }
                    .centered { text-align:center; }
                    .caption { font-size:10px; }
                </style>
            </head>
            <body>
                <table>
                    <tr style="background-color:#673ab7;">
                        <td class="centered" style="padding:3em;">
                            ${subscription.logo ?
                                `<img src="https://${subscription.domainName}.venzra.io/api/images/${subscription.logo}" alt="${subscription.storeName}" title="${subscription.storeName}" />`
                                :
                                `<h2>${subscription.storeName}</h2>`
                            }
                        </td>
                    </tr>
    `,

    contactMessage: (subscription: ISubscriptionModel, contact: ContactModel): string => {
        const template = `
                    <tr>
                        <td>
                            <p>Message from <strong>${contact.fullName}</strong>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>${contact.message}</td>
                    </tr>
        `;

        return email.header('Web contact', subscription) + template + email.footer(subscription.storeName);
    },

    orderConfirmation: (subscription: ISubscriptionModel, order: IOrderModel): string => {
        const template = `
                    <tr>
                        <td>
                            <h2>Order confirmation,</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Your order <strong>${order.reference}</strong> has been placed successfully.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="border: none">
                                <tr>
                                    <th style="text-align: left">Product</th>
                                    <th style="text-align: center">Quantity</th>
                                    <th style="text-align: center">Price</th>
                                    <th style="text-align: right">Subtotal</th>
                                </tr>
                                ${order.items.map((item: any) => `
                                <tr>
                                    <td style="text-align: left">${item.product.displayName}</td>
                                    <td style="text-align: center">${item.quantity}</td>
                                    <td style="text-align: center">${item.price / 100}</td>
                                    <td style="text-align: right">${item.price * item.quantity / 100}</td>
                                </tr>
                                `).join('\n')}
                                <tr>
                                    <td style="text-align: right" colspan="4">Total: ${order.payment.value / 100}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
        `;

        return email.header('Order confirmation', subscription) + template + email.footer(subscription.storeName);
    },

    footer: (storeName: string): string => `
                    <tr>
                        <td>
                            <p style="font-weight:500">Kind regards,</p>
                            <p style="font-weight:500">The ${storeName} support team</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="caption">If you did not request this email, please discard.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `
};
