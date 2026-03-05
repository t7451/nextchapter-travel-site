CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int NOT NULL,
	`userId` int NOT NULL,
	`type` enum('flight','hotel','cruise','tour','car_rental','transfer','other') NOT NULL DEFAULT 'other',
	`vendor` varchar(255),
	`confirmationNumber` varchar(128),
	`status` enum('pending','confirmed','cancelled','waitlisted') NOT NULL DEFAULT 'pending',
	`checkIn` timestamp,
	`checkOut` timestamp,
	`amount` int,
	`currency` varchar(8) DEFAULT 'USD',
	`notes` text,
	`documentUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destination_guides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`destination` varchar(255) NOT NULL,
	`country` varchar(128),
	`heroImageUrl` text,
	`overview` text,
	`currency` varchar(32),
	`language` varchar(64),
	`timezone` varchar(64),
	`bestTimeToVisit` text,
	`weatherInfo` text,
	`tipsJson` json,
	`emergencyNumbers` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `destination_guides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('passport','boarding_pass','hotel_confirmation','tour_confirmation','travel_insurance','visa','other') NOT NULL DEFAULT 'other',
	`fileUrl` text NOT NULL,
	`fileKey` text NOT NULL,
	`mimeType` varchar(128),
	`fileSize` int,
	`expiryDate` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `itinerary_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`date` timestamp,
	`time` varchar(10),
	`title` varchar(255) NOT NULL,
	`description` text,
	`location` varchar(255),
	`category` enum('flight','hotel','activity','dining','transport','free_time','other') NOT NULL DEFAULT 'other',
	`confirmationNumber` varchar(128),
	`notes` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `itinerary_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int,
	`fromUserId` int NOT NULL,
	`toUserId` int NOT NULL,
	`content` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`attachmentUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `packing_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int NOT NULL,
	`userId` int NOT NULL,
	`category` varchar(64) DEFAULT 'General',
	`item` varchar(255) NOT NULL,
	`isPacked` boolean NOT NULL DEFAULT false,
	`quantity` int DEFAULT 1,
	`notes` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `packing_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `travel_alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int,
	`userId` int,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`severity` enum('info','warning','urgent') NOT NULL DEFAULT 'info',
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `travel_alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`destination` varchar(255) NOT NULL,
	`coverImageUrl` text,
	`startDate` timestamp,
	`endDate` timestamp,
	`status` enum('planning','confirmed','active','completed','cancelled') NOT NULL DEFAULT 'planning',
	`notes` text,
	`confirmationCode` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trips_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `avatarUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `emergencyContactName` text;--> statement-breakpoint
ALTER TABLE `users` ADD `emergencyContactPhone` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `emergencyContactRelation` varchar(64);