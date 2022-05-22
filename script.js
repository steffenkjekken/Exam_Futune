
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
        //console.log(task);
        myList += ` <a href="specific.html?id=${task.id}"><div class="resultcard">
            <h2>${task.title.rendered}</h2>
            <img src="${task._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}" alt="#">
            </div></a>
            `
    }
    result.innerHTML = myList;
}