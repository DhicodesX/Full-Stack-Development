package com.example.customerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CustomerServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
        System.out.println("========================================");
        System.out.println("CUSTOMER SERVICE STARTED SUCCESSFULLY!");
        System.out.println("Port: 8081");
        System.out.println("API Base URL: http://localhost:8081/api/customers");
        System.out.println("========================================");
    }
}