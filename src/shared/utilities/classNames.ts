interface ClassesObject {
    [x: string]: boolean;
}

declare type className = string | ClassesObject | string[] | undefined;

export function classNames(...names: className[]) {
    let classes: string[] = [];
    names.forEach((name) => {
        let classParts: string[] = [];
        if (Array.isArray(name)) {
            classParts = name;
        } else if (typeof name === 'object') {
            classParts = Object.keys(name).filter((key) => name[key]);
        } else if (name) {
            classParts.push(name);
        }

        classParts.forEach((x) => {
            classes = classes.concat(x.split(' '));
        });
    });

    let groups: any = {};
    classes.forEach((cls) => {
        if (!cls) {
            return;
        }
        let [group] = cls.split('-');
        groups[group] = cls;
    });
    return Object.keys(groups)
        .map((key) => groups[key])
        .join(' ');
}
