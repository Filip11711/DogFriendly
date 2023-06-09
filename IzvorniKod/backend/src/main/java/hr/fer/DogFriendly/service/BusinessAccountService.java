package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.BusinessAccount;
import hr.fer.DogFriendly.repository.BusinessAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BusinessAccountService {
    private final BusinessAccountRepository businessAccountRepository;

    public BusinessAccount save(BusinessAccount businessAccount) {
        return businessAccountRepository.save(businessAccount);
    }

    public BusinessAccount findByAccountId(Long accountId) {
        return businessAccountRepository.findByAccountId(accountId);
    }

    public void deleteByAccountId(Long accountId) {
        businessAccountRepository.deleteById(accountId);
    }
}
