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

export function formatDefaultNextDate(date: string) {
    return moment(date, 'DD-MM-YYYY')
        .add('days', 1)
        .format('YYYY-MM-DD');
}

export function formatDefaultMoment(date: string) {
    return moment(date, 'YYYY-MM-DD');
}

export function formatDefaultPreviousMoment(date: string) {
    return moment(date, 'YYYY-MM-DD').subtract('days', 1);
}

export function formatFullDateTime(date: Moment) {
    return moment(date).format('DD MMM YYYY HH:mm:ss');
}

export function formatMoment(date: string) {
    return moment(date, 'DD-MM-YYYY');
}

export function formatPresentDate(date: string) {
    return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
}
