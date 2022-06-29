// const nav = document.querySelector(".header");

// window.addEventListener("scroll", function () {
//   if (window.pageYOffset > 2) {
//     nav.classList.add("header--scrolled");
//   } else {
//     nav.classList.remove("header--scrolled");
//   }
// });

const _supabase = supabase.createClient(
  "https://ifgbxajfuphwwyointxh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTQ0NTQ5NCwiZXhwIjoxOTQ3MDIxNDk0fQ.qfl2Rd1Uwya9SYEqNuMGG6qI54ZBYTQ4vaqjGTkw9BE"
);

function loadClients() {
  let error = "";
  _supabase
    .from("clients")
    .select()
    .then((res) => {
      console.log("clients ->", res.data);
    })
    .catch((err) => {
      error = err;
    });
}

function saveClient(payload) {
  _supabase
    .from("clients")
    .insert(payload)
    .then((res) => {
      console.log("insert client ->", res);
    })
    .catch((err) => {
      console.log("oops", err);
    });
}

function signUp(email, password) {
  _supabase.auth
    .signUp({ email, password })
    .then((response) => {
      response.error ? alert(response.error.message) : setToken(response);
    })
    .catch((err) => {
      alert(err);
    })
}

function login(email, password) {
  _supabase.auth
    .signIn({ email, password })
    .then((response) => {
      let redirect = ''
      const whiteList = ['fomenkoinna0@gmail.com', 'dmitriy.troy@gmail.com', 'elena.pochodnya@gmail.com', 'tan4ik_09@list.ru', 'lukashina-elena@mail.ru', 'irchik1962@icloud.com'];
      const marathonWhitelist = ["alena_pta@inbox.ru", "michuraeva@icloud.com", "klyshinskaya@yandex.ru", "hyper-renata@mail.ru"];
      if (whiteList.includes(email)) {
        redirect = "course-content";
      } else if (marathonWhitelist.includes(email)) {
        redirect = "energoproryv-content";
      } else {
        redirect = "/"
      }
      response.error ? alert(response.error.message) : setToken(response, redirect);
    })
    .catch((err) => {
      alert(err.response.text);
    })
}

function setToken(response, redirect = "/") {
  if (response.user.confirmation_sent_at && !response.session) {
    const container = document.querySelector('.login__form');
    const form = document.querySelector('.form')
    const message = document.createElement('p');
    const messageText = `На вашу почту ${response.user.email} выслано письмо для подтверждения аккаунта. Просто нажмите на ссылку в письме.`;
    message.style.color = 'green';
    message.textContent = messageText;
    container.appendChild(message);
    form.reset();
  } else {
    window.location.href = `/${redirect}.html`;
  }
}

// loadClients();

const currentPage = window.location.pathname;

if (currentPage === "/") {
  const params = window.location.href.split('#');
  if (params[1] && params[1].includes('access_token')) {
    // window.location.href = '/course-content.html';
    window.location.href = '/';
  }
  // blob animation
  var tl = new TimelineMax({
    yoyo: true,
    repeat: -1,
  });
  tl.to(".blob", 3, {
    attr: {
      d: "M470.3 133c45.8 42.5 75.3 104.8 60.3 152-15 47.3-74.4 79.6-120.2 110.7-45.8 31.2-78.1 61.3-116.5 67.4-38.4 6.1-83-11.7-110.2-42.8-27.1-31.2-36.9-75.8-44.7-128.1-7.8-52.3-13.5-112.4 13.6-154.9 27.2-42.5 87.3-67.4 148.5-68.5 61.1-1 123.4 21.7 169.2 64.2z",
    },
  })
    .to(".blob", 3, {
      attr: {
        d: "M452.9 141.3c41.2 47 67.6 102.8 56.3 147.4-11.3 44.5-60.4 77.8-101.6 120.6-41.1 42.8-74.4           95.3-117.3 104.9-42.9 9.7-95.4-23.4-122.1-66.2-26.7-42.9-27.4-95.4-32.6-153.2-5.2-57.7-14.8-120.7 11.9-167.7 26.6-47 89.6-78 149-74.5 59.4 3.5 115.2 41.7 156.4 88.7z",
      },
    })
    .to(".blob", 3, {
      attr: {
        d: "M423.5 172.8c30.2 33.9 43.8 80.5 42.9 126.3-.9 45.7-16.5 90.5-46.7 113.1-30.1 22.7-74.9 23.3-124.8 28.3-49.8 5.1-104.7 14.7-146.6-8-41.8-22.7-70.6-77.6-57.8-119.8 12.7-42.2 66.9-71.6 108.7-105.5 41.9-33.8 71.3-72 109.4-80.6 38.1-8.6 84.7 12.4 114.9 46.2z",
      },
    })
    .to(".blob", 3, {
      attr: {
        d: "M455.4 151.1c43.1 36.7 73.4 92.8 60.8 136.3-12.7 43.5-68.1 74.4-111.3 119.4-43.1 45-74 104.1-109.8 109-35.9 5-76.7-44.2-111.8-89.2-35.2-45-64.7-85.8-70.8-132.6-6-46.8 11.6-99.6 46.7-136.3 35.2-36.6 88-57.2 142.4-58.8 54.5-1.7 110.6 15.6 153.8 52.2z",
      },
    });
}

if (currentPage === "/form.html") {
  const consultForm = document.querySelector(".consult-form");

  if (consultForm) {
    consultForm.addEventListener("submit", ($event) => {
      $event.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const age = document.getElementById("age");
      const phone = document.getElementById("phone");
      const skype = document.getElementById("skype");
      const marriage = document.getElementById("marriage");
      const education = document.getElementById("education");
      const tried = document.getElementById("tried");
      const problem = document.getElementById("problem");
      const date = document.getElementById("date");
      const payload = {
        name: name.value,
        email: email.value,
        age: age.value,
        phone: phone.value,
        skype: skype.value,
        marriage: marriage.value,
        education: education.value,
        tried: tried.value,
        problem: problem.value,
        date: date.value,
      };
      saveClient(payload);
    });
  }
}

if (currentPage === "/marathon.html" || currentPage === "/energoproriv.html" || currentPage === "/alladin.html") {
  const copyEl = document.querySelector('.js-copy');
  const cardInfo = document.querySelector('.card-info__number');
  copyEl.addEventListener('click', () => {
    navigator.clipboard.writeText('5536913874725217')
      .then(() => {
        const message = document.createElement('span');
        message.style.color = 'green';
        message.style.marginTop = 0;
        message.textContent = 'Номер карты успешно копирован';
        cardInfo.appendChild(message);
        setTimeout(() => {
          message.remove();
        }, 2000)
      })
      .catch((err) => {
        console.error(err);
      })
  });
}

if (currentPage === '/course.html') {
  const points = document.querySelectorAll('.course__content-item-description');
  const copyEl = document.querySelector('.js-copy');
  const cardInfo = document.querySelector('.card-info');
  copyEl.addEventListener('click', () => {
    navigator.clipboard.writeText('5536913874725217')
      .then(() => {
        const message = document.createElement('p');
        message.style.color = 'green';
        message.style.marginTop = 0;
        message.textContent = 'Номер карты успешно копирован';
        cardInfo.appendChild(message);
        setTimeout(() => {
          message.remove();
        }, 2000)
      })
      .catch((err) => {
        console.error(err);
      })
  });
  points.forEach(point => {
    point.addEventListener('click', (e) => {
      e.target.closest('.course__content-item-description').classList.toggle('active');
    });
  })
}

if (currentPage === '/course-content.html') {
  const whiteList = ['fomenkoinna0@gmail.com', 'dmitriy.troy@gmail.com', 'elena.pochodnya@gmail.com', 'tan4ik_09@list.ru', 'lukashina-elena@mail.ru', 'irchik1962@icloud.com'];
  const user = _supabase.auth.user()
  if (!user || !whiteList.includes(user.email)) {
    window.location.href = '/login.html';
  }
}

if (currentPage === '/energoproryv-content.html') {
  const marathonWhitelist = ["alena_pta@inbox.ru", "michuraeva@icloud.com", "klyshinskaya@yandex.ru", "hyper-renata@mail.ru"];
  const user = _supabase.auth.user()
  if (!user || !marathonWhitelist.includes(user.email)) {
    window.location.href = '/login.html';
  }
}

if (currentPage === '/registration.html') {
  const whiteList = ['fomenkoinna0@gmail.com', 'dmitriy.troy@gmail.com', 'hyper-renata@mail.ru', 'elena.pochodnya@gmail.com', 'tan4ik_09@list.ru', 'lukashina-elena@mail.ru', 'irchik1962@icloud.com', "alena_pta@inbox.ru", "michuraeva@icloud.com", "klyshinskaya@yandex.ru"];
  const signupForm = document.querySelector('.signup-form');
  window.userToken = null;
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    if (whiteList.includes(email)) {
      signUp(email, password);
    } else {
      window.location.href = '/registration.html';
    }
  });
}

if (currentPage === '/login.html') {
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    login(email, password);
  });
}
