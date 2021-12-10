'use strict'

function onPageLoad() {
    renderBooks();
}

function renderBooks() {
    var strHTMLs = '';
    const BOOKS = getBooksPage();
    var idx = getCurrIdx(); 
    BOOKS.forEach(book => {
        strHTMLs += renderBook(book, idx);
        idx++; 
    });

    $('.book-list').html(strHTMLs);
    const paginationHTML = renderPagination();
    $('.pagination').html(paginationHTML);
}

function renderBook(book, idx) {
    const trans = getTrans();
    const currLang = getLang();
    const strHTML = `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>
            <button type="button" class="readBtn btn btn-info btn-sm" data-toggle="modal" href="#bookModal" onclick="onReadClick(${idx})">${trans.readButton[currLang]}</button>
            <button type="button" class="updateBtn btn btn-primary btn-sm" onclick="onUpdateBook(${idx})">${trans.updateButton[currLang]}</button>
            <button type="button" class="deleteBtn btn btn-danger btn-sm" onclick="onRemoveBook(${idx})">${trans.deleteButton[currLang]}</button>
        </td>
    </tr>`;
    
    return strHTML;
}

function onRemoveBook(bookIdx) {
    removeBook(bookIdx);
    renderBooks();
}

function onAddBook() {
    $('.no-value').text('');
    const title = $('.book-title').val();
    const price = $('.book-price').val();
    const trans = getTrans();
    const lang = getLang();
    if(title === '' || price === '') {
        $('.no-value').text(trans.noValue[lang]);
        return;
    }
    $('.book-title').val('');
    $('.book-price').val('');
    addBook(title, price);
    renderBooks();
}

function onUpdateBook(bookIdx) {
    const newPrice = prompt('What is the new price?');
    updateBook(bookIdx, newPrice);
    renderBooks();
}

function onReadClick(bookIdx) {
    const books = getBooks();
    const book = books[bookIdx];
    $('.modal-body h2').text(book.title);
    // $('.modal-body .author').text(book.author);
    if(getLang() === 'en') $('.modal-body .price').text('Price: ' + book.price);
    else $('.modal-body .price').text( 'מחיר: ' + book.price);
}

function onIncreaseValue() {
    var value = parseInt($('#number').val(), 10);
    if(value === 10) return;
    value = isNaN(value) ? 0 : value;
    value++;
    $('#number').val(value);
}

function onDecreaseValue() {
    var value = parseInt($('#number').val(), 10);
    if(value === 0) return;
    value = isNaN(value) ? 0 : value;
    value--;
    $('#number').val(value);
}

function onSort(sortBy) {
    sortBooks(sortBy);
    renderBooks();
}

function onPageIdx(val) {
    if(val === 'prev') prevPage();
    else if(val === 'next') nextPage();
    else setPage(val);
    renderBooks();
}

function renderPagination() {
    const pageCount = getPages();
    if(pageCount === 0) return '';
    const activePageIdx = getPageIdx();
    var strHTML = `<button onclick="onPageIdx('prev')">&laquo;</button>`;
    for(var i = 0; i < pageCount + 1; i++) {
        strHTML+= (i === activePageIdx) ? `<button class="active" onclick="onPageIdx(${i})">${(i+1)}</button>` : `<button onclick="onPageIdx(${i})">${(i+1)}</button>`;
    }
    strHTML += `<button onclick="onPageIdx('next')">&raquo;</button>`
    return strHTML;
}

function translateEn() {
    $('body').css({direction:'ltr'});
    const trans = getTrans();

    $('.idHead').text(trans.idLabel.en);
    $('.titleHead').text(trans.titleLabel.en);
    $('.priceHead').text(trans.priceLabel.en);
    $('.actionsHead').text(trans.actionsLabel.en);
    $('.createBookBtn').text(trans.createBook.en);
    $('.book-title-exp').text(trans.newTitleExp.en);
    $('.book-title').attr('placeholder', trans.newTitleVal.en);
    $('.book-price-exp').text(trans.newPriceExp.en);
    $('.book-price').attr('placeholder', trans.newPriceVal.en);
    $('.submit-button').text(trans.submitButton.en);

    renderBooks();
}

function translateHe() {
    $('body').css({direction:'rtl'});
    const trans = getTrans();

    $('.idHead').text(trans.idLabel.he);
    $('.titleHead').text(trans.titleLabel.he);
    $('.priceHead').text(trans.priceLabel.he);
    $('.actionsHead').text(trans.actionsLabel.he);
    $('.createBookBtn').text(trans.createBook.he);
    $('.book-title-exp').text(trans.newTitleExp.he);
    $('.book-title').attr('placeholder', trans.newTitleVal.he);
    $('.book-price-exp').text(trans.newPriceExp.he);
    $('.book-price').attr('placeholder', trans.newPriceVal.he);
    $('.submit-button').text(trans.submitButton.he);

    renderBooks();
}

function onChangeLang(lang) {
    changeLang(lang);
    if(lang === 'en') translateEn();
    else if(lang === 'he') translateHe();
    return
}

function onCreateBut() {
    $('.no-value').text('');
}