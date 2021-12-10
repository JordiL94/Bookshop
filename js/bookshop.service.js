'use strict'

const PAGE_SIZE = 5;

var gBooks = [
    {
        id: 1,
        title: 'Kokoro',
        price: '10.20'
    },
    {
        id: 2,
        title: 'One Hundered Years of Solitude',
        price: '9.30'
    },
    {
        id: 3,
        title: 'Man\'s Search for Meaning',
        price: '10.00'
    },
    {
        id: 4,
        title: 'Hard-Boiled Wonderland and the End of the World',
        price: '8.10'
    },
    {
        id: 5,
        title: 'The Old Man and the Sea',
        price: '8.90'
    },
    {
        id: 6,
        title: 'The Master and Margarita',
        price: '9.90'
    }
];

var gPageIdx = 0;

var gTrans = {
    createBook: {
        en: 'Create new book',
        he: 'יצירת ספר חדש'
    },
    idLabel: {
        en: 'ID',
        he: 'מ.ס'
    },
    titleLabel: {
        en: 'Title',
        he: 'שם הספר'
    },
    priceLabel: {
        en: 'Price',
        he: 'מחיר'
    },
    actionsLabel: {
        en: 'Actions',
        he: 'פעולות'
    },
    readButton: {
        en: 'Read',
        he: 'לקריאה'
    },
    updateButton: {
        en: 'Update',
        he: 'עדכון'
    },
    deleteButton: {
        en: 'Delete',
        he: 'מחיקה'
    }
};

var gLang = 'en';
var gIdTracker = gBooks.length;

function getBooks() {
    return gBooks;
}

function removeBook(bookIdx) {
    gBooks.splice(bookIdx, 1);    
}

function addBook(title, price) {
    const newBook = {
        id: _getNewId(),
        title: title,
        price: price
    }

    gBooks.push(newBook);
}

function updateBook(idx, price) {
    gBooks[idx].price = price;
}

function sortBooks(sortBy) {
    if(sortBy === 'id') {
        gBooks.sort(function(a,b) {
            if(a.id > b.id) return 1;
            else return -1;
        })
    } else if(sortBy === 'title') {
        gBooks.sort(function(a,b) {
            if(a.title > b.title) return 1;
            else if (a.title < b.title) return -1;
            else return 0;
        })
    } else {
        gBooks.sort(function(a,b) {
            if(parseFloat(a.price) > parseFloat(b.price)) return 1;
            else if (parseFloat(a.price) < parseFloat(b.price)) return -1;
            else return 0;
        })
    }
}


function getBooksPage() {
    const startIdx = gPageIdx * PAGE_SIZE;
    const books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);
    return books;
}

function nextPage() {
    if (gPageIdx * PAGE_SIZE >= gBooks.length - PAGE_SIZE) return;
    gPageIdx++;
}

function prevPage() {
    if (gPageIdx * PAGE_SIZE === 0) return;
    gPageIdx--;
}

function getCurrIdx() {
    return gPageIdx * PAGE_SIZE;
}

function getPages() {
    var numOfPages = gBooks.length / PAGE_SIZE;
    return (gBooks.length % 5 === 0) ? numOfPages - 1 : Math.floor(numOfPages);
}

function getPageIdx() {
    return gPageIdx;
}

function setPage(val) {
    gPageIdx = val;
}

function getTrans() {
    return gTrans;
}

function getLang() {
    return gLang;
}

function changeLang(lang) {
    gLang = lang;
}

function _getNewId() {
    gIdTracker++;
    return gIdTracker;
}