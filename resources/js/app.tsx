import '../css/app.css';
import './bootstrap';

import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {createRoot, Root} from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

/**
 * Init Application
 */
(async () => {
    await createInertiaApp({
        title: (title: string): string => {
            return `${title} - ${appName}`;
        },
        resolve(name: string): Promise<unknown> {
            return resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx'));
        },
        setup({el, App, props}): void {
            const root: Root = createRoot(el);

            root.render(<App {...props} />);
        },
        progress: {
            color: '#37e314',
        },
    });
})();
