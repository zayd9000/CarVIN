let lang = "en";
let history = JSON.parse(localStorage.getItem("vin_history")) || [];

const years = {
    'A':2010, 'B':2011, 'C':2012, 'D':2013, 'E':2014, 'F':2015, 'G':2016, 'H':2017,
    'J':2018, 'K':2019, 'L':2020, 'M':2021, 'N':2022, 'P':2023, 'R':2024, 'S':2025, 'T':2026
};

// Expanded Brands (WMI Codes)
const brands = {
    "JHM": "Honda", "1HG": "Honda", "5FN": "Honda",
    "JT2": "Toyota", "JTN": "Toyota", "4T1": "Toyota", "5TB": "Toyota",
    "WBA": "BMW", "WBS": "BMW M", "4US": "BMW (USA)",
    "WDC": "Mercedes-Benz", "W1N": "Mercedes-Benz", "4JG": "Mercedes-Benz",
    "WAU": "Audi", "TRU": "Audi", "WVW": "Volkswagen", "WVG": "Volkswagen",
    "1FA": "Ford", "1FT": "Ford", "1F6": "Ford",
    "1G1": "Chevrolet", "1GC": "GMC", "1GN": "Chevrolet",
    "JN1": "Nissan", "1N4": "Nissan", "5N1": "Nissan",
    "KMH": "Hyundai", "KNA": "Kia", "SNA": "Kia",
    "SAL": "Land Rover", "SAD": "Jaguar", "SCC": "Lotus",
    "VF1": "Renault", "VF3": "Peugeot", "ZAR": "Alfa Romeo",
    "WP0": "Porsche", "WPO": "Porsche", "JTH": "Lexus",
    "LZE": "Isuzu", "KL3": "Chevrolet (Korea)", "MAL": "Suzuki"
};

const translations = {
    en: {
        title: "VIN Decoder 🚗", btn: "Decode", history: "Recent Searches",
        struct: "VIN Structure Guide", brand: "Brand", year: "Year",
        serial: "Serial", wmi: "WMI Code", country: "Country Code"
    },
    ar: {
        title: "فحص VIN 🚗", btn: "تحليل", history: "عمليات البحث الأخيرة",
        struct: "دليل هيكل رقم الشاصي", brand: "الشركة", year: "السنة",
        serial: "الرقم التسلسلي", wmi: "رمز المصنع", country: "رمز الدولة"
    },
    ku: {
        title: "VIN پشکنین 🚗", btn: "پشکنین", history: "گەڕانەکانی دوایی",
        struct: "ڕێبەری پێکهاتەی VIN", brand: "مارکە", year: "ساڵ",
        serial: "ژمارەی زنجیرە", wmi: "کۆدی کارگە", country: "کۆدی وڵات"
    }
};

function changeLanguage() {
    lang = document.getElementById("language").value;
    const t = translations[lang];
    
    document.getElementById("title").innerText = t.title;
    document.getElementById("decodeBtn").innerText = t.btn;
    document.getElementById("historyTitle").innerText = t.history;
    document.getElementById("structureTitle").innerText = t.struct;
    document.getElementById("vinInfoText").innerText = vinInfoText[lang];
    
    document.body.style.direction = (lang === 'en') ? 'ltr' : 'rtl';
    updateHistoryUI();
}

function decodeVIN(inputVin = null) {
    const vin = (inputVin || document.getElementById("vinInput").value).toUpperCase().trim();
    if (vin.length !== 17) return;

    const wmi = vin.substring(0, 3);
    const brandName = brands[wmi] || "Unknown Brand";
    const year = years[vin[9]] || "Pre-2010 / Unknown";

    // Update Result
    document.getElementById("result").innerHTML = `
        <div class="card">
            <p><b>${translations[lang].brand}:</b> ${brandName}</p>
            <p><b>${translations[lang].year}:</b> ${year} (${vin[9]})</p>
            <p><b>${translations[lang].wmi}:</b> ${wmi}</p>
            <p><b>${translations[lang].serial}:</b> ${vin.slice(11)}</p>
        </div>
    `;

    if (!inputVin) saveToHistory(vin);
}

function saveToHistory(vin) {
    if (history.includes(vin)) return;
    history.unshift(vin);
    if (history.length > 5) history.pop();
    localStorage.setItem("vin_history", JSON.stringify(history));
    updateHistoryUI();
}

function updateHistoryUI() {
    const list = document.getElementById("historyList");
    list.innerHTML = history.map(v => 
        `<div class="history-item" onclick="decodeVIN('${v}')">${v}</div>`
    ).join('');
}

// Initialize on load
window.onload = () => {
    changeLanguage();
    updateHistoryUI();
};
