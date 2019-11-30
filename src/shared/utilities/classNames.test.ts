import { classNames } from './classNames';

describe('classNames', () => {
    describe('same group', () => {
        it('string', () => {
            expect(classNames('d-flex d-none d-block')).toBe('d-block');
        });
        it('combination', () => {
            expect(classNames({ 'd-flex': true }, 'd-block')).toBe('d-block');
        });
    });

    describe('different group', () => {
        it('string', () => {
            expect(classNames('d-flex fa-center')).toBe('d-flex fa-center');
        });
        it('combination', () => {
            expect(classNames({ 'd-flex fa-center': true }, 'd-block')).toBe('d-block fa-center');
        });
    });
});
