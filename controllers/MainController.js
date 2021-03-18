var $dashboardform = $('#dashboardform');
var $customerform = $('#customerform');
var $itemform = $('#itemform');
var $orderform = $('#orderform');
// var $customerformbutton = $('#customerformbutton');
// var $itemformbutton = $('#itemformbutton');

$dashboardform.show();
$customerform.hide();
$itemform.hide();
$orderform.hide();
// $customerformbutton.hide();
// $itemformbutton.hide();

$('#btnDashboard').click(function () {
    $dashboardform.show();
    $customerform.hide();
    $itemform.hide();
    $orderform.hide();
    // $customerformbutton.hide();
    // $itemformbutton.hide();
});
$('#btnCustomer').click(function () {
    $dashboardform.hide();
    $customerform.show();
    $itemform.hide();
    $orderform.hide();
    // $customerformbutton.show();
    // $itemformbutton.hide();
});
$('#btnItem').click(function () {
    $dashboardform.hide();
    $customerform.hide();
    $itemform.show();
    $orderform.hide();
    // $customerformbutton.hide();
    // $itemformbutton.show();
});
$('#btnOrder').click(function () {
    $dashboardform.hide();
    $customerform.hide();
    $itemform.hide();
    $orderform.show();
    clearFields();
    generateOrderId();
    loadCustomerId();
    loadItemCode();
});