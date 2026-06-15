export const fetchLocationByPincode = async (pincode) => {
    if (pincode.length !== 6) return null;
    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        if (data && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            return {
                city: postOffice.Block || postOffice.District || postOffice.Region,
                district: postOffice.District,
                state: postOffice.State,
                country: postOffice.Country
            };
        }
    } catch (error) {
        console.error("Error fetching pincode data:", error);
    }
    return null;
};
