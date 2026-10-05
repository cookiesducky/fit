const WHATS = '5551980400701';

// Links do WhatsApp com mensagem pronta
document.querySelectorAll('[data-whats]').forEach(el => {
  el.href = `https://wa.me/${WHATS}?text=${encodeURIComponent(el.dataset.whats)}`;
  el.target = '_blank';
  el.rel = 'noopener';
});

// Menu mobile
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  burger.setAttribute('aria-expanded', aberto);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('aberto');
  burger.setAttribute('aria-expanded', false);
}));

// Aberto/fechado agora e destaque do dia (horário de Brasília)
function agoraBrasilia() {
  const p = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
  }).formatToParts(new Date());
  const get = t => p.find(x => x.type === t).value;
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { dia: dias[get('weekday')], min: (+get('hour') % 24) * 60 + +get('minute') };
}
function atualizaStatus() {
  const { dia, min } = agoraBrasilia();
  let aberto = false, texto = '';
  if (dia >= 1 && dia <= 5) { aberto = min >= 360 && min < 1320; texto = aberto ? 'Aberto agora · fecha às 22h' : 'Fechado agora · abre às 6h'; }
  else if (dia === 6) { aberto = min >= 540 && min < 960; texto = aberto ? 'Aberto agora · fecha às 16h' : 'Fechado agora · abre às 9h'; }
  else texto = 'Fechado hoje · abre segunda às 6h';
  const el = document.getElementById('status');
  el.textContent = texto;
  el.classList.toggle('aberto', aberto);
  document.querySelectorAll('.hora').forEach(h => {
    const dias = (h.dataset.dias || '').split(',').map(Number);
    h.classList.toggle('hoje', dias.includes(dia));
  });
}
atualizaStatus();
setInterval(atualizaStatus, 60000);

document.getElementById('ano').textContent = new Date().getFullYear();
