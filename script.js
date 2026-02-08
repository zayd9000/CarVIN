function decodeVIN() {
  const vin = document.getElementById("vinInput").value.toUpperCase();
  const info = document.getElementById("info");
  const flag = document.getElementById("flag");
  const carImage = document.getElementById("carImage");

  if (vin.length < 10) {
    info.textContent = "Please enter a valid VIN.";
    flag.style.display = carImage.style.display = "none";
    return;
  }

  // COUNTRY
  const countryMap = {
    "1": ["United States", "https://flagcdn.com/us.svg"],
    "4": ["United States", "https://flagcdn.com/us.svg"],
    "5": ["United States", "https://flagcdn.com/us.svg"],
    "2": ["Canada", "https://flagcdn.com/ca.svg"],
    "3": ["Mexico", "https://flagcdn.com/mx.svg"],
    "J": ["Japan", "https://flagcdn.com/jp.svg"],
    "K": ["South Korea", "https://flagcdn.com/kr.svg"],
    "L": ["China", "https://flagcdn.com/cn.svg"],
    "W": ["Germany", "https://flagcdn.com/de.svg"],
    "S": ["United Kingdom", "https://flagcdn.com/gb.svg"],
    "Z": ["Italy", "https://flagcdn.com/it.svg"]
  };

  const country = countryMap[vin[0]] || ["Unknown", ""];

  // BRAND (WMI)
  const brandMap = {
    "JHM": "Honda",
    "JT": "Toyota",
    "JTD": "Toyota",
    "JN": "Nissan",
    "WDB": "Mercedes-Benz",
    "WVW": "Volkswagen",
    "WAU": "Audi",
    "WB": "BMW",
    "1HG": "Honda",
    "1FA": "Ford",
    "1G": "Chevrolet",
    "KNA": "Kia",
    "KMH": "Hyundai"
  };

  let brand = "Unknown";
  for (let key in brandMap) {
    if (vin.startsWith(key)) {
      brand = brandMap[key];
      break;
    }
  }

  // MODEL YEAR (10th character)
  const yearMap = {
    A: 2010, B: 2011, C: 2012, D: 2013, E: 2014,
    F: 2015, G: 2016, H: 2017, J: 2018, K: 2019,
    L: 2020, M: 2021, N: 2022, P: 2023, R: 2024,
    S: 2025
  };

  const year = yearMap[vin[9]] || "Unknown";

  // CAR IMAGES BY BRAND
  const imageMap = {
    "Toyota": "https://images.unsplash.com/photo-1549924231-f129b911e442",
    "BMW": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738",
    "Mercedes-Benz": "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "Honda": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    "Ford": "https://images.unsplash.com/photo-1502877338535-766e1452684a"
  };

  info.innerHTML = `
    <strong>Country:</strong> ${country[0]}<br>
    <strong>Brand:</strong> ${brand}<br>
    <strong>Model Year:</strong> ${year}
  `;

  if (country[1]) {
    flag.src = country[1];
    flag.style.display = "block";
  }

  if (imageMap[brand]) {
    carImage.src = imageMap[brand];
    carImage.style.display = "block";
  } else {
    carImage.style.display = "none";
  }
}
