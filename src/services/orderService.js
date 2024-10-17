import httpRequest from '~/utils/httpRequest';

const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

// Fetch all orders
export const getOrders = async () => {
    const sessionKey = 'orders';

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get('/orders');
        const orderData = response.data.data;

        saveToSessionStorage(sessionKey, orderData);

        return orderData;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

// Fetch a single order by id
export const getOrderByKey = async (key) => {
    const sessionKey = `${key}`;

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get(`/orders/${key}`);
        const orderData = response.data.data;

        saveToSessionStorage(sessionKey, orderData);

        return orderData;
    } catch (error) {
        console.error('Error fetching order', error);
        throw error;
    }
};

// Create a new order
export const createOrder = async (data) => {
    try {
        const response = await httpRequest.post('/orders', data);

        // Clear cached orders after creation
        sessionStorage.removeItem('orders');

        // const updatedOrders = await getOrders();
        // saveToSessionStorage('orders', updatedOrders);

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

        // Clear cached orders and specific order after update
        sessionStorage.removeItem('orders');
        sessionStorage.removeItem(`order_${id}`);

        const updatedOrders = await getOrders();
        saveToSessionStorage('orders', updatedOrders);

        return response.data.data;
    } catch (error) {
        console.error('Error updating order', error);
        throw error;
    }
};

export const updateStatus = async (id, data) => {
    try {
        const response = await httpRequest.post(`/orders/${id}/status`, data);

        // Clear cached orders and specific order after update
        sessionStorage.removeItem('orders');

        const updatedOrders = await getOrders();
        saveToSessionStorage('orders', updatedOrders);

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

        // Clear cached orders and specific order after deletion
        sessionStorage.removeItem('orders');
        sessionStorage.removeItem(`order_${id}`);

        const updatedOrders = await getOrders();
        saveToSessionStorage('orders', updatedOrders);

        return response.data.data;
    } catch (error) {
        console.error('Error deleting order', error);
        throw error;
    }
};
