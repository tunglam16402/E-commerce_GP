export const createSlug = (string) => {
    //chuyển chuỗi viết hoa + tiếng việt về chuỗi thường ko dấu sao đó chuyển dấu cách thành dấu gạch nối
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-');
};
