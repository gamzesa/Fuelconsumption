function estimateFuelSavings() {
    var modelChoice = document.getElementById('modelChoice').value;
    var mileage = document.getElementById('mileage').value;
    var year = document.getElementById('year').value;
    var engineSize = document.getElementById('engineSize').value;

    if (!mileage || !year || !engineSize) {
        alert("Lütfen tüm alanları doldurun");
        return;
    }

    // Basit model simülasyonları (Gerçek hesaplamalar bir API aracılığıyla yapılmalıdır)
    var baseSavings = 100; // Temel benzin tasarruf miktarı
    var modelFactor = getModelFactor(modelChoice);
    var savings = baseSavings * modelFactor - mileage / 1000 - (2024 - year);

    document.getElementById('fuelSavings').textContent = `${savings.toFixed(2)} litre`;
}

function getModelFactor(model) {
    switch(model) {
        case 'linear': return 1.0;
        case 'randomForest': return 1.2;
        case 'gradientBoosting': return 1.5;
        case 'svr': return 0.8;
        case 'knn': return 1.1;
        default: return 1.0;
    }
}
