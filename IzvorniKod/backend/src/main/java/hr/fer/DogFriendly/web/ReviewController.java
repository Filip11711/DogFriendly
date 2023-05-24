package hr.fer.DogFriendly.web;

import hr.fer.DogFriendly.model.Review;
import hr.fer.DogFriendly.model.ReviewId;
import hr.fer.DogFriendly.payload.request.ReviewAddRequest;
import hr.fer.DogFriendly.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @CrossOrigin(origins = "*")
    @GetMapping("api/review")
    ResponseEntity<?> getLocationReviews(@Valid @RequestBody Long locationId) {
        List<Review> reviews = reviewService.findReviewByLocationId(locationId);
        return ResponseEntity.ok(reviews);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("api/review")
    ResponseEntity<?> addReview(@Valid @RequestBody ReviewAddRequest reviewAddRequest) {
        Review review = new Review();
        review.setReviewId(new ReviewId(reviewAddRequest.getAccountId(), reviewAddRequest.getLocationId()));
        review.setStars(reviewAddRequest.getStars());
        review.setMessage(reviewAddRequest.getMessage());
        review.setAccount(reviewService.findByAccountId(reviewAddRequest.getAccountId()));
        review.setLocation(reviewService.findByLocationId(reviewAddRequest.getLocationId()));

        reviewService.save(review);

        return ResponseEntity.ok("Ok");
    }
}
