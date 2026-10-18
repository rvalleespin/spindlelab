const t = document.body.innerText.replace(/\s+/g,' ');
const out = []; const re = /[^.\n]{0,60}\b\d[\d.,:/ ]*\d?\b[^.\n]{0,40}/g; let m;
while ((m = re.exec(t))) out.push(m[0].trim());
const alts = [...document.querySelectorAll('img[alt],video[aria-label],[aria-label]')].map(e=>e.getAttribute('alt')||e.getAttribute('aria-label')).filter(a=>/\d/.test(a));
return [...new Set(out)].join('\n') + '\n--- alts con número:\n' + alts.join('\n');
