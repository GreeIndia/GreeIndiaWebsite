// Global API Configuration

// Change this URL when deploying to production
export const API_URL = import.meta.env.VITE_API_URL;

// export const API_URL = "https://mba-golf-think-affecting.trycloudflare.com/api";

// Wrapper around fetch
export const apiFetch = async (url, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const defaultHeaders = isFormData ? {} : { 'Content-Type': 'application/json' };

  const token = localStorage.getItem('gree_admin_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('gree_admin_token');
    window.location.href = '/admin/login';
  }

  return response;
};

// --- ONLINE FEEDBACK ---
export const submitOnlineFeedback = async (formData) => {
  return await apiFetch(`${API_URL}/online-feedbacks`, {
    method: 'POST',
    body: formData,
  });
};

export const getOnlineFeedbacks = async () => {
  return await apiFetch(`${API_URL}/online-feedbacks`);
};

export const updateOnlineFeedbackStatus = async (id, status) => {
  return await apiFetch(`${API_URL}/online-feedbacks/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

export const deleteOnlineFeedback = async (id) => {
  return await apiFetch(`${API_URL}/online-feedbacks/${id}`, {
    method: 'DELETE',
  });
};
