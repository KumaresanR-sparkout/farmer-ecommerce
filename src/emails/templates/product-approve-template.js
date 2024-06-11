export const productApproveTemplate=()=>{
    const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Approval</title>
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
        <h1>Product Approval Notification</h1>
        <p>Dear farmer,</p>
        <p>We are pleased to inform you that your product has been successfully approved for listing on our platform. Thank you for your submission and we look forward to seeing your product thrive.</p>
        <p>If you have any questions or need further assistance, please contact our support team.</p>
        <p>Thank you,</p>
        <p>Farmer Ecommerce</p>
    </div>
</body>
</html>
`
return template
}