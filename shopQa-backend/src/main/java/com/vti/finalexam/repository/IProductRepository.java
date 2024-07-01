package com.vti.finalexam.repository;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vti.finalexam.entity.Account;
import com.vti.finalexam.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Optional;

public interface IProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    public Product findByName(String name);
    public boolean existsByName(String name);
    public Product getProductById(int id);


//    Optional<Product> findByNameAndColorAndSize(String name, String color, String size);

    public void deleteById(int id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Product WHERE id IN(:ids)")
    public void deleteByIds(@Param("ids")List<Integer> ids);

//    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
//    List<Product> findByPriceRange(@Param("minPrice") float minPrice, @Param("maxPrice") float maxPrice);
//
//    @Query("SELECT p FROM Product p " +
//            "WHERE (:color IS NULL OR p.productDetail.color = :color) " +
//            "AND (:size IS NULL OR p.productDetail.size = :size) " +
//            "AND (:typeId IS NULL OR p.typeProduct.id = :typeId)")
//    List<Product> findByColorAndSizeAndTypeId(
//            @Param("color") String color,
//            @Param("size") String size,
//            @Param("typeId") Integer typeId);

}
