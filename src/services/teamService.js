import httpRequest from '~/utils/httpRequest';

// Helper functions for sessionStorage
const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

// Members
export const getMembers = async () => {
    const sessionKey = 'allMembers';

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get('/teams');
        const membersData = response.data.data;

        // Save to sessionStorage
        saveToSessionStorage(sessionKey, membersData);

        return membersData;
    } catch (error) {
        console.error('Error fetching members', error);
        throw error;
    }
};

export const getDepartmentMembers = async (departmentId) => {
    const sessionKey = `department_${departmentId}_members`;

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get(`/department/${departmentId}/members`);
        const departmentMembersData = response.data.data;

        // Save to sessionStorage
        saveToSessionStorage(sessionKey, departmentMembersData);

        return departmentMembersData;
    } catch (error) {
        console.error('Error fetching department members', error);
        throw error;
    }
};

export const addMember = async (memberData, departmentId) => {
    try {
        const response = await httpRequest.post(`/department/${departmentId}`, memberData);

        // Refresh sessionStorage for the department members list
        const updatedMembers = await getDepartmentMembers(departmentId);
        saveToSessionStorage(`department_${departmentId}_members`, updatedMembers);

        return response.data.data;
    } catch (error) {
        console.error('Error adding member', error);
        throw error;
    }
};

export const updateMember = async (memberId, departmentId, memberData) => {
    try {
        const response = await httpRequest.patch(`/department/${departmentId}/members/${memberId}`, memberData);

        // Refresh sessionStorage for the department members list
        const updatedMembers = await getDepartmentMembers(departmentId);
        saveToSessionStorage(`department_${departmentId}_members`, updatedMembers);

        return response.data;
    } catch (error) {
        console.error('Error updating member', error);
        throw error;
    }
};

export const getMemberById = async (memberId, departmentId) => {
    const sessionKey = `member_${memberId}_department_${departmentId}`;

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get(`/department/${departmentId}/members/${memberId}`);
        const memberData = response.data.data;

        // Save to sessionStorage
        saveToSessionStorage(sessionKey, memberData);

        return memberData;
    } catch (error) {
        console.error('Error fetching member detail', error);
        throw error;
    }
};

export const deleteMember = async (memberId, departmentId) => {
    try {
        await httpRequest.delete(`/department/${departmentId}/members/${memberId}`);

        // Remove the deleted member from sessionStorage
        sessionStorage.removeItem(`member_${memberId}_department_${departmentId}`);

        // Refresh sessionStorage for the department members list
        const updatedMembers = await getDepartmentMembers(departmentId);
        saveToSessionStorage(`department_${departmentId}_members`, updatedMembers);
    } catch (error) {
        console.error('Error deleting member', error);
        throw error;
    }
};

// Department
export const getDepartments = async () => {
    const sessionKey = 'allDepartments';

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get('/department');
        const departmentsData = response.data.data;

        // Save to sessionStorage
        saveToSessionStorage(sessionKey, departmentsData);

        return departmentsData;
    } catch (error) {
        console.error('Error fetching departments', error);
        throw error;
    }
};

export const addDepartment = async (departmentData) => {
    try {
        const response = await httpRequest.post('/department', departmentData);

        // Refresh sessionStorage for the departments list
        const updatedDepartments = await getDepartments();
        saveToSessionStorage('allDepartments', updatedDepartments);

        return response.data;
    } catch (error) {
        console.error('Error adding department', error);
        throw error;
    }
};

export const updateDepartment = async (departmentId, departmentData) => {
    try {
        const response = await httpRequest.put(`/department/${departmentId}`, departmentData);

        // Refresh sessionStorage for the departments list
        const updatedDepartments = await getDepartments();
        saveToSessionStorage('allDepartments', updatedDepartments);

        return response.data;
    } catch (error) {
        console.error('Error updating department', error);
        throw error;
    }
};

export const deleteDepartment = async (departmentId) => {
    try {
        await httpRequest.delete(`/department/${departmentId}`);

        // Remove the deleted department from sessionStorage
        sessionStorage.removeItem('allDepartments');
    } catch (error) {
        console.error('Error deleting department', error);
        throw error;
    }
};
