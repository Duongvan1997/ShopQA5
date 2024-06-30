package com.vti.finalexam.repository;

import com.vti.finalexam.entity.Account;
import com.vti.finalexam.entity.Customer;
import com.vti.finalexam.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

public interface IOderRepository extends JpaRepository<Order, Integer> {
    public Order getOrderById(int id);
    public List<Order> getOrderByCustomer(Account customer);

    public void deleteById(int id);
    @Modifying
    @Transactional
    @Query("DELETE FROM Order WHERE id IN(:ids)")
    public void deleteByIds(@Param("ids") List<Integer> ids);
    ArrayList<Order> findByOderStatus(Order.OderStatus orderStatus);
    <T> Page<Order> findAll(Specification<T> where, Pageable pageable);
    ArrayList<Order> findByCustomer(Account customer);
    ArrayList<Order> findAll();

}
