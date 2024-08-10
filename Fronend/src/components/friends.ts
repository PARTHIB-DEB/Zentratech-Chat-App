interface uobj {
    user: string;
    receivers: string[];
}

export default async function GetReceiverNames() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/register", { mode: 'cors' });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseArray: uobj = await response.json();
        return responseArray;
    } catch (error) {
        console.error("Error fetching receiver names:", error);
        return { user: "", receivers: [] }; // Fallback to prevent undefined issues
    }
}
