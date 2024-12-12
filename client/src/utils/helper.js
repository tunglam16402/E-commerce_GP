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
export const formatMoney = (number) => Number(number.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number) => {
    //1=fill star 2=outline star
    //4 => [1,1,1,1,0]
    //2 => [1,1,0,0,0]
    if (!Number(number)) return;
    const stars = [];
    for (let i = 0; i < +number; i++) {
        stars.push(<AiFillStar color="orange"></AiFillStar>);
    }
    for (let i = 5; i > +number; i--) {
        stars.push(<AiOutlineStar color="orange"></AiOutlineStar>);
    }
    return stars;
};
