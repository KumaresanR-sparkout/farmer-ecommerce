export const buyerTemplate = (orderData) => {
    const { buyer, name, price, quantity, totalPrice } = orderData
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
            margin: 20px auto;
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
    <p>Dear Customer, ${buyer}</p>
    <p>Thank you for your order. Here are the details of your purchase:</p>
    <table>
        <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
        </tr>
        <tr>
            <td><strong>Price</strong></td>
            <td>${price}</td>
        </tr>
        <tr>
            <td><strong>Quantity</strong></td>
            <td>${quantity}</td>
        </tr>
        <tr>
            <td><strong>Total Price</strong></td>
            <td>${totalPrice}</td>
        </tr>
    </table>
    <p>We appreciate your business!</p>
    <p>Best regards,</p>
    <p>Farmer Ecommerce</p>
</body>
</html>
    `
    return template
}