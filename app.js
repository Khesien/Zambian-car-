/* =========================================================
   ZedCars.co.zm - cars.co.za Engine & WhatsApp Orchestration
   ========================================================= */

// Dealership WhatsApp Hotlines (Zambia +260)
const DEALER_WHATSAPP_MAIN = '260975892100';      // Lusaka Main Hub
const DEALER_WHATSAPP_COPPERBELT = '260966453210'; // Kitwe / Ndola Hub
const DEALER_WHATSAPP_FINANCE = '260971200345';   // Bank Finance Lead

// Currency Formatter
function formatZMW(num) {
  return 'K ' + Number(num).toLocaleString('en-US');
}

// Monthly Repayment Formula
function calcInstallment(price, depositPct = 20, termMonths = 48, interestRate = 18.5) {
  const principal = price * (1 - depositPct / 100);
  const monthlyRate = (interestRate / 100) / 12;
  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  return Math.round(payment);
}

// =========================================================
// VEHICLE INVENTORY DATA (Zambian Market)
// =========================================================
const vehicles = [
  {
    id: 1,
    stockId: 'ZC-201',
    make: 'Toyota',
    model: 'Hilux 2.8 GD-6 4x4 Legend RS Double Cab',
    year: 2022,
    bodyType: 'Double Cab',
    price: 895000,
    mileage: 38500,
    transmission: 'Automatic',
    fuel: 'Diesel',
    engine: '2.8L Turbo Diesel (150kW / 500Nm)',
    color: 'Glacier White',
    location: 'Lusaka',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Motorized Roller Shutter', 'JBL Premium Audio', 'Leather Seats', '360 Parking Camera', 'Rear Diff Lock', 'Towbar Ready'],
    description: 'Top-of-the-range Toyota Hilux Legend RS. Perfect workhorse and luxury bakkie. Full RTSA documentation and customs duty paid.'
  },
  {
    id: 2,
    stockId: 'ZC-202',
    make: 'Toyota',
    model: 'Land Cruiser Prado 2.8GD TX-L 4x4',
    year: 2021,
    bodyType: 'SUV',
    price: 1250000,
    mileage: 42000,
    transmission: 'Automatic',
    fuel: 'Diesel',
    engine: '2.8L D-4D Turbo Diesel (150kW)',
    color: 'Attitude Black Mica',
    location: 'Lusaka',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['7 Seats', 'Center Console Cool Box', 'Multi-Terrain Select', 'Heated Seats', 'Apple CarPlay', 'Sunroof'],
    description: 'The executive family safari icon. Extremely smooth ride for long-distance Zambian road trips and heavy off-roading.'
  },
  {
    id: 3,
    stockId: 'ZC-203',
    make: 'Ford',
    model: 'Ranger 2.0 Bi-Turbo Wildtrak 4x4 10-Speed',
    year: 2021,
    bodyType: 'Double Cab',
    price: 780000,
    mileage: 51200,
    transmission: 'Automatic',
    fuel: 'Diesel',
    engine: '2.0L Bi-Turbo Diesel (157kW)',
    color: 'Pride Orange',
    location: 'Kitwe',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['10-Speed Automatic', 'Adaptive Cruise Control', 'Lane Keeping Aid', 'Wildtrak Leather', 'Sync 3 Touchscreen', 'Mountain Top Roller Lid'],
    description: 'Exceptional styling and torque. Full franchise service history in Zambia with verified low mileage.'
  },
  {
    id: 4,
    stockId: 'ZC-204',
    make: 'Isuzu',
    model: 'D-Max 3.0 Ddi V-Cross 4x4 Double Cab',
    year: 2022,
    bodyType: 'Double Cab',
    price: 740000,
    mileage: 34000,
    transmission: 'Automatic',
    fuel: 'Diesel',
    engine: '3.0L Turbo Diesel (140kW / 450Nm)',
    color: 'Valencia Orange',
    location: 'Ndola',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['3.0L Reliability', 'IDAS Safety Suite', '9-Inch Display', 'Rear Diff Lock', 'Factory Side Steps'],
    description: 'Renowned workhorse engineered for rough Copperbelt mining roads. Fuel efficient and cheap to service.'
  },
  {
    id: 5,
    stockId: 'ZC-205',
    make: 'Toyota',
    model: 'Fortuner 2.8 GD-6 4x4 VX Automatic',
    year: 2021,
    bodyType: 'SUV',
    price: 820000,
    mileage: 46000,
    transmission: 'Automatic',
    fuel: 'Diesel',
    engine: '2.8L Turbo Diesel (150kW)',
    color: 'Silver Metallic',
    location: 'Lusaka',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['7 Leather Seats', 'JBL Sound System', 'Blind Spot Monitor', 'Power Tailgate', 'Tow Hitch'],
    description: 'Zambia’s favourite 7-seater family 4x4. Excellent fuel economy and high resale value.'
  },
  {
    id: 6,
    stockId: 'ZC-206',
    make: 'Nissan',
    model: 'Patrol 5.6 V8 LE Luxury 4WD 7-Speed',
    year: 2020,
    bodyType: 'SUV',
    price: 1350000,
    mileage: 63000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '5.6L V8 (298kW / 560Nm)',
    color: 'Pearl White',
    location: 'Lusaka',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Massive 298kW V8 Engine', 'Hydraulic Suspension', 'Rear Entertainment Screens', 'Cool Box', '360 Camera'],
    description: 'The master of road presence and desert crossing power. Absolute VIP comfort.'
  },
  {
    id: 7,
    stockId: 'ZC-207',
    make: 'Toyota',
    model: 'Harrier 2.0 Elegance Hybrid E-Four AWD',
    year: 2019,
    bodyType: 'SUV',
    price: 340000,
    mileage: 58000,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    engine: '2.5L Hybrid Electric (21 km/L)',
    color: 'Dark Purple Mica',
    location: 'Lusaka',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Incredible 21 km/L Economy', 'Lexus Interior Finishes', 'Touch Climate Control', 'Power Tailgate'],
    description: 'Ultra-refined hybrid crossover. Clean Japanese import with verified auction sheet.'
  },
  {
    id: 8,
    stockId: 'ZC-208',
    make: 'Volkswagen',
    model: 'Golf 8 GTI 2.0 TSI DSG (180kW)',
    year: 2022,
    bodyType: 'Hatchback',
    price: 480000,
    mileage: 29000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '2.0L Turbo TSI (180kW)',
    color: 'Pure White',
    location: 'Kitwe',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['7-Speed DSG', 'Digital Innovision Cockpit', 'Harman Kardon Sound', 'Panoramic Sunroof', 'GTI Sport Seats'],
    description: 'The iconic hot hatch. Immaculate condition, lightning shifts, and superb handling.'
  },
  {
    id: 9,
    stockId: 'ZC-209',
    make: 'Honda',
    model: 'Fit 1.5 e:HEV Hybrid Home Edition',
    year: 2020,
    bodyType: 'Hatchback',
    price: 145000,
    mileage: 41000,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    engine: '1.5L e:HEV Hybrid (28 km/L)',
    color: 'Sunlit White',
    location: 'Lusaka',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['28 km per Liter Fuel Economy', 'Magic Fold-Flat Seats', 'Apple CarPlay & Android Auto', 'Push Start'],
    description: 'Under K150,000 budget saver! Ideal city car for Lusaka traffic with low maintenance.'
  },
  {
    id: 10,
    stockId: 'ZC-210',
    make: 'Mercedes-Benz',
    model: 'C200 AMG Line Automatic (W205 Facelift)',
    year: 2020,
    bodyType: 'Sedan',
    price: 520000,
    mileage: 48000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '1.5L Turbo EQ Boost 9G-Tronic',
    color: 'Obsidian Black Metallic',
    location: 'Lusaka',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['AMG Styling Package', '9G-Tronic Gearbox', '64-Color Ambient Light', 'Burmester Surround', 'Panoramic Roof'],
    description: 'Executive luxury sedan. Elegant stance, flawless interior, and dynamic driving modes.'
  },
  {
    id: 11,
    stockId: 'ZC-211',
    make: 'Toyota',
    model: 'Land Cruiser 79 4.5D V8 Double Cab 4x4',
    year: 2021,
    bodyType: 'Double Cab',
    price: 980000,
    mileage: 67000,
    transmission: 'Manual',
    fuel: 'Diesel',
    engine: '4.5L V8 Turbo Diesel (151kW / 430Nm)',
    color: 'Sandy Taupe',
    location: 'Kitwe',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Unbreakable LC79 V8', '180L Dual Fuel Tanks', 'Warn Winch', 'Old Man Emu Suspension', 'Front & Rear Lockers'],
    description: 'Built for the toughest Zambian mining & agricultural terrains. True off-road endurance.'
  },
  {
    id: 12,
    stockId: 'ZC-212',
    make: 'Toyota',
    model: 'HiAce Ses\'fikile 16-Seater Commuter Bus',
    year: 2020,
    bodyType: 'Commercial',
    price: 295000,
    mileage: 72000,
    transmission: 'Manual',
    fuel: 'Petrol',
    engine: '2.7L VVTi Petrol 5-Speed',
    color: 'Polar White',
    location: 'Lusaka',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['16 Passenger Seats', 'Dual Zone High Output AC', 'Reinforced Frame', 'Safety Fire Extinguisher'],
    description: 'Excellent income-generating minibus. Suitable for staff transportation, school contracts, or tours.'
  }
];

// Accessories & Parts
const parts = [
  {
    title: 'Ironman 4x4 Commercial Deluxe Steel Bullbar',
    category: '4x4 Armour',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    desc: 'Heavy-duty front protection for Toyota Hilux, Fortuner, and Ford Ranger.'
  },
  {
    title: 'BF Goodrich All-Terrain T/A KO2 Tyres (Set of 4)',
    category: 'Tyres & Wheels',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
    desc: 'Baja-tested all-terrain tyres. Extreme puncture resistance for Zambian gravel.'
  },
  {
    title: 'Outback Safari Raised Air Intake Snorkel Kit',
    category: 'Air Systems',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    desc: 'Prevents water ingestion and reduces dust intake on dry unpaved roads.'
  },
  {
    title: 'Garmin DriveAssist 51 HD Dashcam & GPS',
    category: 'Electronics',
    price: 3950,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80',
    desc: 'Collision warning, driver alerts, and Southern Africa offline street maps.'
  }
];

// =========================================================
// WHATSAPP URL GENERATOR
// =========================================================
function makeCarWhatsAppUrl(car) {
  const text = `Hello ZedCars.co.zm Zambia! 👋%0A%0AI am interested in this vehicle on your website:%0A%0A🚗 *Vehicle:* ${car.year} ${car.make} ${car.model}%0A💰 *Price:* ${formatZMW(car.price)}%0A📍 *Location:* ${car.location}%0A🏷️ *Ref Code:* ${car.stockId}%0A%0AIs this car available for viewing or test driving? Thank you!`;
  return `https://wa.me/${DEALER_WHATSAPP_MAIN}?text=${text}`;
}

function makeTestDriveUrl(car) {
  const text = `Hello ZedCars Zambia,%0A%0AI would like to *book a test drive* for the *${car.year} ${car.make} ${car.model}* (Ref: ${car.stockId}) located at your *${car.location}* showroom.%0A%0APlease let me know the available time slots.`;
  return `https://wa.me/${DEALER_WHATSAPP_MAIN}?text=${text}`;
}

// =========================================================
// FILTER ENGINE & CARD RENDERING
// =========================================================
let currentFilters = {
  keyword: '',
  make: '',
  location: '',
  category: 'all',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  sortBy: 'featured'
};

const carsListingGrid = document.getElementById('carsListingGrid');
const noCarsBox = document.getElementById('noCarsBox');
const heroSearchCount = document.getElementById('heroSearchCount');

function renderCars(carsArray) {
  if (!carsListingGrid) return;
  carsListingGrid.innerHTML = '';

  if (carsArray.length === 0) {
    if (noCarsBox) noCarsBox.style.display = 'block';
    if (heroSearchCount) heroSearchCount.textContent = '0';
    return;
  }

  if (noCarsBox) noCarsBox.style.display = 'none';
  if (heroSearchCount) heroSearchCount.textContent = carsArray.length;

  carsArray.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-listing-card';

    const monthly = calcInstallment(car.price);
    const waUrl = makeCarWhatsAppUrl(car);

    card.innerHTML = `
      <div class="card-img-holder">
        <img src="${car.images[0]}" alt="${car.year} ${car.make} ${car.model}" loading="lazy">
        <span class="badge-dealer-verified"><i class="fa-solid fa-shield-check"></i> Duty Paid</span>
        <span class="badge-location-overlay"><i class="fa-solid fa-location-dot"></i> ${car.location}</span>
      </div>

      <div class="card-body-content">
        <span class="card-make-year">${car.year} • ${car.make}</span>
        <h3 class="card-car-name">${car.model}</h3>

        <div class="card-pricing-row">
          <span class="card-price-val">${formatZMW(car.price)}</span>
          <span class="card-pm-est">Est: <strong>${formatZMW(monthly)}/pm</strong></span>
        </div>

        <div class="card-specs-row">
          <div class="card-spec-item"><i class="fa-solid fa-gauge-high"></i> ${car.mileage.toLocaleString()} km</div>
          <div class="card-spec-item"><i class="fa-solid fa-gears"></i> ${car.transmission}</div>
          <div class="card-spec-item"><i class="fa-solid fa-gas-pump"></i> ${car.fuel}</div>
          <div class="card-spec-item"><i class="fa-solid fa-car"></i> ${car.bodyType}</div>
        </div>

        <div class="card-cta-group">
          <a href="${waUrl}" target="_blank" class="btn-card-whatsapp">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
          <button class="btn-card-details" onclick="viewCarModal(${car.id})">
            Details
          </button>
        </div>
      </div>
    `;

    carsListingGrid.appendChild(card);
  });
}

function renderAccessories() {
  const partsGrid = document.getElementById('partsItemsGrid');
  if (!partsGrid) return;
  partsGrid.innerHTML = '';

  parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'part-grid-card';
    const waMsg = `Hello ZedCars Parts Desk,%0A%0AI am inquiring about the *${part.title}* (${formatZMW(part.price)}). Do you have stock in Zambia?`;
    const waLink = `https://wa.me/${DEALER_WHATSAPP_MAIN}?text=${waMsg}`;

    card.innerHTML = `
      <img src="${part.image}" alt="${part.title}" class="part-card-img" loading="lazy">
      <div class="part-card-body">
        <span class="part-category">${part.category}</span>
        <h4 class="part-card-title">${part.title}</h4>
        <p class="part-card-desc">${part.desc}</p>
        <div class="part-price-row">
          <span class="part-price-val">${formatZMW(part.price)}</span>
          <a href="${waLink}" target="_blank" class="btn-part-order">
            <i class="fa-brands fa-whatsapp"></i> Inquire
          </a>
        </div>
      </div>
    `;
    partsGrid.appendChild(card);
  });
}

function filterAndSortCars() {
  let list = [...vehicles];

  // Keyword
  if (currentFilters.keyword) {
    const kw = currentFilters.keyword.toLowerCase().trim();
    list = list.filter(c => 
      c.make.toLowerCase().includes(kw) ||
      c.model.toLowerCase().includes(kw) ||
      c.year.toString().includes(kw) ||
      c.location.toLowerCase().includes(kw) ||
      c.stockId.toLowerCase().includes(kw)
    );
  }

  // Make
  if (currentFilters.make) {
    list = list.filter(c => c.make.toLowerCase() === currentFilters.make.toLowerCase());
  }

  // Province / City
  if (currentFilters.location) {
    list = list.filter(c => c.location.toLowerCase().includes(currentFilters.location.toLowerCase()));
  }

  // Category
  if (currentFilters.category && currentFilters.category !== 'all') {
    list = list.filter(c => c.bodyType.toLowerCase() === currentFilters.category.toLowerCase());
  }

  // Min Price
  if (currentFilters.minPrice) {
    list = list.filter(c => c.price >= Number(currentFilters.minPrice));
  }

  // Max Price
  if (currentFilters.maxPrice) {
    list = list.filter(c => c.price <= Number(currentFilters.maxPrice));
  }

  // Min Year
  if (currentFilters.minYear) {
    list = list.filter(c => c.year >= Number(currentFilters.minYear));
  }

  // Max Year
  if (currentFilters.maxYear) {
    list = list.filter(c => c.year <= Number(currentFilters.maxYear));
  }

  // Sorting
  const sortBy = currentFilters.sortBy;
  if (sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'year-desc') {
    list.sort((a, b) => b.year - a.year);
  } else if (sortBy === 'mileage-asc') {
    list.sort((a, b) => a.mileage - b.mileage);
  } else {
    // featured first
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  renderCars(list);
}

function resetAllSearchFilters() {
  currentFilters = {
    keyword: '',
    make: '',
    location: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    sortBy: 'featured'
  };

  const kw = document.getElementById('carsKeywordInput');
  const make = document.getElementById('heroSelectMake');
  const prov = document.getElementById('heroSelectProvince');
  const minP = document.getElementById('heroSelectMinPrice');
  const maxP = document.getElementById('heroSelectMaxPrice');
  const minY = document.getElementById('heroSelectMinYear');
  const maxY = document.getElementById('heroSelectMaxYear');
  const sort = document.getElementById('selectSortBy');

  if (kw) kw.value = '';
  if (make) make.value = '';
  if (prov) prov.value = '';
  if (minP) minP.value = '';
  if (maxP) maxP.value = '';
  if (minY) minY.value = '';
  if (maxY) maxY.value = '';
  if (sort) sort.value = 'featured';

  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-category') === 'all');
  });

  filterAndSortCars();
}

// Global helpers for clicks from header or footer
window.filterByMake = function(makeName) {
  resetAllSearchFilters();
  currentFilters.make = makeName;
  const select = document.getElementById('heroSelectMake');
  if (select) select.value = makeName;
  filterAndSortCars();
  scrollToSection('inventory');
};

window.filterByBody = function(bodyName) {
  resetAllSearchFilters();
  currentFilters.category = bodyName;
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-category') === bodyName);
  });
  filterAndSortCars();
  scrollToSection('inventory');
};

window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.filterByPerk = function(type) {
  if (type === 'drops') {
    // Show specials
    currentFilters.maxPrice = '400000';
    filterAndSortCars();
    scrollToSection('inventory');
  } else if (type === 'compare') {
    // Show top picks
    filterAndSortCars();
    scrollToSection('inventory');
  } else {
    scrollToSection('inventory');
  }
};

// =========================================================
// CAR DETAIL MODAL
// =========================================================
const carModalBackdrop = document.getElementById('carModalBackdrop');
const carModalContent = document.getElementById('carModalContent');
const modalCloseButton = document.getElementById('modalCloseButton');

window.viewCarModal = function(id) {
  const car = vehicles.find(v => v.id === id);
  if (!car) return;

  const monthly = calcInstallment(car.price);
  const waUrl = makeCarWhatsAppUrl(car);
  const tdUrl = makeTestDriveUrl(car);

  carModalContent.innerHTML = `
    <div class="modal-photo-stage">
      <img src="${car.images[0]}" alt="${car.model}" class="modal-hero-photo" id="modalHeroPhoto">
    </div>

    <div class="modal-photo-thumbs">
      ${car.images.map((img, idx) => `
        <button class="modal-thumb ${idx === 0 ? 'active' : ''}" onclick="swapModalPhoto('${img}', this)">
          <img src="${img}" alt="Thumbnail ${idx + 1}">
        </button>
      `).join('')}
    </div>

    <div class="modal-body-pad">
      <div class="modal-title-row">
        <div>
          <span style="color: #D01020; font-weight: 800; font-size: 0.82rem; text-transform: uppercase;">${car.year} • ${car.make}</span>
          <h3>${car.model}</h3>
          <span style="font-size: 0.85rem; color: #6B7280; font-weight: 600;">Stock ID: ${car.stockId} | Location: ${car.location}, Zambia</span>
        </div>
        <div class="modal-price-col">
          <div class="modal-big-price">${formatZMW(car.price)}</div>
          <span style="font-size: 0.85rem; color: #4B5563;">Est: <strong>${formatZMW(monthly)}/pm</strong></span>
        </div>
      </div>

      <div class="modal-specs-grid">
        <div class="modal-spec-cell">
          <span>Mileage</span>
          <strong>${car.mileage.toLocaleString()} km</strong>
        </div>
        <div class="modal-spec-cell">
          <span>Transmission</span>
          <strong>${car.transmission}</strong>
        </div>
        <div class="modal-spec-cell">
          <span>Fuel</span>
          <strong>${car.fuel}</strong>
        </div>
        <div class="modal-spec-cell">
          <span>Body Type</span>
          <strong>${car.bodyType}</strong>
        </div>
        <div class="modal-spec-cell">
          <span>Exterior Color</span>
          <strong>${car.color}</strong>
        </div>
        <div class="modal-spec-cell">
          <span>Powertrain</span>
          <strong>${car.engine}</strong>
        </div>
      </div>

      <h5 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 8px;">Key Features &amp; Equipment:</h5>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;">
        ${car.features.map(f => `<span style="background: #FEE2E2; color: #D01020; font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">✓ ${f}</span>`).join('')}
      </div>

      <p style="font-size: 0.9rem; color: #4B5563; line-height: 1.5; margin-bottom: 20px;">${car.description}</p>

      <div class="modal-actions-dual">
        <a href="${waUrl}" target="_blank" class="btn-modal-wa-lead">
          <i class="fa-brands fa-whatsapp"></i> Chat Dealer on WhatsApp
        </a>
        <a href="${tdUrl}" target="_blank" class="btn-modal-testdrive-action">
          <i class="fa-solid fa-calendar-check"></i> Book Test Drive
        </a>
      </div>
    </div>
  `;

  carModalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.swapModalPhoto = function(src, btn) {
  const hero = document.getElementById('modalHeroPhoto');
  if (hero) hero.src = src;
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

function closeCarModal() {
  if (carModalBackdrop) carModalBackdrop.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// =========================================================
// FINANCE CALCULATOR
// =========================================================
function setupFinanceCalculator() {
  const priceSlider = document.getElementById('financePriceSlider');
  const depositSlider = document.getElementById('financeDepositSlider');
  const termSlider = document.getElementById('financeTermSlider');
  const rateSlider = document.getElementById('financeRateSlider');

  const priceLabel = document.getElementById('financePriceLabel');
  const depPctLabel = document.getElementById('financeDepositPctLabel');
  const depAmtLabel = document.getElementById('financeDepositAmountLabel');
  const termLabel = document.getElementById('financeTermLabel');
  const rateLabel = document.getElementById('financeRateLabel');
  const resultVal = document.getElementById('monthlyInstallmentVal');
  const waBtn = document.getElementById('btnFinanceWhatsApp');

  function updateCalc() {
    if (!priceSlider) return;
    const price = Number(priceSlider.value);
    const depPct = Number(depositSlider.value);
    const term = Number(termSlider.value);
    const rate = Number(rateSlider.value);

    const depAmount = price * (depPct / 100);
    const installment = calcInstallment(price, depPct, term, rate);

    priceLabel.textContent = formatZMW(price);
    depPctLabel.textContent = `${depPct}%`;
    depAmtLabel.textContent = formatZMW(depAmount);
    termLabel.textContent = `${term} Months`;
    rateLabel.textContent = `${rate.toFixed(1)}% p.a.`;

    resultVal.innerHTML = `${formatZMW(installment)} <span class="pm-sub">/ month</span>`;

    if (waBtn) {
      const msg = `Hello ZedCars Finance Specialist,%0A%0AI would like to apply for car loan pre-approval:%0A%0A💰 *Target Vehicle Price:* ${formatZMW(price)}%0A💵 *Deposit:* ${formatZMW(depAmount)} (${depPct}%)%0A📅 *Loan Term:* ${term} Months%0A📈 *Interest Rate:* ${rate}%25 p.a.%0A💳 *Est. Monthly Repayment:* ${formatZMW(installment)}/month%0A%0APlease let me know the requirements for Stanbic/Absa/Zanaco financing.`;
      waBtn.href = `https://wa.me/${DEALER_WHATSAPP_FINANCE}?text=${msg}`;
    }
  }

  [priceSlider, depositSlider, termSlider, rateSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', updateCalc);
  });

  updateCalc();
}

// =========================================================
// INSTANT VALUATION MODAL ("Get the Best Offer Now")
// =========================================================
const instantValuationModal = document.getElementById('instantValuationModal');
const btnOpenInstantModal = document.getElementById('btnOpenInstantModal');
const valuationCloseButton = document.getElementById('valuationCloseButton');
const instantSellForm = document.getElementById('instantSellForm');

function setupValuationModal() {
  if (btnOpenInstantModal) {
    btnOpenInstantModal.addEventListener('click', () => {
      instantValuationModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (valuationCloseButton) {
    valuationCloseButton.addEventListener('click', () => {
      instantValuationModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (instantSellForm) {
    instantSellForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const make = document.getElementById('valMake').value.trim();
      const model = document.getElementById('valModel').value.trim();
      const year = document.getElementById('valYear').value;
      const mileage = document.getElementById('valMileage').value.trim();
      const city = document.getElementById('valCity').value;
      const price = document.getElementById('valPrice').value.trim();
      const notes = document.getElementById('valNotes').value.trim();

      const priceDisplay = price ? formatZMW(price) : 'Open to highest cash offer';

      const msg = `Hello ZedCars Valuation Team! 🚘%0A%0AI want an instant cash offer for my vehicle:%0A%0A📋 *Vehicle:* ${year} ${make} ${model}%0A🛣️ *Mileage:* ${Number(mileage).toLocaleString()} km%0A📍 *Location:* ${city}, Zambia%0A💰 *Expected Price:* ${priceDisplay}%0A📝 *Condition & Notes:* ${encodeURIComponent(notes || 'Good running condition, all documents intact')}%0A%0APlease contact me with your best valuation.`;

      window.open(`https://wa.me/${DEALER_WHATSAPP_COPPERBELT}?text=${msg}`, '_blank');
      instantValuationModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
}

// =========================================================
// INITIALIZATION ON DOM LOAD
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCars(vehicles);
  renderAccessories();
  setupFinanceCalculator();
  setupValuationModal();

  // Search Input
  const keywordInput = document.getElementById('carsKeywordInput');
  if (keywordInput) {
    keywordInput.addEventListener('input', (e) => {
      currentFilters.keyword = e.target.value;
      filterAndSortCars();
    });
  }

  // Hero dropdowns
  const heroMake = document.getElementById('heroSelectMake');
  if (heroMake) {
    heroMake.addEventListener('change', (e) => {
      currentFilters.make = e.target.value;
      filterAndSortCars();
    });
  }

  const heroProv = document.getElementById('heroSelectProvince');
  if (heroProv) {
    heroProv.addEventListener('change', (e) => {
      currentFilters.location = e.target.value;
      filterAndSortCars();
    });
  }

  const heroMinPrice = document.getElementById('heroSelectMinPrice');
  if (heroMinPrice) {
    heroMinPrice.addEventListener('change', (e) => {
      currentFilters.minPrice = e.target.value;
      filterAndSortCars();
    });
  }

  const heroMaxPrice = document.getElementById('heroSelectMaxPrice');
  if (heroMaxPrice) {
    heroMaxPrice.addEventListener('change', (e) => {
      currentFilters.maxPrice = e.target.value;
      filterAndSortCars();
    });
  }

  const heroMinYear = document.getElementById('heroSelectMinYear');
  if (heroMinYear) {
    heroMinYear.addEventListener('change', (e) => {
      currentFilters.minYear = e.target.value;
      filterAndSortCars();
    });
  }

  const heroMaxYear = document.getElementById('heroSelectMaxYear');
  if (heroMaxYear) {
    heroMaxYear.addEventListener('change', (e) => {
      currentFilters.maxYear = e.target.value;
      filterAndSortCars();
    });
  }

  // Reset button
  const btnReset = document.getElementById('btnHeroReset');
  if (btnReset) {
    btnReset.addEventListener('click', resetAllSearchFilters);
  }

  const btnClearAll = document.getElementById('btnClearAllFilters');
  if (btnClearAll) {
    btnClearAll.addEventListener('click', resetAllSearchFilters);
  }

  // Hero Search Button
  const btnHeroSearch = document.getElementById('btnHeroSearch');
  if (btnHeroSearch) {
    btnHeroSearch.addEventListener('click', () => {
      filterAndSortCars();
      scrollToSection('inventory');
    });
  }

  // Category Pills
  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilters.category = pill.getAttribute('data-category');
      filterAndSortCars();
    });
  });

  // Sort By
  const sortSelect = document.getElementById('selectSortBy');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      filterAndSortCars();
    });
  }

  // Cash / Monthly payment toggle in Hero
  const btnModeCash = document.getElementById('btnModeCash');
  const btnModeMonthly = document.getElementById('btnModeMonthly');
  if (btnModeCash && btnModeMonthly) {
    btnModeCash.addEventListener('click', () => {
      btnModeCash.classList.add('active');
      btnModeMonthly.classList.remove('active');
    });
    btnModeMonthly.addEventListener('click', () => {
      btnModeMonthly.classList.add('active');
      btnModeCash.classList.remove('active');
      scrollToSection('finance');
    });
  }

  // Members Card Close
  const membersCloseBtn = document.getElementById('membersCloseBtn');
  const membersCard = document.getElementById('membersCard');
  if (membersCloseBtn && membersCard) {
    membersCloseBtn.addEventListener('click', () => {
      membersCard.style.display = 'none';
    });
  }

  // Modal Close
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeCarModal);
  }
  if (carModalBackdrop) {
    carModalBackdrop.addEventListener('click', (e) => {
      if (e.target === carModalBackdrop) closeCarModal();
    });
  }

  // Floating WhatsApp
  const floatingTrigger = document.getElementById('floatingWaTrigger');
  const waChatWindow = document.getElementById('waChatWindow');
  const waChatClose = document.getElementById('waChatClose');
  if (floatingTrigger && waChatWindow) {
    floatingTrigger.addEventListener('click', () => {
      waChatWindow.classList.toggle('open');
    });
  }
  if (waChatClose && waChatWindow) {
    waChatClose.addEventListener('click', () => {
      waChatWindow.classList.remove('open');
    });
  }

  // Cookie Banner Ok button
  const btnCookieOk = document.getElementById('btnCookieOk');
  const cookieBanner = document.getElementById('cookieBanner');
  if (btnCookieOk && cookieBanner) {
    btnCookieOk.addEventListener('click', () => {
      cookieBanner.style.display = 'none';
    });
  }
});
