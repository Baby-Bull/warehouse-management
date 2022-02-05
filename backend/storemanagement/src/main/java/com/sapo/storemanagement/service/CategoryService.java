package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Category;

import java.util.List;

public interface CategoryService {
    List<Category> listAllCategories();

    Category getCategoryById(Long id);

    Category saveCategory(Category category);
}
