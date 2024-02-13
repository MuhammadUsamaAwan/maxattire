import { relations, sql } from 'drizzle-orm';
import {
  bigint,
  date,
  datetime,
  double,
  int,
  longtext,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  tinyint,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';

export const account = mysqlTable(
  'account',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: varchar('userId', { length: 191 }).notNull(),
    type: varchar('type', { length: 191 }).notNull(),
    provider: varchar('provider', { length: 191 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 191 }).notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: varchar('expires_at', { length: 191 }),
    tokenType: varchar('token_type', { length: 191 }),
    scope: varchar('scope', { length: 191 }),
    idToken: text('id_token'),
    sessionState: varchar('session_state', { length: 191 }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      accountId: primaryKey({ columns: [table.id], name: 'account_id' }),
    };
  }
);

export const addresses = mysqlTable(
  'addresses',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id').notNull(),
    countryId: int('country_id'),
    stateId: int('state_id'),
    cityId: int('city_id'),
    state: varchar('state', { length: 191 }),
    city: varchar('city', { length: 191 }),
    address: varchar('address', { length: 191 }),
    phone: varchar('phone', { length: 191 }),
    isDefault: tinyint('is_default'),
    postalCode: varchar('postal_code', { length: 191 }),
    latitude: varchar('latitude', { length: 191 }),
    longitude: varchar('longitude', { length: 191 }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      addressesId: primaryKey({ columns: [table.id], name: 'addresses_id' }),
    };
  }
);

export const cartDesignFiles = mysqlTable(
  'cart_design_files',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id').notNull(),
    cartId: int('cart_id').notNull(),
    designFile: varchar('design_file', { length: 191 }).notNull(),
    type: varchar('type', { length: 191 }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      cartDesignFilesId: primaryKey({ columns: [table.id], name: 'cart_design_files_id' }),
    };
  }
);

export const cartDesignSizes = mysqlTable(
  'cart_design_sizes',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id').notNull(),
    cartId: int('cart_id').notNull(),
    sizeId: int('size_id').notNull(),
    quantity: double('quantity').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      cartDesignSizesId: primaryKey({ columns: [table.id], name: 'cart_design_sizes_id' }),
    };
  }
);

export const carts = mysqlTable(
  'carts',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id'),
    tempUserId: varchar('temp_user_id', { length: 191 }),
    productId: int('product_id'),
    productStockId: int('product_stock_id'),
    sizeId: int('size_id'),
    colorId: int('color_id'),
    quantity: int('quantity'),
    price: double('price'),
    tax: double('tax'),
    discount: double('discount'),
    decorationType: varchar('decoration_type', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      cartsId: primaryKey({ columns: [table.id], name: 'carts_id' }),
    };
  }
);

export const categories = mysqlTable(
  'categories',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active']).notNull(),
    parentId: int('parent_id'),
    title: varchar('title', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    image: varchar('image', { length: 191 }),
    description: longtext('description'),
    type: varchar('type', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      categoriesId: primaryKey({ columns: [table.id], name: 'categories_id' }),
    };
  }
);

export const cities = mysqlTable(
  'cities',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active']).notNull(),
    stateId: int('state_id').notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      citiesId: primaryKey({ columns: [table.id], name: 'cities_id' }),
    };
  }
);

export const colors = mysqlTable(
  'colors',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    code: varchar('code', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      colorsId: primaryKey({ columns: [table.id], name: 'colors_id' }),
    };
  }
);

export const countries = mysqlTable(
  'countries',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active']).notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    code: varchar('code', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      countriesId: primaryKey({ columns: [table.id], name: 'countries_id' }),
    };
  }
);

export const couponCategories = mysqlTable('coupon_categories', {
  couponId: int('coupon_id').notNull(),
  categoryId: int('category_id').notNull(),
});

export const coupons = mysqlTable(
  'coupons',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    code: varchar('code', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }),
    discountType: varchar('discount_type', { length: 191 }),
    discount: varchar('discount', { length: 191 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date('start_date', { mode: 'string' }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date('end_date', { mode: 'string' }),
    noOfUse: int('no_of_use'),
    file: varchar('file', { length: 191 }),
    description: longtext('description'),
    status: mysqlEnum('status', ['active', 'not-active']).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      couponsId: primaryKey({ columns: [table.id], name: 'coupons_id' }),
    };
  }
);

export const failedJobs = mysqlTable(
  'failed_jobs',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    uuid: varchar('uuid', { length: 191 }).notNull(),
    connection: text('connection').notNull(),
    queue: text('queue').notNull(),
    payload: longtext('payload').notNull(),
    exception: longtext('exception').notNull(),
    failedAt: timestamp('failed_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  table => {
    return {
      failedJobsId: primaryKey({ columns: [table.id], name: 'failed_jobs_id' }),
      failedJobsUuidUnique: unique('failed_jobs_uuid_unique').on(table.uuid),
    };
  }
);

export const migrations = mysqlTable(
  'migrations',
  {
    id: int('id', { unsigned: true }).autoincrement().notNull(),
    migration: varchar('migration', { length: 191 }).notNull(),
    batch: int('batch').notNull(),
  },
  table => {
    return {
      migrationsId: primaryKey({ columns: [table.id], name: 'migrations_id' }),
    };
  }
);

export const oauthAccessTokens = mysqlTable(
  'oauth_access_tokens',
  {
    id: varchar('id', { length: 100 }).notNull(),
    userId: bigint('user_id', { mode: 'number', unsigned: true }),
    clientId: bigint('client_id', { mode: 'number', unsigned: true }).notNull(),
    name: varchar('name', { length: 191 }),
    scopes: text('scopes'),
    revoked: tinyint('revoked').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
    expiresAt: datetime('expires_at', { mode: 'string' }),
  },
  table => {
    return {
      oauthAccessTokensId: primaryKey({ columns: [table.id], name: 'oauth_access_tokens_id' }),
    };
  }
);

export const oauthAuthCodes = mysqlTable(
  'oauth_auth_codes',
  {
    id: varchar('id', { length: 100 }).notNull(),
    userId: bigint('user_id', { mode: 'number', unsigned: true }).notNull(),
    clientId: bigint('client_id', { mode: 'number', unsigned: true }).notNull(),
    scopes: text('scopes'),
    revoked: tinyint('revoked').notNull(),
    expiresAt: datetime('expires_at', { mode: 'string' }),
  },
  table => {
    return {
      oauthAuthCodesId: primaryKey({ columns: [table.id], name: 'oauth_auth_codes_id' }),
    };
  }
);

export const oauthClients = mysqlTable(
  'oauth_clients',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: bigint('user_id', { mode: 'number', unsigned: true }),
    name: varchar('name', { length: 191 }).notNull(),
    secret: varchar('secret', { length: 100 }),
    provider: varchar('provider', { length: 191 }),
    redirect: text('redirect').notNull(),
    personalAccessClient: tinyint('personal_access_client').notNull(),
    passwordClient: tinyint('password_client').notNull(),
    revoked: tinyint('revoked').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      oauthClientsId: primaryKey({ columns: [table.id], name: 'oauth_clients_id' }),
    };
  }
);

export const oauthPersonalAccessClients = mysqlTable(
  'oauth_personal_access_clients',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    clientId: bigint('client_id', { mode: 'number', unsigned: true }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      oauthPersonalAccessClientsId: primaryKey({ columns: [table.id], name: 'oauth_personal_access_clients_id' }),
    };
  }
);

export const oauthRefreshTokens = mysqlTable(
  'oauth_refresh_tokens',
  {
    id: varchar('id', { length: 100 }).notNull(),
    accessTokenId: varchar('access_token_id', { length: 100 }).notNull(),
    revoked: tinyint('revoked').notNull(),
    expiresAt: datetime('expires_at', { mode: 'string' }),
  },
  table => {
    return {
      oauthRefreshTokensId: primaryKey({ columns: [table.id], name: 'oauth_refresh_tokens_id' }),
    };
  }
);

export const orderDesignFiles = mysqlTable(
  'order_design_files',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id').notNull(),
    orderId: int('order_id').notNull(),
    designFile: varchar('design_file', { length: 191 }).notNull(),
    type: varchar('type', { length: 191 }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      orderDesignFilesId: primaryKey({ columns: [table.id], name: 'order_design_files_id' }),
    };
  }
);

export const orderDesignSizes = mysqlTable(
  'order_design_sizes',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id').notNull(),
    cartId: int('cart_id').notNull(),
    sizeId: int('size_id').notNull(),
    quantity: double('quantity').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      orderDesignSizesId: primaryKey({ columns: [table.id], name: 'order_design_sizes_id' }),
    };
  }
);

export const orderProducts = mysqlTable(
  'order_products',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    orderId: int('order_id').notNull(),
    productId: int('product_id'),
    productStockId: int('product_stock_id').notNull(),
    sizeId: int('size_id'),
    colorId: int('color_id'),
    quantity: int('quantity'),
    price: double('price'),
    tax: double('tax'),
    discount: double('discount'),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      orderProductsId: primaryKey({ columns: [table.id], name: 'order_products_id' }),
    };
  }
);

export const orderStatuses = mysqlTable(
  'order_statuses',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    orderId: int('order_id').notNull(),
    status: mysqlEnum('status', [
      'AWAITING_PAYMENT',
      'PAID',
      'PAYMENT_DECLINED',
      'PACKED',
      'SHIPPED',
      'DELIVERED',
      'CANCELED',
    ]).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      orderStatusesId: primaryKey({ columns: [table.id], name: 'order_statuses_id' }),
    };
  }
);

export const orders = mysqlTable(
  'orders',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id').notNull(),
    addressId: int('address_id').notNull(),
    paymentTypeId: int('payment_type_id'),
    vendorPaymentStatus: varchar('vendor_payment_status', { length: 191 }),
    paymentStatus: mysqlEnum('payment_status', ['paid', 'not-paid']).notNull(),
    code: varchar('code', { length: 191 }),
    grandTotal: double('grand_total', { precision: 8, scale: 2 }).notNull(),
    tax: double('tax', { precision: 8, scale: 2 }).notNull(),
    couponId: int('coupon_id'),
    couponDiscount: double('coupon_discount', { precision: 8, scale: 2 }),
    trackingCode: varchar('tracking_code', { length: 191 }),
    notes: varchar('notes', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      ordersId: primaryKey({ columns: [table.id], name: 'orders_id' }),
    };
  }
);

export const pages = mysqlTable(
  'pages',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    content: longtext('content'),
    isIndex: tinyint('is_index').default(0).notNull(),
    metaTitle: varchar('meta_title', { length: 191 }),
    metaTags: varchar('meta_tags', { length: 191 }),
    metaDescription: varchar('meta_description', { length: 191 }),
    metaImg: varchar('meta_img', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      pagesId: primaryKey({ columns: [table.id], name: 'pages_id' }),
    };
  }
);

export const passwordResets = mysqlTable('password_resets', {
  email: varchar('email', { length: 191 }).notNull(),
  token: varchar('token', { length: 191 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }),
});

export const paymentTypes = mysqlTable(
  'payment_types',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active']).notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      paymentTypesId: primaryKey({ columns: [table.id], name: 'payment_types_id' }),
    };
  }
);

export const permissionRole = mysqlTable('permission_role', {
  permissionId: int('permission_id').notNull(),
  roleId: int('role_id').notNull(),
});

export const permissions = mysqlTable(
  'permissions',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    addedBy: int('added_by').notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      permissionsId: primaryKey({ columns: [table.id], name: 'permissions_id' }),
    };
  }
);

export const personalAccessTokens = mysqlTable(
  'personal_access_tokens',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    tokenableType: varchar('tokenable_type', { length: 191 }).notNull(),
    tokenableId: bigint('tokenable_id', { mode: 'number', unsigned: true }).notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    token: varchar('token', { length: 64 }).notNull(),
    abilities: text('abilities'),
    lastUsedAt: timestamp('last_used_at', { mode: 'string' }),
    expiresAt: timestamp('expires_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      personalAccessTokensId: primaryKey({ columns: [table.id], name: 'personal_access_tokens_id' }),
      personalAccessTokensTokenUnique: unique('personal_access_tokens_token_unique').on(table.token),
    };
  }
);

export const postCategories = mysqlTable('post_categories', {
  postId: int('post_id').notNull(),
  categoryId: int('category_id').notNull(),
});

export const posts = mysqlTable(
  'posts',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    addedById: int('added_by_id').notNull(),
    postedById: int('posted_by_id'),
    status: mysqlEnum('status', ['active', 'not-active', 'draft']).notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    isFeatured: tinyint('is_featured').default(0).notNull(),
    thumbnail: varchar('thumbnail', { length: 191 }),
    thumbPrvdr: varchar('thumb_prvdr', { length: 191 }).default('self').notNull(),
    videoProvider: varchar('video_provider', { length: 191 }),
    videoLink: varchar('video_link', { length: 191 }),
    tags: text('tags'),
    description: longtext('description'),
    metaTitle: varchar('meta_title', { length: 191 }),
    metaTag: text('meta_tag'),
    metaDescription: text('meta_description'),
    metaImg: varchar('meta_img', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      postsId: primaryKey({ columns: [table.id], name: 'posts_id' }),
    };
  }
);

export const productCategories = mysqlTable('product_categories', {
  productId: int('product_id').notNull(),
  categoryId: int('category_id').notNull(),
});

export const productSpecTypes = mysqlTable(
  'product_spec_types',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    productId: int('product_id').notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      productSpecTypesId: primaryKey({ columns: [table.id], name: 'product_spec_types_id' }),
    };
  }
);

export const productSpecs = mysqlTable(
  'product_specs',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    productSpecTypeId: int('product_spec_type_id').notNull(),
    sizeId: int('size_id'),
    size: varchar('size', { length: 191 }).notNull(),
    value: varchar('value', { length: 191 }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      productSpecsId: primaryKey({ columns: [table.id], name: 'product_specs_id' }),
    };
  }
);

export const productStockImages = mysqlTable(
  'product_stock_images',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    productId: int('product_id'),
    productStockId: int('product_stock_id'),
    type: mysqlEnum('type', ['front', 'back', 'side', 'left-sleeve', 'right-sleeve']).notNull(),
    filePrvdr: varchar('file_prvdr', { length: 191 }),
    fileName: varchar('file_name', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      productStockImagesId: primaryKey({ columns: [table.id], name: 'product_stock_images_id' }),
    };
  }
);

export const productStocks = mysqlTable(
  'product_stocks',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    addedBy: int('added_by').notNull(),
    productId: int('product_id').notNull(),
    colorId: int('color_id'),
    sizeId: int('size_id'),
    sku: varchar('sku', { length: 191 }),
    price: double('price').notNull(),
    buyPrice: double('buy_price'),
    quantity: double('quantity').notNull(),
    gtin: varchar('gtin', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      productStocksId: primaryKey({ columns: [table.id], name: 'product_stocks_id' }),
    };
  }
);

export const products = mysqlTable(
  'products',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    addedById: int('added_by_id').notNull(),
    vendorId: int('vendor_id'),
    storeId: int('store_id'),
    companyId: int('company_id'),
    status: mysqlEnum('status', ['active', 'not-active', 'out-of-stock']).notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    styleCode: varchar('style_code', { length: 191 }),
    sku: varchar('sku', { length: 191 }),
    vendor: varchar('vendor', { length: 191 }),
    isFeatured: tinyint('is_featured').default(0).notNull(),
    isTopselling: tinyint('is_topselling').default(0),
    isNewarrival: tinyint('is_newarrival').default(0),
    isWholesale: tinyint('is_wholesale').default(0),
    isIndex: tinyint('is_index').default(0),
    thumbnail: varchar('thumbnail', { length: 191 }),
    thumbPrvdr: varchar('thumb_prvdr', { length: 191 }),
    videoProvider: varchar('video_provider', { length: 191 }),
    videoLink: varchar('video_link', { length: 191 }),
    tags: longtext('tags'),
    description: longtext('description'),
    unit: varchar('unit', { length: 191 }),
    unitPrice: double('unit_price'),
    purchasePrice: double('purchase_price'),
    sellPrice: double('sell_price'),
    tax: double('tax'),
    discount: double('discount'),
    barcode: varchar('barcode', { length: 191 }),
    metaTitle: varchar('meta_title', { length: 191 }),
    metaTag: text('meta_tag'),
    metaDescription: text('meta_description'),
    metaImg: varchar('meta_img', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      productsId: primaryKey({ columns: [table.id], name: 'products_id' }),
    };
  }
);

export const reviews = mysqlTable(
  'reviews',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    reviewType: mysqlEnum('review_type', ['WEBSITE', 'STORE', 'PRODUCT', 'USER', 'VENDOR']).notNull(),
    userId: int('user_id').notNull(),
    orderProductId: int('order_product_id'),
    productId: int('product_id'),
    storeId: int('store_id'),
    vendorId: int('vendor_id'),
    status: mysqlEnum('status', ['PENDING', 'APPROVED', 'NOT_APPROVED', 'REJECTED']).notNull(),
    approvedById: int('approved_by_id'),
    rating: double('rating', { precision: 11, scale: 2 }),
    review: longtext('review'),
    comment: text('comment'),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      reviewsId: primaryKey({ columns: [table.id], name: 'reviews_id' }),
    };
  }
);

export const roleUsers = mysqlTable('role_users', {
  roleId: int('role_id').notNull(),
  userId: int('user_id').notNull(),
});

export const roles = mysqlTable(
  'roles',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      rolesId: primaryKey({ columns: [table.id], name: 'roles_id' }),
    };
  }
);

export const session = mysqlTable(
  'session',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    sessionToken: varchar('sessionToken', { length: 191 }).notNull(),
    userId: varchar('userId', { length: 191 }).notNull(),
    expires: datetime('expires', { mode: 'string' }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      sessionId: primaryKey({ columns: [table.id], name: 'session_id' }),
    };
  }
);

export const settings = mysqlTable(
  'settings',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active']).notNull(),
    key: varchar('key', { length: 191 }).notNull(),
    value: text('value'),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      settingsId: primaryKey({ columns: [table.id], name: 'settings_id' }),
    };
  }
);

export const sizes = mysqlTable(
  'sizes',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    shortcode: varchar('shortcode', { length: 191 }),
    slug: varchar('slug', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      sizesId: primaryKey({ columns: [table.id], name: 'sizes_id' }),
    };
  }
);

export const states = mysqlTable(
  'states',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active']).notNull(),
    countryId: int('country_id').notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      statesId: primaryKey({ columns: [table.id], name: 'states_id' }),
    };
  }
);

export const storeCategories = mysqlTable(
  'store_categories',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    storeId: int('store_id').notNull(),
    categoryId: int('category_id').notNull(),
    image: varchar('image', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      storeCategoriesId: primaryKey({ columns: [table.id], name: 'store_categories_id' }),
    };
  }
);

export const stores = mysqlTable(
  'stores',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active', 'blocked']).notNull(),
    vendorId: int('vendor_id').notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    tagline: varchar('tagline', { length: 191 }),
    logo: varchar('logo', { length: 191 }),
    bannerImage: varchar('banner_image', { length: 191 }),
    bnrProvdr: varchar('bnr_provdr', { length: 191 }),
    backgroundBannerColor: varchar('background_banner_color', { length: 191 }),
    phone: varchar('phone', { length: 191 }),
    email: varchar('email', { length: 191 }),
    address: varchar('address', { length: 191 }),
    facebook: varchar('facebook', { length: 191 }),
    instagram: varchar('instagram', { length: 191 }),
    google: varchar('google', { length: 191 }),
    twitter: varchar('twitter', { length: 191 }),
    youtube: varchar('youtube', { length: 191 }),
    metaTitle: varchar('meta_title', { length: 191 }),
    metaTag: varchar('meta_tag', { length: 191 }),
    metaDescription: varchar('meta_description', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      storesId: primaryKey({ columns: [table.id], name: 'stores_id' }),
    };
  }
);

export const users = mysqlTable(
  'users',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum('status', ['active', 'not-active', 'blocked']).notNull(),
    name: varchar('name', { length: 191 }),
    email: varchar('email', { length: 191 }).notNull(),
    phone: varchar('phone', { length: 191 }),
    slug: varchar('slug', { length: 191 }),
    password: varchar('password', { length: 191 }).notNull(),
    referredBy: varchar('referred_by', { length: 191 }),
    image: varchar('image', { length: 191 }),
    emailVerifiedAt: timestamp('email_verified_at', { mode: 'string' }),
    rememberToken: varchar('remember_token', { length: 100 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      usersId: primaryKey({ columns: [table.id], name: 'users_id' }),
      usersEmailUnique: unique('users_email_unique').on(table.email),
    };
  }
);

export const vendors = mysqlTable(
  'vendors',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    userId: int('user_id').notNull(),
    status: mysqlEnum('status', ['active', 'not-active', 'blocked']).notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    slug: varchar('slug', { length: 191 }).notNull(),
    logo: varchar('logo', { length: 191 }),
    phone: varchar('phone', { length: 191 }),
    email: varchar('email', { length: 191 }),
    address: varchar('address', { length: 191 }),
    metaTitle: varchar('meta_title', { length: 191 }),
    metaTag: varchar('meta_tag', { length: 191 }),
    metaDescription: varchar('meta_description', { length: 191 }),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      vendorsId: primaryKey({ columns: [table.id], name: 'vendors_id' }),
    };
  }
);

export const verificationtoken = mysqlTable(
  'verificationtoken',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().notNull(),
    identifier: varchar('identifier', { length: 191 }).notNull(),
    token: varchar('token', { length: 191 }).notNull(),
    expires: datetime('expires', { mode: 'string' }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  table => {
    return {
      verificationtokenId: primaryKey({ columns: [table.id], name: 'verificationtoken_id' }),
    };
  }
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  children: many(categories, {
    relationName: 'category_children',
  }),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'category_children',
  }),
  storeCategories: many(storeCategories),
}));

export const storeCategoriesRelations = relations(storeCategories, ({ one }) => ({
  category: one(categories, {
    fields: [storeCategories.categoryId],
    references: [categories.id],
  }),
  store: one(stores, {
    fields: [storeCategories.storeId],
    references: [stores.id],
  }),
}));

export const storesRelations = relations(stores, ({ many }) => ({
  categories: many(storeCategories),
}));
