import httpRequest from '~/utils/httpRequest';

// Get all products
export const getProducts = async () => {
    try {
        const response = await httpRequest.get('/products');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getZhProducts = async () => {
    try {
        const response = await httpRequest.get('/zh-products');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get products with pagination
export const getProductsPagination = async ($page = 1, $limit = 8) => {
    try {
        const response = await httpRequest.get(`/products?page=${$page}&limit=${$limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getZhProductsPagination = async ($page = 1, $limit = 8) => {
    try {
        const response = await httpRequest.get(`/zh-products?page=${$page}&limit=${$limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        const response = await httpRequest.get(`/products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching product detail with id ${id}:`, error);
        throw error;
    }
};

export const getZhProductById = async (id) => {
    try {
        const response = await httpRequest.get(`/zh-products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching product detail with id ${id}:`, error);
        throw error;
    }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await httpRequest.get(`/products?child_nav_id=${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products for child nav id=${categoryId}:`, error);
        throw error;
    }
};

export const getZhProductsByCategory = async (categoryId) => {
    try {
        const response = await httpRequest.get(`/zh-products?zh_child_nav_id=${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products for child nav id=${categoryId}:`, error);
        throw error;
    }
};

// Get products by slug
export const getProductListBySlug = async (slugCategory) => {
    try {
        const response = await httpRequest.get(`/products/by-category/${slugCategory}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products for child nav slug -> ${slugCategory}:`, error);
        throw error;
    }
};

// Get products by slug
export const getZhProductListBySlug = async (slugCategory) => {
    try {
        const response = await httpRequest.get(`/zh-products/by-category/${slugCategory}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products for child nav slug -> ${slugCategory}:`, error);
        throw error;
    }
};

// Get product by slug
export const getProductBySlug = async (slug) => {
    try {
        const response = await httpRequest.get(`/products/slug/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products with slug ${slug}:`, error);
        throw error;
    }
};

export const getZhProductBySlug = async (slug) => {
    try {
        const response = await httpRequest.get(`/zh-products/slug/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products with slug ${slug}:`, error);
        throw error;
    }
};

// Create a product
export const createProduct = async (productData) => {
    try {
        const response = await httpRequest.post('/products', productData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const createZhProduct = async (productData) => {
    try {
        const response = await httpRequest.post('/zh-products', productData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Update a product
export const updateProduct = async (id, productData) => {
    try {
        const response = await httpRequest.post(`/products/${id}`, productData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};

export const updateZhProduct = async (id, productData) => {
    try {
        const response = await httpRequest.post(`/zh-products/${id}`, productData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        const response = await httpRequest.delete(`/products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};

export const deleteZhProduct = async (id) => {
    try {
        const response = await httpRequest.delete(`/zh-products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};
