//Form Listner
document.getElementById('myform').addEventListener('submit', saveBookmark);

//save Bookmarks
function saveBookmark(e) {
    //Get Forms Values
    var siteName = document.getElementById('sitename').value;
    var siteUrl = document.getElementById('siteurl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = []
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
    	 // Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmarks to array
        bookmarks.push(bookmark);
        //Re -set back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
// Clear form
    document.getElementById('myform').reset();

// Re-fetch bookmarks
    fetchBookmarks();

    //Prevent form from submiting
    e.preventDefault();
}
// Delete bookmark
function deleteBookmark(url) {
 // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
// Loop through the bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
// Re-set back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//Re-fetch Bookmarks
    fetchBookmarks();

}

// Fetch bookmarks
function fetchBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkResults = document.getElementById('bookmarkResults');
 // Build output
    bookmarkResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';

    }
}
// Validate form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert
            ('Please use a valid URL');
        return false;
    }
    return true;
    
}
