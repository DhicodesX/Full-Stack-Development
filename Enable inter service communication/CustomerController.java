package com.example.customerservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.customerservice.model.Customer;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    
    private List<Customer> customers = new ArrayList<>();
    private Long nextId = 1L;
    
    public CustomerController() {
        // Adding sample customers
        customers.add(new Customer(nextId++, "John Doe", "john@example.com", "1234567890", "123 Main Street, New York, NY 10001"));
        customers.add(new Customer(nextId++, "Jane Smith", "jane@example.com", "0987654321", "456 Oak Avenue, Los Angeles, CA 90001"));
        customers.add(new Customer(nextId++, "Bob Johnson", "bob@example.com", "5555555555", "789 Pine Road, Chicago, IL 60601"));
        customers.add(new Customer(nextId++, "Alice Brown", "alice@example.com", "1112223333", "321 Elm Street, Houston, TX 77001"));
        customers.add(new Customer(nextId++, "Charlie Wilson", "charlie@example.com", "4445556666", "654 Maple Drive, Phoenix, AZ 85001"));
    }
    
    // Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        System.out.println("GET /api/customers - Returning all customers");
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
    
    // Get customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        System.out.println("GET /api/customers/" + id + " - Fetching customer");
        
        for (Customer customer : customers) {
            if (customer.getId().equals(id)) {
                return new ResponseEntity<>(customer, HttpStatus.OK);
            }
        }
        
        System.out.println("Customer with ID " + id + " not found");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // Search customers by name
    @GetMapping("/search")
    public ResponseEntity<List<Customer>> searchCustomers(@RequestParam String name) {
        System.out.println("GET /api/customers/search?name=" + name + " - Searching customers");
        List<Customer> filtered = new ArrayList<>();
        
        for (Customer customer : customers) {
            if (customer.getName().toLowerCase().contains(name.toLowerCase())) {
                filtered.add(customer);
            }
        }
        
        return new ResponseEntity<>(filtered, HttpStatus.OK);
    }
    
    // Create new customer
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        System.out.println("POST /api/customers - Creating new customer: " + customer.getName());
        customer.setId(nextId++);
        customers.add(customer);
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }
    
    // Update existing customer
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        System.out.println("PUT /api/customers/" + id + " - Updating customer");
        
        for (int i = 0; i < customers.size(); i++) {
            if (customers.get(i).getId().equals(id)) {
                customer.setId(id);
                customers.set(i, customer);
                return new ResponseEntity<>(customer, HttpStatus.OK);
            }
        }
        
        System.out.println("Customer with ID " + id + " not found for update");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        System.out.println("DELETE /api/customers/" + id + " - Deleting customer");
        
        for (int i = 0; i < customers.size(); i++) {
            if (customers.get(i).getId().equals(id)) {
                customers.remove(i);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        
        System.out.println("Customer with ID " + id + " not found for deletion");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}