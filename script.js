const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box imput");
const lightboxBtn = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".uil-times");
const downloadImgBtn = lightBox.querySelector(".uil-import");

const apiKey ="VbuoVwR2llqbnQrEIDKt6kLsiRPl5Dojvwgn7HfTx6Jx0KZtBMhVoudp";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downlaodImg = (imgURL) => {
    fetch(imgURL).then(res => res.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to downlaod image!"));
}

const showLightbox = (name, img)
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img",)
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";

const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="card">
            <img src="img-${img.src.large2x}" alt="img">
            <div class="details">
            <div class="photographer">
                <i class="uil uil-camera"></i>
                <span>${img.photographer}</span>
            </div>
            <button><i class="uil uil-import"></i></button>
            </div>
        </li>`
    ).join("");
}

const getImages =(apiURL) => {
    fetch (apiURL, {
        headers: {Authorization: apiKey }
    }).then (res => res.json()).then(data => {
        generateHTML(data.photos);
    })
}

const loadMoreImages = () => {
    currentPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiURL =  getImages `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    if(e.target.value === "") return searchTerm = null;
    if(e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`)
    }
}
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("click", loadSearchImages);
closeBtn.addEventListener("click", hideLightbox);
