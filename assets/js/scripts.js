const yearRange = document.getElementById("years-range"),
    yearValue = document.getElementById("years-value"),
    rateRange = document.getElementById("rate-range"),
    rateValue = document.getElementById("rate-value"),
    loanInputValue = document.getElementById("loan-input"),
    taxInputValue = document.getElementById("tax-input"),
    insuranceInputValue = document.getElementById("insurance-input"),
    colorPrimaryBlueDarkets = "#1b3979",
    colorLightGray = "#DDD";
let loanValue = 0;
window.onload = () => {
    setValue(yearRange, yearValue);
    setValue(rateRange, rateValue);
    updateValueTxt(yearRange, yearValue);
    updateValueTxt(rateRange, rateValue);
    setComas(loanInputValue);
    setComas(taxInputValue);
    setComas(insuranceInputValue);
};
const setValue = (input, output) => (output.innerHTML = input.value),
    updateValueTxt = (input, output) => {
        input.oninput = () => {
            output.innerHTML = input.value;
            let value =
                ((input.value - input.min) / (input.max - input.min)) * 100;
            input.style.background = `linear-gradient(to right, ${colorPrimaryBlueDarkets} 0%, ${colorPrimaryBlueDarkets} ${value}%, ${colorLightGray} ${value}%, ${colorLightGray} 100%)`;
        };
    },
    setComas = (input) => {
        input.addEventListener("keyup", function (e) {
            let num = this.value.replace(/,/gi, ""),
                num2 = num.split(/(?=(?:\d{3})+$)/).join(",");
            this.value = num2;
        });
    },
    calculate = () => {
        if (validation()) {
            getValues();
        }
    },
    getValues = () => {
        let yearsOfMortgage = yearRange.value,
            interestRate = rateRange.value,
            loanAmount = loanInputValue.value.replace(/,/g, ""),
            annualTax = taxInputValue.value.replace(/,/g, ""),
            annualInsurance = insuranceInputValue.value.replace(/,/g, ""),
            principleAndInterests =
                ((interestRate / 100 / 12) * loanAmount) /
                (1 -
                    Math.pow(
                        1 + interestRate / 100 / 12,
                        -yearsOfMortgage * 12
                    )),
            tax = annualTax / 12,
            insurance = annualInsurance / 12,
            total = principleAndInterests + tax + insurance;
        showResults(principleAndInterests, tax, insurance, total);
    },
    showResults = (principleAndInterests, tax, insurance, total) => {
        document.getElementById("result-principal").innerHTML =
            "$ " + principleAndInterests;
        document.getElementById("result-tax").innerHTML = "$ " + tax;
        document.getElementById("result-insurance").innerHTML =
            "$ " + insurance;
        document.getElementById("result-total").innerHTML = "$ " + total;
        document.getElementById("results-container").classList.remove("empty");
    },
    validation = () => {
        let loan = (tax = insurance = false);
        if (loanInputValue.value) {
            loan = true;
            loanInputValue.parentElement.parentElement.parentElement.classList.remove(
                "empty"
            );
        } else {
            loanInputValue.parentElement.parentElement.parentElement.classList.add(
                "empty"
            );
        }
        if (taxInputValue.value) {
            tax = true;
            taxInputValue.parentElement.parentElement.parentElement.classList.remove(
                "empty"
            );
        } else {
            taxInputValue.parentElement.parentElement.parentElement.classList.add(
                "empty"
            );
        }
        if (insuranceInputValue.value) {
            insurance = true;
            insuranceInputValue.parentElement.parentElement.parentElement.classList.remove(
                "empty"
            );
        } else {
            insuranceInputValue.parentElement.parentElement.parentElement.classList.add(
                "empty"
            );
        }
        if (loan && tax && insurance) {
            return true;
        } else {
            return false;
        }
    },
    onFocus = (elem) => {
        elem.parentElement.parentElement.classList.add("focused");
    },
    onFocusOut = (elem) => {
        elem.parentElement.parentElement.classList.remove("focused");
    };
