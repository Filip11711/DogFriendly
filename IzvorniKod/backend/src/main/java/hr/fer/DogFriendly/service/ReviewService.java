package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.model.Location;
import hr.fer.DogFriendly.model.Review;
import hr.fer.DogFriendly.model.ReviewId;
import hr.fer.DogFriendly.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final AccountService accountService;
    private final LocationService locationService;

    public Optional<Review> findByReviewId(ReviewId reviewId) {
        return reviewRepository.findByReviewId(reviewId);
    }

    public List<Review> findReviewByLocationId(Long locationId) {
        return reviewRepository.findAllByReviewId_LocationId(locationId);
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    public Account findByAccountId(Long accountId) {
        return accountService.findByAccountId(accountId);
    }

    public Location findByLocationId(Long locationId) {
        return locationService.findByLocationId(locationId);
    }
}
