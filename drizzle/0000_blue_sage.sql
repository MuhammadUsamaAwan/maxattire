CREATE TABLE `account` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` varchar(191),
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` text,
	`session_state` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `addresses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`country_id` int,
	`state_id` int,
	`city_id` int,
	`state` varchar(191),
	`city` varchar(191),
	`address` varchar(191),
	`phone` varchar(191),
	`is_default` tinyint,
	`postal_code` varchar(191),
	`latitude` varchar(191),
	`longitude` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `addresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cart_design_files` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`cart_id` int NOT NULL,
	`design_file` varchar(191) NOT NULL,
	`type` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cart_design_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cart_design_sizes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`cart_id` int NOT NULL,
	`size_id` int NOT NULL,
	`quantity` double NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cart_design_sizes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`temp_user_id` varchar(191),
	`product_id` int,
	`product_stock_id` int,
	`size_id` int,
	`color_id` int,
	`quantity` int,
	`price` double,
	`tax` double,
	`discount` double,
	`decoration_type` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active') NOT NULL,
	`parent_id` int,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`image` varchar(191),
	`description` longtext,
	`type` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active') NOT NULL,
	`state_id` int NOT NULL,
	`title` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `colors` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`code` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `colors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active') NOT NULL,
	`title` varchar(191) NOT NULL,
	`code` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `countries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coupon_categories` (
	`coupon_id` int NOT NULL,
	`category_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(191) NOT NULL,
	`slug` varchar(191),
	`discount_type` varchar(191),
	`discount` varchar(191),
	`start_date` date,
	`end_date` date,
	`no_of_use` int,
	`file` varchar(191),
	`description` longtext,
	`status` enum('active','not-active') NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `coupons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `failed_jobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`uuid` varchar(191) NOT NULL,
	`connection` text NOT NULL,
	`queue` text NOT NULL,
	`payload` longtext NOT NULL,
	`exception` longtext NOT NULL,
	`failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `failed_jobs_id` PRIMARY KEY(`id`),
	CONSTRAINT `failed_jobs_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `migrations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`migration` varchar(191) NOT NULL,
	`batch` int NOT NULL,
	CONSTRAINT `migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_access_tokens` (
	`id` varchar(100) NOT NULL,
	`user_id` bigint unsigned,
	`client_id` bigint unsigned NOT NULL,
	`name` varchar(191),
	`scopes` text,
	`revoked` tinyint NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`expires_at` datetime,
	CONSTRAINT `oauth_access_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_auth_codes` (
	`id` varchar(100) NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`client_id` bigint unsigned NOT NULL,
	`scopes` text,
	`revoked` tinyint NOT NULL,
	`expires_at` datetime,
	CONSTRAINT `oauth_auth_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_clients` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned,
	`name` varchar(191) NOT NULL,
	`secret` varchar(100),
	`provider` varchar(191),
	`redirect` text NOT NULL,
	`personal_access_client` tinyint NOT NULL,
	`password_client` tinyint NOT NULL,
	`revoked` tinyint NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `oauth_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_personal_access_clients` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`client_id` bigint unsigned NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `oauth_personal_access_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_refresh_tokens` (
	`id` varchar(100) NOT NULL,
	`access_token_id` varchar(100) NOT NULL,
	`revoked` tinyint NOT NULL,
	`expires_at` datetime,
	CONSTRAINT `oauth_refresh_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_design_files` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`order_id` int NOT NULL,
	`design_file` varchar(191) NOT NULL,
	`type` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `order_design_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_design_sizes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`cart_id` int NOT NULL,
	`size_id` int NOT NULL,
	`quantity` double NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `order_design_sizes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_products` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`product_id` int,
	`product_stock_id` int NOT NULL,
	`size_id` int,
	`color_id` int,
	`quantity` int,
	`price` double,
	`tax` double,
	`discount` double,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `order_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_statuses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`status` enum('AWAITING_PAYMENT','PAID','PAYMENT_DECLINED','PACKED','SHIPPED','DELIVERED','CANCELED') NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `order_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`address_id` int NOT NULL,
	`payment_type_id` int,
	`vendor_payment_status` varchar(191),
	`payment_status` enum('paid','not-paid') NOT NULL,
	`code` varchar(191),
	`grand_total` double(8,2) NOT NULL,
	`tax` double(8,2) NOT NULL,
	`coupon_id` int,
	`coupon_discount` double(8,2),
	`tracking_code` varchar(191),
	`notes` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`content` longtext,
	`is_index` tinyint NOT NULL DEFAULT 0,
	`meta_title` varchar(191),
	`meta_tags` varchar(191),
	`meta_description` varchar(191),
	`meta_img` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_resets` (
	`email` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`created_at` timestamp
);
--> statement-breakpoint
CREATE TABLE `payment_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active') NOT NULL,
	`title` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `payment_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permission_role` (
	`permission_id` int NOT NULL,
	`role_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`added_by` int NOT NULL,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `personal_access_tokens` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`tokenable_type` varchar(191) NOT NULL,
	`tokenable_id` bigint unsigned NOT NULL,
	`name` varchar(191) NOT NULL,
	`token` varchar(64) NOT NULL,
	`abilities` text,
	`last_used_at` timestamp,
	`expires_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `personal_access_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `personal_access_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `post_categories` (
	`post_id` int NOT NULL,
	`category_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`added_by_id` int NOT NULL,
	`posted_by_id` int,
	`status` enum('active','not-active','draft') NOT NULL,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`is_featured` tinyint NOT NULL DEFAULT 0,
	`thumbnail` varchar(191),
	`thumb_prvdr` varchar(191) NOT NULL DEFAULT 'self',
	`video_provider` varchar(191),
	`video_link` varchar(191),
	`tags` text,
	`description` longtext,
	`meta_title` varchar(191),
	`meta_tag` text,
	`meta_description` text,
	`meta_img` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_categories` (
	`product_id` int NOT NULL,
	`category_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_spec_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`title` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `product_spec_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_specs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`product_spec_type_id` int NOT NULL,
	`size_id` int,
	`size` varchar(191) NOT NULL,
	`value` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `product_specs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_stock_images` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int,
	`product_stock_id` int,
	`type` enum('front','back','side','left-sleeve','right-sleeve') NOT NULL,
	`file_prvdr` varchar(191),
	`file_name` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `product_stock_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_stocks` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`added_by` int NOT NULL,
	`product_id` int NOT NULL,
	`color_id` int,
	`size_id` int,
	`sku` varchar(191),
	`price` double NOT NULL,
	`buy_price` double,
	`quantity` double NOT NULL,
	`gtin` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `product_stocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`added_by_id` int NOT NULL,
	`vendor_id` int,
	`store_id` int,
	`company_id` int,
	`status` enum('active','not-active','out-of-stock') NOT NULL,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`style_code` varchar(191),
	`sku` varchar(191),
	`vendor` varchar(191),
	`is_featured` tinyint NOT NULL DEFAULT 0,
	`is_topselling` tinyint DEFAULT 0,
	`is_newarrival` tinyint DEFAULT 0,
	`is_wholesale` tinyint DEFAULT 0,
	`is_index` tinyint DEFAULT 0,
	`thumbnail` varchar(191),
	`thumb_prvdr` varchar(191),
	`video_provider` varchar(191),
	`video_link` varchar(191),
	`tags` longtext,
	`description` longtext,
	`unit` varchar(191),
	`unit_price` double,
	`purchase_price` double,
	`sell_price` double,
	`tax` double,
	`discount` double,
	`barcode` varchar(191),
	`meta_title` varchar(191),
	`meta_tag` text,
	`meta_description` text,
	`meta_img` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`review_type` enum('WEBSITE','STORE','PRODUCT','USER','VENDOR') NOT NULL,
	`user_id` int NOT NULL,
	`order_product_id` int,
	`product_id` int,
	`store_id` int,
	`vendor_id` int,
	`status` enum('PENDING','APPROVED','NOT_APPROVED','REJECTED') NOT NULL,
	`approved_by_id` int,
	`rating` double(11,2),
	`review` longtext,
	`comment` text,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role_users` (
	`role_id` int NOT NULL,
	`user_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active') NOT NULL,
	`key` varchar(191) NOT NULL,
	`value` text,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sizes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191) NOT NULL,
	`shortcode` varchar(191),
	`slug` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `sizes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `states` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active') NOT NULL,
	`country_id` int NOT NULL,
	`title` varchar(191) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `states_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `store_categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`store_id` int NOT NULL,
	`category_id` int NOT NULL,
	`image` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `store_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active','blocked') NOT NULL,
	`vendor_id` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`tagline` varchar(191),
	`logo` varchar(191),
	`banner_image` varchar(191),
	`bnr_provdr` varchar(191),
	`background_banner_color` varchar(191),
	`phone` varchar(191),
	`email` varchar(191),
	`address` varchar(191),
	`facebook` varchar(191),
	`instagram` varchar(191),
	`google` varchar(191),
	`twitter` varchar(191),
	`youtube` varchar(191),
	`meta_title` varchar(191),
	`meta_tag` varchar(191),
	`meta_description` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `stores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('active','not-active','blocked') NOT NULL,
	`name` varchar(191),
	`email` varchar(191) NOT NULL,
	`phone` varchar(191),
	`slug` varchar(191),
	`password` varchar(191) NOT NULL,
	`referred_by` varchar(191),
	`image` varchar(191),
	`email_verified_at` timestamp,
	`remember_token` varchar(100),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `vendors` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`status` enum('active','not-active','blocked') NOT NULL,
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`logo` varchar(191),
	`phone` varchar(191),
	`email` varchar(191),
	`address` varchar(191),
	`meta_title` varchar(191),
	`meta_tag` varchar(191),
	`meta_description` varchar(191),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `vendors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationtoken` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`identifier` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `verificationtoken_id` PRIMARY KEY(`id`)
);
