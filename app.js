document.addEventListener("DOMContentLoaded", function() {
  // Обработчик формы
  const form = document.getElementById('imageForm');
  const imageInput = document.getElementById('imageInput');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    
    // Отправляем изображения на сервер
    sendImages(formData);
  });

  // Функция отправки изображений на сервер
  function sendImages(formData) {
    fetch('upload.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Выводим данные в консоль для отладки
      // Обновляем карусель с новыми изображениями
      updateCarousel(data);
    })
    .catch(error => console.error('Ошибка:', error));
  }

function updateCarousel(images) {
  const carouselInner = document.getElementById('carouselInner');
  images.forEach(image => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="swiper-lazy-preloader"></div> 
      <img src="${image.src}" data-src="${image.src}" loading="lazy" class="swiper-lazy" alt="${image.alt}">
    `;
    carouselInner.appendChild(slide);
  });

  // Обновляем Swiper после добавления новых слайдов
  if (swiper) {
    swiper.update();
  }

  // Получаем все изображения в Swiper и добавляем обработчик события клика
  const newImages = carouselInner.querySelectorAll('.swiper-slide img');
  newImages.forEach(image => {
    image.addEventListener('click', function() {
      openModal(image.getAttribute('data-src'));
    });
  });


}

  // Инициализация Swiper
  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    initialSlide: 2, 
    lazy: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    600: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    800: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
  });

  // Получаем все изображения в Swiper и добавляем обработчик события клика
  const swiperImages = document.querySelectorAll('.swiper-slide img');
  swiperImages.forEach(image => {
    image.addEventListener('click', function() {
      // При клике на изображение открываем его в модальном окне
      openModal(image.getAttribute('data-src'));
    });
  });

  // Функция для открытия модального окна с изображением
  function openModal(imageSrc) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
  }

  // Обработчик клика для закрытия модального окна
  const closeModal = document.querySelector('.close');
  closeModal.addEventListener('click', function() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  });
  // Получаем ссылку на поле выбора файла и метку кнопки
  const fileInput = document.getElementById('imageInput');
  const fileLabel = document.getElementById('fileLabel');

  // Добавляем обработчик события изменения для поля выбора файла
  fileInput.addEventListener('change', function() {
    // Получаем массив выбранных файлов
    const files = fileInput.files;
    // Обновляем текст метки кнопки
    if (files.length > 0) {
      fileLabel.textContent = `Выбрано файлов: ${files.length}`;
    } else {
      fileLabel.textContent = 'Выберите изображение';
    }
  });
});

