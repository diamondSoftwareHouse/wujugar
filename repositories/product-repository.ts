import { pool } from '@/lib/db';

export type WebsiteProduct = {
  id: string;
  item_code: string;
  name: string;
  description: string | null;
  quantity: number;
  selling_price: string;
  image: string | null;
  images: string[];
};

export type ProductFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  stock?: 'all' | 'in-stock' | 'out-of-stock';
  sort?: 'newest' | 'price-low' | 'price-high' | 'name';
};

export type ProductPageResult = {
  products: WebsiteProduct[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getProducts({
  page = 1,
  pageSize = 24,
  search = '',
  stock = 'all',
  sort = 'newest',
}: ProductFilters = {}): Promise<ProductPageResult> {
  const ownerId = process.env.WEBSITE_OWNER_ID;

  if (!ownerId) {
    throw new Error('WEBSITE_OWNER_ID is not configured');
  }

  page = Number.isSafeInteger(page) && page > 0 ? page : 1;

  pageSize = Number.isSafeInteger(pageSize)
    ? Math.min(Math.max(pageSize, 1), 48)
    : 24;

  const keyword = search.trim().slice(0, 100);

  const conditions = [
    'i.user_id = $1::uuid',
    'i.is_active = TRUE',
    'i.is_displayed_on_website = TRUE',
  ];

  const values: unknown[] = [ownerId];

  if (keyword) {
    values.push(`%${keyword}%`);
    const parameter = `$${values.length}`;

    conditions.push(`
      (
        i.name ILIKE ${parameter}
        OR i.item_code ILIKE ${parameter}
        OR i.description ILIKE ${parameter}
      )
    `);
  }

  if (stock === 'in-stock') {
    conditions.push('i.quantity > 0');
  } else if (stock === 'out-of-stock') {
    conditions.push('i.quantity <= 0');
  }

  const whereClause = conditions.join(' AND ');

  const sortMap = {
    newest: 'i.created_at DESC, i.id DESC',
    'price-low': 'i.selling_price ASC, i.id ASC',
    'price-high': 'i.selling_price DESC, i.id DESC',
    name: 'i.name ASC, i.id ASC',
  } as const;

  const orderBy = sortMap[sort] ?? sortMap.newest;

  try {
    const countResult = await pool.query<{ total: string }>(
      `
        SELECT COUNT(*)::text AS total
        FROM auth.items i
        WHERE ${whereClause}
      `,
      values,
    );

    const total = Number(countResult.rows[0]?.total ?? 0);

    if (total === 0) {
      return {
        products: [],
        total: 0,
        page: 1,
        pageSize,
        totalPages: 0,
      };
    }

    const totalPages = Math.ceil(total / pageSize);

    // Keep page within the valid range.
    page = Math.min(page, totalPages);

    const offset = (page - 1) * pageSize;
    const pageValues = [...values, pageSize, offset];

    const productsResult = await pool.query<WebsiteProduct>(
      `
        SELECT
          i.id,
          i.item_code,
          i.name,
          i.description,
          i.quantity,
          i.selling_price,
          i.image,
          CASE
            WHEN COUNT(ii.url) > 0 THEN
              array_agg(ii.url ORDER BY ii.id)
                FILTER (WHERE ii.url IS NOT NULL)
            WHEN NULLIF(i.image, '') IS NOT NULL THEN
              ARRAY[i.image]
            ELSE
              ARRAY[]::text[]
          END AS images
        FROM auth.items i
        LEFT JOIN auth.item_images ii
          ON ii.item_id = i.id
        WHERE ${whereClause}
        GROUP BY
          i.id,
          i.item_code,
          i.name,
          i.description,
          i.quantity,
          i.selling_price,
          i.image,
          i.created_at
        ORDER BY ${orderBy}
        LIMIT $${pageValues.length - 1}
        OFFSET $${pageValues.length}
      `,
      pageValues,
    );

    return {
      products: productsResult.rows,
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to fetch website products:', error);
    throw new Error('Unable to load products. Please try again later.');
  }
}
