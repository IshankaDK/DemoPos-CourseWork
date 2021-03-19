// generate new order id

function generateOrderId() {
    if (orderTable.length == 0) {
        $('#txtOrderId').val("OR-001");
    } else {
        let lastOrderId = orderTable[orderTable.length - 1].getOrderId();
        let newId = Number.parseInt(lastOrderId.substring(3, 6)) + 1;
        if (newId < 10) {
            newId = "OR-00" + newId;
        } else if (newId < 100) {
            newId = "OR-0" + newId;
        }
        $('#txtOrderId').val(newId);
    }
}

// load customerId to combo and change values when selecting
function loadCustomerId() {
    let allCustomers = customerTable;
    let count = 0;
    $('#cmbCustomerId').children().remove();
    $('#cmbCustomerId').append("<option>--Select--</option>");
    $($('#cmbCustomerId').children().get(0)).attr('selected', 'true');
    $($('#cmbCustomerId').children().get(0)).attr('disabled', 'true');

    allCustomers.forEach(function () {
        $('#cmbCustomerId').append("<option>" + allCustomers[count].getCustomerID() + "</option>");
        count++;
    });
    $('#cmbCustomerId').on('change', function () {
        for (var i in allCustomers) {
            if ($('#cmbCustomerId :selected').val() === allCustomers[i].getCustomerID()) {
                $('#txtCustomerId').val(allCustomers[i].getCustomerID());
                $('#txtCustomerName').val(allCustomers[i].getCustomerName());
                $('#txtCustomerAddress').val(allCustomers[i].getCustomerAddress());
                $('#txtCustomerSalary').val(allCustomers[i].getCustomerSalary());
            }
        }
    });
}

// load Item to combo and change values when selecting
function loadItemCode() {
    let allItems = itemTable;
    let count = 0;
    $('#cmbItemCode').children().remove();
    $('#cmbItemCode').append("<option>--Select--</option>");
    $($('#cmbItemCode').children().get(0)).attr('selected', 'true');
    $($('#cmbItemCode').children().get(0)).attr('disabled', 'true');

    allItems.forEach(function () {
        $('#cmbItemCode').append("<option>" + allItems[count].getCode() + "</option>");
        count++;
    });
    $('#cmbItemCode').on('change', function () {
        for (var i in allItems) {
            if ($('#cmbItemCode :selected').val() === allItems[i].getCode()) {
                $('#txtItemCode').val(allItems[i].getCode());
                $('#txtDescription').val(allItems[i].getDescription());
                $('#txtQtyOnHand').val(allItems[i].getQTY());
                $('#txtUnitPrice').val(allItems[i].getPrice());
            }
        }
    });
}

//Place order
$('#btnPlaceOrder').click(function () {
    let orderDate = $('#txtDate').val();
    let cusId = $('#txtCustomerId').val();

    let orderDetails = [];
    let orderId = $('#txtOrderId').val();

    $('#tblCart>tr').each(function () {
        orderDetails.push(new OrderDetails(
            orderId,
            $($(this).children().get(0)).text(),
            $($(this).children().get(3)).text(),
            $($(this).children().get(2)).text(),
        ));
    });
    let discount = 10;
    let orderDTO = new OrderDTO(orderId, orderDate, cusId, orderDetails, discount);
    orderTable.push(orderDTO);
    // console.log(orderTable[0].getOrderId());
    // console.log(orderTable[0].getOrderDate());
    // console.log(orderTable[0].getCusId());
    // console.log(orderTable[0].getOrderDetail());
    // console.log(orderTable[0].getDiscount());

    clearFields();
    loadCustomerId();
    loadItemCode()
    generateOrderId();
});

// add to cart

$('#btnAddToCart').click(function () {
    let itemCode = $('#txtItemCode').val();
    let description = $('#txtDescription').val();
    let orderQty = $('#txtOrderQTY').val();
    let unitPrice = $('#txtUnitPrice').val();
    let total = $('#txtUnitPrice').val() * $('#txtOrderQTY').val();

    let count = 0;

    let flag = true;

    $('#tblCart>tr').each(function () {
        if ($($('#tblCart>tr').get(count).children[0]).text() === itemCode) {
            flag = false;
            orderQty = Number.parseInt($($('#tblCart>tr').get(count).children[3]).text()) + Number.parseInt(orderQty);
            $($('#tblCart>tr').get(count).children[3]).text(orderQty);
            total = Number.parseInt($($('#tblCart>tr').get(count).children[4]).text()) + Number.parseInt(total);
            $($('#tblCart>tr').get(count).children[4]).text(total + ".00");
        }
        count++;
    });
    if (flag) {
        $('#tblCart').append(`<tr><td>${itemCode}</td><td>${description}</td><td>${unitPrice}</td><td>${orderQty}</td><td>${total + ".00"}</td></tr>`);
    }

    let newQty;
    newQty = Number.parseInt($('#txtQtyOnHand').val()) - Number.parseInt($('#txtOrderQTY').val());
    $('#txtQtyOnHand').val(newQty);
    let allItems = itemTable;
    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].getCode() === $('#txtItemCode').val()) {
            allItems[i].setQTY(newQty);
        }
    }

    $('#tblCart>tr').off('dblclick');
    $('#tblCart>tr').on('dblclick', function () {
        let newQty;
        let allItems = itemTable;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].getCode() === $($(this).children().get(0)).text()) {
                newQty = Number.parseInt($($(this).children().get(3)).text()) + allItems[i].getQTY();
                allItems[i].setQTY(newQty);
            }
        }
        if ($($(this).children().get(0)).text() === $('#txtItemCode').val()) $('#txtQtyOnHand').val(newQty);
        $(this).remove();
        calculateTotal();
        calculateSubTotal();
    });
    calculateTotal();
});

function calculateTotal() {
    let tot = 0;
    let count = 0;

    $('#tblCart>tr').each(function () {
        tot += Number.parseInt($($('#tblCart>tr').get(count).children[4]).text());
        count++;
    });
    $('#lblTotal').text(tot + ".00");
    $('#lblSubTotal').text(tot + ".00");
    $('#txtDiscount').val(0);
    $('#txtPayment').val(tot);
    $('#txtBalance').val("0.00");

}

function calculateSubTotal() {
    let subTot = 0;
    let discount = 0;
    if ($('#txtDiscount').val() === "") {
        discount = 0;
    } else {
        discount = Number.parseInt($('#txtDiscount').val());
    }
    subTot = Number.parseInt($('#lblTotal').text()) - discount;

    if (subTot < 0) {
        $('#lblSubTotal').text($('#lblTotal').text());
        $('#txtPayment').val(Number.parseInt($('#lblTotal').text()));
        $('#txtPayment').attr('min', Number.parseInt($('#lblTotal').text()));
    } else {
        $('#lblSubTotal').text(subTot + ".00");
        $('#txtPayment').val(subTot);
        $('#txtPayment').attr('min', subTot);
        calculateBalance();
    }
}

$('#txtPayment').on('change', function () {
    calculateBalance();
});

$('#txtPayment').on('keyup', function () {
    validatePayment();
    calculateBalance();
});

$('#txtDiscount').on('change', function () {
    calculateSubTotal();
});

$('#txtDiscount').on('keyup', function () {
    calculateSubTotal();
});

function validatePayment() {
    // $('#txtBalance').val("0.00");
}

function calculateBalance() {
    if ($('#txtPayment').val() === "" || Number.parseInt($('#txtPayment').val()) < Number.parseInt($('#lblSubTotal').text())) {
        //error
        $('#txtBalance').val("0.00");
    } else {
        $('#txtBalance').val($('#txtPayment').val() - $('#lblSubTotal').text() + ".00");
    }
}


function clearFields() {
    generateOrderId();
    $('#txtDate').val("");
    $('#txtCustomerId').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerSalary').val("");
    $('#txtItemCode').val("");
    $('#txtDescription').val("");
    $('#txtQtyOnHand').val("");
    $('#txtUnitPrice').val("");
    $('#txtOrderQTY').val("");
    $('#txtPayment').val("");
    $('#txtDiscount').val("");
    $('#txtBalance').val("");
    $('#lblTotal').val(0.00);
    $('#lblSubTotal').val(0.00);
    $('#cmbCustomerId').children().remove();
    $('#cmbItemCode').children().remove();
}
