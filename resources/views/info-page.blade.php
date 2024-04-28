<!-- resources/views/Pages/Darek/info-page.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Info Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .info-page {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .info-page h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .info-page p {
            font-size: 16px;
            color: #666;
            margin-bottom: 10px;
        }
        .property-image img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            margin-top: 20px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="info-page">
        <h1>Info Page</h1>
        <p><strong>ID:</strong> {{ $id }}</p>
        <p><strong>City:</strong> {{ $city }}</p>
        <p><strong>Type:</strong> {{ $type }}</p>
        
        {{-- Display image --}}
        <div class="property-image">
            <img src="{{ asset('path/to/your/image.jpg') }}" alt="Property Image">
        </div>
    </div>
</body>
</html>
