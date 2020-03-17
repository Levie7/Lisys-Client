import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { Button } from 'src/shared/components/Button';

interface ActionButtonProps {
    action: 'create' | 'read' | 'update' | 'delete' | 'back' | 'list';
    buttonType: 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | 'danger';
    iconType?: string;
    section: string;
    title: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const ActionButton = React.memo<ActionButtonProps>(
    ({ action, buttonType, iconType, section, setSection, title }) => {
        function handleClick() {
            setSection({ action, section });
        }

        return (
            <Button onClick={handleClick} type={buttonType}>
                {iconType && Icon[iconType]} {title}
            </Button>
        );
    }
);
