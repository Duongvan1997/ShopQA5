package com.vti.finalexam.service;

import com.vti.finalexam.DTO.MonthlyOrderCountDTO;
import com.vti.finalexam.DTO.MonthlyRevenueDTO;
import com.vti.finalexam.DTO.changeStatusDTO;
import com.vti.finalexam.entity.Order;
import com.vti.finalexam.entity.OrderItem;
import com.vti.finalexam.entity.Product;
import com.vti.finalexam.form.OrderCustomerCreatForm;
import com.vti.finalexam.form.OrderFormCreating;
import com.vti.finalexam.form.OrderItemForm;
import com.vti.finalexam.form.ProductFormCreating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public interface IOrderService {
    public Page<Order> getAllOrders(Pageable pageable, String search);
    public ArrayList<Order> getOrderToPayAndToReceiveAndCompleted();

    public void customer_createOder(OrderCustomerCreatForm orderCustomerCreatForm);
    public List<Object[]> getTotalAmountByMonthForCurrentYear();
    public void createCart(OrderFormCreating formCreating);
    public List<MonthlyRevenueDTO> getMonthlyRevenues();
    public  void updateOder(int id, OrderFormCreating formUpdating);

    public Order getOrderById(int id);
    public List<Order> getOrderByCustomer(int id);

    public ArrayList<Order> getAll();
    public void cancelOrder(int id);
    public void changeStatus(int id, changeStatusDTO changeStatusDTO);
    public  void deleteOrder(int id);
    public List<MonthlyOrderCountDTO> getOrderCountByMonthForCurrentYear();
    public List<MonthlyOrderCountDTO> getMonthlyCount();
    void deleteOrders(List<Integer> ids);

   // void changeStatusByEmployee(int id, int employeeId, changeStatusDTO changeStatusDTO);
}
