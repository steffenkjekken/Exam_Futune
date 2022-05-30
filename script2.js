document.getElementById("hamburger-menu").checked = false;

function pushDown(e) {
    let header = document.getElementById("header");

    if (e.checked) {
        header.setAttribute("class", "pushdown");
    }
    else {
        header.setAttribute("class", " ");
    }
}

const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');
if (!id) { window.location = "specific.html"; }

const url = `https://www.gaveklubben.no/exam1/wp-json/wp/v2/posts/${id}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log('Success:', data);
        displayPost(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

const resultcontainer = document.querySelector(".resultcontainer");
const albumTitle = document.querySelector(".title");
const modalContent = document.querySelector(".modalContent")

function displayPost(data) {
    console.log(data);

    const title = data.title.rendered;
    const text = data.content.rendered;
    getImageURL(data.featured_media);


    let titleName = `<h1>${title}</h1>`

    let content = `
    ${text}
    `

    resultcontainer.innerHTML = content;
    albumTitle.innerHTML = titleName;
    document.title = `Futune | ${title}`;

    const trackList = document.getElementById("tracklist");
    let trackDiv = document.createElement("div");
    let trackTable = document.querySelector("table");
    trackDiv.classList.add("clickme");

    trackDiv.innerHTML = `<p>Tracklist</p><i class="fa-solid fa-angle-down"></i>`;

    trackList.prepend(trackDiv);

    trackDiv.addEventListener("click", function (e) {
        if (trackTable.style.display === "block") {
            trackTable.style.display = "none";
        } else {
            trackTable.style.display = "block";
        }
    });

    let arrow = document.querySelector(".fa-solid");

    trackDiv.addEventListener("click", function (e) {
        if (trackTable.style.display === "block") {
            arrow.style.transform = "rotate(180deg)";
        } else {
            arrow.style.transform = "rotate(0deg)";
            arrow.style.transition = "ease 0.3s"
        }
    });
}

function getImageURL(id) {
    fetch(`https://www.gaveklubben.no/exam1/wp-json/wp/v2/media/${id}`)
        .then(response => response.json())
        .then(data => {
            //console.log('Success (getImageURL):', data);
            addImage(data);
            console.log(data)
        })
        .catch((error) => {
            console.error('Error (getImageURL):', error);
        });
}

function addImage(data) {
    console.log(data);
    if (data) {
        let img = document.createElement("img");
        let slug = data.slug;
        img.src = data.source_url;
        img.alt = slug.replace(/_/g, " ") + " album cover";

        img.classList.add("albumCover");
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('imgContainer');
        resultcontainer.prepend(imgDiv);
        imgDiv.append(img);

        let modal = document.querySelector('.modal');
        let modalImage = document.querySelector(".modalImg");
        let image = document.querySelector(".albumCover");

        image.addEventListener("click", function (e) {
            modal.style.display = "flex"
            modalImage.src = img.src;
            modalImage.alt = slug.replace(/_/g, " ") + " album cover";
        });

        let span = document.querySelector(".close");
        let body = document.querySelector("body")
        span.addEventListener("click", function (e) {
            modal.style.display = "none"
        });

        window.addEventListener("click", function (e) {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        });
    }
}
