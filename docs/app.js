const reveals = document.querySelectorAll('.reveal');

const celebrationTime = new Date('2026-09-05T09:00:00+08:00').getTime();
const countdown = document.querySelector('[data-countdown]');
const countdownFields = {
  days: countdown?.querySelector('[data-days]'),
  hours: countdown?.querySelector('[data-hours]'),
  minutes: countdown?.querySelector('[data-minutes]'),
  seconds: countdown?.querySelector('[data-seconds]'),
};

function updateCountdown() {
  const remaining = Math.max(0, celebrationTime - Date.now());
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);

  countdownFields.days.textContent = String(days);
  countdownFields.hours.textContent = String(hours).padStart(2, '0');
  countdownFields.minutes.textContent = String(minutes).padStart(2, '0');
  countdownFields.seconds.textContent = String(seconds).padStart(2, '0');
}

if (countdown) {
  updateCountdown();
  window.setInterval(updateCountdown, 1_000);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}
