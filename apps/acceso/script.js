const code = document.querySelector('#codigo');
const image = document.querySelector('#user-image');
const name = document.querySelector('#name');
const company = document.querySelector('#company');
const date = document.querySelector('#date');
const logText = document.querySelector('#log-text');
const logIcon = document.querySelector('#log-icon');
const locationText = document.querySelector('#location-text');
const authContainer = document.querySelector('.auth-status');
const authText = document.querySelector('#auth-text');
const urlParms = new URLSearchParams(window.location.search);
const locationParam = urlParms.get('location');
const loading = document.querySelector('.loading-container');

loading.style.display = 'none';

function reset() {
  code.value = '';
  image.src = 'https://image.flaticon.com/icons/svg/21/21104.svg';
  name.textContent = '';
  company.textContent = '';
  date.textContent = '';
  logText.textContent = '';
  authText.textContent = '';
  authContainer.classList.remove('unauthorized','autorized');
  logIcon.classList.remove('fa-sign-in', 'fa-sign-out');
}


locationText.textContent = capitalize(locationParam);

function onClick() {
  loading.style.display = 'flex';
  fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 55115,
      location: locationParam,
      code: code.value,
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.success) {
      image.src = res.response.user_pic.file_url;
      name.textContent = res.response.user_name;
      company.textContent = res.response.company;
      date.textContent = res.response.date

      if (res.response.log_type === 'check-in') {
        logText.textContent = 'Entrada';
        logIcon.classList.remove('fa-sign-out');
        logIcon.classList.add('fa-sign-in');
      } else {
        logText.textContent = 'Salida';
        logIcon.classList.remove('fa-sign-in');
        logIcon.classList.add('fa-sign-out');
      }

      if (res.response.status === 'Authorized') {
        authText.textContent = 'Autorizado';
        authContainer.classList.remove('unauthorized');
        authContainer.classList.add('autorized');
      } else {
        authText.textContent = 'Desautorizado';
        authContainer.classList.remove('autorized');
        authContainer.classList.add('unauthorized');
      }

    }
  })
  .finally(() => {
    loading.style.display = 'none';
    setTimeout(() => {
      reset();
    }, 5000);
  });
};

function capitalize(string) {
  if (string) {
    return string.replace('_', ' ')
    .split(' ')
    .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join(' ');
  }
  return '';
};
