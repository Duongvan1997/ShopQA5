package com.vti.finalexam.controller;

import com.vti.finalexam.DTO.FeedbackDTO;
import com.vti.finalexam.entity.Feedback;
import com.vti.finalexam.form.FeedbackCreating;
import com.vti.finalexam.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "api/v1/feedbacks")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

   @Autowired
   private IFeedbackService service;
   @GetMapping
   public ResponseEntity<?> getAllFeedbacks(Pageable pageable, @RequestParam(required = false) String search){
            Page<Feedback> entitiesPage = service.getAllFeedbacks(pageable, search);
            Page<FeedbackDTO> dtoPage = entitiesPage.map(new Function<Feedback, FeedbackDTO>() {
                @Override
                public FeedbackDTO apply(Feedback feedback) {
                    FeedbackDTO dto = new FeedbackDTO(feedback.getId(),
                                                    feedback.getComment(),
                                                    feedback.getFeedback_date(),
                                                    feedback.getRating(),
                                                    feedback.getAccount_customer().getId(),
                                                    feedback.getProduct_feedback().getId());
                    return dto;
                }
            });
            return new ResponseEntity<>(dtoPage, HttpStatus.OK);
   }
        @GetMapping(value = ("/getAll"))
        public ResponseEntity<?> getFeedback(){
            ArrayList<Feedback> listResponse = service.getAll();
            List<FeedbackDTO> listRespo = listResponse.stream()
                    .map(e -> new FeedbackDTO(e.getId(),e.getComment(),e.getFeedback_date(), e.getRating(),e.getAccount_customer().getId(),e.getAccount_customer().getUsername(),e.getProduct_feedback().getId()))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(listRespo, HttpStatus.OK);
        }



        @PostMapping(value = "/customer")
        public ResponseEntity<?> createFeedback(@RequestBody FeedbackCreating formCreating){
            service.createFeedback(formCreating);
            return new ResponseEntity<String>("Create successfully", HttpStatus.CREATED);
        }


    //    @PutMapping(value = "/{id}")
    //    public ResponseEntity<?> updateProduct(@PathVariable(name = "id") int id, @RequestBody ProductFormCreating formCreating){
    //     service.updateProduct(id, formCreating);
    //     return new ResponseEntity<String>("Update successfull!", HttpStatus.OK);
    //    }
    //

        @GetMapping(value = "/{id}")
        public ResponseEntity<?> getFeedbackById(@PathVariable(name = "id") int id){
            Feedback feedback = service.getFeedbackById(id);
            FeedbackDTO feedbackDTO = new FeedbackDTO(
                    feedback.getId(), feedback.getComment(),
                    feedback.getFeedback_date(),
                    feedback.getRating(),
                    feedback.getAccount_customer().getId(),
                    feedback.getProduct_feedback().getId()
            );
            return new ResponseEntity<FeedbackDTO>(feedbackDTO, HttpStatus.OK);
        }

        @DeleteMapping(value = "/{id}")
        public ResponseEntity<?> deleteFeedback(@PathVariable(name = "id") int id){
            service.deleteFeedback(id);
            return new ResponseEntity<String>("Delete successfull!", HttpStatus.OK);
        }


        @DeleteMapping()
        public void deleteFeedbacks(@RequestParam(name="ids") List<Integer> ids){
            service.deleteFeedbacks(ids);
        }
}
