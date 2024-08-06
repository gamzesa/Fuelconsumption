function showVehicleDetails() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var location = document.getElementById('location').value;
    var budget = document.getElementById('budget').value;

    if (!name || !age || !location || !budget) {
        alert("Lütfen tüm alanları doldurun");
        return;
    }

    var userDetails = document.getElementById('userDetails');
    var vehicleDetails = document.getElementById('vehicleDetails');

    // Kullanıcı bilgileri bölümünü gizle
    userDetails.style.display = 'none';
    
    // Araç bilgileri bölümünü göster ve fade-in efekti ekle
    vehicleDetails.style.display = 'block';
    vehicleDetails.classList.add('fade-in');
}

function calculate() {
    var modelChoice = document.getElementById('modelChoice').value;
    var transmission = document.getElementById('transmission').value;
    var mileage = document.getElementById('mileage').value;
    var year = document.getElementById('year').value;
    var engineSize = document.getElementById('engineSize').value;
    var budget = parseInt(document.getElementById('budget').value);

    if (!mileage || !year || !engineSize) {
        alert("Lütfen tüm alanları doldurun");
        return;
    }

    // Basit bir örnek hesaplama (gerçek modeli entegre etmek için sunucu tarafı kodlarınız gerekebilir)
    var baseSavings = 100;
    var modelFactor = getModelFactor(modelChoice);
    var savings = baseSavings * modelFactor - mileage / 1000 - (2024 - year);
    var estimatedPrice = 1000; // Örnek araç fiyatı, gerçek uygulamada modelden tahmin edilebilir

    document.getElementById('fuelSavings').textContent = `${savings.toFixed(2)} litre`;

    // Bütçe kontrolü
    if (estimatedPrice <= budget) {
        document.getElementById('butcekontrolgreen').textContent = "Bütçeniz için uygun bir araç.";
    } else {
        document.getElementById('butcekontrolred').textContent = "Bütçeniz için uygun bir araç değil.";
    }
}


function getModelFactor(model) {
    const modelMetrics = {
        'Linear Regression': 1.0,
        'Random Forest': 1.2,
        'Gradient Boosting': 1.5,
        'Support Vector Regression': 0.8,
        'K-Nearest Neighbors': 1.1
    };
    return modelMetrics[model] || 1.0;
}
