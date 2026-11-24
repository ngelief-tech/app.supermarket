/* =============================================================
   FreshMart — script.js
   Sumber data tunggal (PRODUCTS) digunakan oleh:
     1. Render kartu produk di halaman (#produk)
     2. Engine chatbot (pencarian, filter, dll.)
   Tidak membutuhkan server / API berbayar.
   ============================================================= */

/* ───────────────────────────────────────────────
   1. DATABASE PRODUK  (sumber tunggal kebenaran)
   ─────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    nama: "Apel Fuji Premium",
    kategori: "Buah-buahan",
    emoji: "🍎",
    harga: 24900,
    hargaLama: 31000,
    stok: 48,
    badge: "DISKON 20%",
    gambar: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop",
    deskripsi: "Apel Fuji segar import, manis dan renyah."
  },
  {
    id: 2,
    nama: "Paket Sayuran Segar",
    kategori: "Sayuran",
    emoji: "🥦",
    harga: 35000,
    hargaLama: null,
    stok: 22,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop",
    deskripsi: "Paket sayur campur segar pilihan petani lokal."
  },
  {
    id: 3,
    nama: "Susu Segar UHT 1L",
    kategori: "Susu & Olahan",
    emoji: "🥛",
    harga: 18500,
    hargaLama: null,
    stok: 60,
    badge: "BARU",
    gambar: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop",
    deskripsi: "Susu UHT full cream, cocok untuk seluruh keluarga."
  },
  {
    id: 4,
    nama: "Roti Gandum Utuh",
    kategori: "Roti & Kue",
    emoji: "🍞",
    harga: 15900,
    hargaLama: 18700,
    stok: 15,
    badge: "DISKON 15%",
    gambar: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&auto=format&fit=crop",
    deskripsi: "Roti gandum utuh kaya serat, cocok untuk sarapan sehat."
  },
  {
    id: 5,
    nama: "Daging Sapi Segar 500g",
    kategori: "Daging & Ikan",
    emoji: "🥩",
    harga: 65000,
    hargaLama: null,
    stok: 10,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop",
    deskripsi: "Daging sapi segar lokal, bebas pengawet."
  },
  {
    id: 6,
    nama: "Telur Ayam Kampung 1 Kg",
    kategori: "Protein",
    emoji: "🥚",
    harga: 28000,
    hargaLama: null,
    stok: 2,
    badge: "TERLARIS",
    gambar: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&auto=format&fit=crop",
    deskripsi: "Telur ayam kampung organik, kuning telur lebih pekat."
  },
  {
    id: 7,
    nama: "Yogurt Stroberi 200ml",
    kategori: "Susu & Olahan",
    emoji: "🍓",
    harga: 12500,
    hargaLama: null,
    stok: 35,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop",
    deskripsi: "Yogurt probiotik rasa stroberi, baik untuk pencernaan."
  },
  {
    id: 8,
    nama: "Jus Jeruk Peras 350ml",
    kategori: "Minuman",
    emoji: "🧃",
    harga: 9900,
    hargaLama: null,
    stok: 50,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&auto=format&fit=crop",
    deskripsi: "Jus jeruk peras tanpa tambahan gula."
  },
  {
    id: 9,
    nama: "Mie Instan Goreng",
    kategori: "Makanan Instan",
    emoji: "🍜",
    harga: 3500,
    hargaLama: null,
    stok: 200,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop",
    deskripsi: "Mie instan goreng rasa ayam spesial."
  },
  {
    id: 10,
    nama: "Sabun Mandi Antiseptik",
    kategori: "Kebersihan",
    emoji: "🧴",
    harga: 8900,
    hargaLama: null,
    stok: 80,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&auto=format&fit=crop",
    deskripsi: "Sabun antiseptik melindungi dari kuman 99,9%."
  },
  {
    id: 11,
    nama: "Keju Cheddar Slice 150g",
    kategori: "Susu & Olahan",
    emoji: "🧀",
    harga: 22000,
    hargaLama: null,
    stok: 28,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=400&auto=format&fit=crop",
    deskripsi: "Keju cheddar slice siap pakai untuk sandwich."
  },
  {
    id: 12,
    nama: "Pisang Cavendish 1 Sisir",
    kategori: "Buah-buahan",
    emoji: "🍌",
    harga: 15000,
    hargaLama: null,
    stok: 0,
    badge: null,
    gambar: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop",
    deskripsi: "Pisang cavendish manis, kaya potasium."
  }
];

/* ───────────────────────────────────────────────
   2. RENDER KARTU PRODUK DI HALAMAN
   ─────────────────────────────────────────────── */
const STOK_MIN = 3; // batas stok hampir habis

function formatHarga(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function buatKartuProduk(p, container) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = p.id;

  const stokLabel = p.stok === 0
    ? '<span style="color:#c62828;font-weight:700;font-size:.78rem;">Habis</span>'
    : p.stok <= STOK_MIN
      ? `<span style="color:#e65100;font-weight:700;font-size:.78rem;">Sisa ${p.stok}</span>`
      : `<span style="color:#2e7d32;font-size:.78rem;">Stok: ${p.stok}</span>`;

  card.innerHTML = `
    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
    <img src="${p.gambar}" alt="${p.nama}" loading="lazy" />
    <div class="product-info">
      <h3>${p.nama}</h3>
      <p class="category">${p.emoji} ${p.kategori}</p>
      <div class="product-price-row">
        <div>
          <span class="price">${formatHarga(p.harga)}</span>
          ${p.hargaLama ? `<span class="price-old">${formatHarga(p.hargaLama)}</span>` : ""}
        </div>
        <button class="btn-add" data-id="${p.id}" ${p.stok === 0 ? "disabled title='Stok habis'" : ""}>
          ${p.stok === 0 ? "✕" : "+"}
        </button>
      </div>
      <div style="margin-top:6px">${stokLabel}</div>
    </div>
  `;
  container.appendChild(card);
}

function renderProdukHalaman() {
  const grid = document.querySelector(".products-grid");
  if (!grid) return;
  grid.innerHTML = "";
  PRODUCTS.forEach(p => buatKartuProduk(p, grid));
}

renderProdukHalaman();

/* ───────────────────────────────────────────────
   3. KERANJANG
   ─────────────────────────────────────────────── */
let cartCount = 0;
const cartBadge = document.getElementById("cartBadge");

document.addEventListener("click", e => {
  if (e.target.classList.contains("btn-add") && !e.target.disabled) {
    cartCount++;
    cartBadge.textContent = cartCount;
    const nama = PRODUCTS.find(p => p.id == e.target.dataset.id)?.nama || "Produk";
    showToast(`${nama} ditambahkan ke keranjang 🛒`);
  }
});

/* ───────────────────────────────────────────────
   4. ENGINE CHATBOT (pure JS, tanpa server)
   ─────────────────────────────────────────────── */

/** Normalisasi teks: lowercase, hapus tanda baca berlebih */
function norm(t) {
  return t.toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Apakah string haystack mengandung semua kata dalam needle array? */
function mengandung(haystack, ...kata) {
  return kata.every(k => haystack.includes(k));
}

/** Apakah haystack mengandung salah satu dari kata-kata berikut? */
function mengandungSalahSatu(haystack, ...kata) {
  return kata.some(k => haystack.includes(k));
}

/** Ambil angka pertama dari string (untuk pertanyaan harga / stok) */
function ambilAngka(str) {
  const m = str.match(/\d[\d.,]*/);
  if (!m) return null;
  return parseFloat(m[0].replace(/\./g, "").replace(",", "."));
}

/* ---- Render satu kartu produk (grid) di dalam chat ---- */
function htmlKartuChat(p) {
  const stokInfo = p.stok === 0
    ? `<span style="color:#c62828">❌ Habis</span>`
    : p.stok <= STOK_MIN
      ? `<span style="color:#e65100">⚠️ Sisa ${p.stok}</span>`
      : `<span style="color:#2e7d32">✅ ${p.stok} pcs</span>`;

  const badgeHtml = p.badge
    ? `<span class="cb-badge">${p.badge}</span>`
    : "";

  const onerrorAttr = `onerror="this.src='';this.style.display='none';this.parentElement.style.background='#f0f4f0';this.parentElement.insertAdjacentHTML('beforeend','<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:2rem\\'>🛒</div>')"`;

  return `
    <div class="cb-product-card" data-product-id="${p.id}" role="button" tabindex="0" aria-label="Lihat detail ${p.nama}">
      ${badgeHtml}
      <div class="cb-img-wrap">
        <img src="${p.gambar}" alt="${p.nama}" loading="lazy" ${onerrorAttr} />
      </div>
      <div class="cb-product-body">
        <div class="cb-product-name">${p.nama}</div>
        <div class="cb-product-cat">${p.emoji} ${p.kategori}</div>
        <div class="cb-product-price-row">
          <span class="cb-product-price">${formatHarga(p.harga)}</span>
          ${p.hargaLama ? `<span class="cb-product-old">${formatHarga(p.hargaLama)}</span>` : ""}
        </div>
        <div class="cb-product-stok">${stokInfo}</div>
      </div>
    </div>`;
}

/* ---- Wrapper daftar produk dalam bubble khusus ---- */
function htmlDaftarProduk(list, judul = "") {
  if (list.length === 0) return null;
  const cards = list.map(htmlKartuChat).join("");
  return `
    ${judul ? `<div class="cb-list-title">${judul}</div>` : ""}
    <div class="cb-product-list">${cards}</div>
    <div class="cb-hint">👆 Ketuk produk untuk melihat detail lengkap</div>`;
}

/* ---- Render bubble daftar produk dengan class khusus ---- */
function appendBotProductList(htmlContent) {
  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  wrap.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div style="max-width:calc(100% - 36px);width:calc(100% - 36px)">
      <div class="msg-bubble msg-bubble--rich msg-bubble--product-list">${htmlContent}</div>
      <span class="msg-time">${getTime()}</span>
    </div>`;
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ---- Detail produk saat diklik ---- */
function htmlDetailProduk(p) {
  const stokBadge = p.stok === 0
    ? `<span style="color:#c62828;font-weight:700">❌ Stok Habis</span>`
    : p.stok <= STOK_MIN
      ? `<span style="color:#e65100;font-weight:700">⚠️ Hampir Habis (sisa ${p.stok})</span>`
      : `<span style="color:#2e7d32;font-weight:700">✅ Tersedia (${p.stok} pcs)</span>`;

  return `
    <div style="font-size:.82rem;color:#555;margin-bottom:8px">
      📋 <strong>Detail Produk</strong>
    </div>
    <div class="cb-detail-card">
      <img class="cb-detail-img"
           src="${p.gambar}" alt="${p.nama}" loading="lazy"
           onerror="this.style.display='none'" />
      <div class="cb-detail-body">
        <div class="cb-detail-name">${p.emoji} ${p.nama}</div>
        <div class="cb-detail-cat">${p.kategori}</div>
        <div>
          <span class="cb-detail-price">${formatHarga(p.harga)}</span>
          ${p.hargaLama
            ? `<span class="cb-detail-price-old">${formatHarga(p.hargaLama)}</span>`
            : ""}
        </div>
        <div class="cb-detail-row">
          <div class="cb-detail-stok">${stokBadge}</div>
          ${p.badge ? `<span style="font-size:.7rem;background:#fff3e0;color:#e65100;padding:2px 8px;border-radius:20px;font-weight:700">${p.badge}</span>` : ""}
        </div>
        ${p.deskripsi
          ? `<div class="cb-detail-desc">${p.deskripsi}</div>`
          : ""}
        <div class="cb-detail-cta">
          ${p.stok > 0
            ? `<button class="cb-detail-btn cb-detail-btn--primary btn-add" data-id="${p.id}">🛒 Tambah ke Keranjang</button>`
            : `<button class="cb-detail-btn" style="background:#f5f5f5;color:#999;cursor:not-allowed" disabled>Stok Habis</button>`}
          <button class="cb-detail-btn cb-detail-btn--sec cb-chip" style="border-radius:20px">🔍 Cari produk serupa</button>
        </div>
      </div>
    </div>`;
}

/* ---- Processor utama: input → HTML balasan ---- */
function prosesChat(input) {
  const q = norm(input);

  /* ── SAPAAN ── */
  if (mengandungSalahSatu(q, "halo", "hai", "hi", "hello", "selamat", "pagi", "siang", "malam", "sore")) {
    return { teks: `Halo! 👋 Selamat datang di <strong>FreshMart</strong>!<br>
Saya bisa bantu Anda mencari produk. Coba tanya:<br>
• <em>"Daftar semua produk"</em><br>
• <em>"Ada susu apa saja?"</em><br>
• <em>"Produk di bawah Rp 20.000"</em><br>
• <em>"Stok yang hampir habis"</em>` };
  }

  /* ── DAFTAR SEMUA PRODUK ── */
  if (
    mengandungSalahSatu(q, "daftar produk", "semua produk", "list produk", "tampilkan produk",
      "produk apa", "produk apa saja", "ada produk apa", "produk tersedia",
      "lihat produk", "lihat semua", "semua barang", "daftar barang")
  ) {
    const html = htmlDaftarProduk(PRODUCTS, `📦 Semua Produk (${PRODUCTS.length} item)`);
    return { html };
  }

  /* ── FILTER KATEGORI ── */
  const kategoriBaru = {
    "buah":          PRODUCTS.filter(p => p.kategori === "Buah-buahan"),
    "sayur":         PRODUCTS.filter(p => p.kategori === "Sayuran"),
    "daging":        PRODUCTS.filter(p => p.kategori === "Daging & Ikan"),
    "ikan":          PRODUCTS.filter(p => p.kategori === "Daging & Ikan"),
    "susu":          PRODUCTS.filter(p => p.kategori === "Susu & Olahan"),
    "olahan":        PRODUCTS.filter(p => p.kategori === "Susu & Olahan"),
    "yogurt":        PRODUCTS.filter(p => p.kategori === "Susu & Olahan"),
    "keju":          PRODUCTS.filter(p => p.kategori === "Susu & Olahan"),
    "roti":          PRODUCTS.filter(p => p.kategori === "Roti & Kue"),
    "kue":           PRODUCTS.filter(p => p.kategori === "Roti & Kue"),
    "minuman":       PRODUCTS.filter(p => p.kategori === "Minuman"),
    "minum":         PRODUCTS.filter(p => p.kategori === "Minuman"),
    "jus":           PRODUCTS.filter(p => p.kategori === "Minuman"),
    "makanan instan":PRODUCTS.filter(p => p.kategori === "Makanan Instan"),
    "instan":        PRODUCTS.filter(p => p.kategori === "Makanan Instan"),
    "mie":           PRODUCTS.filter(p => p.kategori === "Makanan Instan"),
    "mi ":           PRODUCTS.filter(p => p.kategori === "Makanan Instan"),
    "kebersihan":    PRODUCTS.filter(p => p.kategori === "Kebersihan"),
    "sabun":         PRODUCTS.filter(p => p.kategori === "Kebersihan"),
    "protein":       PRODUCTS.filter(p => p.kategori === "Protein"),
    "telur":         PRODUCTS.filter(p => p.kategori === "Protein"),
  };

  for (const [kunci, hasil] of Object.entries(kategoriBaru)) {
    if (q.includes(kunci)) {
      if (hasil.length === 0) {
        return { teks: `Maaf, belum ada produk dengan kategori <strong>${kunci}</strong> saat ini.` };
      }
      const label = hasil[0].kategori;
      const html = htmlDaftarProduk(hasil, `${hasil[0].emoji} Produk ${label} (${hasil.length} item)`);
      return { html };
    }
  }

  /* ── STOK HABIS ── */
  if (mengandungSalahSatu(q, "stok habis", "habis", "kosong", "tidak tersedia", "ga ada")) {
    const list = PRODUCTS.filter(p => p.stok === 0);
    if (list.length === 0) return { teks: "✅ Semua produk saat ini masih tersedia!" };
    const html = htmlDaftarProduk(list, `❌ Produk Stok Habis (${list.length} item)`);
    return { html };
  }

  /* ── STOK HAMPIR HABIS ── */
  if (mengandungSalahSatu(q, "hampir habis", "sedikit", "tinggal sedikit", "mau habis", "low stock", "stok rendah")) {
    const list = PRODUCTS.filter(p => p.stok > 0 && p.stok <= STOK_MIN);
    if (list.length === 0) return { teks: "✅ Tidak ada produk yang hampir habis saat ini." };
    const html = htmlDaftarProduk(list, `⚠️ Produk Hampir Habis (sisa ≤${STOK_MIN})`);
    return { html };
  }

  /* ── FILTER HARGA BAWAH ── */
  if (mengandungSalahSatu(q, "di bawah", "bawah", "kurang dari", "dibawah", "maksimal", "max harga")) {
    let batas = null;

    // "bawah 20 ribu" / "bawah 20rb" / "bawah 20k"
    const mRibu = q.match(/(?:di bawah|bawah|kurang dari|dibawah)\s*([\d]+)\s*(?:ribu|rb|k\b)/);
    if (mRibu) batas = parseFloat(mRibu[1]) * 1000;

    // "di bawah Rp 20.000" atau "di bawah 20000"
    if (!batas) {
      const mRp = q.match(/(?:di bawah|bawah|kurang dari|dibawah|maksimal|max harga)\s*(?:rp\.?\s*)?([\d.,]+)/);
      if (mRp) {
        const raw = mRp[1].replace(/\./g, "").replace(",", ".");
        batas = parseFloat(raw);
        // Jika angka kecil (< 1000) kemungkinan dalam ribuan tapi tidak ada "ribu"
        // Contoh: "bawah 20" tanpa satuan → abaikan agar tidak salah interpret
        if (batas < 1000) batas = null;
      }
    }

    if (batas && batas > 0) {
      const list = PRODUCTS.filter(p => p.harga < batas && p.stok > 0);
      if (list.length === 0) return { teks: `Tidak ada produk dengan harga di bawah ${formatHarga(batas)}.` };
      const html = htmlDaftarProduk(list, `💰 Produk di bawah ${formatHarga(batas)} (${list.length} item)`);
      return { html };
    }
  }

  /* ── FILTER HARGA ATAS ── */
  const matchAtas = q.match(/(?:di atas|atas|lebih dari|diatas|harga min|minimal|min)\s*(?:rp\.?\s*)?([\d.,]+)/);
  if (matchAtas) {
    const batas = parseFloat(matchAtas[1].replace(/\./g, "").replace(",", "."));
    const list = PRODUCTS.filter(p => p.harga > batas && p.stok > 0);
    if (list.length === 0) return { teks: `Tidak ada produk dengan harga di atas ${formatHarga(batas)}.` };
    const html = htmlDaftarProduk(list, `💰 Produk di atas ${formatHarga(batas)} (${list.length} item)`);
    return { html };
  }

  /* ── PERTANYAAN HARGA PRODUK TERTENTU ── */
  if (mengandungSalahSatu(q, "harga", "berapa", "cost", "biaya")) {
    // Cari produk yang namanya ada dalam pertanyaan
    const cocok = PRODUCTS.filter(p => {
      const namaQ = norm(p.nama);
      // pecah nama jadi kata-kata, cek apakah sebagian besar ada di query
      return namaQ.split(" ").some(kata => kata.length > 3 && q.includes(kata));
    });
    if (cocok.length > 0) {
      const html = htmlDaftarProduk(cocok, "💰 Info Harga");
      return { html };
    }
    return { teks: `Silakan sebutkan nama produk yang ingin Anda ketahui harganya.<br>Contoh: <em>"Berapa harga susu UHT?"</em>` };
  }

  /* ── CEK KETERSEDIAAN ("apakah ada ... ?") ── */
  if (mengandungSalahSatu(q, "ada ", "tersedia", "masih ada", "apakah ada", "ada gak", "ada nggak", "ada tidak")) {
    const cocok = PRODUCTS.filter(p => {
      const namaQ = norm(p.nama);
      return namaQ.split(" ").some(kata => kata.length > 3 && q.includes(kata));
    });
    if (cocok.length > 0) {
      const p = cocok[0];
      const statusTeks = p.stok === 0
        ? `❌ <strong>${p.nama}</strong> saat ini stoknya <strong>habis</strong>.`
        : p.stok <= STOK_MIN
          ? `⚠️ <strong>${p.nama}</strong> masih tersedia, tapi stok tinggal <strong>${p.stok}</strong>. Segera pesan!`
          : `✅ <strong>${p.nama}</strong> tersedia dengan stok <strong>${p.stok}</strong>.<br>Harga: <strong>${formatHarga(p.harga)}</strong>`;
      return { teks: statusTeks };
    }
  }

  /* ── PRODUK DISKON / PROMO ── */
  if (mengandungSalahSatu(q, "diskon", "promo", "sale", "murah", "hemat", "potongan")) {
    const list = PRODUCTS.filter(p => p.hargaLama !== null && p.stok > 0);
    if (list.length === 0) return { teks: "Belum ada produk yang sedang diskon saat ini." };
    const html = htmlDaftarProduk(list, `🏷️ Produk Sedang Diskon (${list.length} item)`);
    return { html };
  }

  /* ── PENCARIAN NAMA BEBAS ── */
  const kataKunci = q.split(" ").filter(k => k.length > 2);
  if (kataKunci.length > 0) {
    const cocok = PRODUCTS.filter(p => {
      const namaQ = norm(p.nama);
      const katQ  = norm(p.kategori);
      const deskQ = norm(p.deskripsi);
      return kataKunci.some(k => namaQ.includes(k) || katQ.includes(k) || deskQ.includes(k));
    });

    if (cocok.length > 0) {
      const html = htmlDaftarProduk(
        cocok,
        `🔍 Hasil Pencarian "${input}" (${cocok.length} produk)`
      );
      return { html };
    }
  }

  /* ── TIDAK DITEMUKAN ── */
  return {
    teks: `Maaf, saya tidak menemukan produk untuk <strong>"${input}"</strong>. 🙏<br>
Coba kata kunci lain seperti:<br>
• <em>"Daftar semua produk"</em><br>
• <em>"Produk buah-buahan"</em><br>
• <em>"Harga susu"</em><br>
• <em>"Produk hampir habis"</em>`
  };
}

/* ───────────────────────────────────────────────
   5. UI CHATBOT
   ─────────────────────────────────────────────── */
const chatBtn    = document.getElementById("chatBtn");
const chatWindow = document.getElementById("chatWindow");
const closeChat  = document.getElementById("closeChat");
const chatInput  = document.getElementById("chatInput");
const sendBtn    = document.getElementById("sendBtn");
const chatBody   = document.getElementById("chatMessages");

function getTime() {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

function appendMessage(role, text) {
  const isUser = role === "user";
  const wrap = document.createElement("div");
  wrap.className = `msg ${isUser ? "user" : "bot"}`;
  wrap.innerHTML = `
    <div class="msg-avatar">${isUser ? "🧑" : "🤖"}</div>
    <div>
      <div class="msg-bubble">${escapeHtml(text)}</div>
      <span class="msg-time">${getTime()}</span>
    </div>`;
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/** Tambah pesan bot dengan HTML mentah (teks biasa, detail produk, peringatan, dll). */
function appendBotHtml(htmlContent) {
  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  wrap.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div>
      <div class="msg-bubble msg-bubble--rich">${htmlContent}</div>
      <span class="msg-time">${getTime()}</span>
    </div>`;
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendTyping() {
  const el = document.createElement("div");
  el.className = "msg bot";
  el.id = "typingIndicator";
  el.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div>
      <div class="msg-bubble">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>`;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
  document.getElementById("typingIndicator")?.remove();
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = "";
  sendBtn.disabled = true;
  appendMessage("user", text);
  appendTyping();

  // Simulasi jeda 400ms agar terasa natural
  setTimeout(() => {
    removeTyping();
    const result = prosesChat(text);
    if (result.html) {
      appendBotProductList(result.html);
    } else {
      appendBotHtml(result.teks);
    }
    sendBtn.disabled = false;
    chatInput.focus();
  }, 420);
}

/* ── Klik pada product card → tampilkan detail ── */
chatBody.addEventListener("click", e => {
  // Klik tombol "Cari produk serupa" (cb-chip di dalam detail)
  if (e.target.classList.contains("cb-chip") && e.target.closest(".cb-detail-card")) {
    const nama = e.target.closest(".msg").querySelector(".cb-detail-name")?.textContent || "";
    const kata = nama.replace(/[^a-zA-Z\s]/g, "").trim().split(" ")[1] || nama;
    chatInput.value = kata;
    sendMessage();
    return;
  }

  // Klik card produk dari daftar
  const card = e.target.closest(".cb-product-card[data-product-id]");
  if (!card) return;

  const id = parseInt(card.dataset.productId, 10);
  const produk = PRODUCTS.find(p => p.id === id);
  if (!produk) return;

  // Tampilkan nama produk sebagai pesan user
  appendMessage("user", `Detail: ${produk.nama}`);
  appendTyping();

  setTimeout(() => {
    removeTyping();
    appendBotHtml(htmlDetailProduk(produk));
  }, 300);
});

/* Toggle buka/tutup */
chatBtn.addEventListener("click", () => {
  chatWindow.classList.toggle("open");
  chatBtn.querySelector(".notif-dot")?.remove();
  if (chatWindow.classList.contains("open")) chatInput.focus();
});

closeChat.addEventListener("click", () => chatWindow.classList.remove("open"));

/* Kirim dengan Enter */
chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

sendBtn.addEventListener("click", sendMessage);

/* Quick-reply chips */
document.addEventListener("click", e => {
  if (e.target.classList.contains("cb-chip")) {
    chatInput.value = e.target.textContent;
    sendMessage();
  }
});

/* ───────────────────────────────────────────────
   6. TOAST
   ─────────────────────────────────────────────── */
const toastEl = document.getElementById("toast");
let toastTimer;

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* ───────────────────────────────────────────────
   7. NAVBAR — sembunyikan saat scroll turun
   ─────────────────────────────────────────────── */
let lastScroll = 0;
const navEl = document.querySelector("nav");
navEl.style.transition = "transform .35s ease";

window.addEventListener("scroll", () => {
  const cur = window.scrollY;
  navEl.style.transform = (cur > lastScroll && cur > 80) ? "translateY(-100%)" : "translateY(0)";
  lastScroll = cur;
}, { passive: true });
