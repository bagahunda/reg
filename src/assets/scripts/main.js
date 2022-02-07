const nav = document.querySelector(".header");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 2) {
    nav.classList.add("header--scrolled");
  } else {
    nav.classList.remove("header--scrolled");
  }
});

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

const _supabase = supabase.createClient('https://ifgbxajfuphwwyointxh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTQ0NTQ5NCwiZXhwIjoxOTQ3MDIxNDk0fQ.qfl2Rd1Uwya9SYEqNuMGG6qI54ZBYTQ4vaqjGTkw9BE');

const form = document.querySelector('.form');

if (form) {
  form.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const phone = document.getElementById('phone');
    const skype = document.getElementById('skype');
    const marriage = document.getElementById('marriage');
    const education = document.getElementById('education');
    const tried = document.getElementById('tried');
    const problem = document.getElementById('problem');
    const date = document.getElementById('date');
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
      date: date.value
    };
    saveClient(payload);
  })
}

function loadClients() {
    let error = '';
  _supabase
    .from('clients')
    .select()
    .then(res => {
      console.log('clients ->', res.data);
    })
    .catch(err => {
      error = err;
    })
}

function saveClient(payload) {
  _supabase
    .from('clients')
    .insert(payload)
    .then(res => {
      console.log('insert client ->', res);
    })
    .catch(err => {
      console.log('oops', err);
    })
}

loadClients();
