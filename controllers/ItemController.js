//Item Add
$('#btnItemAdd').click(function () {
    let itemCode = $('#txtItemCode0').val();
    let description = $('#txtDescription0').val();
    let qty = $('#txtQty0').val();
    let unitPrice = $('#txtUnitPrice0').val();

    let res = saveItem(itemCode, description, qty, unitPrice);
    if (res) {
        clearItem();
    }
});

//Item Update
$('#btnItemUpdate').click(function () {
    let itemCode = $('#txtItemCode0').val();
    let description = $('#txtDescription0').val();
    let qty = $('#txtQty0').val();
    let unitPrice = $('#txtUnitPrice0').val();

    let option = confirm(`Do you want to Update Item Code:${itemCode}`);
    if (option) {
        let res = updateItem(itemCode, description, qty, unitPrice);
        if (res) {
            alert("Item Updated!");
            loadAllItemsToTable();
            clearItem();
        } else {
            alert("Update Failed!");
        }
    }
});

//Customer Delete
$('#btnItemDelete').click(function () {
    let code = $('#txtItemCode0').val();

    let option = confirm(`Do you want to Delete Item Code:${code}`);
    if (option) {
        let res = deleteItem(code);
        if (res) {
            alert("Item Deleted!");
        } else {
            alert("Delete Failed!");
        }
    }
    loadAllItemsToTable();
    clearItem();
});



$('#btnItemCancel').click(function () {
    clearItem();
});

function saveItem(code, desc, qty, price) {
    let itemDTO = new ItemDTO(code, desc, qty, price);
    itemTable.push(itemDTO);
    loadAllItemsToTable();
    return true;
}

function searchItem(code) {
    for (var i in itemTable) {
        if (itemTable[i].getCode() == code) return itemTable[i];
    }
    return null;
}

function getAllItems() {
    return itemTable;
}

function loadAllItemsToTable() {
    let allItems = getAllItems();
    $('#tblItem').empty();
    for (var i in allItems) {
        let code = allItems[i].getCode();
        let desc = allItems[i].getDescription();
        let qty = allItems[i].getQTY();
        let price = allItems[i].getPrice();

        var row = `<tr><td>${code}</td><td>${desc}</td><td>${qty}</td><td>${price}</td></tr>`;
        $('#tblItem').append(row);
    }

    // Table click Event
    $('#tblItem>tr').off('click');
    $('#tblItem>tr').click(function () {
        let code = $(this).children('td:eq(0)').text();
        let desc = $(this).children('td:eq(1)').text();
        let qty = $(this).children('td:eq(2)').text();
        let price = $(this).children('td:eq(3)').text();

        $("#txtItemCode0").val(code);
        $("#txtDescription0").val(desc);
        $("#txtQty0").val(qty);
        $("#txtUnitPrice0").val(price);
    });
}

function updateItem(code, desc, qty, price) {
    let result = searchItem(code);
    if (result != null) {
        result.setDescription(desc);
        result.setQTY(qty);
        result.setPrice(price);
        return true;
    } else {
        return false;
    }
}

function deleteItem(code) {
    let result = searchItem(code);
    if (result != null) {
        let number = itemTable.indexOf(result);
        itemTable.splice(number, 1);
        return true;
    } else {
        return false;
    }
}

function clearItem() {
    $('#txtItemCode0').val("");
    $('#txtDescription0').val("");
    $('#txtQty0').val("");
    $('#txtUnitPrice0').val("");
}