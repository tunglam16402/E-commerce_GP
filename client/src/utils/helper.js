import icons from './icons';

const { AiFillStar, AiOutlineStar } = icons;
export const createSlug = (string) => {
    //chuyển chuỗi viết hoa + tiếng việt về chuỗi thường ko dấu sao đó chuyển dấu cách thành dấu gạch nối
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-');
};
// export const formatMoney = (number) => Number(number.toFixed(1)).toLocaleString();
export const formatMoney = (number) => {
    if (number === undefined || number === null || isNaN(number)) {
        return '0.0';
    }
    return Number(number.toFixed(1)).toLocaleString();
};

export const renderStarFromNumber = (number, size) => {
    //1=fill star 2=outline star
    //4 => [1,1,1,1,0]
    //2 => [1,1,0,0,0]
    if (!Number(number)) return;
    const stars = [];
    for (let i = 0; i < +number; i++) {
        stars.push(<AiFillStar color="orange" size={size || 16}></AiFillStar>);
    }
    for (let i = 5; i > +number; i--) {
        stars.push(<AiOutlineStar color="orange" size={size || 16}></AiOutlineStar>);
    }
    return stars;
};

export const secondsToHms = (d) => {
    d = Number(d) / 1000;
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return { h, m, s };
};
