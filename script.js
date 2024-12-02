const itemImage = document.getElementById('item-nav');
const clickSound = document.getElementById('click-sound');

itemImage.addEventListener('click', () => {
    clickSound.currentTime = 0;  
    clickSound.play(); 

    const images = document.querySelectorAll('.carousel img');
    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);
});

