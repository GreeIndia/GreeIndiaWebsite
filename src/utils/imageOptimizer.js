export const optimizeCloudinaryUrl = (url) => {
    if (!url || typeof url !== 'string') return url;

    if (url.includes('cloudinary.com')) {
        // If it already has transformations, don't modify
        if (url.includes('/upload/f_auto') || url.includes('/upload/q_auto')) {
            return url;
        }
        // Insert formatting and quality auto transformations
        return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }

    return url;
};