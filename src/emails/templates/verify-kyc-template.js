export const KYCVerifyTemplate = (customer) => {
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
            <p>We need to verify your identity to complete your KYC process. Please click the button below to upload your KYC documents.</p>
            <a href="http://localhost:3000/api/ecom/v1/upload" class="button">Verify KYC</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Thank you,</p>
            <p>Farmer Ecommerce</p>
        </div>
    </body>
    </html>
    `
    return template
}
