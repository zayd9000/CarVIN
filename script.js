let lang = "en";

const vinInfoText = {
  en: `VIN has 17 characters.

1st character = Country / Region

USA & North America:
1, 4, 5 → United States
2 → Canada
3 → Mexico

Europe:
W → Germany
V → France / Spain
S → United Kingdom
Z → Italy
Y → Sweden / Finland
T → Switzerland

Asia:
J → Japan
K → South Korea
L → China
M → India / Thailand / Indonesia

Middle East & Africa:
A–H → Africa
N → Turkey

South America:
8, 9 → Brazil / Argentina / Chile
`,
  ar: `رقم VIN يتكون من 17 رمزاً.

الرمز الأول = الدولة

أمريكا الشمالية:
1،4،5 → أمريكا
2 → كندا
3 → المكسيك

أوروبا:
W → ألمانيا
V → فرنسا / إسبانيا
S → بريطانيا
Z → إيطاليا

آسيا:
J → اليابان
K → كوريا الجنوبية
L → الصين
M → الهند / تايلند / إندونيسيا
`,
  ku: `VIN پێکهاتووە لە 17 پیت.

پیتی یەکەم = وڵات

ئەمریکا:
1،4،5 → ئەمریکا
2 → کەنەدا
3 → مەکسیک

ئەورووپا:
W → ئەڵمانیا
S → بەریتانیا
Z → ئیتالیا

ئاسیا:
J → ژاپۆن
K → کۆریای باشوور
L → چین
M → هیند / تایلاند / ئیندۆنیزیا
`
};

function changeLanguage() {
  lang = language.value;

  title.innerText =
    lang === "ku" ? "VIN پشکنین 🚗" :
    lang === "ar" ? "فحص VIN 🚗" :
    "VIN Decoder 🚗";

  decodeBtn.innerText =
    lang === "ku" ? "پشکنین" :
    lang === "ar" ? "تحليل" :
    "Decode";

  vinInput.placeholder =
    lang === "ku" ? "ژمارەی VIN بنووسە" :
    lang === "ar" ? "اكتب رقم VIN" :
    "Enter VIN number";

  vinInfoTextElem.innerText = vinInfoText[lang];
}

const vinInfoTextElem = document.getElementById("vinInfoText");
changeLanguage();

function copyVinInfo() {
  navigator.clipboard.writeText(vinInfoText[lang]);
  alert("VIN info copied ✅");
}

function decodeVIN() {
  const vin = vinInput.value.toUpperCase();
  if (vin.length !== 17) return;

  const brands = {
    JHM: ["Honda", "logos/honda.png"],
    JT2: ["Toyota", "logos/toyota.png"],
    JTN: ["Toyota", "logos/toyota.png"],
    WBA: ["BMW", "logos/bmw.png"],
    WDC: ["Mercedes-Benz", "logos/mercedes.png"],
    WAU: ["Audi", "logos/audi.png"],
    WVW: ["Volkswagen", "logos/volkswagen.png"],
    JN1: ["Nissan", "logos/nissan.png"],
    KMH: ["Hyundai", "logos/hyundai.png"],
    KNA: ["Kia", "logos/kia.png"],
    1HG: ["Honda", "logos/honda.png"],
    1FT: ["Ford", "logos/ford.png"],
    1FA: ["Ford", "logos/ford.png"],
    1G1: ["Chevrolet", "logos/chevrolet.png"],
    1GC: ["GMC", "logos/gmc.png"],
    SAL: ["Land Rover", "logos/landrover.png"],
    VF1: ["Renault", "logos/renault.png"],
    VF3: ["Peugeot", "logos/peugeot.png"],
    WP0: ["Porsche", "logos/porsche.png"],
    JTH: ["Lexus", "logos/lexus.png"]
  };

  const wmi = vin.substring(0,3);
  const brand = brands[wmi] || ["Unknown", ""];

  result.innerHTML = `
    <div class="card">
      ${brand[1] ? `<img class="logo" src="${brand[1]}">` : ""}
      <p><b>Brand:</b> ${brand[0]}</p>
      <p><b>WMI:</b> ${wmi}</p>
      <p><b>Country Code:</b> ${vin[0]}</p>
      <p><b>Year Code:</b> ${vin[9]}</p>
      <p><b>Serial Number:</b> ${vin.slice(11)}</p>
    </div>
  `;
}