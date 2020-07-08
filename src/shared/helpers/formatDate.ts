import moment, { Moment } from 'moment';

export function convertMilisecondsToDate(miliseconds: string) {
    return moment(miliseconds, 'x').format('DD-MM-YYYY');
}

export function formatDate(date: Moment) {
    return moment(date).format('DD-MM-YYYY');
}

export function formatDefaultDate(date: string) {
    return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
}

export function formatMoment(date: string) {
    return moment(date, 'DD-MM-YYYY');
}

export function formatPresentDate(date: string) {
    return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
}
