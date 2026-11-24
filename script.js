/* ShelfWise – script.js */
/* ShelfWise – script.js */
/* ShelfWise – script.js */
/* ShelfWise – script.js */
/* ShelfWise – script.js */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => "&#" + c.charCodeAt(0) + ";");

const STAFF = {user: "staff", pass: "admin123"};   // demo login – change these

// Catalogue: course -> branch -> ["Subject|Book title|Author"]. Add a line to add a book.
const CAT = {
  "B.Tech": {
    CSE: ["Algorithms|Introduction to Algorithms|Thomas Cormen", "Operating Systems|Operating System Concepts|Silberschatz", "Databases|Database System Concepts|Silberschatz", "Networks|Computer Networks|Andrew Tanenbaum"],
    ECE: ["Analog Electronics|Microelectronic Circuits|Sedra & Smith", "Digital Electronics|Digital Design|M. Morris Mano", "Signals|Signals and Systems|Alan Oppenheim", "Communication|Communication Systems|Simon Haykin"],
    Mechanical: ["Thermodynamics|Engineering Thermodynamics|P. K. Nag", "Fluid Mechanics|Fluid Mechanics|R. K. Bansal", "Machine Design|Design of Machine Elements|V. B. Bhandari", "Heat Transfer|Fundamentals of Heat and Mass Transfer|Incropera"],
    Civil: ["Structures|Structural Analysis|R. C. Hibbeler", "Geotechnics|Soil Mechanics and Foundations|B. C. Punmia", "Surveying|Surveying Vol. 1|B. C. Punmia", "Concrete|Reinforced Concrete Design|S. U. Pillai"],
    Electrical: ["Machines|Electric Machinery Fundamentals|Stephen Chapman", "Power Systems|Power System Analysis|Hadi Saadat", "Control Systems|Control Systems Engineering|Norman Nise", "Circuits|Engineering Circuit Analysis|William Hayt"]
  },
  "M.Tech": {
    CSE: ["Machine Learning|Pattern Recognition and Machine Learning|Christopher Bishop", "Advanced Algorithms|Algorithm Design|Kleinberg & Tardos", "Distributed Systems|Distributed Systems|Andrew Tanenbaum"],
    VLSI: ["CMOS Design|CMOS VLSI Design|Weste & Harris", "Digital ICs|Digital Integrated Circuits|Jan Rabaey", "Analog ICs|Design of Analog CMOS Integrated Circuits|Behzad Razavi"],
    Mechanical: ["Finite Elements|Introduction to Finite Elements in Engineering|Chandrupatla", "Vibrations|Mechanical Vibrations|Singiresu Rao", "Composites|Mechanics of Composite Materials|Autar Kaw"]
  },
  "MBA": {
    Marketing: ["Marketing Management|Marketing Management|Philip Kotler", "Consumer Behaviour|Consumer Behavior|Schiffman & Kanuk", "Digital Marketing|Digital Marketing|Dave Chaffey"],
    Finance: ["Financial Management|Financial Management|I. M. Pandey", "Investments|Investment Analysis and Portfolio Management|Prasanna Chandra", "Corporate Finance|Principles of Corporate Finance|Brealey & Myers"],
    HR: ["HR Management|Human Resource Management|Gary Dessler", "Organisational Behaviour|Organizational Behavior|Stephen Robbins", "Personnel Management|Personnel Management|C. B. Mamoria"]
  },
  "BBA": {
    Marketing: ["Advertising|Advertising and Promotion|George Belch", "Marketing Basics|Principles of Marketing|Kotler & Armstrong"],
    Finance: ["Accounting|Financial Accounting|S. N. Maheshwari", "Financial Management|Fundamentals of Financial Management|Brigham"],
    Management: ["Management|Principles of Management|Harold Koontz", "Communication|Business Communication|Meenakshi Raman", "Statistics|Business Statistics|S. P. Gupta"]
  },
  "BCA": {
    Programming: ["C Programming|Let Us C|Yashavant Kanetkar", "Data Structures|Data Structures Using C|Reema Thareja", "Java|Java: The Complete Reference|Herbert Schildt"],
    "Web & Database": ["Databases|Database Management Systems|Raghu Ramakrishnan", "Web Development|PHP and MySQL Web Development|Luke Welling", "Web Basics|Web Technologies|Uttam Roy"],
    Networking: ["Networks|Data Communications and Networking|Behrouz Forouzan", "Security|Cryptography and Network Security|William Stallings"]
  },
  "B.Sc": {
    Physics: ["Mechanics|Concepts of Physics|H. C. Verma", "Optics|Optics|Ajoy Ghatak", "Mathematical Physics|Mathematical Physics|H. K. Dass"],
    Chemistry: ["Organic|Organic Chemistry|Morrison & Boyd", "Physical|Physical Chemistry|P. W. Atkins", "Inorganic|Concise Inorganic Chemistry|J. D. Lee"],
    Mathematics: ["Real Analysis|Principles of Mathematical Analysis|Walter Rudin", "Linear Algebra|Linear Algebra|Hoffman & Kunze", "Calculus|Thomas' Calculus|George Thomas"],
    Biology: ["Botany|Textbook of Botany|B. P. Pandey", "Zoology|Modern Textbook of Zoology|R. L. Kotpal", "Microbiology|Brock Biology of Microorganisms|Madigan"]
  },
  "M.Sc": {
    Physics: ["Quantum Mechanics|Introduction to Quantum Mechanics|D. J. Griffiths", "Classical Mechanics|Classical Mechanics|Herbert Goldstein", "Solid State|Introduction to Solid State Physics|Charles Kittel"],
    Chemistry: ["Inorganic|Inorganic Chemistry|Shriver & Atkins", "Organic|Organic Chemistry|Jonathan Clayden", "Quantum Chemistry|Quantum Chemistry|Ira Levine"],
    Mathematics: ["Topology|Topology|James Munkres", "Complex Analysis|Functions of One Complex Variable|John Conway", "Algebra|Abstract Algebra|Dummit & Foote"]
  },
  "B.Com": {
    Accounting: ["Financial Accounting|Financial Accounting|T. S. Grewal", "Cost Accounting|Cost Accounting|M. N. Arora"],
    Taxation: ["Income Tax|Direct Taxes Law and Practice|Vinod Singhania", "GST|Indirect Taxes|V. S. Datey"],
    "Business & Law": ["Business Law|Business Law|N. D. Kapoor", "Economics|Business Economics|H. L. Ahuja"]
  },
  "M.Com": {
    Accounting: ["Advanced Accounting|Advanced Accounting|S. N. Maheshwari", "Management Accounting|Management Accounting|M. Y. Khan"],
    Finance: ["Financial Markets|Indian Financial System|M. Y. Khan", "Corporate Finance|Corporate Finance|Ross & Westerfield"],
    Commerce: ["Statistics|Statistical Methods|S. P. Gupta", "Banking|Banking Theory and Practice|K. C. Shekhar"]
  },
  "Pharmacy": {
    Pharmaceutics: ["Dosage Forms|Aulton's Pharmaceutics|Michael Aulton", "Industrial Pharmacy|Theory and Practice of Industrial Pharmacy|Lachman", "Biopharmaceutics|Biopharmaceutics and Pharmacokinetics|D. M. Brahmankar"],
    Pharmacology: ["Medical Pharmacology|Essentials of Medical Pharmacology|K. D. Tripathi", "Pharmacology|Rang & Dale's Pharmacology|Rang & Dale"],
    "Pharmaceutical Chemistry": ["Pharma Chemistry|Textbook of Pharmaceutical Chemistry|Jayashree Ghosh", "Medicinal Chemistry|Wilson and Gisvold's Medicinal Chemistry|Block & Beale", "Analysis|Vogel's Textbook of Quantitative Chemical Analysis|Mendham"],
    Pharmacognosy: ["Pharmacognosy|Pharmacognosy|C. K. Kokate", "Herbal Drugs|Trease and Evans Pharmacognosy|William Evans"]
  },
  "Agriculture": {
    Agronomy: ["Agronomy|Principles of Agronomy|S. R. Reddy", "Crop Science|Handbook of Agriculture|ICAR"],
    "Soil Science": ["Soil Basics|Fundamentals of Soil Science|ISSS", "Soil Properties|The Nature and Properties of Soils|Brady & Weil"],
    Horticulture: ["Horticulture|Fundamentals of Horticulture|J. S. Arora", "Vegetables|Textbook of Vegetables, Tuber Crops and Spices|Thamburaj & Singh"],
    "Plant Protection": ["Plant Pathology|Introduction to Principles of Plant Pathology|R. S. Singh", "Plant Diseases|Plant Pathology|George Agrios"]
  },
  "BA": {
    History: ["Modern India|India's Struggle for Independence|Bipan Chandra", "Ancient India|India's Ancient Past|R. S. Sharma"],
    "Political Science": ["Indian Polity|Indian Polity|M. Laxmikanth", "Political Theory|An Introduction to Political Theory|O. P. Gauba"],
    English: ["Literary Terms|A Glossary of Literary Terms|M. H. Abrams", "Novel|Pride and Prejudice|Jane Austen"],
    Economics: ["Principles|Principles of Economics|N. Gregory Mankiw", "Indian Economy|Indian Economy|Datt & Sundharam"],
    Sociology: ["Introduction|Sociology: Themes and Perspectives|Haralambos", "Indian Society|Social Change in Modern India|M. N. Srinivas"]
  },
  "MA": {
    English: ["Theory|Literary Theory: An Introduction|Terry Eagleton", "Criticism|Beginning Theory|Peter Barry"],
    History: ["Modern India|Modern India|Sumit Sarkar", "Colonial India|From Plassey to Partition|Sekhar Bandyopadhyay"],
    Economics: ["Microeconomics|Intermediate Microeconomics|Hal Varian", "Macroeconomics|Macroeconomics|Dornbusch & Fischer"],
    Sociology: ["Theory|Classical Sociological Theory|George Ritzer", "Methods|Social Research Methods|Alan Bryman"]
  },
  "PhD": {
    Engineering: ["Research Methods|Research Methodology: Methods and Techniques|C. R. Kothari", "Numerical Methods|Numerical Methods for Engineers|Chapra & Canale"],
    Science: ["Statistics|Fundamentals of Biostatistics|Bernard Rosner", "Scientific Writing|How to Write and Publish a Scientific Paper|Robert Day"],
    Management: ["Business Research|Business Research Methods|Cooper & Schindler", "Research Design|Research Design|John Creswell"],
    Humanities: ["Research Skills|The Craft of Research|Booth et al.", "Qualitative Research|Qualitative Inquiry and Research Design|John Creswell"]
  }
};

// Build the book list: [course, branch, title, author, subject, ISBN (sample), total copies, copies on shelf]
const PN = Object.keys(CAT), B = [];
PN.forEach(course => Object.entries(CAT[course]).forEach(([branch, list]) => list.forEach(s => {
  const [subject, title, author] = s.split("|"), i = B.length, total = 3 + i % 4;
  B.push([course, branch, title, author, subject, "97881" + String(i + 1).padStart(8, "0"), total, (i * 7 + 3) % (total + 1)]);
})));


/* ---------- State (saved in the browser) ---------- */
let S = JSON.parse(localStorage.getItem("lib2") || "null") || {left: B.map(b => b[7]), res: [], wait: [], msg: []};
let sel = "", br = "", sub = "", cur = 0, yes = () => {}, fails = 0, lockUntil = 0;
const save = () => localStorage.setItem("lib2", JSON.stringify(S));
const fmt = t => new Date(t).toLocaleString([], {dateStyle: "medium", timeStyle: "short"});
const who = p => `${p.name} (mobile ${p.phone})`;

/* ---------- Messages ---------- */
function toast(m) {
  const t = $("#toast"); t.textContent = m; t.classList.add("on");
  clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove("on"), 5000);
}
function say(text) {                       // save the message + show a popup on the site
  S.msg.unshift({t: Date.now(), text});
  S.msg.length = Math.min(S.msg.length, 40);
  toast(text);
}
function sure(text, fn) {                  // "Are you sure?" box
  $("#cm").textContent = text; yes = fn; $("#cf").showModal();
}
$("#yes").onclick = () => { $("#cf").close(); yes(); };

/* ---------- Reserve / cancel logic ---------- */
function hold(i, p) {
  S.left[i]--;
  const r = {i, name: p.name, reg: p.reg, phone: p.phone, prog: p.prog,
             code: Math.random().toString(36).slice(2, 8).toUpperCase(),
             until: Date.now() + p.hours * 36e5};
  S.res.push(r);
  return r;
}

// A copy comes back: if someone is waiting, hold it for them at once (48 hours).
function ret(i) {
  S.left[i]++;
  let w;
  while (S.left[i] > 0 && (w = S.wait.find(x => x.i === i))) {
    S.wait.splice(S.wait.indexOf(w), 1);
    const r = hold(i, {...w, hours: 48});
    say(`${who(w)}: "${B[i][2]}" is available and already held for you for 48 hours. Code ${r.code}.`);
  }
}

// Cancel (unreserve) a hold. `by` = "by you" or "by library staff".
function cancelHold(r, by) {
  S.res.splice(S.res.indexOf(r), 1);
  say(`${who(r)}: your hold on "${B[r.i][2]}" was cancelled ${by}.`);
  ret(r.i); save(); render();
}

// Hold time over: send a message, free the copy, pass it to the next person waiting.
function expire() {
  const now = Date.now();
  S.res.filter(r => r.until <= now).forEach(r => {
    S.res.splice(S.res.indexOf(r), 1);
    say(`${who(r)}: your hold time for "${B[r.i][2]}" is over, so the book went back to the shelf.`);
    ret(r.i);
  });
  save(); render();
}

/* ---------- Screen ---------- */
const chip = (n, v, on, x = "") =>
  `<label class="chip"><input type="radio" name="${n}" value="${v}"${on ? " checked" : ""}><span>${v || "All"}${x}</span></label>`;
const left = p => B.reduce((n, b, i) => n + (b[0] === p ? S.left[i] : 0), 0);

function render() {
  const q = $("#q").value.toLowerCase().trim(), all = S.left.reduce((a, b) => a + b, 0);

  $("#stats").innerHTML = `<span><b>${B.length}</b> titles</span><span><b>${all}</b> copies on shelf</span><span><b>${S.res.length}</b> active holds</span>`;
  $("#chips").innerHTML = chip("p", "", !sel, ` <small>${all} left</small>`) +
    PN.map(p => chip("p", p, sel === p, ` <small>${left(p)} left</small>`)).join("");
  const brs = [...new Set(B.filter(b => b[0] === sel).map(b => b[1]))],
        subs = [...new Set(B.filter(b => b[0] === sel && b[1] === br).map(b => b[4]))];
  $("#brs").innerHTML = sel ? chip("b", "", !br) + brs.map(x => chip("b", x, br === x)).join("") : "";
  $("#subs").innerHTML = br ? chip("s", "", !sub) + subs.map(x => chip("s", x, sub === x)).join("") : "";

  const L = B.map((b, i) => [b, i]).filter(([b]) =>
    (!sel || b[0] === sel) && (!br || b[1] === br) && (!sub || b[4] === sub) && b.slice(0, 6).join(" ").toLowerCase().includes(q));
  const n = L.reduce((a, [, i]) => a + S.left[i], 0);
  $("#count").textContent = L.length
    ? `${L.length} title(s) · ${n} cop${n == 1 ? "y" : "ies"} left`
    : "No books match. Try another word or course.";

  $("#list").innerHTML = L.map(([b, i]) => {
    const l = S.left[i], t = b[6];
    return `<article class="book${l ? "" : " none"}" style="--c:${PN.indexOf(b[0]) % 2 ? "var(--r)" : "var(--b)"}">
      <div class="cover">${b[0]}${b[1] ? " · " + b[1] : ""}</div>
      <div class="info"><h3>${b[2]}</h3><small>${b[3]} · ${b[4]}</small><small>ISBN ${b[5]}</small>
      <div class="bar"><i class="${l < 2 ? "low" : ""}" style="width:${l / t * 100}%"></i></div>
      <span class="pill">${l ? `${l} of ${t} copies left` : `All ${t} copies taken`}</span>
      ${l ? `<button class="btn" data-r="${i}">Reserve</button>`
          : `<label class="notify"><input type="checkbox" data-n="${i}"${S.wait.some(w => w.i === i) ? " checked" : ""}>Notify me &amp; hold it when free</label>`}
      </div></article>`;
  }).join("");

  $("#side").innerHTML = `<h2>My holds <span>${S.res.length}</span></h2>` +
    (S.res.map(r => `<div class="card"><b>${B[r.i][2]}</b><br>Code <code>${r.code}</code><br>Until ${fmt(r.until)}<br><button class="link" data-c="${r.code}">Cancel hold</button></div>`).join("") || "<p>No active holds.</p>") +
    (S.wait.length ? `<h2>Waiting for <span>${S.wait.length}</span></h2>` + S.wait.map(w => `<div class="card">${B[w.i][2]}</div>`).join("") : "") +
    `<h2>Messages <span>${S.msg.length}</span></h2>` +
    (S.msg.slice(0, 6).map(m => `<div class="card m">${esc(m.text)}<br><small>${fmt(m.t)}</small></div>`).join("") || "<p>No messages yet.</p>");
  $("#bell").textContent = "Messages " + S.msg.length;

  if ($("#am").open && staffIn()) adm();          // keep the staff panel fresh
}

/* ---------- Reserve / notify form ---------- */
function ask(i, mode) {
  cur = i;
  const f = $("#form"); f.reset(); f.dataset.mode = mode;
  f.hidden = false; $("#ticket").hidden = true;
  $("#hl").hidden = mode === "wait"; $("#wn").hidden = mode !== "wait";
  $("#ft").textContent = (mode === "wait" ? "Notify me: " : "Reserve: ") + B[i][2];
  $("#pg").value = B[i][0];
  $("#dlg").showModal();
}

$("#form").onsubmit = e => {
  e.preventDefault();
  const f = new FormData(e.target), t = B[cur][2],
        p = {name: f.get("name").trim(), reg: f.get("reg"), phone: f.get("phone"), prog: f.get("prog"), hours: +f.get("hours")};
  if (e.target.dataset.mode === "wait") {
    S.wait.push({i: cur, ...p});
    say(`${who(p)}: you are on the waiting list for "${t}". It will be held for you for 48 hours when a copy is free.`);
    $("#dlg").close();
  } else {
    if (S.left[cur] < 1) return $("#dlg").close();
    const r = hold(cur, p);
    $("#tm").textContent = `${p.name}, "${t}" is held until ${fmt(r.until)}.`;
    $("#code").textContent = r.code;
    e.target.hidden = true; $("#ticket").hidden = false;
    say(`${who(p)}: "${t}" is reserved until ${fmt(r.until)}. Code ${r.code}.`);
  }
  save(); render();
};

/* ---------- Page events ---------- */
$("#chips").onchange = e => { sel = e.target.value; br = sub = ""; render(); };
$("#brs").onchange = e => { br = e.target.value; sub = ""; render(); };
$("#subs").onchange = e => { sub = e.target.value; render(); };
$("#q").oninput = render;
$("#dlg").onclose = render;

$("#list").onclick = e => { if (e.target.dataset.r != null) ask(+e.target.dataset.r, "hold"); };
$("#list").onchange = e => {
  if (e.target.dataset.n == null) return;
  const i = +e.target.dataset.n;
  if (e.target.checked) ask(i, "wait");                               // tick   -> join waiting list
  else { S.wait = S.wait.filter(w => w.i !== i); save(); render(); }  // untick -> leave it
};

// Cancel from "My holds"
$("#side").onclick = e => {
  const r = S.res.find(x => x.code === e.target.dataset.c);
  if (r) sure(`Cancel your hold on "${B[r.i][2]}"?`, () => cancelHold(r, "by you"));
};

// Cancel with code + registration number
$("#cancelBtn").onclick = () => { $("#cform").reset(); $("#ce").hidden = true; $("#cd").showModal(); };
$("#cform").onsubmit = e => {
  e.preventDefault();
  const f = new FormData(e.target), code = f.get("code").trim().toUpperCase(),
        r = S.res.find(x => x.code === code && x.reg === f.get("reg"));
  if (!r) { $("#ce").textContent = "Code or registration number is wrong."; $("#ce").hidden = false; return; }
  $("#cd").close();
  sure(`Cancel "${B[r.i][2]}" held for ${r.name}?`, () => cancelHold(r, "by you"));
};

/* ---------- Staff login + panel ---------- */
const staffIn = () => +localStorage.staff > Date.now();        // stays logged in for 8 hours
const row = (heads, cells) => `<tr>${cells.map((c, i) => `<td data-l="${heads[i]}">${c}</td>`).join("")}</tr>`;
const table = (heads, rows) =>
  `<table class="rt"><thead><tr>${heads.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("") || "<tr><td>None yet.</td></tr>"}</tbody></table>`;

function adm() {
  if (!staffIn()) {
    $("#ab").innerHTML = `<form id="login" class="login"><h2>Staff login</h2><p>Only library staff can see who reserved a book.</p>
      <label>Username<input id="su" required autocomplete="username"></label>
      <label>Password<input id="sp" type="password" required autocomplete="current-password"></label>
      <label class="chk"><input type="checkbox" id="show">Show password</label>
      <p id="le" class="err" hidden></p>
      <div class="row"><button type="button" class="btn alt" onclick="am.close()">Close</button><button class="btn">Log in</button></div></form>`;
    return;
  }
  const H1 = ["Book","Name","Reg. no.","Mobile","Course","Code","Hold ends","Action"], H2 = ["Book","Name","Reg. no.","Mobile","Course"];
  $("#ab").innerHTML = `
    <div class="ph"><h2>Staff panel</h2><div><button class="btn alt sm" data-out="1">Log out</button><button class="btn sm" onclick="am.close()">Close</button></div></div>
    <div class="tiles"><div><b>${S.res.length}</b>Active holds</div><div><b>${S.wait.length}</b>Waiting</div>
      <div><b>${S.left.filter(n => !n).length}</b>Out of stock</div><div><b>${S.msg.length}</b>Messages sent</div></div>
    <h3>Reservations</h3>
    ${table(H1, S.res.map(r => row(H1, [B[r.i][2], esc(r.name), esc(r.reg), `<a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>`, esc(r.prog), r.code, fmt(r.until), `<button class="btn red sm" data-x="${r.code}">Cancel</button>`])))}
    <h3>Waiting list</h3>
    ${table(H2, S.wait.map(w => row(H2, [B[w.i][2], esc(w.name), esc(w.reg), `<a href="tel:${esc(w.phone)}">${esc(w.phone)}</a>`, esc(w.prog)])))}
    <h3>Copy returned (books with no copies left)</h3>
    ${B.map((b, i) => S.left[i] ? "" : `<button class="btn sm" data-ret="${i}">${b[2]}</button>`).join("") || "<p>All books are in stock.</p>"}
    <h3>Automatic messages sent</h3>
    ${S.msg.map(m => `<div class="card m">${esc(m.text)} <small>${fmt(m.t)}</small></div>`).join("") || "<p>None yet.</p>"}`;
}

function loginError(m) { $("#le").textContent = m; $("#le").hidden = false; }

$("#staff").onclick = () => { adm(); $("#am").showModal(); };

$("#ab").onsubmit = e => {                                      // login form
  e.preventDefault();
  const wait = Math.ceil((lockUntil - Date.now()) / 1000);
  if (wait > 0) return loginError(`Too many wrong tries. Wait ${wait} seconds.`);
  if ($("#su").value.trim() === STAFF.user && $("#sp").value === STAFF.pass) {
    fails = 0; localStorage.staff = Date.now() + 8 * 36e5; adm(); toast("Welcome, staff.");
  } else if (++fails >= 3) {
    fails = 0; lockUntil = Date.now() + 30000; loginError("Wrong details. Locked for 30 seconds.");
  } else loginError(`Wrong username or password (${3 - fails} tries left).`);
};
$("#ab").onchange = e => { if (e.target.id === "show") $("#sp").type = e.target.checked ? "text" : "password"; };

$("#ab").onclick = e => {                                       // panel buttons
  const d = e.target.dataset;
  if (d.out != null) { localStorage.removeItem("staff"); adm(); toast("Logged out."); }
  if (d.ret != null) { ret(+d.ret); save(); render(); }          // librarian marks a copy returned
  if (d.x) {
    const r = S.res.find(x => x.code === d.x);
    if (r) sure(`Cancel the hold on "${B[r.i][2]}" for ${r.name}?`, () => cancelHold(r, "by library staff"));
  }
};

/* ---------- Start ---------- */
$("#pg").innerHTML = PN.map(p => `<option>${p}</option>`).join("");
expire();                       // draws the page
setInterval(expire, 30000);     // checks for finished holds every 30 seconds