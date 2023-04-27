    package com.NS.ISMS.repository;

    import java.util.List;
    import java.util.Optional;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;

    import com.NS.ISMS.entity.User;

    import jakarta.transaction.Transactional;

    public interface UserRepository extends JpaRepository<User, Integer> {

        Optional<User> findByEmail(String email);

        @Transactional
        void deleteByEmail(String email);

        @Query("SELECT u FROM User u WHERE u.role = 'ROLE_USER'")
        List<User> findAllUsers();

    }
