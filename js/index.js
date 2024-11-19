var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarksContainer = document.getElementById("bookmarks");
var emptyState = document.getElementById("emptyState");

var bookmarkContainer = [];


if (localStorage.getItem('bookmarks') !== null) {
    bookmarkContainer = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}




function addNew() {

    if (!siteNameInput.value || !siteUrlInput.value) {
        alert("Both fields are required!");
        return;
    }

    if (isDuplicate(siteNameInput.value.trim())) {
        alert("A bookmark with the same name already exists");
        return;
    }
    if (isDuplicate(siteUrlInput.value.trim())) {
        alert("A bookmark with the same URL already exists");
        return;
    }

    if (siteNameInput.value.trim().length < 3) {
        alert("Site name must contain at least 3 characters");
        return;
    }

    if (!isValidURL(siteUrlInput.value)) {
        alert("Please enter a valid URL (eg. https://www.google.com/)");
        return;
    }


    var bookmark = {
        code: siteNameInput.value,
        address: siteUrlInput.value,
    };


    bookmarkContainer.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));
    displayBookmarks();
    clearForm();
}

function isValidURL(url) {
    const pattern = new RegExp('^https:\\/\\/([a-z\\d-]+\\.)+[a-z]{2,}(:\\d+)?(\\/.*)?$', 'i');
    return !!pattern.test(url);
}

function clearForm() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function displayBookmarks() {

    if (bookmarkContainer.length === 0) {
        bookmarksContainer.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        bookmarksContainer.style.display = 'flex';
        emptyState.style.display = 'none';
    }

    var bookmark = ``;
    for (i = 0; i < bookmarkContainer.length; i++) {
        bookmark += `  <div class="card text-center rounded-5 py-2 px-2 bg-mainc border-0 mb-4 mx-2">

                <div class="card-body">
                    <h1 class="card-title mb-3">${bookmarkContainer[i].code}</h1>
                    <a target="_blank" href="${bookmarkContainer[i].address}" class="btn rounded-pill text-dark fw-bold">VISIT</a>
                    <div onclick="deleteBookmarks(${i})" class="btn position-absolute btn-dangerd rounded-pill"><i class="fa-solid fa-trash-can"></i></div>

                </div>

            </div> `;
    }
    document.getElementById('bookmarks').innerHTML = bookmark;
}

function deleteBookmarks(deletedBookmark) {
    const confirmDelete = confirm("Are you sure you want to delete this bookmark?");
    if (confirmDelete) {
        bookmarkContainer.splice(deletedBookmark, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));
        displayBookmarks();
    }
}


function isDuplicate(name) {
    return bookmarkContainer.some(bookmark => bookmark.code.toLowerCase() === name.toLowerCase());
}
function isDuplicate(url) {
    return bookmarkContainer.some(bookmark => bookmark.address.toLowerCase() === url.toLowerCase());
}


