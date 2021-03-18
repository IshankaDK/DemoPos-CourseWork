function OrderDTO(orderId, orderDate, cusId, itemCode) {
    var __orderId = orderId;
    var __orderDate = orderDate;
    var __cusId = cusId;
    var __itemCode = itemCode;

    this.getOrderId = function () {
        return __orderId;
    }
    this.setOrderId = function (newId) {
        __orderId = newId;
    }
    this.getOrderDate = function () {
        return __orderDate;
    }
    this.setOrderDate = function (newDate) {
        __orderDate = newDate;
    }
    this.getCustomerId = function () {
        return __cusId;
    }
    this.setCustomerId = function (newId) {
        __cusId = newId;
    }
    this.getItemCode = function () {
        return __itemCode;
    }
    this.setItemCode = function (newCode) {
        __itemCode = newCode;
    }
}