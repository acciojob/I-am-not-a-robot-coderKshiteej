const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let clickedImages = [];

// Step 1: Create random image set (5 unique + 1 duplicate)
function loadImages() {
  const imgClasses = ["img1", "img2", "img3", "img4", "img5"];
  const randomDuplicate = imgClasses[Math.floor(Math.random() * imgClasses.length)];
  const allImgs = [...imgClasses, randomDuplicate];

  // Shuffle images
  const shuffled = allImgs.sort(() => 0.5 - Math.random());

  // Display images
  shuffled.forEach((cls, i) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.className = cls;
    img.addEventListener("click", handleImageClick);
    imageContainer.appendChild(img);
  });
}

// Step 2: Handle image clicks
function handleImageClick(e) {
  const img = e.target;

  // Ignore clicks if already two images selected
  if (clickedImages.length >= 2) return;

  img.classList.add("selected");
  clickedImages.push(img.dataset.className);

  // Show Reset button after first click
  resetBtn.style.display = "inline-block";

  // Show Verify after two selections
  if (clickedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Step 3: Reset button functionality
resetBtn.addEventListener("click", () => {
  clickedImages = [];
  result.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => img.classList.remove("selected"));
  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
});

// Step 4: Verify button functionality
verifyBtn.addEventListener("click", () => {
  if (clickedImages.length === 2) {
    if (clickedImages[0] === clickedImages[1]) {
      result.textContent = "You are a human. Congratulations!";
    } else {
      result.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyBtn.style.display = "none";
});

// Load images initially
loadImages();
