import 'https://unpkg.com/swup@2.0.14/dist/swup.min.js';
import 'https://unpkg.com/@swup/progress-plugin@1.0.1/dist/SwupProgressPlugin.min.js';
import 'https://unpkg.com/@swup/forms-plugin@1.1.1/dist/SwupFormsPlugin.min.js';

// swup init
const swup = new Swup({
    cache: false,
    plugins: [
        new SwupProgressPlugin({
            className: 'swup-progress-bar',
            transition: 500,
            delay: 0
        }),
        new SwupFormsPlugin()
    ]
});

export { swup };