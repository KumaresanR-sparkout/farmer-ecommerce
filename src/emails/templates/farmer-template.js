export const farmerTemplate = (data) => {
    const { buyerName, productName, quantity, totalPrice } = data
    const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333333;
            }
            table {
                width: 100%;
                margin-bottom: 20px;
                border-collapse: collapse;
            }
            table th, table td {
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: left;
            }
            table th {
                background-color: #f2f2f2;
            }
            .footer {
                text-align: center;
                color: #888888;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>New Order Notification</h2>
            <p>Dear Farmer,</p>
            <p>You have received a new order from <strong>${buyerName}</strong>. Here are the details:</p>
            <table>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity Ordered</th>
                    <th>Total Price</th>
                </tr>
                <tr>
                    <td>${productName}</td>
                    <td>${quantity}</td>
                    <td>${totalPrice}</td>
                </tr>
            </table>
            <p>Please prepare the items for delivery.</p>
            <p>Thank you for your hard work and dedication.</p>
            <p>Best regards,</p>
            <p>Farmer Ecommerce</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Farmer Ecommerce. All rights reserved.</p>
        </div>
    </body>
    </html>
    `
    return template
}