'use strict';

/* =========================================================
   EDIT YOUR DETAILS HERE (this is the only place you need)
   ========================================================= */
const CONFIG = {
  // ---- You ----
  name: 'MOHAMED JAWITH J',
  role: 'Full-Stack Developer',
  tagline: 'I build fast, clean and well-tested web applications.',
  location: 'City, Country',

  // ---- Contact ----
  email: 'javeeofficial01@gmail.com',   // visitors tap this to email you
  phone: '+91 7358938333',          // visitors tap this to call you (keep the country code)

  // Optional: send the form straight to your inbox without opening the visitor's email app.
  // 1) Go to https://formsubmit.co  2) Use: 'https://formsubmit.co/ajax/your.email@example.com'
  // Leave empty ('') to open the visitor's email app instead.
  formEndpoint: '',

  // ---- Files you paste into the folders ----
  resume: 'assets/resume.pdf',

  // ---- Social links ----
  socials: [
    { label: 'GitHub', url: 'https://github.com/your-username' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-username' }
  ],

  // ---- About numbers ----
  stats: [
    { value: '0+', label: 'Years of experience' },
    { value: '00', label: 'Projects shipped' },
    { value: '00', label: 'Open source commits' }
  ],

  // ---- Skills ----
  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind', 'Vite'] },
    { group: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
    { group: 'Tooling', items: ['Git', 'Docker', 'GitHub Actions', 'Linux'] }
  ],

  // ---- Projects (image is optional, e.g. 'assets/project-1.png') ----
  projects: [
    {
      title: 'Project name 1',
      description: 'One or two lines on what it does, who uses it and the result.',
      tags: ['react', 'typescript', 'postgres'],
      image: '',
      source: 'https://github.com/your-username/project-1',
      demo: 'https://example.com'
    },
    {
      title: 'Project name 2',
      description: 'Describe the problem you solved and the part you built.',
      tags: ['node', 'redis', 'docker'],
      image: '',
      source: 'https://github.com/your-username/project-2',
      demo: 'https://example.com'
    },
    {
      title: 'Project name 3',
      description: 'A smaller project or open source work. Link the repository and a working demo.',
      tags: ['python', 'api', 'cli'],
      image: '',
      source: 'https://github.com/your-username/project-3',
      demo: 'https://example.com'
    }
  ],

  // ---- Education (newest first) ----
  education: [
    {
      years: '2022 – 2026',
      degree: 'Your degree (for example B.E. Computer Science)',
      school: 'Your college name',
      note: 'CGPA or percentage, final-year project, key subjects.'
    },
    {
      years: '2020 – 2022',
      degree: 'Higher secondary (12th)',
      school: 'Your school name',
      note: 'Stream and percentage.'
    },
    {
      years: '2019 – 2020',
      degree: 'Secondary school (10th)',
      school: 'Your school name',
      note: 'Percentage.'
    }
  ],

  // ---- 6 certificates ----
  // Paste your files into the "certificates" folder using EXACTLY these file names.
  // PDF or image both work. If your file is an image, change the ending, e.g. certificate-1.jpg
  certificates: [
    { title: 'Certificate 1 title', issuer: 'Issued by', year: '2025', file: 'certificates/certificate-1.pdf' },
    { title: 'Certificate 2 title', issuer: 'Issued by', year: '2025', file: 'certificates/certificate-2.pdf' },
    { title: 'Certificate 3 title', issuer: 'Issued by', year: '2025', file: 'certificates/certificate-3.pdf' },
    { title: 'Certificate 4 title', issuer: 'Issued by', year: '2024', file: 'certificates/certificate-4.pdf' },
    { title: 'Certificate 5 title', issuer: 'Issued by', year: '2024', file: 'certificates/certificate-5.pdf' },
    { title: 'Certificate 6 title', issuer: 'Issued by', year: '2024', file: 'certificates/certificate-6.pdf' }
  ]
};

/* =========================================================
   Code below builds the page from the details above
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);

/** Small helper to create elements safely (text is never parsed as HTML). */
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'text') el.textContent = value;
    else if (value === true) el.setAttribute(key, '');
    else el.setAttribute(key, value);
  }
  for (const child of children.flat()) {
    if (child !== undefined && child !== null) el.append(child);
  }
  return el;
}

function externalLink(label, url, className) {
  return h('a', { href: url, target: '_blank', rel: 'noopener noreferrer', class: className, text: label });
}

const IMAGE_FILE = /\.(png|jpe?g|webp|gif|avif)$/i;

/* ---------- Simple text fields ---------- */
document.querySelectorAll('[data-cfg]').forEach((el) => {
  const value = CONFIG[el.dataset.cfg];
  if (value) el.textContent = value;
});
document.title = `${CONFIG.name} | ${CONFIG.role}`;
$('#year').textContent = new Date().getFullYear();
$('#resume-link').setAttribute('href', CONFIG.resume);

/* ---------- Stats ---------- */
$('#stats').append(
  ...CONFIG.stats.map((s) =>
    h('div', { class: 'stat' },
      h('div', { class: 'stat-value', text: s.value }),
      h('div', { class: 'stat-label', text: s.label })
    )
  )
);

/* ---------- Skills ---------- */
$('#skills').append(
  ...CONFIG.skills.map((g) =>
    h('div', { class: 'card' },
      h('div', { class: 'card-title', text: g.group }),
      h('div', { class: 'chips' }, g.items.map((item) => h('span', { class: 'skill-chip', text: item })))
    )
  )
);

/* ---------- Projects ---------- */
$('#projects').append(
  ...CONFIG.projects.map((p, i) => {
    const shot = h('div', { class: 'shot' });
    if (p.image) shot.append(h('img', { src: p.image, alt: `${p.title} screenshot`, loading: 'lazy' }));
    else shot.textContent = `[screenshot ${i + 1}]`;

    return h('article', { class: 'card' },
      shot,
      h('h3', { text: p.title }),
      h('p', { text: p.description }),
      h('div', { class: 'tags' }, p.tags.map((t) => h('span', { text: `#${t}` }))),
      h('div', { class: 'card-links' },
        p.source ? externalLink('Source ↗', p.source) : null,
        p.demo ? externalLink('Live demo ↗', p.demo, 'live') : null
      )
    );
  })
);

/* ---------- Education ---------- */
$('#education-list').append(
  ...CONFIG.education.map((e) =>
    h('div', { class: 'edu' },
      h('div', { class: 'edu-years', text: e.years }),
      h('div', { class: 'edu-main' },
        h('h3', { text: e.degree }),
        h('div', { class: 'school', text: e.school }),
        e.note ? h('p', { class: 'note', text: e.note }) : null
      )
    )
  )
);

/* ---------- Certificates ---------- */
$('#certificate-list').append(
  ...CONFIG.certificates.map((c) => {
    const thumb = h('a', {
      class: 'cert-thumb',
      href: c.file,
      target: '_blank',
      rel: 'noopener',
      'aria-label': `Open certificate: ${c.title}`
    });

    const placeholder = () => [
      h('span', { class: 'cert-badge', text: IMAGE_FILE.test(c.file) ? 'IMG' : 'PDF' }),
      h('span', { class: 'cert-file', text: c.file })
    ];

    if (IMAGE_FILE.test(c.file)) {
      const img = h('img', { src: c.file, alt: `${c.title} certificate`, loading: 'lazy' });
      img.addEventListener('error', () => thumb.replaceChildren(...placeholder()));
      thumb.append(img);
    } else {
      thumb.append(...placeholder());
    }

    return h('article', { class: 'card cert' },
      thumb,
      h('div', { class: 'cert-body' },
        h('h3', { text: c.title }),
        h('p', { text: [c.issuer, c.year].filter(Boolean).join(' · ') })
      ),
      h('div', { class: 'cert-actions' },
        externalLink('View ↗', c.file, 'view'),
        h('a', { href: c.file, download: true, text: 'Download' })
      )
    );
  })
);

/* ---------- Contact: tap phone to call, tap email to write ---------- */
const phoneDigits = CONFIG.phone.replace(/[^\d+]/g, '');
const emailLink = $('#contact-email');
emailLink.textContent = CONFIG.email;
emailLink.setAttribute('href', `mailto:${CONFIG.email}?subject=${encodeURIComponent('Hello from your portfolio')}`);

const phoneLink = $('#contact-phone');
phoneLink.textContent = CONFIG.phone;
phoneLink.setAttribute('href', `tel:${phoneDigits}`);

$('#socials').append(...CONFIG.socials.map((s) => externalLink(`${s.label} ↗`, s.url)));

/* ---------- Toast ---------- */
const toastEl = $('#toast');
let toastTimer;
function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 4200);
}

/* ---------- Contact form ---------- */
const form = $('#contact-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const phone = (data.phone || '').trim();
  const message = (data.message || '').trim();
  const subject = `Portfolio message from ${name}`;

  // Option A: your own form endpoint (message arrives straight in your inbox)
  if (CONFIG.formEndpoint) {
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, phone, message, _subject: subject })
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      toast('Message sent. Thank you, I will reply soon.');
    } catch (err) {
      toast('Could not send the message. Please email or call me directly.');
    }
    return;
  }

  // Option B (default): open the visitor's email app with everything filled in
  const body = [
    `Hello ${CONFIG.name},`,
    '',
    message,
    '',
    '--- My contact details ---',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not given'}`
  ].join('\r\n');

  window.location.href =
    `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  toast('Opening your email app. Press send there to deliver the message.');
});