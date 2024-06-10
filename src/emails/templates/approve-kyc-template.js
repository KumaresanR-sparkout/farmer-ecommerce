export const KYCApproveTemplate = (customer) => {
    const template = `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KYC Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                color: #333;
            }
            p {
                font-size: 16px;
                color: #666;
            }
            .button {
                display: block;
                width: 200px;
                margin: 20px auto;
                padding: 10px;
                background-color: #28a745;
                color: #fff;
                text-align: center;
                text-decoration: none;
                border-radius: 4px;
                font-size: 16px;
            }
            .button:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>KYC Verification Required</h1>
            <p>Dear ${customer},</p>
            <p>Your KYC process is complete and has been successfully verified. Thank you for completing the necessary steps to verify your identity.</p>
            <p>If you have any questions or did not request this, please contact our support team.</p>
            <p>Thank you,</p>
            <p>Farmer Ecommerce</p>
        </div>
    </body>
    </html>
    `
    return template
}
