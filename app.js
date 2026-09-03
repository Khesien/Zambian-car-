/* =========================================================
   ZedCars.co.zm - Universal Multi-Page Application Logic
   ========================================================= */

// Dealership WhatsApp Hotlines (Zambia +260)
const DEALER_WHATSAPP_MAIN = '260975892100';      // Lusaka Main Hub
const DEALER_WHATSAPP_COPPERBELT = '260966453210'; // Kitwe / Ndola Hub
const DEALER_WHATSAPP_FINANCE = '260971200345';   // Bank Finance Lead

// Format ZMW Currency
function formatZMW(num) {
  return 'K ' + Number(num).toLocaleString('en-US');
}

// Calculate Monthly Installment (Zambian standard auto credit)
function calcInstallment(price, depositPct = 20, termMonths = 48, interestRate = 18.5) {
  const principal = price * (1 - depositPct / 100);
  const monthlyRate = (interestRate / 100) / 12;
  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  return Math.round(payment);
}

// =========================================================
// INVENTORY DATASET (Zambian Market)
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
    features: ['Motorized Roller Shutter', 'JBL Premium Audio', 'Leather Seats', '360 Camera', 'Diff Lock', 'Towbar'],
    description: 'Top-of-the-range Toyota Hilux Legend RS. Perfect workhorse and luxury double cab. Full RTSA documents, duty paid.'
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
    features: ['7 Seats', 'Center Cool Box', 'Multi-Terrain Select', 'Heated Seats', 'Apple CarPlay', 'Sunroof'],
    description: 'The executive family safari icon. Extremely smooth ride for long-distance Zambian highways and bush terrain.'
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
    features: ['10-Speed Automatic', 'Adaptive Cruise Control', 'Lane Keeping Aid', 'Wildtrak Leather', 'Sync 3 Touchscreen', 'Roller Lid'],
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
    description: 'Renowned workhorse engineered for rough Copperbelt mining roads. Reliable, durable and low maintenance.'
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
    features: ['Massive 298kW V8 Engine', 'Hydraulic Suspension', 'Rear Screens', 'Cool Box', '360 Camera'],
    description: 'The master of road presence and long-haul VIP comfort.'
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
    features: ['21 km/L Fuel Economy', 'Lexus Interior Finishes', 'Touch Climate Control', 'Power Tailgate'],
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
    features: ['7-Speed DSG', 'Digital Cockpit', 'Harman Kardon Sound', 'Panoramic Sunroof', 'GTI Sport Seats'],
    description: 'The iconic hot hatch. Immaculate condition, rapid dual-clutch transmission, and sporty handling.'
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
    features: ['28 km per Liter Economy', 'Magic Fold-Flat Seats', 'Apple CarPlay & Android Auto', 'Push Start'],
    description: 'Under K150,000 budget saver! Ideal city car for Lusaka traffic with ultra-low fuel costs.'
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
    features: ['AMG Styling', '9G-Tronic Gearbox', '64-Color Ambient Light', 'Burmester Surround', 'Panoramic Roof'],
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
    features: ['LC79 V8 Platform', '180L Dual Fuel Tanks', 'Warn Winch', 'Old Man Emu Suspension', 'Diff Lockers'],
    description: 'Built for the toughest Zambian mining & bush conditions. True off-road endurance.'
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
    description: 'Income-generating passenger van. Ready for public transport, corporate contracts, or school transport.'
  }
];

// Accessories
const partsData = [
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
  },
  {
    title: 'Heavy Duty Reinforced Fiberglass Canopy',
    category: 'Utility & Cargo',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=600&q=80',
    desc: 'Lockable security canopy with sliding side windows and roof load bar mountings.'
  },
  {
    title: 'Optima YellowTop Deep Cycle Heavy Duty Battery',
    category: 'Electrical & Power',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    desc: 'Dual-purpose starting and deep-cycling power. Powers dual fridges and spotlights.'
  },
  {
    title: 'Old Man Emu 2-inch Suspension Lift Kit',
    category: 'Suspension',
    price: 32500,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80',
    desc: 'Engineered nitrocharger shocks and springs tuned for heavy payload.'
  },
  {
    title: 'Tough Canvas Water-Resistant Seat Covers (Full Set)',
    category: 'Interior Protection',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    desc: 'Durable Zambian ripstop canvas. Protects seats against dust and mud.'
  }
];

// Helper to create WhatsApp URL
function createCarWhatsAppUrl(car) {
  const msg = `Hello ZedCars.co.zm Zambia! 👋%0A%0AI am interested in this vehicle:%0A%0A🚗 *Vehicle:* ${car.year} ${car.make} ${car.model}%0A💰 *Price:* ${formatZMW(car.price)}%0A📍 *Location:* ${car.location}%0A🏷️ *Ref Code:* ${car.stockId}%0A%0APlease let me know if it is available for viewing/test drive. Thank you!`;
  return `https://wa.me/${DEALER_WHATSAPP_MAIN}?text=${msg}`;
}

// Render Card HTML
function createCarCardHtml(car) {
  const monthly = calcInstallment(car.price);
  const waLink = createCarWhatsAppUrl(car);

  return `
    <div class="car-listing-card">
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
          <a href="${waLink}" target="_blank" class="btn-card-whatsapp">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
          <button class="btn-card-details" onclick="openCarModal(${car.id})">
            Details
          </button>
        </div>
      </div>
    </div>
  `;
}

// =========================================================
// MODAL ENGINE
// =========================================================
window.openCarModal = function(id) {
  const car = vehicles.find(v => v.id === id);
  if (!car) return;

  const modal = document.getElementById('carModalBackdrop');
  const content = document.getElementById('carModalContent');
  if (!modal || !content) return;

  const monthly = calcInstallment(car.price);
  const waLink = createCarWhatsAppUrl(car);
  const testDriveMsg = `Hello ZedCars Zambia,%0A%0AI would like to *book a test drive* for the *${car.year} ${car.make} ${car.model}* (Ref: ${car.stockId}) at *${car.location}*.`;
  const tdLink = `https://wa.me/${DEALER_WHATSAPP_MAIN}?text=${testDriveMsg}`;

  content.innerHTML = `
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
          <span style="font-size: 0.85rem; color: #6B7280; font-weight: 600;">Stock Ref: ${car.stockId} | Location: ${car.location}, Zambia</span>
        </div>
        <div class="modal-price-col">
          <div class="modal-big-price">${formatZMW(car.price)}</div>
          <span style="font-size: 0.85rem; color: #4B5563;">Est: <strong>${formatZMW(monthly)}/pm</strong></span>
        </div>
      </div>

      <div class="modal-specs-grid">
        <div class="modal-spec-cell"><span>Mileage</span><strong>${car.mileage.toLocaleString()} km</strong></div>
        <div class="modal-spec-cell"><span>Transmission</span><strong>${car.transmission}</strong></div>
        <div class="modal-spec-cell"><span>Fuel</span><strong>${car.fuel}</strong></div>
        <div class="modal-spec-cell"><span>Body Style</span><strong>${car.bodyType}</strong></div>
        <div class="modal-spec-cell"><span>Color</span><strong>${car.color}</strong></div>
        <div class="modal-spec-cell"><span>Engine</span><strong>${car.engine}</strong></div>
      </div>

      <h5 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 8px;">Key Features:</h5>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;">
        ${car.features.map(f => `<span style="background: #FEE2E2; color: #D01020; font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">✓ ${f}</span>`).join('')}
      </div>

      <p style="font-size: 0.9rem; color: #4B5563; line-height: 1.5; margin-bottom: 20px;">${car.description}</p>

      <div class="modal-actions-dual">
        <a href="${waLink}" target="_blank" class="btn-modal-wa-lead">
          <i class="fa-brands fa-whatsapp"></i> Chat Dealer on WhatsApp
        </a>
        <a href="${tdLink}" target="_blank" class="btn-modal-testdrive-action">
          <i class="fa-solid fa-calendar-check"></i> Book Test Drive
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.swapModalPhoto = function(src, btn) {
  const hero = document.getElementById('modalHeroPhoto');
  if (hero) hero.src = src;
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

function closeCarModal() {
  const modal = document.getElementById('carModalBackdrop');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// =========================================================
// PAGE INITIALIZATION
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Common: Close modals
  const modalClose = document.getElementById('modalCloseButton');
  const modalBackdrop = document.getElementById('carModalBackdrop');
  if (modalClose) modalClose.addEventListener('click', closeCarModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeCarModal();
    });
  }

  // Common: Floating WhatsApp Widget
  const floatingTrigger = document.getElementById('floatingWaTrigger');
  const waChatWindow = document.getElementById('waChatWindow');
  const waChatClose = document.getElementById('waChatClose');
  if (floatingTrigger && waChatWindow) {
    floatingTrigger.addEventListener('click', () => waChatWindow.classList.toggle('open'));
  }
  if (waChatClose && waChatWindow) {
    waChatClose.addEventListener('click', () => waChatWindow.classList.remove('open'));
  }

  // Common: Cookie Banner
  const btnCookieOk = document.getElementById('btnCookieOk');
  const cookieBanner = document.getElementById('cookieBanner');
  if (btnCookieOk && cookieBanner) {
    btnCookieOk.addEventListener('click', () => cookieBanner.style.display = 'none');
  }

  // Common: Members Card Close (Home page)
  const membersCloseBtn = document.getElementById('membersCloseBtn');
  const membersCard = document.getElementById('membersCard');
  if (membersCloseBtn && membersCard) {
    membersCloseBtn.addEventListener('click', () => membersCard.style.display = 'none');
  }

  // -------------------------------------------------------------
  // 1. HOME PAGE (index.html): Compact Featured Preview Only
  // -------------------------------------------------------------
  const homeFeaturedGrid = document.getElementById('homeFeaturedGrid');
  if (homeFeaturedGrid) {
    // Show top 3 featured vehicles only (No long scrolling!)
    const featuredCars = vehicles.filter(v => v.featured).slice(0, 3);
    homeFeaturedGrid.innerHTML = featuredCars.map(car => createCarCardHtml(car)).join('');
  }

  // -------------------------------------------------------------
  // 2. BUY CAR PAGE (buy-car.html): Full Filterable Catalog
  // -------------------------------------------------------------
  const buyPageCarsGrid = document.getElementById('buyPageCarsGrid');
  if (buyPageCarsGrid) {
    const buyPageCount = document.getElementById('buyPageCount');
    const buyPageNoCars = document.getElementById('buyPageNoCars');

    const sbKeyword = document.getElementById('sbKeyword');
    const sbMake = document.getElementById('sbMake');
    const sbBody = document.getElementById('sbBody');
    const sbMaxPrice = document.getElementById('sbMaxPrice');
    const sbLocation = document.getElementById('sbLocation');
    const sbSort = document.getElementById('sbSort');
    const btnSidebarReset = document.getElementById('btnSidebarReset');
    const btnBuyResetEmpty = document.getElementById('btnBuyResetEmpty');

    // Parse URL params (e.g. from Home search form or header links)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('keyword') && sbKeyword) sbKeyword.value = urlParams.get('keyword');
    if (urlParams.get('make') && sbMake) sbMake.value = urlParams.get('make');
    if (urlParams.get('category') && sbBody) sbBody.value = urlParams.get('category');
    if (urlParams.get('body') && sbBody) sbBody.value = urlParams.get('body');
    if (urlParams.get('maxPrice') && sbMaxPrice) sbMaxPrice.value = urlParams.get('maxPrice');
    if (urlParams.get('location') && sbLocation) sbLocation.value = urlParams.get('location');

    function filterBuyCars() {
      let list = [...vehicles];
      const kw = sbKeyword ? sbKeyword.value.toLowerCase().trim() : '';
      const make = sbMake ? sbMake.value.toLowerCase() : '';
      const body = sbBody ? sbBody.value.toLowerCase() : '';
      const maxPrice = sbMaxPrice && sbMaxPrice.value ? Number(sbMaxPrice.value) : 0;
      const location = sbLocation ? sbLocation.value.toLowerCase() : '';
      const sort = sbSort ? sbSort.value : 'featured';

      if (kw) {
        list = list.filter(c => 
          c.make.toLowerCase().includes(kw) ||
          c.model.toLowerCase().includes(kw) ||
          c.year.toString().includes(kw) ||
          c.stockId.toLowerCase().includes(kw)
        );
      }
      if (make) {
        list = list.filter(c => c.make.toLowerCase() === make);
      }
      if (body) {
        list = list.filter(c => c.bodyType.toLowerCase() === body);
      }
      if (maxPrice > 0) {
        list = list.filter(c => c.price <= maxPrice);
      }
      if (location) {
        list = list.filter(c => c.location.toLowerCase().includes(location));
      }

      if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
      else if (sort === 'year-desc') list.sort((a, b) => b.year - a.year);
      else if (sort === 'mileage-asc') list.sort((a, b) => a.mileage - b.mileage);
      else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

      if (buyPageCount) buyPageCount.textContent = list.length;

      if (list.length === 0) {
        buyPageCarsGrid.innerHTML = '';
        if (buyPageNoCars) buyPageNoCars.style.display = 'block';
      } else {
        if (buyPageNoCars) buyPageNoCars.style.display = 'none';
        buyPageCarsGrid.innerHTML = list.map(car => createCarCardHtml(car)).join('');
      }
    }

    function resetBuyFilters() {
      if (sbKeyword) sbKeyword.value = '';
      if (sbMake) sbMake.value = '';
      if (sbBody) sbBody.value = '';
      if (sbMaxPrice) sbMaxPrice.value = '';
      if (sbLocation) sbLocation.value = '';
      if (sbSort) sbSort.value = 'featured';
      filterBuyCars();
    }

    [sbKeyword, sbMake, sbBody, sbMaxPrice, sbLocation, sbSort].forEach(input => {
      if (input) {
        input.addEventListener('input', filterBuyCars);
        input.addEventListener('change', filterBuyCars);
      }
    });

    if (btnSidebarReset) btnSidebarReset.addEventListener('click', resetBuyFilters);
    if (btnBuyResetEmpty) btnBuyResetEmpty.addEventListener('click', resetBuyFilters);

    filterBuyCars();
  }

  // -------------------------------------------------------------
  // 3. SELL CAR PAGE (sell-car.html): Instant Valuation to WhatsApp
  // -------------------------------------------------------------
  const sellPageForm = document.getElementById('sellPageForm');
  if (sellPageForm) {
    sellPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const make = document.getElementById('spMake').value.trim();
      const model = document.getElementById('spModel').value.trim();
      const year = document.getElementById('spYear').value;
      const mileage = document.getElementById('spMileage').value.trim();
      const city = document.getElementById('spCity').value;
      const price = document.getElementById('spPrice').value.trim();

      const priceLabel = price ? formatZMW(price) : 'Open to highest cash offer';

      const msg = `Hello ZedCars Acquisitions Team! 🚘%0A%0AI would like a cash valuation for my vehicle:%0A%0A📋 *Vehicle:* ${year} ${make} ${model}%0A🛣️ *Mileage:* ${Number(mileage).toLocaleString()} km%0A📍 *Location:* ${city}, Zambia%0A💰 *Expected Price:* ${priceLabel}%0A%0APlease contact me with your best cash offer.`;

      window.open(`https://wa.me/${DEALER_WHATSAPP_COPPERBELT}?text=${msg}`, '_blank');
    });
  }

  // -------------------------------------------------------------
  // 4. FINANCE CALCULATOR PAGE (finance.html)
  // -------------------------------------------------------------
  const priceSlider = document.getElementById('financePriceSlider');
  if (priceSlider) {
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

    function updateFinance() {
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
        const msg = `Hello ZedCars Finance Specialist,%0A%0AI would like to apply for car loan pre-approval with the following terms:%0A%0A💰 *Vehicle Price:* ${formatZMW(price)}%0A💵 *Deposit:* ${formatZMW(depAmount)} (${depPct}%)%0A📅 *Loan Term:* ${term} Months%0A📈 *Rate:* ${rate}%25 p.a.%0A💳 *Est. Installment:* ${formatZMW(installment)}/month%0A%0APlease advise on Stanbic/Absa/Zanaco requirements.`;
        waBtn.href = `https://wa.me/${DEALER_WHATSAPP_FINANCE}?text=${msg}`;
      }
    }

    [priceSlider, depositSlider, termSlider, rateSlider].forEach(slider => {
      if (slider) slider.addEventListener('input', updateFinance);
    });

    updateFinance();
  }

  // -------------------------------------------------------------
  // 5. PARTS PAGE (parts.html)
  // -------------------------------------------------------------
  const partsGrid = document.getElementById('partsItemsGrid');
  if (partsGrid) {
    partsGrid.innerHTML = partsData.map(part => {
      const msg = `Hello ZedCars Parts Desk,%0A%0AI want to order/inquire about the *${part.title}* (${formatZMW(part.price)}). Do you have stock in Zambia?`;
      const waLink = `https://wa.me/${DEALER_WHATSAPP_MAIN}?text=${msg}`;

      return `
        <div class="part-grid-card">
          <img src="${part.image}" alt="${part.title}" class="part-card-img" loading="lazy">
          <div class="part-card-body">
            <span class="part-category">${part.category}</span>
            <h4 class="part-card-title">${part.title}</h4>
            <p class="part-card-desc">${part.desc}</p>
            <div class="part-price-row">
              <span class="part-price-val">${formatZMW(part.price)}</span>
              <a href="${waLink}" target="_blank" class="btn-part-order">
                <i class="fa-brands fa-whatsapp"></i> Order
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
});
