// =============================================
//  FreshMart CS — Chatbot (via Proxy)
//  Frontend hanya bicara ke proxy lokal.
//  API key TIDAK pernah ada di file ini.
// =============================================

// URL proxy Python lokal. Ganti ke URL Vercel/produksi saat deploy.
const PROXY_BASE = 'http://localhost:5001';

// Generate UUID (pengganti crypto.randomUUID untuk browser)
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

const SESSION_ID = generateUUID();

// ── DOM refs ──────────────────────────────────────────────────────────────
const chatBtn    = document.getElementById('chatBtn');
const chatWindow = document.getElementById('chatWindow');
const closeChat  = document.getElementById('closeChat');
const chatInput  = document.getElementById('chatInput');
const sendBtn    = document.getElementById('sendBtn');
const chatBody   = document.getElementById('chatMessages');

// ── Status koneksi ────────────────────────────────────────────────────────
let proxyOnline = null;   // null = belum dicek, true/false = hasil cek

// Health-check ke proxy. Dijalankan sekali saat chatbot pertama dibuka.
async function checkProxy() {
  try {
    const r = await fetch(`${PROXY_BASE}/health`, { signal: AbortSignal.timeout(5000) });
    proxyOnline = r.ok;
  } catch {
    proxyOnline = false;
  }

  if (!proxyOnline) {
    appendBotHtml(`
      <div style="color:#c62828;font-size:.85rem;line-height:1.6">
        ⚠️ <strong>Server proxy tidak aktif.</strong><br>
        Buka terminal di folder project, lalu jalankan:<br>
        <code style="background:#f3e5f5;padding:3px 7px;border-radius:4px;font-size:.82rem">
          python proxy.py
        </code><br>
        Setelah itu muat ulang halaman ini.
      </div>
    `);
  }
}

// ── Toggle chat ───────────────────────────────────────────────────────────
let proxyChecked = false;

chatBtn.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  chatBtn.querySelector('.notif-dot')?.remove();

  if (chatWindow.classList.contains('open')) {
    chatInput.focus();
    // Health-check hanya sekali per sesi
    if (!proxyChecked) {
      proxyChecked = true;
      checkProxy();
    }
  }
});

closeChat.addEventListener('click', () => chatWindow.classList.remove('open'));

// ── Keyboard: kirim dengan Enter ─────────────────────────────────────────
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

// ── Helpers ───────────────────────────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

/** Tambah pesan teks biasa (HTML di-escape). */
function appendMessage(role, text) {
  const isUser = role === 'user';
  const wrapper = document.createElement('div');
  wrapper.className = `msg ${isUser ? 'user' : 'bot'}`;
  wrapper.innerHTML = `
    <div class="msg-avatar">${isUser ? '🧑' : '🤖'}</div>
    <div>
      <div class="msg-bubble">${escapeHtml(text)}</div>
      <span class="msg-time">${getTime()}</span>
    </div>
  `;
  chatBody.appendChild(wrapper);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/** Tambah pesan bot dengan HTML mentah (untuk kartu produk, peringatan, dll). */
function appendBotHtml(htmlContent) {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg bot';
  wrapper.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div>
      <div class="msg-bubble msg-bubble--rich">${htmlContent}</div>
      <span class="msg-time">${getTime()}</span>
    </div>
  `;
  chatBody.appendChild(wrapper);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendTyping() {
  const el = document.createElement('div');
  el.className = 'msg bot';
  el.id = 'typingIndicator';
  el.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div>
      <div class="msg-bubble">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>
  `;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
  document.getElementById('typingIndicator')?.remove();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

// ── Kirim pesan ───────────────────────────────────────────────────────────
async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  sendBtn.disabled = true;
  appendMessage('user', text);
  appendTyping();

  try {
    const res = await fetch(`${PROXY_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, session_id: SESSION_ID }),
      signal: AbortSignal.timeout(35000),   // 35 detik timeout
    });

    removeTyping();

    if (!res.ok) {
      // Proxy mengembalikan kode error
      const err = await res.json().catch(() => ({}));
      const detail = humanizeError(err);
      appendBotHtml(`<span style="color:#c62828">⚠️ ${escapeHtml(detail)}</span>`);
      return;
    }

    const data = await res.json();
    const reply = data.reply || 'Maaf, saya tidak mendapat respons.';
    appendMessage('bot', reply);

  } catch (err) {
    removeTyping();

    // Bedakan jenis error agar pesan lebih berguna
    if (err.name === 'AbortError' || err.name === 'TimeoutError') {
      appendBotHtml(`
        <span style="color:#e65100">
          ⏱️ Request timeout (>35 detik). Server Langflow mungkin sedang sibuk atau baru dinyalakan.
          Coba kirim ulang pesan Anda.
        </span>
      `);
    } else if (err.message?.includes('fetch') || err.message?.includes('Failed to fetch')) {
      appendBotHtml(`
        <div style="font-size:.88rem;line-height:1.65">
          🔌 <strong>Proxy tidak dapat dijangkau.</strong><br>
          Pastikan sudah menjalankan perintah berikut di terminal:<br>
          <code style="background:#e8f5e9;padding:3px 8px;border-radius:4px">python proxy.py</code><br>
          <span style="color:#777;font-size:.8rem">
            (Proxy harus berjalan di <em>localhost:5001</em>)
          </span>
        </div>
      `);
    } else {
      appendBotHtml(`<span style="color:#c62828">❌ Error: ${escapeHtml(err.message)}</span>`);
    }

    console.error('[FreshMart Chat]', err);
  } finally {
    sendBtn.disabled = false;
    chatInput.focus();
  }
}

/** Ubah kode error dari proxy menjadi kalimat yang mudah dibaca. */
function humanizeError(errBody) {
  const code = errBody.error || '';
  if (code === 'LANGFLOW_DOWN')
    return `Server Langflow belum berjalan. Jalankan Langflow di ${errBody.message?.match(/http[^\s]+/)?.[0] || 'localhost:7860'}, lalu coba lagi.`;
  if (code === 'LANGFLOW_TIMEOUT')
    return 'Server Langflow tidak merespons. Mungkin sedang loading model — coba lagi dalam beberapa detik.';
  if (code === 'LANGFLOW_HTTP_ERROR')
    return `Langflow mengembalikan error. ${errBody.message || ''}`;
  return errBody.message || 'Terjadi kesalahan tidak dikenal.';
}

// =============================================
//  CART COUNTER
// =============================================
let cartCount = 0;
const cartBadge = document.getElementById('cartBadge');

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    cartBadge.textContent = cartCount;
    showToast('Produk ditambahkan ke keranjang 🛒');
  });
});

// =============================================
//  TOAST
// =============================================
const toastEl = document.getElementById('toast');
let toastTimer;

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}

// =============================================
//  NAVBAR — sembunyikan saat scroll turun
// =============================================
let lastScroll = 0;
const navEl = document.querySelector('nav');
navEl.style.transition = 'transform .35s ease';

window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  navEl.style.transform = (cur > lastScroll && cur > 80) ? 'translateY(-100%)' : 'translateY(0)';
  lastScroll = cur;
}, { passive: true });
