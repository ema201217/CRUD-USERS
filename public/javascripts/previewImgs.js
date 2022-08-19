const galleryInp = document.querySelector("#gallery-input");
const avatarInp = document.querySelector("#avatar-input");
const galleryImg = document.querySelector("#img-gallery");
const avatarImg = document.querySelector("#img-avatar");
const urlAvatar = document.querySelector("#avatar-input-url");

function readImage(input, img) {
  if (urlAvatar.value === "" || input.files[0]) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        img.setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  return img.setAttribute(
    "src",
    urlAvatar.value ||
      "https://avalos.sv/wp-content/uploads/default-featured-image.png"
  );
}

galleryInp.addEventListener("change", function () {
  readImage(this, galleryImg);
});

avatarInp.addEventListener("change", function () {
  readImage(this, avatarImg);
});

urlAvatar.addEventListener("change", function (e) {
  if (e.target.value === "") {
    avatarInp.value = "";
  }
  readImage(this, avatarImg);
});
