DELIMITER //
use sapo_mock //

DROP TRIGGER IF EXISTS `update_imported_status`;
CREATE TRIGGER `update_imported_status`
AFTER INSERT ON `import_receipts`
FOR EACH ROW
BEGIN
	UPDATE `orders` SET imported_status = 'Đã nhập kho'
    WHERE orders.id = NEW.order_id;
END;

DROP TRIGGER IF EXISTS `check_condition_before_insert_invoice`;
CREATE TRIGGER `check_condition_before_insert_invoice`
BEFORE INSERT ON `payment_invoice`
FOR EACH ROW
BEGIN
	DECLARE already_paid_amount decimal(12,2);
    DECLARE total_amount decimal(12,2);
    
	SELECT DISTINCT o.total_amount INTO total_amount FROM `orders` o WHERE o.id = NEW.order_id;
    SELECT DISTINCT o.paid_amount INTO already_paid_amount FROM `orders` o WHERE o.id = NEW.order_id;

	IF NEW.amount + already_paid_amount > total_amount THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'Paid amount exceeded total amount';
    END IF;
END;

DROP TRIGGER IF EXISTS `udpate_order_after_insert_invoice`;
CREATE TRIGGER `udpate_order_after_insert_invoice`
AFTER INSERT ON `payment_invoice`
FOR EACH ROW
BEGIN
	DECLARE paid_amount decimal(12,2);
    DECLARE total_amount decimal(12,2);
    DECLARE transaction_status varchar(32);

	UPDATE `orders` SET orders.paid_amount = orders.paid_amount + NEW.amount
    WHERE NEW.order_id = orders.id;
    
    SELECT DISTINCT orders.paid_amount INTO paid_amount FROM `orders` WHERE orders.id = NEW.order_id;
    SELECT DISTINCT orders.total_amount INTO total_amount FROM `orders` WHERE orders.id = NEW.order_id;
    
    IF paid_amount < total_amount THEN
		SET transaction_status = 'Thanh toán một phần';
	ELSE
		SET transaction_status = 'Đã thanh toán';
	END IF;

	UPDATE `orders` SET orders.transaction_status = transaction_status
	WHERE NEW.order_id = orders.id;
END;

//

DELIMITER ;