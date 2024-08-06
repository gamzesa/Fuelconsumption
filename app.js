//select html elements
var passengersElement = document.getElementById('num-pass-input');
var gasPriceElement = document.getElementById('gas-price-input');
var consumptionElement = document.getElementById('average-consumption-input');
var distanceElement = document.getElementById('total-distance-input');
var wayBackElement = document.getElementById('way-back-input');
var resultElement = document.getElementById('display-result-value');
var buttonElement = document.getElementById('button-click');
var inputsAllElement = document.getElementsByClassName('inputs-field');



//take value and accept only numbers
var getValues = function () {
    console.log('getValues()');

    return {
        numberOfPassengers: Number(passengersElement.value),
        gasPrice: Number(gasPriceElement.value),
        averageConsumption: Number(consumptionElement.value),
        totalDistance: Number(distanceElement.value),
        wayBack: wayBackElement.checked
    }
};

//validation rejects zero and negative inputs value
var validate = function (inputData) {
    console.log('validate()');

    // console.log(inputData);

    if (inputData.numberOfPassengers <= 0 || inputData.gasPrice <= 0 || inputData.averageConsumption <= 0
        || inputData.totalDistance <= 0) {
        console.log('cislo je nula nebo nizsi');
        return false
    }

    else {
        console.log('numberOfPassengers je OK');
        return true
    }
};

//calculation formula, wayBack condition and display result
var calculate = function (inputData) {
    console.log('calculate()');

    var result = (((inputData.totalDistance / 100) * inputData.gasPrice * inputData.averageConsumption)
        / inputData.numberOfPassengers);

        if (inputData.wayBack) {
            return result * 2
        }
        else {
            return result
        }
    };
    //resultElement.innerHTML = 'Everybody will pay ' + Math.round(wayBack() * 100) / 100 + ' CZK.'




//finalRun decides between calculate (true) or alert (false)
var finalRun = function () {
    console.log('finalRun()');

    var inputData = getValues();

    if (validate(inputData)) {
        console.log('splnena podminka true - calculate');

        var result = calculate(inputData);
        var roundedResult = result.toFixed(2);


        resultElement.innerHTML = 'Everybody will pay ' + roundedResult + ' CZK.';
    }
    else {
        alert('You have to put number higher than 0');
        console.log('false - vyhodi alert');
    }
};

//run finalRun through click on button input
buttonElement.addEventListener('click', function () {
    console.log('button click');
    //   console.log('button-clicked');
    finalRun()
});


//loop for inputs class instead of id
//pocitadlo
for (var index = 0; index < inputsAllElement.length; ++index) {
    // console.log('zavolal jsem for loop')
    var singleInputElement = inputsAllElement[index];
    // console.log('pres index jsem si vytahl z pole singleInputElement ktery je: ', singleInputElement);

    singleInputElement.addEventListener('keypress', function (event) {
        var key = event.keyCode;
        if (key === 13) {
            console.log('keypress enter');

            finalRun()
        }
        // console.log('event: ', event);
    });
}

