package com.vti.finalexam.service;

import com.vti.finalexam.entity.*;
import com.vti.finalexam.form.FeedbackCreating;
import com.vti.finalexam.repository.*;
import com.vti.finalexam.specification.AccountSpecification;
import com.vti.finalexam.specification.FeedbackSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FeedbackService implements IFeedbackService{
    @Autowired
    private IFeedbackRepository repository;
    @Autowired
    private IOderRepository oderRepository;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private IProductService productService;
    @Autowired
    private IOrderService orderService;

    @Override
    public Page<Feedback> getAllFeedbacks(Pageable pageable, String search) {
        Specification<Feedback> where = null;
        if(!StringUtils.isEmpty(search)){
            FeedbackSpecification feedbackSpecification = new FeedbackSpecification("name","LIKE", search);
            where = Specification.where(feedbackSpecification);
        }
        return repository.findAll(Specification.where(where), pageable);
    }

//    @Override
   public void createFeedback(FeedbackCreating feedbackCreating) {
        Customer customer = customerService.getCustomerById(feedbackCreating.getCustomer_id());
        LocalDate creating_date = LocalDate.now();
       System.out.println(feedbackCreating);
        Order order = orderService.getOrderById(feedbackCreating.getOrder_id());
        if(order!=null){
            System.out.println(order);
            Product product = productService.getProductById(feedbackCreating.getProduct_id());
            Feedback feedback = new Feedback(feedbackCreating.getComment(),creating_date, feedbackCreating.getRating(), customer, product);
            repository.save(feedback);
            List<OrderItem> orderItemList = order.getOrderItems();
            for(OrderItem orderItem : orderItemList){
                if(orderItem.getProduct_detail_order().getProduct_detail().getId() == feedbackCreating.getProduct_id()){
                    orderItem.setFeedbackReceived(true);
                    System.out.println(orderItem);
                }
            }
            order.setOrderItems(orderItemList);
            oderRepository.save(order);
        }

    }

    @Override
    public ArrayList<Feedback> getAll() {
        return repository.findAll();
    }

    @Override
    public Feedback getFeedbackById(int id) {
        return repository.getFeedbackById(id);
    }

    @Override
    public void deleteFeedback(int id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteFeedbacks(List<Integer> ids) {
        repository.deleteByIds(ids);
    }


}
