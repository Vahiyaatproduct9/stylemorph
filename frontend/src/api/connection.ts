export default async function connection() {
    try {
        const res = await fetch('https://stylemorph.railway.internal');
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}