package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.ReportEachMonthDto;

import java.util.List;

public interface ReportService {
    List<Long> totalOrderOneMonthInYear(int year);

    List<Long> totalSuppliedQuantityOneMonthInYear(int year);

    List<ReportEachMonthDto> reportEachMonth(int year);
}
