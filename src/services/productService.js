import httpRequest from '~/utils/httpRequest';

export const getProducts = async () => {
    try {
        const response = await httpRequest.get('/products');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductsPagination = async ($page = 1, $limit = 8) => {
    try {
        const response = await httpRequest.get(`/products?page=${$page}&limit=${$limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await httpRequest.get(`/products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching product detail with id ${id}:`, error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await httpRequest.get(`/products?child_nav_id=${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products for child nav id=${categoryId}:`, error);
        throw error;
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const response = await httpRequest.get(`/products/slug/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products with slug ${slug}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await httpRequest.post('/products', productData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await httpRequest.patch(`/products/${id}`, productData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await httpRequest.delete(`/products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};
