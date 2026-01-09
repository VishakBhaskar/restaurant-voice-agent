// Entry file for bundling Retell SDK for browser use
import { RetellWebClient } from 'retell-client-js-sdk';

// Expose to window for global access
window.RetellWebClient = RetellWebClient;

console.log('Retell SDK loaded and ready');
