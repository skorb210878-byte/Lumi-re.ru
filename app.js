// All salon details live here. Replace null values with verified salon information.
const SALON = {
  phone: null,
  address: null,
  hours: null,
  bookingUrl: null,
  services: [
    { name: 'Классический маникюр', price: '1 500 ₽', image: 'assets/service-classic.webp', alt: 'Нежный классический маникюр с розовым покрытием' },
    { name: 'Аппаратный маникюр', price: '1 700 ₽', image: 'assets/service-hardware.webp', alt: 'Аккуратный маникюр с нюдовым покрытием' },
    { name: 'Дизайн ногтей', price: 'от 500 ₽', image: 'assets/service-design.webp', alt: 'Маникюр с тёмным декоративным дизайном' },
    { name: 'Френч', price: '1 800 ₽', image: 'assets/service-french.webp', alt: 'Французский маникюр на ухоженных ногтях' },
  ],
};

const serviceGrid = document.querySelector('#all-services');
const serviceSelect = document.querySelector('#booking-service');
SALON.services.forEach((service) => {
  const card = document.createElement('article');
  card.className = 'service-card';
  const img = document.createElement('img');
  img.src = service.image;
  img.alt = service.alt;
  img.loading = 'lazy';
  const info = document.createElement('div');
  info.className = 'service-info';
  const name = document.createElement('h3');
  name.textContent = service.name;
  const price = document.createElement('p');
  price.textContent = service.price;
  info.append(name, price);
  card.append(img, info);
  serviceGrid.append(card);
  const option = document.createElement('option');
  option.textContent = service.name;
  option.value = service.name;
  serviceSelect.append(option);
});

const phoneLink = document.querySelector('#phone-link');
if (SALON.phone) {
  phoneLink.href = `tel:${SALON.phone.replace(/[^+\d]/g, '')}`;
  phoneLink.textContent = SALON.phone;
  phoneLink.setAttribute('aria-label', `Позвонить в салон: ${SALON.phone}`);
} else phoneLink.removeAttribute('href');

const addressLink = document.querySelector('#address-link');
if (SALON.address) {
  addressLink.href = `https://maps.google.com/?q=${encodeURIComponent(SALON.address)}`;
  addressLink.target = '_blank';
  addressLink.rel = 'noreferrer';
  addressLink.textContent = SALON.address;
  addressLink.setAttribute('aria-label', `Открыть адрес на карте: ${SALON.address}`);
} else addressLink.removeAttribute('href');
document.querySelector('#hours-value').textContent = SALON.hours || 'Уточняются';
document.querySelector('#year').textContent = new Date().getFullYear();

const dialog = document.querySelector('.booking-dialog');
const backdrop = document.querySelector('.dialog-backdrop');
const bookingMessage = document.querySelector('.booking-message');
if (SALON.phone || SALON.bookingUrl) {
  bookingMessage.textContent = 'Выберите услугу, затем позвоните или напишите нам, чтобы согласовать удобное время.';
} else {
  bookingMessage.textContent = 'Пока салон не указал контакты для записи. Добавьте телефон или ссылку на мессенджер в настройках сайта — и кнопки здесь станут активными.';
}
const closeDialog = () => { dialog.close(); backdrop.hidden = true; };
document.querySelectorAll('[data-booking]').forEach((button) => button.addEventListener('click', () => {
  backdrop.hidden = false;
  dialog.showModal();
  document.querySelector('.dialog-close').focus();
}));
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
backdrop.addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener('close', () => { backdrop.hidden = true; });

const bookingPhone = document.querySelector('#booking-phone');
if (SALON.phone) {
  bookingPhone.href = `tel:${SALON.phone.replace(/[^+\d]/g, '')}`;
  bookingPhone.classList.remove('is-disabled');
  bookingPhone.removeAttribute('aria-disabled');
}
const bookingMessageLink = document.querySelector('#booking-message-link');
if (SALON.bookingUrl) {
  bookingMessageLink.href = SALON.bookingUrl;
  bookingMessageLink.target = '_blank';
  bookingMessageLink.rel = 'noreferrer';
  bookingMessageLink.classList.remove('is-disabled');
  bookingMessageLink.removeAttribute('aria-disabled');
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Открыть меню' : 'Закрыть меню');
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
  nav.classList.remove('open');
}));
