import httpRequest from '~/utils/httpRequest';

// Fetch all orders
export const getOrders = async () => {
    try {
        const response = await httpRequest.get('/orders');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

export const getZhOrders = async () => {
    try {
        const response = await httpRequest.get('/zh-orders');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

// Fetch a single order by id
export const getOrderByKey = async (key) => {
    try {
        const response = await httpRequest.get(`/orders/${key}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching order', error);
        throw error;
    }
};

export const getZhOrderByKey = async (key) => {
    try {
        const response = await httpRequest.get(`/zh-orders/${key}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching order', error);
        throw error;
    }
};

// Create a new order
export const createOrder = async (data) => {
    try {
        const response = await httpRequest.post('/orders', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating order', error);
        throw error;
    }
};

export const createZhOrder = async (data) => {
    try {
        const response = await httpRequest.post('/zh-orders', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating order', error);
        throw error;
    }
};

// Update an existing order
export const updateOrder = async (data, id) => {
    try {
        const response = await httpRequest.post(`/orders/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating order', error);
        throw error;
    }
};

export const updateZhOrder = async (data, id) => {
    try {
        const response = await httpRequest.post(`/zh-orders/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating order', error);
        throw error;
    }
};

export const updateStatus = async (id, data) => {
    try {
        const response = await httpRequest.post(`/orders/${id}/status`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating order', error);
        throw error;
    }
};

export const updateZhStatus = async (id, data) => {
    try {
        const response = await httpRequest.post(`/zh-orders/${id}/status`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating order', error);
        throw error;
    }
};

// Delete an order
export const deleteOrder = async (id) => {
    try {
        const response = await httpRequest.delete(`/orders/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting order', error);
        throw error;
    }
};

export const deleteZhOrder = async (id) => {
    try {
        const response = await httpRequest.delete(`/zh-orders/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting order', error);
        throw error;
    }
};
