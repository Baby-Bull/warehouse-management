package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.LineItemDto;
import com.sapo.storemanagement.dto.ReturnReceiptDto;
import com.sapo.storemanagement.dto.ReturnReceiptResponseDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.repository.VariantsImportReceiptRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.repository.VariantsReturnReceiptRepository;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.ReturnReceiptService;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class ReturnReceiptServiceImpl implements ReturnReceiptService {
    private final ReturnReceiptRepository returnReceiptRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private VariantsOrderRepository variantsOrderRepository;

    @Autowired
    private VariantsImportReceiptRepository variantsImportReceiptRepository;

    @Autowired
    private VariantsReturnReceiptRepository variantsReturnReceiptRepository;

    @Autowired
    private VariantService variantService;

    @Autowired
    @Qualifier("return-receipt-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Autowired
    public ReturnReceiptServiceImpl(ReturnReceiptRepository returnReceiptRepository) {
        this.returnReceiptRepository = returnReceiptRepository;
    }

    @Override
    @Transactional
    public ReturnReceipt saveReturnReceipt(Long creatorId, long orderId, ReturnReceiptDto returnReceiptDto) {
        User user = userService.getUserById(creatorId);
        Order order = orderService.getOrderById(orderId);
        String note = returnReceiptDto.getNote();

        if(!order.getImportedStatus().equals(ImportedStatus.PARTIAL_IMPORTED.getStatus()) &&
            !order.getImportedStatus().equals(ImportedStatus.IMPORTED.getStatus()) &&
            !order.getImportedStatus().equals(ImportedStatus.PARTIAL_REFUND.getStatus())) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Đơn hàng chưa nhập kho để có thể hoàn trả"
            );
        }

        String code = itemCodeGenerator.generate();
        ReturnReceipt returnReceipt = returnReceiptRepository.save(new ReturnReceipt(code, order, user, note));
        AtomicReference<ImportedStatus> importedStatus = new AtomicReference<>(ImportedStatus.FULL_REFUND);

        returnReceiptDto.getLineItems().forEach(lineItem -> {
            Variant variant = variantService.getVariantById(lineItem.getVariantId());

            long totalAlreadyImportedQuantity = variantsImportReceiptRepository
                .totalImportedQuantityOfVariantInOrder(lineItem.getVariantId(), orderId);
            long totalAlreadyReturnedQuantity = variantsReturnReceiptRepository
                .totalReturnedQuantityOfVariantInOrder(lineItem.getVariantId(), orderId);
            if(totalAlreadyReturnedQuantity + lineItem.getQuantity() > totalAlreadyImportedQuantity) {
                throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Tổng số lượng hoàn trả của sản phẩm " + variant.getVariantName() + " không được vượt quá số lượng đã nhập"
                );
            }
            else if(totalAlreadyReturnedQuantity + lineItem.getQuantity() < totalAlreadyImportedQuantity) {
                importedStatus.set(ImportedStatus.PARTIAL_REFUND);
            }

            VariantsReturnReceipt variantsReturnReceipt = variantsReturnReceiptRepository.save(
                new VariantsReturnReceipt(
                    variant,
                    returnReceipt,
                    lineItem.getQuantity(),
                    lineItem.getPrice()
                )
            );

            variant.setInventoryQuantity(variant.getInventoryQuantity() - lineItem.getQuantity());
            variant.setSellableQuantity(variant.getSellableQuantity() - lineItem.getQuantity());
        });

        order.setImportedStatus(importedStatus.get());

        return returnReceipt;
    }

    @Override
    public List<ReturnReceiptResponseDto> listAllReturnReceiptsByOrder(long orderId) {
        List<ReturnReceiptResponseDto> response = new ArrayList<>();
        /*
        Step 1: Find all return receipts
         */
        List<ReturnReceipt> returnReceipts = returnReceiptRepository.findAllByOrder_Id(orderId);

        /*
        Step 2: For each return receipt, find all line items,
        and build response based on those line items
         */
        returnReceipts.forEach(returnReceipt -> {
            List<LineItemDto> lineItems = new ArrayList<>();

            /*
            Step 2.1: Find all variants in this returnReceipt
             */
            List<VariantsReturnReceipt> variantsReturnReceipts = variantsReturnReceiptRepository
                .findAllByReturnReceipt_Id(returnReceipt.getId());

            /*
            Step 2.2: For each variant, build lineItem, and add to list of line items
             */
            variantsReturnReceipts.forEach(variantsReturnReceipt -> {
                Variant variant = variantsReturnReceipt.getVariant();
                String variantName = variant.getVariantName();

                /*
                Build a lineItem
                 */
                LineItemDto lineItem = new LineItemDto(
                    variantsReturnReceipt.getId().getVariantId(),
                    variantName,
                    variantsReturnReceipt.getAmountEach(),
                    variantsReturnReceipt.getQuantity()
                );
                lineItems.add(lineItem);
            });

            /*
            Build an object of ReturnReceiptResponseDto
             */
            ReturnReceiptResponseDto responseDto = new ReturnReceiptResponseDto(
                returnReceipt.getCode(), returnReceipt.getCreatedAt(),
                returnReceipt.getCreatedBy().getUsername(), lineItems, returnReceipt.getNote()
            );

            /*
            Build the response
             */
            response.add(responseDto);
        });

        return response;
    }
}
