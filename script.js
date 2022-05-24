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
const url = "https://gaveklubben.no/exam1/wp-json/wp/v2/posts?per_page=14&_embed";
let myData;
fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log('Success:', data);
        myData = data;
        listPosts(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

const result = document.querySelector(".album");

function listPosts(tasks) {
    let myList = "";

    for (let task of tasks) {
        //console.log()
        myList += `<div class="resultcard"><a href="specific.html?id=${task.id}">
            <h2>${task.title.rendered}</h2>
            <img src="${task._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}" alt="#">
            </a ></div >
        `
    }
    result.innerHTML = myList;
}

document.addEventListener("click", e => {
    let arrow
    if (e.target.matches(".arrow")) {
        arrow = e.target
    }
    else {
        arrow = e.target.closest(".arrow")
    }
    if (arrow != null) onArrowClick(arrow)
})

function onArrowClick(arrow) {
    const slider = arrow.closest(".carousel").querySelector(".album")
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
    if (arrow.classList.contains("left-arrow")) {
        if (sliderIndex - 1 < 0) {
            slider.style.setProperty("--slider-index", sliderIndex + 3)
        }
        else {
            slider.style.setProperty("--slider-index", sliderIndex - 1)
        }
    }

    if (arrow.classList.contains("right-arrow")) {

        if (sliderIndex + 1 >= 4) {
            slider.style.setProperty("--slider-index", sliderIndex - 3)
        }
        else {
            slider.style.setProperty("--slider-index", sliderIndex + 1)
        }
    }
    let postCount = document.querySelector(".pageCount")
    let album = document.querySelector(".album")
    let slideNumber = getComputedStyle(album).getPropertyValue("--slider-index")

    postCount.innerHTML = `Showing page ${++slideNumber} of 4 `;



}