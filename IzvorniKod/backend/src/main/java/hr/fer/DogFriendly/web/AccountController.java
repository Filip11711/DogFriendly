package hr.fer.DogFriendly.web;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.model.BusinessAccount;
import hr.fer.DogFriendly.model.UserAccount;
import hr.fer.DogFriendly.model.UserRole;
import hr.fer.DogFriendly.payload.request.BusinessAccountChangeRequest;
import hr.fer.DogFriendly.payload.request.UserAccountChangeRequest;
import hr.fer.DogFriendly.payload.response.BusinessAccountResponse;
import hr.fer.DogFriendly.payload.response.UserAccountResponse;
import hr.fer.DogFriendly.security.UserDetailsImpl;
import hr.fer.DogFriendly.service.AccountService;
import hr.fer.DogFriendly.service.BusinessAccountService;
import hr.fer.DogFriendly.service.BusinessTypeService;
import hr.fer.DogFriendly.service.UserAccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final BusinessAccountService businessAccountService;
    private final UserAccountService userAccountService;
    private final BusinessTypeService businessTypeService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @CrossOrigin(origins = "*")
    @GetMapping("api/account")
    ResponseEntity<?> getAccountInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();
        Long accountId = userPrincipal.getAccountId();
        UserRole userRole = userPrincipal.getUserRole();
        Account account = accountService.findByAccountId(accountId);

        if (userRole == UserRole.USER) {
            UserAccount userAccount = userAccountService.findByAccountId(accountId);
            UserAccountResponse accountResponse = new UserAccountResponse(
                    userAccount.getUsername(),
                    account.getEmail(),
                    userAccount.getFirstName(),
                    userAccount.getLastName(),
                    account.getBio()
                    );
            return ResponseEntity.ok(accountResponse);
        } else {
            BusinessAccount businessAccount = businessAccountService.findByAccountId(accountId);
            BusinessAccountResponse accountResponse = new BusinessAccountResponse(
                    account.getEmail(),
                    account.getBio(),
                    businessAccount.getBusinessName(),
                    businessAccount.getOib(),
                    businessAccount.getPhoneNumber(),
                    businessAccount.getBusinessType().getBusinessType()
            );
            return ResponseEntity.ok(accountResponse);
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("api/account/user")
    ResponseEntity<?> changeUserAccountInfo(@Valid @RequestBody UserAccountChangeRequest userAccountChangeRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();
        Long accountId = userPrincipal.getAccountId();
        Account account = accountService.findByAccountId(accountId);
        UserAccount userAccount = userAccountService.findByAccountId(accountId);

        userAccount.setUsername(userAccountChangeRequest.getUsername());
        final String encryptedPassword = bCryptPasswordEncoder.encode(userAccountChangeRequest.getPassword());
        account.setPassword(encryptedPassword);
        userAccount.setFirstName(userAccountChangeRequest.getFirstName());
        userAccount.setLastName(userAccountChangeRequest.getLastName());
        account.setBio(userAccountChangeRequest.getBio());

        accountService.save(account);
        userAccountService.save(userAccount);

        return ResponseEntity.ok("Account saved");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("api/account/business")
    ResponseEntity<?> changeBusinessAccountInfo(@Valid @RequestBody BusinessAccountChangeRequest businessAccountChangeRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();
        Long accountId = userPrincipal.getAccountId();
        Account account = accountService.findByAccountId(accountId);
        BusinessAccount businessAccount = businessAccountService.findByAccountId(accountId);

        businessAccount.setBusinessName(businessAccountChangeRequest.getBusinessName());
        final String encryptedPassword = bCryptPasswordEncoder.encode(businessAccountChangeRequest.getPassword());
        account.setPassword(encryptedPassword);
        account.setBio(businessAccountChangeRequest.getBio());
        businessAccount.setPhoneNumber(businessAccountChangeRequest.getPhoneNumber());
        businessAccount.setBusinessType(businessTypeService.findByBusinessTypeId(businessAccountChangeRequest.getBusinessType()).orElse(null));

        accountService.save(account);
        businessAccountService.save(businessAccount);

        return ResponseEntity.ok("Account saved");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("api/account")
    ResponseEntity<?> deleteAccount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();

        if(!accountService.existsByAccountId(userPrincipal.getAccountId())) {
            return ResponseEntity.badRequest().body("User does not exist");
        }

        if(userPrincipal.getUserRole() == UserRole.USER) {
            userAccountService.deleteByAccountId(userPrincipal.getAccountId());
        } else {
            businessAccountService.deleteByAccountId(userPrincipal.getAccountId());
        }

        accountService.deleteByAccountId(userPrincipal.getAccountId());

        return ResponseEntity.ok("OK");
    }
}
