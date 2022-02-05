package com.sapo.storemanagement.security;

import com.sapo.storemanagement.entities.AppUserDetails;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Component
public class JwtTokenProvider {
    private final String JWT_SECRET;
    private final long JWT_EXPIRATION;

    public JwtTokenProvider(@Value("${jwt.secret}") String JWT_SECRET,
                            @Value("${jwt.expiration}") long JWT_EXPIRATION) {
        this.JWT_SECRET = JWT_SECRET;
        this.JWT_EXPIRATION = JWT_EXPIRATION;
    }

    public String generateToken(AppUserDetails userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "JWT claims string is empty.");
        } catch (SignatureException ex) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "JWT signature does not match locally computed signature");
        }
    }
}
