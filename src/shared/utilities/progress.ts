import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

export function Progress(start: boolean) {
    nprogress.configure({ showSpinner: false });

    if (start) {
        return nprogress.start();
    } else {
        return nprogress.done();
    }
}
