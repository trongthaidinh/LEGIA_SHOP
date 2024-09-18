import httpRequest from '~/utils/httpRequest';

// Hàm lưu trữ dữ liệu vào sessionStorage với khóa và giá trị
const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

// Hàm lấy dữ liệu từ sessionStorage
const getFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

export const getConfiguration = async () => {
    const sessionKey = 'configurationDesktop'; // Khóa để lưu vào sessionStorage

    // Kiểm tra sessionStorage trước khi gọi API
    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    // Nếu không có trong sessionStorage thì gọi API
    try {
        const response = await httpRequest.get('/configuration');
        const configData = response.data.data[0];

        // Lưu kết quả vào sessionStorage
        saveToSessionStorage(sessionKey, configData);

        return configData;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const getConfigurationMobile = async () => {
    const sessionKey = 'configurationMobile'; // Khóa để lưu vào sessionStorage

    // Kiểm tra sessionStorage trước khi gọi API
    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    // Nếu không có trong sessionStorage thì gọi API
    try {
        const response = await httpRequest.get('/configuration');
        const configData = response.data.data[1];

        // Lưu kết quả vào sessionStorage
        saveToSessionStorage(sessionKey, configData);

        return configData;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const updateConfiguration = async (data) => {
    try {
        const response = await httpRequest.patch(`/configuration/${data.id}`, data);

        // Sau khi cập nhật, làm mới dữ liệu trong sessionStorage
        saveToSessionStorage('configurationDesktop', response.data.data); // Nếu cập nhật desktop config
        saveToSessionStorage('configurationMobile', response.data.data);  // Nếu cập nhật mobile config

        return response.data.data;
    } catch (error) {
        console.error('Error updating configuration', error);
        throw error;
    }
};
