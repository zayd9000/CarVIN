function decodeVIN() {
  const vin = document.getElementById("vinInput").value.toUpperCase();
  const result = document.getElementById("result");

  if (vin.length !== 17) {
    result.innerHTML = "<p>❌ VIN must be exactly 17 characters</p>";
    return;
  }

  // VIN transliteration values
  const values = {
    A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,
    J:1,K:2,L:3,M:4,N:5,P:7,R:9,
    S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9,
    0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9
  };

  const weights = [8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += values[vin[i]] * weights[i];
  }

  let checkDigit = sum % 11;
  checkDigit = checkDigit === 10 ? "X" : checkDigit.toString();
  const isValid = checkDigit === vin[8];

  const countryCodes = {
    "1":"USA","2":"Canada","3":"Mexico",
    "J":"Japan","K":"South Korea",
    "S":"UK","W":"Germany","Z":"Italy"
  };

  const brands = {
    "JHM": { name: "Honda", logo: "logos/honda.png" },
    "JT2": { name: "Toyota", logo: "logos/toyota.png" },
    "WBA": { name: "BMW", logo: "logos/bmw.png" },
    "WDC": { name: "Mercedes-Benz", logo: "logos/mercedes.png" },
    "SAL": { name: "Land Rover", logo: "logos/landrover.png" },
    "VF1": { name: "Renault", logo: "logos/renault.png" }
  };

  const wmi = vin.substring(0,3);
  const brand = brands[wmi] || { name: "Unknown", logo: "" };

  const yearCodes = {
    A:2010,B:2011,C:2012,D:2013,E:2014,
    F:2015,G:2016,H:2017,J:2018,
    K:2019,L:2020,M:2021,N:2022,
    P:2023,R:2024,S:2025
  };

  result.innerHTML = `
    <div class="card">
      <h3>🚗 Vehicle Information</h3>
      ${brand.logo ? `<img class="logo" src="${brand.logo}">` : ""}
      <p><strong>Brand:</strong> ${brand.name}</p>
      <p><strong>Country:</strong> ${countryCodes[vin[0]] || "Unknown"}</p>
      <p><strong>Model Year:</strong> ${yearCodes[vin[9]] || "Unknown"}</p>
      <p><strong>Assembly Plant:</strong> ${vin[10]}</p>
      <p><strong>Serial Number:</strong> ${vin.slice(11)}</p>
      <p><strong>VIN Status:</strong> ${isValid ? "✅ Valid VIN" : "❌ Invalid VIN"}</p>
    </div>

    <div class="card">
      <h3>📘 How VIN Numbers Work</h3>
      <p>1–3: Manufacturer & Country</p>
      <p>4–9: Vehicle Details</p>
      <p>10: Model Year</p>
      <p>11: Assembly Plant</p>
      <p>12–17: Serial Number</p>
    </div>
  `;
}