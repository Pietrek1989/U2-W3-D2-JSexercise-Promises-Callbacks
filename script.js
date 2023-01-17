const linkVar = "https://api.pexels.com/v1/search?query=";

const getData = (queryVar) => {
  fetch(linkVar + queryVar, {
    headers: {
      Authorization:
        "Bearer 563492ad6f917000010000017c765efa3f4d41efa604c2c5fbe150bd",
    },
  })
    .then((dataRaw) => dataRaw.json())
    .then((dataProc) => {
      getPhotos(dataProc.photos);
    })
    .catch((error) => console.log(error));
};

const getPhotos = (data) => {
  let container = document.querySelector("#rowGenerate");
  container.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    container.innerHTML += `
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img class="card-img-top" src="${
        element.src.landscape
      }" alt="picture" data-toggle="modal" data-target="#exampleModal${[i]}">

        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#55595c" />
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">
        
        </text>
      </svg>
      <div class="card-body">
        <p class="card-text">
          This is a wider card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </p>
        <div
          class="d-flex justify-content-between align-items-center"
        >
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              View
            </button>
            <button  type="button"
              class="btn btn-sm btn-outline-secondary removeBTN"
            >
              Hide
            </button>
          </div>
          <small class="text-muted">ID : ${element.id}</small>
        </div>
      </div>
    </div>
  </div>

<!-- Modal -->
<div class="modal fade" id="exampleModal${[
      i,
    ]}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${element.alt}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <img class="card-img-top" src="${element.src.landscape}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
  }
  removeCard();
  showNumberPic(data);
};

const showNumberPic = (data) => {
  let alertButton = document.querySelector(".alert-success");
  alertButton.innerHTML = `  <div class="alert alert-success" role="alert">
    You have loaded ${data.length}  pictures!
  </div>`;
  setTimeout(function () {
    alertButton.classList.add("d-none");
  }, 5000);
};

const removeCard = () => {
  let removeBtn = document.querySelectorAll(".removeBTN");
  for (const iterator of removeBtn) {
    iterator.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    });
  }
};
function search() {
  let searchWindow = document.querySelector(".form-control");

  let value = searchWindow.value;
  let searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", getData(value));
}

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", search);

const carousel = () => {
  fetch("https://api.pexels.com/v1/search?query=forest", {
    headers: {
      Authorization:
        "Bearer 563492ad6f917000010000017c765efa3f4d41efa604c2c5fbe150bd",
    },
  })
    .then((dataRaw) => dataRaw.json())
    .then((dataProc) => {
      console.log(dataProc.photos);
      getCarousel(dataProc.photos);
    })
    .catch((error) => console.log(error));
};

const getCarousel = (data) => {
  let container = document.querySelector(".carousel-inner");
  container.innerHTML += `
  <div class="carousel-item active">
  <img src="${data[0].src.landscape}" class="d-block w-100" alt="...">
</div>`;
  for (let i = 1; i < data.length; i++) {
    const element = data[i];
    container.innerHTML += `
  <div class="carousel-item">
  <img src="${element.src.landscape}" class="d-block w-100" alt="...">
</div>`;
  }
};

window.onload = search();
window.onload = carousel();
