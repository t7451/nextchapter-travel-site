ALTER TABLE `messages` ADD `attachmentName` varchar(255);--> statement-breakpoint
ALTER TABLE `messages` ADD `attachmentType` varchar(128);--> statement-breakpoint
ALTER TABLE `messages` ADD `attachmentSize` int;