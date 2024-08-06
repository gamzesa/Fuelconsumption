function estimatePrice() {
    var mileage = document.getElementById('mileage').value;
    var year = document.getElementById('year').value;
    var engineSize = document.getElementById('engineSize').value;

    if (!mileage || !year || !engineSize) {
        alert("Please fill in all fields");
        return;
    }

    // Simulate price estimation using a basic formula (for demonstration purposes)
    var basePrice = 10000;
    var ageFactor = 2024 - year; // Assuming the current year is 2024
    var depreciation = mileage / 10000;
    var engineFactor = engineSize * 500;

    var estimatedPrice = basePrice - (ageFactor * 300) - depreciation + engineFactor;
    estimatedPrice = Math.max(estimatedPrice, 1000); // Setting a minimum price

    document.getElementById('priceEstimate').textContent = `$${estimatedPrice.toFixed(2)}`;
}

document.getElementById('mileage').addEventListener('change', estimatePrice);
document.getElementById('year').addEventListener('change', estimatePrice);
document.getElementById('engineSize').addEventListener('change', estimatePrice);
