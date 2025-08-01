// function base64ToFile(base64: string, filename: string) {
//     const arr = base64.split(",");
//     const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
//     const bstr = atob(arr[1] || '');
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);

//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }

//     return new File([u8arr], filename, { type: mime });
// }
export default async function send(image: File | null, object: string) {
    if (!image) {
        console.error('No image provided');
        return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('object', object);

    const res = await fetch('https://stylemorph-production.up.railway.app', {
        method: 'POST',
        body: formData
    });

    let data = await res.blob();
    return data;
}