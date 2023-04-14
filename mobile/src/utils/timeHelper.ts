export const convertTimePost = (date: Date) => {
  if ((Date.now() - date.getTime()) / 1000 < 60) {
    return 'Vừa xong';
  } else if ((Date.now() - date.getTime()) / 1000 / 60 < 60) {
    return `${Math.floor((Date.now() - date.getTime()) / 1000 / 60)} phút`;
  } else if ((Date.now() - date.getTime()) / 1000 / 60 / 60 < 60) {
    return `${Math.floor((Date.now() - date.getTime()) / 1000 / 60 / 60)} giờ`;
  } else if ((Date.now() - date.getTime()) / 1000 / 60 / 60 / 24 < 10) {
    return `${Math.floor(
      (Date.now() - date.getTime()) / 1000 / 60 / 60 / 24,
    )} ngày`;
  } else {
    return `${date.getDate()}th${date.getMonth() + 1} ${date.getFullYear()}`;
  }
};
