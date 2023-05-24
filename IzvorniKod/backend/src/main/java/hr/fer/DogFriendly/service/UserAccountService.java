package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.UserAccount;
import hr.fer.DogFriendly.repository.UserAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserAccountService {
    private final UserAccountRepository userAccountRepository;

    public UserAccount save(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }

    public UserAccount findByAccountId(Long accountId) {
        return userAccountRepository.findByAccountId(accountId);
    }

    public void deleteByAccountId(Long accountId) {
        userAccountRepository.deleteById(accountId);
    }
}
