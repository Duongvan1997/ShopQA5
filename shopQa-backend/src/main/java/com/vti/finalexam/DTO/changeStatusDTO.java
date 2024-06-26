package com.vti.finalexam.DTO;

import com.vti.finalexam.entity.Order;

public class changeStatusDTO {
    private int employee_id;
    private Order.OderStatus oderStatus;

    public int getCustomer_id() {
        return employee_id;
    }

    public void setCustomer_id(int customer_id) {
        this.employee_id = customer_id;
    }

    public Order.OderStatus getOderStatus() {
        return oderStatus;
    }

    public void setOderStatus(Order.OderStatus oderStatus) {
        this.oderStatus = oderStatus;
    }

    public changeStatusDTO() {
    }

    public changeStatusDTO(int employee_id, Order.OderStatus oderStatus) {
        this.employee_id = employee_id;
        this.oderStatus = oderStatus;
    }
}
