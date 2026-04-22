// ── AutoServ Pro — Shared Script ──

// ── Data Helpers ──

function getWorkOrders() {
  return JSON.parse(localStorage.getItem('workOrders') || '[]');
}

function getAppointments() {
  return JSON.parse(localStorage.getItem('appointments') || '[]');
}

function getInventory() {
  const stored = localStorage.getItem('inventory');
  if (stored) return JSON.parse(stored);
  // Seed with sample parts for demo
  const seed = [
    { name: 'Motor Oil (5W-30, 1qt)', partnum: 'OIL-5W30-QT', category: 'Fluids & Filters', price: 8.99,  qty: 24, min: 10 },
    { name: 'Oil Filter (Universal)',  partnum: 'FLT-OIL-001',  category: 'Fluids & Filters', price: 6.49,  qty: 18, min: 8  },
    { name: 'Air Filter (Standard)',   partnum: 'FLT-AIR-002',  category: 'Fluids & Filters', price: 14.99, qty: 9,  min: 5  },
    { name: 'Brake Pads (Front Pair)', partnum: 'BRK-PAD-F01', category: 'Brakes',           price: 42.00, qty: 6,  min: 4  },
    { name: 'Brake Pads (Rear Pair)',  partnum: 'BRK-PAD-R01', category: 'Brakes',           price: 38.00, qty: 3,  min: 4  },
    { name: 'Brake Fluid (DOT 3)',     partnum: 'BRK-FLD-001', category: 'Brakes',           price: 7.99,  qty: 11, min: 4  },
    { name: 'Wiper Blades (Pair)',     partnum: 'WIP-BLD-001', category: 'Other',            price: 19.99, qty: 8,  min: 4  },
    { name: 'Spark Plugs (4-pack)',    partnum: 'ENG-SPK-001', category: 'Engine',           price: 22.00, qty: 12, min: 4  },
    { name: 'Car Battery (Group 35)',  partnum: 'ELC-BAT-035', category: 'Electrical',       price: 89.99, qty: 2,  min: 2  },
    { name: 'Transmission Fluid',      partnum: 'TRN-FLD-001', category: 'Fluids & Filters', price: 11.49, qty: 0,  min: 4  },
  ];
  localStorage.setItem('inventory', JSON.stringify(seed));
  return seed;
}

// ── Schedule Form ──

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form');
  if (!form) return; // only run on schedule page

  // Set min date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const year    = document.getElementById('year').value.trim();
    const make    = document.getElementById('make').value.trim();
    const model   = document.getElementById('model').value.trim();
    const plate   = document.getElementById('plate').value.trim();
    const mileage = document.getElementById('mileage').value.trim();
    const vin     = document.getElementById('vin').value.trim();
    const service = document.getElementById('service').value;
    const priority = document.getElementById('priority').value;
    const date    = document.getElementById('date').value;
    const time    = document.getElementById('time').value;
    const issue   = document.getElementById('issue').value.trim();

    const errEl = document.getElementById('error');

    if (!name || !email || !service || !date || !time) {
      errEl.textContent = 'Please fill out all required fields (Name, Email, Service, Date, Time).';
      errEl.style.display = 'block';
      errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    errEl.style.display = 'none';

    const appt = {
      name, email, phone,
      year, make, model, plate, mileage, vin,
      service, priority, date, time, issue,
      status: 'Pending',
      notes: '',
      confirmation: 'A' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString()
    };

    // Save to appointments list
    const appts = getAppointments();
    appts.push(appt);
    localStorage.setItem('appointments', JSON.stringify(appts));

    // Also add as a work order
    const orders = getWorkOrders();
    orders.push({ ...appt });
    localStorage.setItem('workOrders', JSON.stringify(orders));

    // Save last for confirmation page
    localStorage.setItem('lastAppt', JSON.stringify(appt));

    window.location.href = 'confirmation.html';
  });
});
