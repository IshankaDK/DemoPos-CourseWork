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

// Reg Ex
let cusIdRegEx = /^(C00-)[0-9]{1,3}$/;
let cusNameRegEx = /^[A-z| ]{5,20}$/;
let cusAddressRegEx = /^[A-z| |0-9|,]{7,}$/;
let cusSalaryRegEx = /^\d{1,7}(?:\.\d{0,2})?$/;

$('#txtCustomerId0').on('keyup', function (event) {
    if (event.key === "Enter") {
        $('#txtCustomerName0').focus();
    }
    let input = $('#txtCustomerId0').val();
    if (cusIdRegEx.test(input)){
        $('#txtCustomerId0').css('border','2px solid green');
        $('#lblcusid').text("");
    }else {
        $('#txtCustomerId0').css('border','2px solid red');
        $('#lblcusid').text("Required field. Pattern:-(C00-000)");
        $('#lblcusid').css('color','red');
        $('#lblcusid').css('font-size','8px');
    }

});

$('#txtCustomerName0').on('keyup', function (event) {
    if (event.key === "Enter") {
        $('#txtCustomerAddress0').focus();
    }
    let input = $('#txtCustomerName0').val();
    if (cusNameRegEx.test(input)){
        $('#txtCustomerName0').css('border','2px solid green');
        $('#lblcusname').text("");
    }else {
        $('#txtCustomerName0').css('border','2px solid red');
        $('#lblcusname').text("Required field. 5 to 20 characters Allowed.");
        $('#lblcusname').css('color','red');
        $('#lblcusname').css('font-size','8px');
    }
});

$('#txtCustomerAddress0').on('keyup', function (event) {
    if (event.key === "Enter") {
        $('#txtCustomerSalary0').focus();
    }
    let input = $('#txtCustomerAddress0').val();
    if (cusAddressRegEx.test(input)){
        $('#txtCustomerAddress0').css('border','2px solid green');
        $('#lblcusaddress').text("");
    }else {
        $('#txtCustomerAddress0').css('border','2px solid red');
        $('#lblcusaddress').text("Required field. Minimum 7");
        $('#lblcusaddress').css('color','red');
        $('#lblcusaddress').css('font-size','8px');
    }
});

$('#txtCustomerSalary0').on('keyup', function (event) {
    if (event.key === "Enter") {
        $('#btnCustomerAdd').click();
    }
    let input = $('#txtCustomerSalary0').val();
    if (cusSalaryRegEx.test(input)){
        $('#txtCustomerSalary0').css('border','2px solid green');
        $('#lblcussalary').text("");
    }else {
        $('#txtCustomerSalary0').css('border','2px solid red');
        $('#lblcussalary').text("Required field. Pattern:(100.00 or 100)");
        $('#lblcussalary').css('color','red');
        $('#lblcussalary').css('font-size','8px');
    }
});

$('#txtCustomerId0,#txtCustomerName0,#txtCustomerAddress0,#txtCustomerSalary0').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});


//Clear Text Fields
function clearCustomer() {
    $('#txtCustomerId0').val("");
    $('#txtCustomerName0').val("");
    $('#txtCustomerAddress0').val("");
    $('#txtCustomerSalary0').val("");
}
