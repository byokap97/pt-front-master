import dayjs from 'dayjs';

export const formatDate = (date: string) => {
    return dayjs(date, 'MMM D, YYYY').format('DD/MM/YYYY');
};
