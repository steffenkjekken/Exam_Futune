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

let pageIndex = 1;

const loadMoreBtn = document.getElementById("loadMore")
loadMoreBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetchData(pageIndex++)

    if (pageIndex >= 2)
    loadMoreBtn.style.display ="none";
});

function fetchData(pageIndex = 1) {
fetch(`https://gaveklubben.no/exam1/wp-json/wp/v2/posts?per_page=10&page=${pageIndex}&_embed`)
    .then(response => response.json())
    .then(data => {
        //console.log('Success:', data);
        myData = data;
        listPosts(data);
        hideLoader();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const result = document.querySelector(".album");

function listPosts(tasks) {
    let myList = "";
    let yearObject = ""

    for (let task of tasks) {
        let albumInfo = task._embedded["wp:term"][1];
        yearObject = albumInfo.map(x => x.name);
        myList += `<div class="resultcard"><a href="specific.html?id=${task.id}">
            <p class="year">${yearObject}</p>
            <h3>${task.title.rendered}</h3>
            <img src="${task._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}" alt = "#" >
            </a ></div >
        `
    }
    result.insertAdjacentHTML("beforeend", myList);
}

function hideLoader(){
    document.querySelector(".loader").style.display = "none";
}
fetchData(pageIndex++)




