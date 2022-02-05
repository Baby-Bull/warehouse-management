package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ReportEachMonthDto;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    private final OrderRepository orderRepository;
    private final VariantsOrderRepository variantsOrderRepository;

    @Autowired
    public ReportServiceImpl(OrderRepository orderRepository, VariantsOrderRepository variantsOrderRepository) {
        this.orderRepository = orderRepository;
        this.variantsOrderRepository = variantsOrderRepository;
    }

    @Override
    public List<Long> totalOrderOneMonthInYear(int year) {
        List<Long> response = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            response.add(orderRepository.countOrdersInMonthInYear(i, year));
        }
        return response;
    }

    @Override
    public List<Long> totalSuppliedQuantityOneMonthInYear(int year) {
        List<Long> response = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            response.add(variantsOrderRepository.countTotalSuppliedQuantityInMonthInYear(i, year));
        }
        return response;
    }

    @Override
    public List<ReportEachMonthDto> reportEachMonth(int year) {
        List<ReportEachMonthDto> response = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            long totalOrdersInMonthInYear = orderRepository.countOrdersInMonthInYear(i, year);
            long totalSuppliedQuantityInMonthInYear = variantsOrderRepository.countTotalSuppliedQuantityInMonthInYear(i, year);
            double totalAmountInMonthInYear = orderRepository.totalAmountInMonthInYear(i, year);
            double paidAmountInMonthInYear = orderRepository.paidAmountInMonthInYear(i, year);
            double debtAmountInMonthYear = totalAmountInMonthInYear - paidAmountInMonthInYear;
            ReportEachMonthDto dto = new ReportEachMonthDto(
                    totalOrdersInMonthInYear,
                    totalSuppliedQuantityInMonthInYear,
                    totalAmountInMonthInYear,
                    paidAmountInMonthInYear,
                    debtAmountInMonthYear
            );
            response.add(dto);
        }
        return response;
    }
}
