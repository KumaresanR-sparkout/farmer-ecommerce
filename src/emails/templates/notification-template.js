export const notificationTempalte = () => {
    const template = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Product Arrival</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333333;
            margin-top: 0;
        }
        .content p {
            color: #555555;
        }  
        .footer {
            background-color: #eeeeee;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Product Arrival</h1>
        </div>
        <div class="content">
            <h2>Dear Customer,</h2>
            <p>We are excited to announce that a new product has arrived from one of our farmers! Check out</p>
            
            <p>Don't miss out on this fresh new product.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Farmer Ecommerce. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    return template
}