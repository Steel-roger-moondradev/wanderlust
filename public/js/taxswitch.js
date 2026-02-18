
    const toggleSwitch = document.getElementById("taxSwitch");

toggleSwitch.addEventListener("change", () => {

    const withTax = document.querySelectorAll(".tax-with");
    const withoutTax = document.querySelectorAll(".tax-without");

    if (toggleSwitch.checked) {
        withTax.forEach(el => el.style.display = "");
        withoutTax.forEach(el => el.style.display = "none");
    } 
    else {
        withoutTax.forEach(el => el.style.display = "");
        withTax.forEach(el => el.style.display = "none");
    }
});
