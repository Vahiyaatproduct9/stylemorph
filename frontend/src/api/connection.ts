export default async function connection() {
    try {
        const res = await fetch('http://localhost:8000/');
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.error('Connection failed:', err);
        return false;
    }
}