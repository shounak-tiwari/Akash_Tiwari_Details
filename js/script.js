// ===== Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== Year
$("#year").textContent = new Date().getFullYear();

// ===== Mobile Menu
const burgerBtn = $("#burgerBtn");
const navLinks = $("#navLinks");

burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// close menu when clicking link (mobile)
$$(".nav-link").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("show"));
});

// ===== Dark/Light Theme
const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");
themeBtn.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeBtn.textContent = isLight ? "🌞" : "🌙";
});

// ===== Active link on scroll
const sections = ["home","about","skills","projects","contact"].map(id => document.getElementById(id));
const navA = $$(".nav-link");

window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  let current = "home";

  sections.forEach(sec => {
    if (sec.offsetTop <= y) current = sec.id;
  });

  navA.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
});

// ===== Project Filter
const filters = $$(".filter");
const projects = $$(".project");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.filter;
    projects.forEach(card => {
      const cardType = card.dataset.type;
      const show = type === "all" || cardType.includes(type);
      card.style.display = show ? "block" : "none";
    });
  });
});

// ===== Contact form validation (frontend only)
const form = $("#contactForm");
const nameI = $("#name");
const emailI = $("#email");
const msgI = $("#message");
const note = $("#formNote");

function setErr(id, msg){ $(id).textContent = msg; }

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let ok = true;
  const name = nameI.value.trim();
  const email = emailI.value.trim();
  const msg = msgI.value.trim();

  setErr("#nameErr", "");
  setErr("#emailErr", "");
  setErr("#msgErr", "");
  note.textContent = "";

  if (name.length < 2){ setErr("#nameErr", "Enter a valid name"); ok = false; }
  if (!/^\S+@\S+\.\S+$/.test(email)){ setErr("#emailErr", "Enter a valid email"); ok = false; }
  if (msg.length < 10){ setErr("#msgErr", "Message should be at least 10 characters"); ok = false; }

  if (ok){
    note.textContent = "✅ Message validated (frontend). Connect backend/email service to receive messages.";
    form.reset();
  }
});

// ===== Resume download button
$("#downloadBtn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Resume download link not set. Add your resume file URL in script.js");
});
