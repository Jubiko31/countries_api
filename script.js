const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const regions = document.querySelectorAll(".regions")
const search = document.querySelector('.search');
const darkMode = document.querySelector('.dark');
const night = document.querySelector('.night');

async function fetchCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    console.log(res);
    res.forEach(element => {
        showCountry(element)
    });
}

fetchCountry();

function showCountry(data) {
    const country = document.createElement("div");
    country.classList.add("list");
    country.innerHTML = `
    <div class="country-img">
        <img src="${data.flags.png}" alt="">
    </div>
    <div class="country-info">
        <h4 class="countryName">${data.name.common}</h4>
        <p><strong>Population:</strong> ${data.population}</p>
        <p class="region"><strong>Region:</strong> ${data.region}</p>
        <p><strong>Capital:</strong> ${data.capital}</p>
    </div>`
    countriesElem.appendChild(country);
    country.addEventListener("click", () => {
        showCountryDetail(data);
    })
}

dropDown.addEventListener('click', () =>{
    dropElem.classList.toggle("show");
    console.log("kkkk")
})

/*------------------------------FILTER BY REGION-------------------------------------*/
const region = document.getElementsByClassName("region")
const countryName = document.getElementsByClassName("countryName")

regions.forEach(e => {
    e.addEventListener("click", () => {
        console.log(e);
       Array.from(region).forEach(el => {
           if (el.innerText.includes(e.innerText)) {
               el.parentElement.parentElement.style.display = "grid"
           } else {
                el.parentElement.parentElement.style.display = "none"
           }
       });
    })
});

search.addEventListener("input", () => {
    console.log(search.value.toLowerCase());
    Array.from(countryName).forEach(element => {
        if (element.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            element.parentElement.parentElement.style.display = "grid"
        } else {
            element.parentElement.parentElement.style.display = "none"
        }
    });
})

darkMode.addEventListener("click", () => {
    document.body.classList.toggle('dark-mode');
    night.classList.toggle('fas');
})

const countryInfo = document.querySelector('.country-details');

function showCountryDetail(data) {
    countryInfo.classList.toggle("show");
    countryInfo.innerHTML =  `
    <button class="back">Back</button>
    <div class="info">
        <div class="flag-info">
            <img src="${data.flags.png}" alt="">
        </div>
        <div class="main-info">
            <h1>${data.name.common}</h1>
            <div class="info-div">
                <div class="inner info-left">
                    <p><strong>Native Name:</strong> ${data.name.common}</p>
                    <p><strong>Population:</strong> ${data.population}</p>
                    <p><strong>Sub Region:</strong> ${data.subregion}</p>
                    <p><strong>Capital:</strong> ${data.capital}</p>
                </div>
                <div class="inner info-right">
                    <p><strong>Top Level Domain:</strong> ${data.tld}</p>              
                </div>
            </div>
        </div>
        </div>     
    </div>`
    const back = countryInfo.querySelector('.back');
    back.addEventListener("click", () => {
        countryInfo.classList.toggle("show");
    })
}

