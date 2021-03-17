//Customer Add
$('#btnCustomerAdd').click(function () {
    let cusId = $('#txtCustomerId0').val();
    let cusName = $('#txtCustomerName0').val();
    let cusAddress = $('#txtCustomerAddress0').val();
    let cusSalary = $('#txtCustomerSalary0').val();

    let res = saveCustomer(cusId, cusName, cusAddress, cusSalary);
    if (res) {
        clearCustomer();
    }
});

//Customer Update
$('#btnCustomerUpdate').click(function () {
    let cusId = $('#txtCustomerId0').val();
    let cusName = $('#txtCustomerName0').val();
    let cusAddress = $('#txtCustomerAddress0').val();
    let cusSalary = $('#txtCustomerSalary0').val();

    let option = confirm(`Do you want to Update Customer ID:${cusId}`);
    if (option) {
        let res = updateCustomer(cusId, cusName, cusAddress, cusSalary);
        if (res) {
            alert("Customer Updated!");
            loadAllCustomersToTable();
            clearCustomer();
        } else {
            alert("Update Failed!");
        }
    }
});

//Customer Delete
$('#btnCustomerDelete').click(function () {
    let cusId = $('#txtCustomerId0').val();

    let option = confirm(`Do you want to Delete Customer ID:${cusId}`);
    if (option) {
        let res = deleteCustomer(cusId);
        if (res) {
            alert("Customer Deleted!");
        } else {
            alert("Delete Failed!");
        }
    }
    loadAllCustomersToTable();
    clearCustomer();
});

$('#btnCustomerCancel').click(function () {
    clearCustomer();
});

function saveCustomer(id, name, address, salary) {
    let customerDTO = new CustomerDTO(id, name, address, salary);
    customerTable.push(customerDTO);
    loadAllCustomersToTable();
    return true;
}

function searchCustomer(id) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == id) return customerTable[i];
    }
    return null;
}

function updateCustomer(id, name, address, salary) {
    let result = searchCustomer(id);
    if (result != null) {
        result.setCustomerName(name)
        result.setCustomerAddress(address)
        result.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}

function deleteCustomer(id) {
    let result = searchCustomer(id);
    if (result != null) {
        let number = customerTable.indexOf(result);
        customerTable.splice(number, 1);
        return true;
    } else {
        return false;
    }

}

function getAllCustomers() {
    return customerTable;
}

function loadAllCustomersToTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        // console.log(id);
        $('#tblCustomer').append(row);
    }

    // Table click Event
    $('#tblCustomer>tr').off('click');
    $('#tblCustomer>tr').click(function () {
        let id = $(this).children('td:eq(0)').text();
        let name = $(this).children('td:eq(1)').text();
        let address = $(this).children('td:eq(2)').text();
        let salary = $(this).children('td:eq(3)').text();

        $("#txtCustomerId0").val(id);
        $("#txtCustomerName0").val(name);
        $("#txtCustomerAddress0").val(address);
        $("#txtCustomerSalary0").val(salary);
    });
}


//Clear Text Fields
function clearCustomer() {
    $('#txtCustomerId0').val("");
    $('#txtCustomerName0').val("");
    $('#txtCustomerAddress0').val("");
    $('#txtCustomerSalary0').val("");
}
