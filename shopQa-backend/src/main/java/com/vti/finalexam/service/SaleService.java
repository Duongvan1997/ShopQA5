package com.vti.finalexam.service;

import com.vti.finalexam.entity.Employee;
import com.vti.finalexam.entity.ProductType;
import com.vti.finalexam.entity.Sale;
import com.vti.finalexam.form.SaleFormCreating;
import com.vti.finalexam.repository.IPaymentMethodRepository;
import com.vti.finalexam.repository.ISaleRepository;
import com.vti.finalexam.specification.ProductTypeSpecification;
import com.vti.finalexam.specification.SaleSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class SaleService implements ISaleService{
    @Autowired
    private ISaleRepository repository;
    @Override
    public Page<Sale> getAllSales(Pageable pageable, String search) {
        Specification<Sale> where = null;
        if(!StringUtils.isEmpty(search)){
           SaleSpecification specification = new SaleSpecification("name","LIKE", search);
            where = Specification.where(specification);
        }
        return repository.findAll(Specification.where(where), pageable);
    }

    @Override
    public void createSale(SaleFormCreating saleFormCreating) throws ParseException {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        Date start_sale = dateFormat.parse(saleFormCreating.getStart_date());
//        Date end_sale = dateFormat.parse(saleFormCreating.getEnd_date());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        LocalDate start_sale  =  LocalDate.parse(saleFormCreating.getStart_date(), formatter);
        LocalDate end_sale  =  LocalDate.parse(saleFormCreating.getEnd_date(), formatter);
        System.out.println("Start Date: " + start_sale);
        System.out.println("End Date: " + end_sale);
        Sale sale = new Sale(
                saleFormCreating.getSale_info(),
                saleFormCreating.getPercent_sale(),
                start_sale,
                end_sale
        );
        repository.save(sale);
        System.out.println("Start Date after: " + sale.getStart_date());
        System.out.println("End Date after: " + sale.getEnd_date());
    }

    @Override
    public void updateSale(int id, SaleFormCreating saleFormCreating) throws ParseException {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        Date start_sale = dateFormat.parse(saleFormCreating.getStart_date());
//        Date end_sale = dateFormat.parse(saleFormCreating.getEnd_date());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start_sale  =  LocalDate.parse(saleFormCreating.getStart_date(), formatter);
        LocalDate end_sale  =  LocalDate.parse(saleFormCreating.getEnd_date(), formatter);
        Sale sale = repository.findById(id);
        sale.setSale_info(saleFormCreating.getSale_info());
        sale.setPercent_sale(saleFormCreating.getPercent_sale());
        sale.setStart_date(start_sale);
        sale.setEnd_date(end_sale);
        repository.save(sale);
    }

    @Override
    public Sale getSaleById(int id) {
        return repository.getSaleById(id);
    }

    @Override
    public void deleteSale(int id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteSales(List<Integer> ids) {
        repository.deleteByIds(ids);
    }
}
