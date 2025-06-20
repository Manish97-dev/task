function selectSize(element) {
  const sizes = document.querySelectorAll(".size-box");
  sizes.forEach((box) => box.classList.remove("active"));
  element.classList.add("active");
}

function increaseQty() {
  const qty = document.getElementById("quantity");
  qty.value = parseInt(qty.value) + 1;
}

function decreaseQty() {
  const qty = document.getElementById("quantity");
  if (parseInt(qty.value) > 1) {
    qty.value = parseInt(qty.value) - 1;
  }
}




// Task - 2 script 


const imagePaths = [
  "https://www.urbanrider.co.uk/media/wysiwyg/RE_Classic650_Banner_1_1600x700.jpg",
  "https://frac.org/wp-content/uploads/library-shelves-banner-photo.jpg",
  "https://www.rysun.com/wp-content/uploads/2024/06/From-Data-to-Dollars.jpg",
  "https://via.placeholder.com/300x160/F44336/ffffff?text=Image+4",
  "https://underdownunder.com.au/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2022/05/banner-cradle.jpg.webp",
];

const container = document.getElementById("bannerContainer");
const dotContainer = document.getElementById("dotContainer");
let currentIndex = 0;
let startX = 0;

function renderImagesAndDots() {
  imagePaths.forEach((path, index) => {
    const img = new Image();
    img.src = path;
    img.className = "banner-image";
    img.onload = () => container.appendChild(img);
    img.onerror = () => console.warn("Image failed:", path);

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => scrollToImage(index));
    dotContainer.appendChild(dot);
  });
  updateDots();
}

function getSlideWidth() {
  return container.clientWidth;
}

function scrollToImage(index) {
  const total = imagePaths.length;
  currentIndex = (index + total) % total;
  container.scrollTo({ left: getSlideWidth() * currentIndex, behavior: 'smooth' });
  updateDots();
}

function updateDots() {
  const dots = dotContainer.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

document.getElementById("prevBtn").addEventListener("click", () => {
  scrollToImage(currentIndex - 1);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  scrollToImage(currentIndex + 1);
});

window.addEventListener("resize", () => scrollToImage(currentIndex));

container.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;
  if (Math.abs(diffX) > 50) {
    if (diffX < 0) scrollToImage(currentIndex + 1);
    else scrollToImage(currentIndex - 1);
  }
});

renderImagesAndDots();



