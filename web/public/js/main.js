App = {
    baseURL: `http://${window.location.hostname}`,
    booksport: 3001,
    customresport: 3002,
    orderport: 3003,
    page: 'home', //'register',//
    orgCred: {},
    init: function() {
        console.log("App initialized....");
        //console.log("$.uuid()", $.uuid());

        App.loadpages();

    },

    loadpages: function() {
        switch (App.page) {
            case 'home':
                App.loadHomePage();
                break;
            case 'books':
                App.loadBooksPage();
                break;

            case 'customers':
                App.loadCustomersPage();
                break;

            case 'orders':
                App.loadOrdersPage();
                break;

            default:
                break;
        }
    },

    loadHomePage: function() {
        App.showloader(true);

        $('#container').empty();
        $('#container').load('pages/home.html', function() {})

        App.showloader(false);
    },

    /**
     * 
     * Books 
     * 
     */

    loadBooksPage: function() {
        App.showloader(true);

        $('#container').empty();
        $('#container').load('pages/books.html', function() {
            $.get(`${App.baseURL}:${App.booksport}/books`, function(data, status) {
                //
                //console.log(data)
                let bodyStr = `<table id="BooksTable" class="table">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Number Of Pages</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="trCont">`;
                for (let each in data) {
                    (function(idx, arr) {

                        bodyStr += `<tr><th scope="row">${arr[idx].title}</th><td>${arr[idx].author}</td><td>${arr[idx].numberPages}</td><td>${arr[idx].publisher}</td>
                        <td>

                            <button type="button" class="btn" onclick="App.Delete_Book('${arr[idx]._id}')">
                            <i class="fa fa-trash" aria-hidden="true"></i></button>

                            <button type="button" class="btn" onclick="App.View_Book('${arr[idx]._id}')">
                            <i class="fa fa-info-circle" aria-hidden="true"></i></button>

                        </td></tr>`

                    })(each, data)
                }
                bodyStr += `</tbody></table>`
                $('#tableContainer').html(bodyStr);

                $('#BooksTable').DataTable();
            })
        })

        App.showloader(false);
    },

    Save_Book: function() {
        const title = $('#inputTitle').val();
        const author = $('#inputAuthor').val();
        const numberPages = $('#inputNumberOfPages').val();
        const publisher = $('#inputPublisher').val();

        App.showloader(true);

        let payload = { "title": title, "author": author, "numberPages": numberPages, "publisher": publisher }

        console.log("New Book Payload Sent")
        console.log(payload)

        try {
            fetch(`${App.baseURL}:${App.booksport}/book`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                console.log(resp)
                App.loadBooksPage();
            });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    View_Book: function(bookId) {
        try {
            fetch(`${App.baseURL}:${App.booksport}/book/${bookId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    $('#BookDetailCont').empty();
                    $('#BookDetailCont').html(`<div class="col-lg-12 border my-3 py-3">
                        <div class-"col-12">
                            <h3>Book Detail's</h3>
                        </div>
                        <div class-"col-12">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">Id :</th>
                                        <td>${data._id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Title :</th>
                                        <td>${data.title}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Author :</th>
                                        <td>${data.author}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Number Of Pages :</th>
                                        <td>${data.numberPages}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Publisher :</th>
                                        <td>${data.publisher}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Created On :</th>
                                        <td>${data.createdOn}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`);
                });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    Delete_Book: function(bookId) {
        App.showloader(true);

        try {
            fetch(`${App.baseURL}:${App.booksport}/book/${bookId}`, {
                method: 'DELETE'
            }).then(resp => {
                console.log(resp)
                App.loadBooksPage();
            });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    /**
     * 
     * Customers
     * 
     */

    loadCustomersPage: function() {
        App.showloader(true);

        $('#container').empty();
        $('#container').load('pages/customers.html', function() {
            $.get(`${App.baseURL}:${App.customresport}/customers`, function(data, status) {
                let bodyStr = `<table id="CustomersTable" class="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="trCont">`;
                for (let each in data) {
                    (function(idx, arr) {

                        bodyStr += `<tr><th scope="row">${arr[idx].name}</th><td>${arr[idx].age}</td><td>${arr[idx].address}</td>
                        <td>

                            <button type="button" class="btn" onclick="App.Delete_Customer('${arr[idx]._id}')">
                            <i class="fa fa-trash" aria-hidden="true"></i></button>

                            <button type="button" class="btn" onclick="App.View_Customer('${arr[idx]._id}')">
                            <i class="fa fa-info-circle" aria-hidden="true"></i></button>

                        </td></tr>`

                    })(each, data)
                }
                bodyStr += `</tbody></table>`
                $('#tableContainer').html(bodyStr);

                $('#CustomersTable').DataTable();
            })
        })

        App.showloader(false);
    },

    Save_Customer: function() {
        const name = $('#inputName').val();
        const age = $('#inputAge').val();
        const address = $('#inputAddress1').val() + " " + $('#inputAddress2').val();

        App.showloader(true);

        let payload = { "name": name, "age": age, "address": address }

        try {
            fetch(`${App.baseURL}:${App.customresport}/customer`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                console.log(resp)
                App.loadCustomersPage();
            });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    View_Customer: function(customerId) {
        try {
            fetch(`${App.baseURL}:${App.customresport}/customer/${customerId}`)
                .then(response => response.json())
                .then(data => {
                    $('#CustomerDetailCont').empty();
                    $('#CustomerDetailCont').html(`<div class="col-lg-12 border my-3 py-3">
                        <div class-"col-12">
                            <h3>Customer Detail's</h3>
                        </div>
                        <div class-"col-12">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">Id :</th>
                                        <td>${data._id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Name :</th>
                                        <td>${data.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Age :</th>
                                        <td>${data.age}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Address :</th>
                                        <td>${data.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Created On :</th>
                                        <td>${data.createdOn}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`);
                });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    Delete_Customer: function(customerId) {
        App.showloader(true);

        try {
            fetch(`${App.baseURL}:${App.customresport}/customer/${customerId}`, {
                method: 'DELETE'
            }).then(resp => {
                App.loadCustomersPage();
            });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    /**
     * 
     * Orders
     * 
     */

    getAllBooks: function() {
        return new Promise(resolve => {

            let result = ""

            $.get(`${App.baseURL}:${App.booksport}/books`, function(data, status) {
                for (let each in data) {
                    (function(idx, arr) {

                        result += `<option value="${arr[idx]._id}">${arr[idx].title}</option>`

                    })(each, data)
                }

                resolve(result);
            })

        });
    },

    getAllCustomers: function() {
        return new Promise(resolve => {

            let result = ""

            $.get(`${App.baseURL}:${App.customresport}/customers`, function(data, status) {
                for (let each in data) {
                    (function(idx, arr) {

                        result += `<option value="${arr[idx]._id}">${arr[idx].name}</option>`

                    })(each, data)
                }

                resolve(result);
            })

        });
    },

    addCompleteBooksList: async function(bookId) {
        const result = await App.getAllBooks();

        $('#inputBook').empty();
        $('#inputBook').html(`${result}`);
    },

    addCompleteCustomersList: async function(customerId) {
        const result = await App.getAllCustomers();

        $('#inputCustomer').empty();
        $('#inputCustomer').html(`${result}`);
    },

    loadOrdersPage: function() {
        App.showloader(true);

        $('#container').empty();
        $('#container').load('pages/orders.html', function() {

            App.addCompleteBooksList();
            App.addCompleteCustomersList();

            $.get(`${App.baseURL}:${App.orderport}/orders`, function(data, status) {
                let bodyStr = `<table id="OrdersTable" class="table">
                <thead>
                    <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>`;
                for (let each in data) {
                    (function(idx, arr) {

                        console.log(arr[idx])

                        bodyStr += `<tr><th scope="row">${arr[idx]._id}</th><td>${arr[idx].initialDate}</td>
                            <td>

                                <button type="button" class="btn" onclick="App.Delete_Order('${arr[idx]._id}')">
                                <i class="fa fa-trash" aria-hidden="true"></i></button>

                                <button type="button" class="btn" onclick="App.View_Order('${arr[idx]._id}')">
                                <i class="fa fa-info-circle" aria-hidden="true"></i></button>

                            </td></tr>`

                    })(each, data)
                }
                bodyStr += `</tbody></table>`
                $('#tableContainer').html(bodyStr);

                $('#OrdersTable').DataTable();
            })
        })

        App.showloader(false);
    },

    Save_Order: function() {
        const CustomerID = $('#inputCustomer').find(':selected').val();
        const BookID = $('#inputBook').find(':selected').val();

        App.showloader(true);

        let payload = { "CustomerID": CustomerID, "BookID": BookID }

        try {
            fetch(`${App.baseURL}:${App.orderport}/order`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                App.loadOrdersPage();
            });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    View_Order: function(orderId) {
        try {
            fetch(`${App.baseURL}:${App.orderport}/order/${orderId}`)
                .then(response => response.json())
                .then(data => {
                    $('#OrderDetailCont').empty();
                    $('#OrderDetailCont').html(`<div class="col-lg-12 border my-3 py-3">
                        <div class-"col-12">
                            <h3>Order Detail's</h3>
                        </div>
                        <div class-"col-12">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">Id :</th>
                                        <td>${data._id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Customer Id :</th>
                                        <td>${data.CustomerID}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Customer Name :</th>
                                        <td>${data.CustomerName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Book Id :</th>
                                        <td>${data.BookID}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Book Title :</th>
                                        <td>${data.BookTitle}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Created On :</th>
                                        <td>${data.initialDate}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Delivered On :</th>
                                        <td>${data.deliveryDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`);
                });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    Delete_Order: function(orderId) {
        App.showloader(true);

        try {
            fetch(`${App.baseURL}:${App.orderport}/order/${orderId}`, {
                method: 'DELETE'
            }).then(resp => {
                App.loadOrdersPage();
            });

        } catch (e) {
            console.error(e)
            console.log('---------------------')
        }
    },

    showloader: function(param) {
        if (param === true) {
            $('#container').hide();
            $('#loader').show();
        } else {
            $('#container').show();
            $('#loader').hide();
        }
    },


}

$(function() {
    $(window).load(function() {
        App.init();
    })
})