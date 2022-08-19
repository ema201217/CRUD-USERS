const galleryInp = document.querySelector("#gallery-input");
const avatarInp = document.querySelector("#avatar-input");
const galleryImg = document.querySelector("#img-gallery");
const avatarImg = document.querySelector("#img-avatar");
const urlAvatar = document.querySelector("#avatar-input-url");
const btnResetAvatar = document.querySelector("#btn-reset-avatar");
const btnResetGallery = document.querySelector("#btn-reset-gallery");
const imgOldAvatar = avatarImg.src;
const imgOldGallery = galleryImg.src;

function readImage(input, img) {
  if (urlAvatar.value === "" || input.files) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        img.setAttribute("src", e.target.result);
        if (urlAvatar.value === "" && avatarInp.files) {
          img.setAttribute(
            "src",
            e.target.result ||
              urlAvatar.value ||
              "https://avalos.sv/wp-content/uploads/default-featured-image.png"
          );
        }
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

const resetImgOldWithClick = (
  btn,
  input,
  imgElement,
  imgString,
  urlInput = ""
) => {
  btn.addEventListener("click", function () {
    imgElement.setAttribute("src", imgString);
    input.value = "";
    if (urlInput !== "") {
      urlInput.value = "";
    }
  });
};

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
  readImage(urlAvatar, avatarImg);
});

resetImgOldWithClick(
  btnResetAvatar,
  avatarInp,
  avatarImg,
  imgOldAvatar,
  urlAvatar
);
resetImgOldWithClick(btnResetGallery, galleryInp, galleryImg, imgOldGallery);
