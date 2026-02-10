let lang = "en";

const text = {
  en: {
    title: "VIN Decoder 🚗",
    decode: "Decode",
    info: `
VIN is a 17-character code.
1–3: Country & Manufacturer
4–9: Vehicle details
10: Model year
11: Assembly plant
12–17: Serial number

Examples:
J = Japan
W = Germany
1 = USA
`
  },
  ar: {
    title: "فك ترميز رقم الهيكل 🚗",
    decode: "تحليل",
    info: `
رقم الهيكل يتكون من 17 رمزاً.
1–3: الدولة والشركة
4–9: تفاصيل السيارة
10: سنة الصنع
11: مصنع التجميع
12–17: الرقم التسلسلي

مثال:
J = اليابان
W = ألمانيا
1 = أمريكا
`
  },
  ku: {
    title: "فێرکاری VIN 🚗",
    decode: "پشکنین",
    info: `
VIN پێکهاتووە لە 17 پیت.
1–3: وڵات و کۆمپانیا
4–9: زانیاری ئۆتۆمبێل
10: ساڵی بەرهەم
11: شوێنی کۆکردنەوە
12–17: ژمارەی تایبەت

نموونە:
J = ژاپۆن
W = ئەڵمانیا
1 = ئەمریکا
`
  }
};

function changeLanguage() {
  lang = document.getElementById("language").value;
  document.getElementById("title").innerText = text[lang].title;
  document.getElementById("decodeBtn").innerText = text[lang].decode;
  document.getElementById("vinInfoText").innerText = text[lang].info;
}

changeLanguage();

function decodeVIN() {
  const vin = vinInput.value.toUpperCase();
  if (vin.length !== 17) return;

  const brands = {
    JHM: ["Honda", "logos/honda.png"],
    JT2: ["Toyota", "logos/toyota.png"],
    WBA: ["BMW", "logos/bmw.png"],
    WDC: ["Mercedes", "logos/mercedes.png"]
  };

  const wmi = vin.substring(0,3);
  const brand = brands[wmi] || ["Unknown", ""];

  result.innerHTML = `
    <div class="card">
      ${brand[1] ? `<img class="logo" src="${brand[1]}">` : ""}
      <p><b>Brand:</b> ${brand[0]}</p>
      <p><b>Country Code:</b> ${vin[0]}</p>
      <p><b>Year Code:</b> ${vin[9]}</p>
      <p><b>Serial:</b> ${vin.slice(11)}</p>
    </div>
  `;
}