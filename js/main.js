// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

if (toggle && links) {
  toggle.addEventListener('click', function() {
    links.classList.toggle('open');
  });
}

// Animated stat counter (home page stats bar)
function animateCounters() {
  const numbers = document.querySelectorAll('.stats-bar__number[data-target]');

  numbers.forEach(function(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.textContent.replace(/[0-9.,]/g, '').trim();
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      if (target >= 1000000) {
        el.textContent = Math.floor(current / 1000000) + 'M+';
      } else {
        el.textContent = current.toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger counter animation when stats bar scrolls into view
var statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  var counterStarted = false;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !counterStarted) {
        counterStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsBar);
}

// Country card modals
var countryData = {
  bangladesh: {
    flag: '\u{1F1E7}\u{1F1E9}',
    name: 'Bangladesh',
    text: 'Bangladesh has made significant progress in education, but around 3.7 million children are still out of school. Many children in rural areas lack access to quality schools, and flooding and natural disasters frequently disrupt learning. Girls in particular face barriers to staying in school past primary level.',
    stat: '3.7 million children are out of school'
  },
  bhutan: {
    flag: '\u{1F1E7}\u{1F1F9}',
    name: 'Bhutan',
    text: 'Bhutan is a small Himalayan kingdom where education has improved rapidly, but remote mountain communities still struggle with access. Many children in rural areas must walk hours to reach the nearest school, and teacher shortages remain a challenge.',
    stat: 'Over 15% of rural children lack access to secondary education'
  },
  india: {
    flag: '\u{1F1EE}\u{1F1F3}',
    name: 'India',
    text: 'India is home to the largest number of children in South Asia. While enrollment rates have improved, over 10 million children remain out of school. Poverty, caste-based discrimination, and a shortage of trained teachers in rural areas are major obstacles to universal education.',
    stat: '10.1 million children are out of school'
  },
  pakistan: {
    flag: '\u{1F1F5}\u{1F1F0}',
    name: 'Pakistan',
    text: 'Pakistan has the highest number of out-of-school children in the region. Nearly 22.8 million children aged 5-16 are not in school, with girls making up the majority. Poverty, cultural barriers, and conflict in certain regions make access to education extremely difficult.',
    stat: '17.7 million primary-age children are out of school'
  },
  srilanka: {
    flag: '\u{1F1F1}\u{1F1F0}',
    name: 'Sri Lanka',
    text: 'Sri Lanka has the highest literacy rate in South Asia at 92%, but challenges remain. Children in post-conflict areas in the north and east still face disrupted schooling, and economic hardship has pushed some families to pull children out of school to work.',
    stat: '92% literacy rate — the highest in the region'
  }
};

var modal = document.getElementById('country-modal');
if (modal) {
  var modalFlag = document.getElementById('modal-flag');
  var modalTitle = document.getElementById('modal-title');
  var modalText = document.getElementById('modal-text');
  var modalStat = document.getElementById('modal-stat');
  var closeBtn = modal.querySelector('.modal__close');

  document.querySelectorAll('.country-card[data-country]').forEach(function(card) {
    card.addEventListener('click', function() {
      var country = card.getAttribute('data-country');
      var data = countryData[country];
      if (data) {
        modalFlag.textContent = data.flag;
        modalTitle.textContent = data.name;
        modalText.textContent = data.text;
        modalStat.textContent = data.stat;
        modal.classList.add('open');
      }
    });
  });

  closeBtn.addEventListener('click', function() {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

// Donate click counter (uses free abacus.jasoncameron.dev service)
var counterEl = document.getElementById('click-counter');
var counterValueEl = document.getElementById('click-counter-value');
var counterLabelEl = document.getElementById('click-counter-label');

if (counterEl && counterValueEl) {
  var COUNTER_URL = 'https://abacus.jasoncameron.dev';
  var NAMESPACE = 'vikram-educate-the-children';
  var KEY = 'donate-clicks';

  function renderCount(n) {
    counterValueEl.textContent = n;
    if (counterLabelEl) {
      counterLabelEl.textContent = (n === 1)
        ? 'person has clicked to support this cause'
        : 'people have clicked to support this cause';
    }
    counterEl.hidden = false;
  }

  fetch(COUNTER_URL + '/get/' + NAMESPACE + '/' + KEY)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      renderCount((data && typeof data.value === 'number') ? data.value : 0);
    })
    .catch(function() { renderCount(0); });

  document.querySelectorAll('a[href*="roomtoread"]').forEach(function(link) {
    link.addEventListener('click', function() {
      fetch(COUNTER_URL + '/hit/' + NAMESPACE + '/' + KEY, { keepalive: true })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data && typeof data.value === 'number') renderCount(data.value);
        })
        .catch(function() { /* fail silently */ });
    });
  });
}

// Fade-in on scroll for sections
var fadeElements = document.querySelectorAll('.barrier, .country-card, .chart-card, .info-section, .donation-card');

if (fadeElements.length > 0) {
  fadeElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  var fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(function(el) {
    fadeObserver.observe(el);
  });
}
