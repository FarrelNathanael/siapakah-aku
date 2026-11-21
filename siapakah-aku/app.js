/* =========================================================
   Siapakah Aku? : Tokoh Alkitab
   Kelompok 1 TPB Agama 142
   ========================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------
     PENGATURAN (silakan diubah di sini)
     ------------------------------------------------------ */
  const CONFIG = {
    QUESTIONS: 10,          // jumlah soal per sesi
    LIVES: 3,               // nyawa (khusus mode 1 pemain)
    HINTS: 3,               // jumlah petunjuk per pemain per permainan
    VOLUME_SFX: 3.0,        // penguat efek suara (1 = asli/pelan, 3 = cukup keras, maks sekitar 5)
    VOLUME_MUSIC: 3.5,      // penguat musik latar (naikkan jika masih pelan, turunkan jika mengganggu)
    IDLE_RESET_SEC: 60,     // auto-reset ke beranda bila tidak ada aktivitas
    IDLE_WARN_SEC: 45,      // munculkan peringatan sebelum reset
    LEVELS: {
      mudah:  { label: "Mudah",  time: 25, mult: 1,   desc: "Tokoh populer, waktu 25 detik, pilihan jawaban lebih mudah dibedakan.", pool: ["mudah", "sedang"] },
      sedang: { label: "Sedang", time: 20, mult: 1.5, desc: "Semua tokoh, waktu 20 detik, poin ×1,5.", pool: ["mudah", "sedang", "sulit"] },
      sulit:  { label: "Sulit",  time: 15, mult: 2,   desc: "Tokoh yang lebih jarang dibahas, waktu 15 detik, pilihan mirip, poin ×2.", pool: ["sedang", "sulit"] }
    },
    // Tujuan proyek (tampil di halaman Tentang Kami). Silakan ubah sesuai kelompok.
    GOALS: [
      "Membuat pembelajaran tokoh Alkitab terasa interaktif dan menyenangkan bagi mahasiswa dan dosen.",
      "Mengajak pemain mengenal kisah dan pesan tiap tokoh, bukan hanya menebak nama.",
      "Menghadirkan media belajar digital yang bisa dimainkan langsung di pameran, tanpa internet."
    ],
    // Sumber & referensi (tampil di halaman Tentang Kami). TAMBAHKAN buku/sumber lain yang kelompok pakai.
    SOURCES: [
      { teks: "Lembaga Alkitab Indonesia. Alkitab Terjemahan Baru (TB)." },
      { teks: "Alkitab SABDA (alkitab.sabda.org), untuk membaca teks ayat lengkap.", url: "https://alkitab.sabda.org" }
    ],
    // Data anggota. Foto ditaruh di folder /photos. Jika foto tidak ada, tampil inisial.
    DOSEN: { nama: "dr. Hanna, M.Kes., Ph.D.", foto: "photos/dosen.jpeg" },
    MEMBERS: [
      { nama: "Cristian Rafael Simangunsong",     foto: "photos/cristian.jpg" },
      { nama: "Chersten Anshel Eunike Ginting",   foto: "photos/chersten.jpg" },
      { nama: "Farrel Nathanael Sutrisna",        foto: "photos/farrel.jpeg" },
      { nama: "Irene Amazia Damanik",             foto: "photos/irene.jpg" },
      { nama: "Josaphat Matogu Parulian Gultom",  foto: "photos/josaphat.jpg" },
      { nama: "Margreth Tambunan",                foto: "photos/margreth.jpg" },
      { nama: "Rhenasya Joyce Auberta",           foto: "photos/rhenasya.jpg" }
    ]
  };

  /* ------------------------------------------------------
     UTILITAS
     ------------------------------------------------------ */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const byId = (id) => TOKOH.find((t) => t.id === id);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } }
  };
  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  const emojiList = (t) => t.emoji.split(" ");
  const KEY_SCORES = "siapakahaku_scores_v1";
  const KEY_COLLECT = "siapakahaku_collect_v1";
  const KEY_PREFS = "siapakahaku_prefs_v1";

  /* ------------------------------------------------------
     SUARA (disintesis, tanpa file audio, aman offline)
     ------------------------------------------------------ */
  const Sound = {
    ctx: null, sfxOn: true, musicOn: false, musicTimer: null, step: 0,
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
          this.ctx = new AC();
          // Kompresor mencegah suara pecah walau penguatnya tinggi
          this.comp = this.ctx.createDynamicsCompressor();
          this.comp.threshold.value = -14; this.comp.knee.value = 18; this.comp.ratio.value = 8;
          this.comp.attack.value = 0.003; this.comp.release.value = 0.2;
          this.comp.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    },
    tone(freq, start, dur, type = "sine", vol = 0.15, bus = "sfx") {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + start;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      vol = Math.min(vol * (bus === "music" ? CONFIG.VOLUME_MUSIC : CONFIG.VOLUME_SFX), 0.9);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(this.comp || this.ctx.destination);
      o.start(t); o.stop(t + dur + 0.05);
    },
    play(name) {
      if (!this.sfxOn) return;
      this.init();
      switch (name) {
        case "click":   this.tone(520, 0, 0.08, "triangle", 0.08); break;
        case "correct": this.tone(523, 0, 0.14, "triangle"); this.tone(659, 0.1, 0.14, "triangle"); this.tone(784, 0.2, 0.28, "triangle"); break;
        case "wrong":   this.tone(220, 0, 0.22, "sawtooth", 0.09); this.tone(165, 0.18, 0.32, "sawtooth", 0.09); break;
        case "tick":    this.tone(880, 0, 0.05, "square", 0.04); break;
        case "win":     [523, 659, 784, 1047].forEach((f, i) => this.tone(f, i * 0.14, 0.3, "triangle", 0.16)); break;
        case "hint":    this.tone(700, 0, 0.1, "sine"); this.tone(950, 0.1, 0.18, "sine"); break;
      }
    },
    startMusic() {
      this.init();
      if (this.musicTimer) return;
      const scale = [261.6, 293.7, 329.6, 392, 440, 523.3, 440, 392];
      this.musicTimer = setInterval(() => {
        if (!this.musicOn) return;
        const f = scale[this.step % scale.length];
        this.tone(f, 0, 1.4, "sine", 0.035, "music");
        if (this.step % 4 === 0) this.tone(f / 2, 0, 2.4, "triangle", 0.03, "music");
        this.step++;
      }, 700);
    },
    stopMusic() { clearInterval(this.musicTimer); this.musicTimer = null; }
  };

  /* ------------------------------------------------------
     KONFETI
     ------------------------------------------------------ */
  const Confetti = (() => {
    const cv = $("#confetti"); const cx = cv.getContext("2d");
    let parts = [], raf = null;
    const colors = ["#e8b64c", "#f6d98a", "#9bd079", "#ee8670", "#8aa4ff", "#f6ecd6"];
    function resize() { cv.width = innerWidth; cv.height = innerHeight; }
    addEventListener("resize", resize); resize();
    function burst(n = 90, big = false) {
      for (let i = 0; i < n; i++) {
        parts.push({
          x: innerWidth / 2 + (Math.random() - 0.5) * (big ? innerWidth * 0.6 : 200),
          y: big ? -20 : innerHeight * 0.35,
          vx: (Math.random() - 0.5) * (big ? 6 : 12), vy: big ? Math.random() * 3 + 2 : -Math.random() * 10 - 3,
          s: Math.random() * 8 + 5, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.4,
          c: colors[(Math.random() * colors.length) | 0], life: 0
        });
      }
      if (!raf) loop();
    }
    function loop() {
      cx.clearRect(0, 0, cv.width, cv.height);
      parts.forEach((p) => {
        p.vy += 0.22; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
        cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore();
      });
      parts = parts.filter((p) => p.y < cv.height + 30 && p.life < 240);
      if (parts.length) raf = requestAnimationFrame(loop);
      else { raf = null; cx.clearRect(0, 0, cv.width, cv.height); }
    }
    return { burst };
  })();

  /* ------------------------------------------------------
     TOAST
     ------------------------------------------------------ */
  let toastTimer;
  function toast(msg, ms = 2400) {
    const t = $("#toast"); t.textContent = msg; t.classList.remove("hidden");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.add("hidden"), ms);
  }

  /* ------------------------------------------------------
     NAVIGASI
     ------------------------------------------------------ */
  const PAGES = ["beranda", "main", "belajar", "tentang"];
  let currentPage = "beranda";
  function go(page) {
    if (!PAGES.includes(page)) page = "beranda";
    if (currentPage === "main" && page !== "main" && Game.running) Game.abort();
    currentPage = page;
    PAGES.forEach((p) => $("#page-" + p).classList.toggle("hidden", p !== page));
    $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === page && a.closest(".nav-links")));
    if (location.hash !== "#" + page) history.replaceState(null, "", "#" + page);
    if (page === "beranda") renderBoard();
    if (page === "belajar") renderLearn();
    if (page === "main" && !Game.running && $("#screen-result").classList.contains("hidden")) showScreen("setup");
    scrollTo({ top: 0 });
    resetIdle();
  }
  $$("[data-nav]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); Sound.play("click"); go(a.dataset.nav); }));
  $$("[data-go]").forEach((b) => b.addEventListener("click", () => { Sound.play("click"); go(b.dataset.go); }));
  addEventListener("hashchange", () => go(location.hash.slice(1)));

  /* ------------------------------------------------------
     KOLEKSI & PAPAN SKOR
     ------------------------------------------------------ */
  const Collection = {
    get() { return new Set(store.get(KEY_COLLECT, [])); },
    add(id) { const s = this.get(); s.add(id); store.set(KEY_COLLECT, [...s]); }
  };

  function loadScores() { return store.get(KEY_SCORES, []); }
  function saveScore(entry) {
    const list = loadScores(); list.push(entry);
    const keep = [1, 2].flatMap((m) => list.filter((x) => (x.mode || 1) === m).sort((a, b) => b.score - a.score).slice(0, 10));
    store.set(KEY_SCORES, keep);
  }
  let boardMode = 1;
  function renderBoard() {
    $$("#boardTabs .chip").forEach((c) => c.classList.toggle("active", +c.dataset.m === boardMode));
    const all = loadScores();
    const list = all.filter((x) => (x.mode || 1) === boardMode); const ol = $("#boardList");
    ol.innerHTML = list.map((s) => `<li><span class="bn">${esc(s.name)}</span><span class="bl">${esc(s.level)} · ${esc(s.correct)}/${esc(s.total || 10)}</span><span class="bs">${s.score}</span></li>`).join("");
    $("#boardEmpty").classList.toggle("hidden", list.length > 0);
    $("#btnClearBoard").classList.toggle("hidden", all.length === 0);
  }
  $$("#boardTabs .chip").forEach((c) => c.addEventListener("click", () => { Sound.play("click"); boardMode = +c.dataset.m; renderBoard(); }));
  $("#btnClearBoard").addEventListener("click", () => {
    if (confirm("Hapus semua skor di papan skor?")) { store.set(KEY_SCORES, []); renderBoard(); }
  });

  /* ------------------------------------------------------
     SETUP PERMAINAN
     ------------------------------------------------------ */
  const setup = { mode: 1, level: "sedang" };
  const prefs = store.get(KEY_PREFS, {});
  function showScreen(name) {
    ["setup", "quiz", "result"].forEach((n) => $("#screen-" + n).classList.toggle("hidden", n !== name));
    resetIdle();
  }
  function updateSetupUI() {
    $$("#segMode .seg-btn").forEach((b) => b.classList.toggle("active", +b.dataset.v === setup.mode));
    $$("#segLevel .seg-btn").forEach((b) => b.classList.toggle("active", b.dataset.v === setup.level));
    $("#wrapName2").classList.toggle("hidden", setup.mode !== 2);
    $("#ruleLives").classList.toggle("hidden", setup.mode === 2);
    $("#levelDesc").textContent = CONFIG.LEVELS[setup.level].desc;
  }
  $$("#segMode .seg-btn").forEach((b) => b.addEventListener("click", () => { Sound.play("click"); setup.mode = +b.dataset.v; updateSetupUI(); }));
  $$("#segLevel .seg-btn").forEach((b) => b.addEventListener("click", () => { Sound.play("click"); setup.level = b.dataset.v; updateSetupUI(); }));
  $("#btnStart").addEventListener("click", () => {
    Sound.play("click");
    const n1 = $("#name1").value.trim() || "Pemain 1";
    const n2 = $("#name2").value.trim() || "Pemain 2";
    Game.start(setup.mode, setup.level, [n1, n2]);
  });
  ["name1", "name2"].forEach((id) => $("#" + id).addEventListener("keydown", (e) => { if (e.key === "Enter") $("#btnStart").click(); e.stopPropagation(); }));

  /* ------------------------------------------------------
     GAME
     ------------------------------------------------------ */
  const Game = {
    running: false, mode: 1, level: "sedang", cfg: null,
    players: [], questions: [], qi: 0, cur: null, locked: false,
    timeLeft: 0, timerId: null, startTime: 0, hintLevel: 0, missed: [],

    start(mode, level, names) {
      this.mode = mode; this.level = level; this.cfg = CONFIG.LEVELS[level];
      this.players = names.slice(0, mode).map((n) => ({ name: n, score: 0, lives: CONFIG.LIVES, combo: 0, bestCombo: 0, hints: CONFIG.HINTS, correct: 0, asked: 0 }));
      const pool = TOKOH.filter((t) => this.cfg.pool.includes(t.level));
      this.questions = shuffle(pool).slice(0, CONFIG.QUESTIONS);
      this.qi = 0; this.missed = []; this.running = true; this.locked = false;
      showScreen("quiz");
      this.renderHud();
      this.next();
    },

    player() { return this.players[this.mode === 2 ? this.qi % 2 : 0]; },

    buildOptions(ans) {
      let cands = TOKOH.filter((t) => t.id !== ans.id);
      const noShare = cands.filter((t) => !emojiList(t).some((e) => emojiList(ans).includes(e)));
      if (noShare.length >= 3) cands = noShare;
      if (this.level === "sulit") {
        const same = cands.filter((t) => t.test === ans.test);
        if (same.length >= 3) cands = same;
      }
      const picks = shuffle(cands).slice(0, 3);
      return shuffle([ans, ...picks]);
    },

    next() {
      if (this.qi >= this.questions.length) return this.finish();
      this.cur = this.questions[this.qi];
      this.options = this.buildOptions(this.cur);
      this.locked = false; this.hintLevel = 0;
      $("#feedback").classList.add("hidden");
      $("#hintBox").classList.add("hidden");
      const p = this.player();
      $("#hudQ").textContent = `Soal ${this.qi + 1}/${this.questions.length}`;
      $("#hudLevel").textContent = this.cfg.label;
      const tl = $("#turnLabel");
      tl.classList.toggle("hidden", this.mode !== 2);
      tl.textContent = `Giliran: ${p.name}`;
      $("#emojiBox").innerHTML = emojiList(this.cur).map((e, i) => `<span style="animation-delay:${i * 0.12}s">${e}</span>`).join("");
      $("#options").innerHTML = this.options.map((o, i) => `<button class="opt" data-i="${i}"><b>${i + 1}</b><span>${esc(o.nama)}</span></button>`).join("");
      $$("#options .opt").forEach((b) => b.addEventListener("click", () => this.answer(+b.dataset.i)));
      this.updateHintBtn();
      const cl = $("#comboLabel");
      if (p.combo >= 2) { cl.textContent = `🔥 Combo ×${p.combo}`; cl.classList.remove("hidden"); } else cl.classList.add("hidden");
      this.renderHud();
      this.startTimer();
    },

    startTimer() {
      clearInterval(this.timerId);
      const total = this.cfg.time * 1000;
      this.startTime = performance.now();
      this.timeLeft = this.cfg.time;
      let lastWhole = this.cfg.time;
      const tm = $(".timer");
      tm.classList.remove("urgent");
      this.timerId = setInterval(() => {
        const left = Math.max(0, total - (performance.now() - this.startTime));
        this.timeLeft = left / 1000;
        $("#timerBar").style.transform = `scaleX(${left / total})`;
        const whole = Math.ceil(this.timeLeft);
        $("#timerNum").textContent = whole;
        if (whole !== lastWhole) { lastWhole = whole; if (whole <= 5 && whole > 0) Sound.play("tick"); }
        tm.classList.toggle("urgent", whole <= 5);
        if (left <= 0) this.answer(-1);
      }, 100);
    },

    bookOf(ref) {
      const m = ref.match(/^((?:\d\s)?[A-Za-z-]+(?:\s[A-Za-z-]+)*?)\s\d/);
      return m ? m[1] : ref;
    },

    updateHintBtn() {
      const p = this.player();
      const b = $("#btnHint");
      b.innerHTML = `💡 Petunjuk (${p.hints}) <kbd>H</kbd>`;
      b.disabled = p.hints <= 0 || this.hintLevel >= 2 || this.locked;
    },

    useHint() {
      const p = this.player();
      if (this.locked || p.hints <= 0 || this.hintLevel >= 2) return;
      p.hints--; this.hintLevel++;
      const t = this.cur;
      const book = this.bookOf(t.ref);
      const first = t.nama.toLowerCase().split(/[\s(&]/)[0];
      // Jika nama kitab memuat nama tokoh (mis. Kitab Daniel), jangan sebut nama kitabnya agar tidak membocorkan jawaban.
      const tail = book.toLowerCase().includes(first) ? "kisahnya punya kitab sendiri dalam Alkitab." : `kisahnya ada di kitab ${esc(book)}.`;
      const lines = [`<span class="hint-step">1</span>Tokoh ${t.test === "PL" ? "Perjanjian Lama" : "Perjanjian Baru"}, ${tail}`];
      if (this.hintLevel >= 2) lines.push(`<span class="hint-step">2</span>${esc(t.petunjuk)}`);
      const hb = $("#hintBox");
      hb.innerHTML = lines.join("<br>");
      hb.classList.remove("hidden");
      this.updateHintBtn();
      Sound.play("hint");
    },

    answer(i) {
      if (this.locked) return;
      this.locked = true; clearInterval(this.timerId);
      $("#btnHint").disabled = true;
      $(".timer").classList.remove("urgent");
      const p = this.player(); p.asked++;
      const ok = i >= 0 && this.options[i].id === this.cur.id;
      $$("#options .opt").forEach((b, idx) => {
        b.disabled = true;
        if (this.options[idx].id === this.cur.id) b.classList.add("correct");
        else if (idx === i) b.classList.add("wrong");
      });

      let gained = 0, note = "";
      if (ok) {
        p.combo++; p.bestCombo = Math.max(p.bestCombo, p.combo); p.correct++;
        const base = 100 * this.cfg.mult;
        const speed = Math.round(this.timeLeft * 5);
        const combo = Math.min((p.combo - 1) * 10, 60);
        gained = Math.round(base + speed + combo);
        gained = Math.round(gained * [1, 0.75, 0.5][this.hintLevel]);
        p.score += gained;
        Collection.add(this.cur.id);
        note = `+${gained} poin` + (speed ? ` (bonus cepat +${speed})` : "") + (combo ? ` · combo +${combo}` : "") + (this.hintLevel ? ` · petunjuk dipakai (×${["1", "0,75", "0,5"][this.hintLevel]})` : "");
        Sound.play("correct"); Confetti.burst(70);
      } else {
        p.combo = 0;
        if (this.mode === 1) p.lives--;
        this.missed.push(this.cur.id);
        note = i < 0 ? "Waktu habis!" : "Belum tepat.";
        if (this.mode === 1) note += p.lives > 0 ? ` Sisa nyawa: ${p.lives}` : " Nyawa habis.";
        Sound.play("wrong");
      }
      this.renderHud();
      setTimeout(() => this.showFeedback(ok, i < 0, note), 650);
    },

    showFeedback(ok, timeout, note) {
      const t = this.cur;
      const st = $("#fbStatus");
      st.className = "fb-status " + (ok ? "ok" : "no");
      st.textContent = ok ? "Benar! 🎉" : timeout ? "Waktu habis ⏰" : "Belum tepat 😅";
      $("#fbEmoji").textContent = t.emoji.replace(/ /g, "");
      $("#fbName").textContent = ok ? t.nama : "Jawabannya: " + t.nama;
      $("#fbRef").textContent = t.ref;
      $("#fbInti").textContent = t.inti;
      $("#fbPoints").textContent = note;
      const last = this.qi + 1 >= this.questions.length || (this.mode === 1 && this.players[0].lives <= 0);
      $("#btnNext").innerHTML = last ? `Lihat Hasil ➜ <kbd>Enter</kbd>` : `Lanjut ➜ <kbd>Enter</kbd>`;
      $("#feedback").classList.remove("hidden");
      $("#btnNext").focus();
    },

    advance() {
      if ($("#feedback").classList.contains("hidden")) return;
      Sound.play("click");
      $("#feedback").classList.add("hidden");
      this.qi++;
      if (this.mode === 1 && this.players[0].lives <= 0) return this.finish();
      this.next();
    },

    renderHud() {
      const cur = this.mode === 2 && this.running ? this.qi % 2 : 0;
      $("#hudPlayers").innerHTML = this.players.map((p, i) => {
        const hearts = this.mode === 1 ? `<span class="pl">${"❤️".repeat(Math.max(p.lives, 0))}${"🖤".repeat(CONFIG.LIVES - Math.max(p.lives, 0))}</span>` : "";
        return `<div class="pbadge ${this.mode === 2 && i === cur ? "turn" : ""}"><span class="pn">${esc(p.name)}</span><span class="ps">${p.score}</span>${hearts}</div>`;
      }).join("");
    },

    finish() {
      clearInterval(this.timerId);
      this.running = false;
      $("#feedback").classList.add("hidden");
      const perPlayer = this.mode === 2 ? CONFIG.QUESTIONS / 2 : CONFIG.QUESTIONS;
      const rank = (c) => {
        const r = c / perPlayer;
        if (r >= 1) return { e: "👑", n: "Ahli Alkitab", s: 4 };
        if (r >= 0.7) return { e: "🕊️", n: "Murid Rajin", s: 3 };
        if (r >= 0.4) return { e: "📖", n: "Pembaca Setia", s: 2 };
        return { e: "🐣", n: "Murid Baru", s: 1 };
      };
      const stars = (n) => "⭐".repeat(n) + "☆".repeat(4 - n);
      let html = "";

      if (this.mode === 1) {
        const p = this.players[0]; const rk = rank(p.correct);
        html = `
          <div class="rank-emoji">${rk.e}</div>
          <div class="rank-name">${rk.n}</div>
          <div class="stars">${stars(rk.s)}</div>
          <div class="big-score">${p.score}</div>
          <p class="muted">poin untuk ${esc(p.name)}</p>
          <div class="stats">
            <div>✅ Benar: <b>${p.correct}/${CONFIG.QUESTIONS}</b></div>
            <div>🔥 Combo terbaik: <b>${p.bestCombo}</b></div>
            <div>🎚️ Level: <b>${this.cfg.label}</b></div>
          </div>`;
        saveScore({ name: p.name, score: p.score, level: this.cfg.label, mode: 1, correct: p.correct, total: CONFIG.QUESTIONS });
      } else {
        const [a, b] = this.players;
        const draw = a.score === b.score;
        const win = a.score > b.score ? 0 : 1;
        const side = (p, i) => { const rk = rank(p.correct); return `
          <div class="side ${!draw && win === i ? "win" : ""}">
            <div class="rank-emoji" style="font-size:2.6rem;animation:none">${!draw && win === i ? "🏆" : rk.e}</div>
            <h3>${esc(p.name)}</h3>
            <div class="big-score">${p.score}</div>
            <p class="muted small">✅ ${p.correct}/${perPlayer} · ${rk.n}</p>
          </div>`; };
        html = `
          <div class="rank-name">${draw ? "Hasil Seri! 🤝" : "Pemenang: " + esc(this.players[win].name) + " 🎉"}</div>
          <div class="duel">${side(a, 0)}${side(b, 1)}</div>`;
        this.players.forEach((p) => saveScore({ name: p.name, score: p.score, level: this.cfg.label, mode: 2, correct: p.correct, total: perPlayer }));
      }
      html += `<p class="verse">Tetaplah belajar. Setiap tokoh punya kisah yang bisa menguatkan kita. 📖</p>`;
      $("#resultBody").innerHTML = html;

      const missed = [...new Set(this.missed)];
      $("#missedBox").classList.toggle("hidden", missed.length === 0);
      $("#missedList").innerHTML = missed.map((id) => `<button class="missed-chip" data-id="${id}">${esc(byId(id).nama)}</button>`).join("");
      $$("#missedList .missed-chip").forEach((b) => b.addEventListener("click", () => openModal(b.dataset.id)));
      $("#btnToLearn").textContent = missed.length ? "📚 Pelajari yang Salah" : "📚 Belajar Kisah";

      showScreen("result");
      Sound.play("win");
      const topRank = this.mode === 1 ? rank(this.players[0].correct).s : 3;
      Confetti.burst(topRank >= 3 ? 220 : 90, true);
    },

    abort() {
      clearInterval(this.timerId);
      this.running = false;
      $("#feedback").classList.add("hidden");
      showScreen("setup");
    }
  };

  $("#btnHint").addEventListener("click", () => Game.useHint());
  $("#btnNext").addEventListener("click", () => Game.advance());
  $("#btnReadMore").addEventListener("click", () => openModal(Game.cur.id));
  $("#btnQuit").addEventListener("click", () => { if (confirm("Keluar dari permainan? Skor sesi ini tidak disimpan.")) { Sound.play("click"); Game.abort(); } });
  $("#btnAgain").addEventListener("click", () => { Sound.play("click"); showScreen("setup"); });
  $("#btnHome").addEventListener("click", () => { Sound.play("click"); showScreen("setup"); go("beranda"); });
  $("#btnToLearn").addEventListener("click", () => {
    Sound.play("click");
    const first = $("#missedList .missed-chip");
    go("belajar");
    if (first) openModal(first.dataset.id);
  });

  /* ------------------------------------------------------
     HALAMAN BELAJAR
     ------------------------------------------------------ */
  const learn = { filter: "semua", q: "" };
  function renderLearn() {
    const got = Collection.get();
    $("#collectText").textContent = `${got.size} / ${TOKOH.length}`;
    $("#collectBar").style.width = (got.size / TOKOH.length * 100) + "%";
    const q = learn.q.trim().toLowerCase();
    const list = TOKOH.filter((t) => {
      if (learn.filter === "PL" || learn.filter === "PB") { if (t.test !== learn.filter) return false; }
      if (learn.filter === "koleksi" && !got.has(t.id)) return false;
      if (q && !t.nama.toLowerCase().includes(q)) return false;
      return true;
    });
    $("#cards").innerHTML = list.map((t) => `
      <button class="pcard ${got.has(t.id) ? "got" : ""}" data-id="${t.id}">
        ${got.has(t.id) ? '<span class="star">⭐</span>' : ""}
        <div class="pe">${t.emoji.replace(/ /g, "")}</div>
        <div class="pname">${esc(t.nama)}</div>
        <div class="pmeta">${t.test === "PL" ? "Perjanjian Lama" : "Perjanjian Baru"} · ${esc(t.ref)}</div>
      </button>`).join("");
    $("#noResult").classList.toggle("hidden", list.length > 0);
    $$("#cards .pcard").forEach((c) => c.addEventListener("click", () => { Sound.play("click"); openModal(c.dataset.id); }));
  }
  $$("#chips .chip").forEach((c) => c.addEventListener("click", () => {
    Sound.play("click");
    learn.filter = c.dataset.f;
    $$("#chips .chip").forEach((x) => x.classList.toggle("active", x === c));
    renderLearn();
  }));
  $("#search").addEventListener("input", (e) => { learn.q = e.target.value; renderLearn(); });
  $("#search").addEventListener("keydown", (e) => e.stopPropagation());

  /* ------------------------------------------------------
     MODAL KISAH
     ------------------------------------------------------ */
  function openModal(id) {
    const t = byId(id); if (!t) return;
    $("#mEmoji").textContent = t.emoji.replace(/ /g, "");
    $("#mTest").textContent = t.test === "PL" ? "Perjanjian Lama" : "Perjanjian Baru";
    $("#mLevel").textContent = CONFIG.LEVELS[t.level].label;
    $("#mName").textContent = t.nama;
    $("#mRef").textContent = "Baca di: " + t.ref;
    $("#mStory").innerHTML = t.kisah.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#mLesson").textContent = t.pesan;
    $("#modal").classList.remove("hidden");
    $(".modal-card").scrollTop = 0;
    resetIdle();
  }
  function closeModal() { $("#modal").classList.add("hidden"); }
  $("#modalClose").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

  /* ------------------------------------------------------
     TENTANG KAMI (frame lengkung ala vitray)
     ------------------------------------------------------ */
  function initials(nama) {
    const words = nama.replace(/[.,]/g, "").split(/\s+/).filter((w) => !/^(dr|m|kes|ph|d)$/i.test(w));
    return (words[0]?.[0] || "") + (words[1]?.[0] || "");
  }
  function frameHTML(person, big, delay) {
    return `<div class="frame ${big ? "big" : ""}" style="animation-delay:${delay}s">
      <div class="arch"><div class="arch-in">
        <img src="${esc(person.foto)}" alt="Foto ${esc(person.nama)}" loading="lazy">
        <span class="ini" style="display:none">${esc(initials(person.nama).toUpperCase())}</span>
      </div></div>
      <div class="plaque">${esc(person.nama)}</div>
    </div>`;
  }
  function renderAbout() {
    $("#dosenFrame").innerHTML = frameHTML(CONFIG.DOSEN, true, 0);
    $("#memberGrid").innerHTML = CONFIG.MEMBERS.map((m, i) => frameHTML(m, false, 0.1 + i * 0.1)).join("");
    $("#goalList").innerHTML = CONFIG.GOALS.map((g) => `<li>${esc(g)}</li>`).join("");
    $("#sourceList").innerHTML = CONFIG.SOURCES.map((x) => `<li>${x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.teks)}</a>` : esc(x.teks)}</li>`).join("");
    $$(".arch-in img").forEach((img) => {
      img.addEventListener("error", () => { img.style.display = "none"; img.nextElementSibling.style.display = "block"; });
    });
  }

  /* ------------------------------------------------------
     KONTROL: SUARA, MUSIK, LAYAR PENUH
     ------------------------------------------------------ */
  function syncTools() {
    $("#btnSfx").textContent = Sound.sfxOn ? "🔊" : "🔇";
    $("#btnSfx").classList.toggle("off", !Sound.sfxOn);
    $("#btnMusic").classList.toggle("off", !Sound.musicOn);
    store.set(KEY_PREFS, { sfx: Sound.sfxOn });
  }
  function toggleSfx() { Sound.sfxOn = !Sound.sfxOn; syncTools(); if (Sound.sfxOn) Sound.play("click"); }
  function toggleMusic() {
    Sound.musicOn = !Sound.musicOn;
    if (Sound.musicOn) Sound.startMusic();
    syncTools();
    toast(Sound.musicOn ? "🎵 Musik latar menyala" : "Musik latar dimatikan");
  }
  function toggleFs() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }
  $("#btnSfx").addEventListener("click", toggleSfx);
  $("#btnMusic").addEventListener("click", toggleMusic);
  $("#btnFs").addEventListener("click", toggleFs);

  /* ------------------------------------------------------
     KEYBOARD
     ------------------------------------------------------ */
  addEventListener("keydown", (e) => {
    resetIdle();
    if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    const k = e.key.toLowerCase();
    if (k === "escape") { closeModal(); return; }
    if (k === "f") { toggleFs(); return; }
    if (k === "m") { toggleSfx(); return; }
    if (currentPage === "main" && Game.running) {
      if (["1", "2", "3", "4"].includes(k) && !Game.locked) { Game.answer(+k - 1); return; }
      if (k === "h") { Game.useHint(); return; }
      if ((k === "enter" || k === " ") && !$("#feedback").classList.contains("hidden")) {
        if ($("#modal").classList.contains("hidden")) { e.preventDefault(); Game.advance(); }
      }
    }
  });

  /* ------------------------------------------------------
     AUTO-RESET (untuk pameran)
     ------------------------------------------------------ */
  let lastActive = Date.now(), warned = false;
  function resetIdle() { lastActive = Date.now(); warned = false; }
  ["mousemove", "mousedown", "touchstart", "click", "scroll", "wheel"].forEach((ev) => addEventListener(ev, resetIdle, { passive: true }));
  setInterval(() => {
    const idle = (Date.now() - lastActive) / 1000;
    if (matchMedia("(hover: none) and (pointer: coarse)").matches) return; // HP: tidak perlu auto-reset
    if (currentPage === "beranda" && $("#modal").classList.contains("hidden")) { warned = false; return; }
    if (idle >= CONFIG.IDLE_RESET_SEC) {
      closeModal();
      if (Game.running) Game.abort();
      showScreen("setup");
      go("beranda");
      toast("Kembali ke beranda, siap untuk pemain berikutnya 👋", 3500);
    } else if (idle >= CONFIG.IDLE_WARN_SEC && !warned) {
      warned = true;
      toast(`Masih di sana? Kembali ke beranda dalam ${Math.round(CONFIG.IDLE_RESET_SEC - idle)} detik`, 4000);
    }
  }, 1000);

  /* ------------------------------------------------------
     MULAI
     ------------------------------------------------------ */
  Sound.sfxOn = prefs.sfx !== false;
  syncTools();
  updateSetupUI();
  renderAbout();
  renderBoard();
  go(location.hash.slice(1) || "beranda");
})();
