package com.vti.finalexam.service;

import com.vti.finalexam.DTO.MonthlyOrderCountDTO;
import com.vti.finalexam.DTO.MonthlyRevenueDTO;
import com.vti.finalexam.DTO.changeStatusDTO;
import com.vti.finalexam.entity.*;
import com.vti.finalexam.form.OrderCustomerCreatForm;
import com.vti.finalexam.form.OrderFormCreating;
import com.vti.finalexam.form.OrderItemForm;
import com.vti.finalexam.repository.*;
import com.vti.finalexam.specification.OderSpecification;
import com.vti.finalexam.specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService implements IOrderService{
    @Autowired
    private IOderRepository repository;
    @Autowired
    private IPaymentMethodRepository paymentMethodRepository;
    @Autowired
    private IAccountRepository customerRepository;
    @Autowired
    private IEmployeeRepository employeeRepository;

    @Autowired
    private IOderItemRepository oderItemRepository;

    @Autowired
    private  IProductDetailRepository productDetailRepository;

    @Autowired
    private IOrderItemService service;
    @Override
    public Page<Order> getAllOrders(Pageable pageable, String search) {
        Specification<Order> where = null;
        if(!StringUtils.isEmpty(search)){
            OderSpecification searchSpecification = new OderSpecification("name","LIKE", search);
            where = Specification.where(searchSpecification);
        }
        return repository.findAll(Specification.where(where), pageable);
    }



    @Override
    public ArrayList<Order> getOrderToPayAndToReceiveAndCompleted() {
        ArrayList<Order.OderStatus> statuses = new ArrayList<>();
        statuses.add(Order.OderStatus.TO_PAY);
        statuses.add(Order.OderStatus.TO_RECEIVE);
        statuses.add(Order.OderStatus.COMPLETED);
        return repository.findByOderStatus(statuses);
//        return repository.findByOderStatus(Order.OderStatus.TO_PAY);
    }


    @Override
    public void customer_createOder(OrderCustomerCreatForm formCreating) {
        Account customer = customerRepository.getAccountById(formCreating.getCustomer_id());
        PaymentMethod paymentMethod = paymentMethodRepository.getPaymentMethodById(formCreating.getPayment_method_id());
        LocalDate creating_date = LocalDate.now();
        float total_amout = 0;
        Order order = new Order(
                formCreating.getAddress(),
                formCreating.getPhone(),
                creating_date,
                Order.OderStatus.TO_PAY,
                customer,
                paymentMethod
        );
        repository.save(order);
        for (OrderItemForm orderItemForm : formCreating.getOrderItemForms()){
            OrderItem orderItem = oderItemRepository.getOrderItemById(orderItemForm.getId());
            orderItem.setOrder(order);
            orderItem.setQuantity(orderItemForm.getQuantity_item());
            orderItem.setSubtotal(orderItem.getSell_price()*orderItem.getQuantity());
            ProductDetail productDetail = productDetailRepository.getDetailById(orderItem.getProduct_detail_order().getId());
            productDetail.setQuantity(productDetail.getQuantity()-orderItem.getQuantity());
            total_amout = total_amout + orderItem.getSubtotal();
            oderItemRepository.save(orderItem);
            productDetailRepository.save(productDetail);

        }
        order.setTotal_amount(total_amout);
        repository.save(order);
    }

    @Override
    public List<Object[]> getTotalAmountByMonthForCurrentYear() {
        return repository.getTotalAmountByMonthForCurrentYear();
    }

    @Override
    public void createCart(OrderFormCreating formCreating) {
        Account customer = customerRepository.getAccountById(formCreating.getCustomer_id());
        LocalDate creating_date = LocalDate.now();
        Order order = new Order(
                customer.getAddress(),
                "0",
                creating_date,
                Order.OderStatus.ADDED_TO_CARD,
                customer
        );
        repository.save(order);
    }

    @Override
    public List<MonthlyRevenueDTO> getMonthlyRevenues() {
            List<Object[]> results = repository.getTotalAmountByMonthForCurrentYear();
            List<MonthlyRevenueDTO> revenues = new ArrayList<>();
            for (Object[] result : results) {
//                BigDecimal totalAmount = (BigDecimal) result[0];
//
                BigDecimal totalAmount = new BigDecimal(result[0].toString());
                int month = (int) result[1];
                revenues.add(new MonthlyRevenueDTO(month, totalAmount));
            }
            return revenues;
    }

    @Override
    public void updateOder(int id, OrderFormCreating formUpdating) {
        System.out.println(formUpdating.getEmployee_id());
        Employee employee = employeeRepository.getEmployeeById(formUpdating.getEmployee_id());
        Order order = repository.getOrderById(id);
        if(0 != formUpdating.getPayment_method_id()){
            PaymentMethod    paymentMethod = paymentMethodRepository.getPaymentMethodById(formUpdating.getPayment_method_id());
            order.setPayment_method(paymentMethod);
        }
        order.setEmployee(employee);
        order.setOderStatus(formUpdating.getOderStatus());
        order.setOder_date(formUpdating.getOder_date());
        repository.save(order);

    }

    @Override
    public Order getOrderById(int id) {
        return repository.getOrderById(id);
    }

    @Override
    public List<Order> getOrderByCustomer(int id) {
        Account customer = customerRepository.getAccountById(id);
        return repository.getOrderByCustomer(customer);
    }

    @Override
    public ArrayList<Order> getAll() {
        return repository.findAll();
    }

    @Override
    public void cancelOrder(int id) {
        Order order = repository.getOrderById(id);
        List<OrderItem> orderItems = order.getOrderItems();
        for(OrderItem orderItem : orderItems) {
            ProductDetail productDetail = productDetailRepository.getDetailById(orderItem.getProduct_detail_order().getId());
            productDetail.setQuantity(productDetail.getQuantity() + orderItem.getQuantity());
            productDetailRepository.save(productDetail);
        }
        order.setOderStatus(Order.OderStatus.CANCELED);
        repository.save(order);
    }

    @Override
    public void changeStatus(int id, changeStatusDTO changeStatusDTO) {
        Employee employee = employeeRepository.getEmployeeById(changeStatusDTO.getCustomer_id());
        Order order = repository.getOrderById(id);
        if (employee != null) {
            order.setOderStatus(changeStatusDTO.getOderStatus());
            order.setEmployee(employee);
            repository.save(order);
        }


        }


    @Override
    public void deleteOrder(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<MonthlyOrderCountDTO> getOrderCountByMonthForCurrentYear() {
            return null;
    }

    @Override
    public List<MonthlyOrderCountDTO> getMonthlyCount() {
            List<Object[]> results = repository.getOrderCountByMonthForCurrentYear();
            List<MonthlyOrderCountDTO> countDTOS = new ArrayList<>();
            for (Object[] result : results) {
//                BigInteger count = new BigInteger(result[0].toString());
                ;
                countDTOS.add(new MonthlyOrderCountDTO(result[0].toString(),result[1].toString()));
            }
            return countDTOS;

    }

    @Override
    public void deleteOrders(List<Integer> ids) {
        repository.deleteByIds(ids);
    }


}
