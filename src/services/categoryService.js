import httpRequest from '~/utils/httpRequest';

let categoryNamesCache = {};

export const getCategories = async () => {
    try {
        const response = await httpRequest.get('/category');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching categories', error);
        throw error;
    }
};

export const getCategoryName = async (id) => {
    if (categoryNamesCache[id]) {
        return categoryNamesCache[id];
    }

    try {
        const response = await httpRequest.get(`/category/${id}`);
        const categoryName = response.data.data.name;
        categoryNamesCache[id] = categoryName;
        return categoryName;
    } catch (error) {
        console.error(`Error fetching category name for ID ${id}`, error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await httpRequest.get(`/child-navs/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching category for ID ${id}`, error);
        throw error;
    }
};

export const getZhCategoryById = async (id) => {
    try {
        const response = await httpRequest.get(`/zh-child-navs/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching category for ID ${id}`, error);
        throw error;
    }
};

export const getCategoriesByType = async (value) => {
    try {
        const response = await httpRequest.get(`/category/type?value=${value}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching categories for type ${value}`, error);
        throw error;
    }
};

export const getCategoriesBySlug = async (slug) => {
    try {
        const response = await httpRequest.get(`/parent-navs/slug/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching categories for slug ${slug}`, error);
        throw error;
    }
};

export const getZhCategoriesBySlug = async (slug) => {
    try {
        const response = await httpRequest.get(`/zh-parent-navs/slug/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching categories for slug ${slug}`, error);
        throw error;
    }
};

export const addCategory = async (categoryData) => {
    try {
        const response = await httpRequest.post('/category', categoryData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
        throw error;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await httpRequest.patch(`/category/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật danh mục:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await httpRequest.delete(`/category/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting category for ID ${id}`, error);
        throw error;
    }
};
