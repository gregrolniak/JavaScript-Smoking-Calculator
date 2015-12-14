var $ = function (id) {
    return document.getElementById(id);
}

var calculate_click = function () {
    var packPrice = parseFloat( $("packPrice").value );
    var numberCigs = parseFloat( $("numberCigs").value );
    var inflation = parseInt( $("inflation").value );

	$("expense").value = "";
	
	if (isNaN(packPrice) || packPrice <= 0) {
		alert("Price per pack must be a valid number\nand greater than zero.");
	} else if(isNaN(numberCigs) || numberCigs <= 0) {
		alert("Number of cigarettes must be a valid number\nand greater than zero.");
	} else if(isNaN(inflation) || inflation <= 0) {
		alert("Years must be a valid number\nand greater than zero.");
	} else {
		var smoking_stats = new SmokingStats(packPrice, numberCigs, inflation);
		$("expense").value = smoking_stats.getExpense().toFixed(2);
	} 
}

var SmokingStats = function (init_packPrice, init_numberCigs, init_inflation) {
	this.packPrice = init_packPrice;
	this.numberCigs = init_numberCigs;
	this.inflation = init_inflation;
	this.cigsToPacks = 0.05;
	this.packsPerDay = this.numberCigs * this.cigsToPacks;
	this.pricePerDay = this.packsPerDay * this.packPrice;
	this.expense = 0;
	this.daysInFiftyYears = 18250;
	this.yearlyToDailyConversionFactor = 0.0027397260273973;
	this.percentToDecimalConversionFactor = 0.01;
	this.dailyInflation = (this.inflation * this.yearlyToDailyConversionFactor) * this.percentToDecimalConversionFactor;
}

SmokingStats.prototype.getExpense = function () {
	for ( i = 1; i <= this.daysInFiftyYears; i++ ) {
		this.expense = this.expense + this.pricePerDay;
		this.pricePerDay = this.pricePerDay + (this.pricePerDay * this.dailyInflation);
	}
	return this.expense;
}

window.onload = function () {
    $("calculate").onclick = calculate_click;
    $("investment").focus();
}

