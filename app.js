document.querySelector('#loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});
//calculate results
function calculateResults(e){
    //UI vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#years');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //Show results
    document.getElementById('results').style.display = 'block';
    //Hide loader
    document.getElementById('loading').style.display = 'none';
    }else{
        showErrors('Please Check Your Numbers');
    }
}

//show errors
function showErrors(error){
    //hide results
    document.getElementById('results').style.display = 'none';
    //Hide loader
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}
function clearError(){
    document.querySelector('.alert').remove();
}