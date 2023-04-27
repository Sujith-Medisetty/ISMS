package com.NS.ISMS.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.NS.ISMS.entity.Token;

import jakarta.transaction.Transactional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

  @Query(value = "select t from Token t inner join User u on t.user.id = u.id where u.id = :id and (t.expired = false or t.revoked = false)")
  List<Token> findAllValidTokenByUser(@Param("id") long id);

  @Transactional
  @Modifying
  void deleteAllByUserId(long id);

  Optional<Token> findByToken(String token);
}
