/**
 * Privacy-First Monitoring for danielle.world
 * Tracks errors and basic performance without collecting personal data
 */

(function() {
    'use strict';
    
    // Only run in production (when served from danielle.world)
    if (!window.location.hostname.includes('danielle.world')) {
        return;
    }

    // Privacy-respecting error tracking
    window.addEventListener('error', function(event) {
        // Create anonymized error report
        const errorData = {
            message: event.message,
            filename: event.filename ? event.filename.replace(window.location.origin, '') : 'unknown',
            line: event.lineno,
            column: event.colno,
            userAgent: navigator.userAgent.substring(0, 100), // Truncated for privacy
            url: window.location.pathname, // Path only, no query params
            timestamp: new Date().toISOString(),
            // No IP, no user ID, no tracking cookies
        };

        // Send to Netlify Analytics or console in development
        if (typeof netlify !== 'undefined' && netlify.analytics) {
            netlify.analytics.track('javascript_error', errorData);
        } else {
            console.warn('Privacy Monitor - JS Error:', errorData);
        }
    });

    // Track calculator usage (anonymized)
    function trackToolUsage(toolName, action) {
        const usageData = {
            tool: toolName,
            action: action,
            path: window.location.pathname,
            timestamp: new Date().toISOString()
            // No user identification
        };

        if (typeof netlify !== 'undefined' && netlify.analytics) {
            netlify.analytics.track('tool_usage', usageData);
        }
    }

    // Monitor Public Domain Calculator usage
    if (window.location.pathname.includes('public-domain-calculator')) {
        // Track when calculator is used (not the inputs/results)
        const calculateButton = document.querySelector('button[onclick*="calculate"]');
        if (calculateButton) {
            calculateButton.addEventListener('click', function() {
                trackToolUsage('public-domain-calculator', 'calculation_started');
            });
        }

        // Track help section usage
        const helpButtons = document.querySelectorAll('[data-help], .help-button');
        helpButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackToolUsage('public-domain-calculator', 'help_accessed');
            });
        });
    }

    // Monitor Licensing Decision Tree usage
    if (window.location.pathname.includes('licensing-decision-tree')) {
        // Track decision tree progression (not choices)
        window.trackLicenseRecommendation = function(license) {
            trackToolUsage('licensing-decision-tree', 'recommendation_shown');
        };
    }

    // Basic performance monitoring (anonymized)
    window.addEventListener('load', function() {
        // Simple load time tracking
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        if (loadTime > 0 && loadTime < 30000) { // Reasonable bounds
            const perfData = {
                loadTime: Math.round(loadTime),
                path: window.location.pathname,
                // No user identification
            };

            if (typeof netlify !== 'undefined' && netlify.analytics) {
                netlify.analytics.track('page_performance', perfData);
            }
        }
    });

    // Console message for transparency
    console.log('🔒 Privacy-First Monitoring Active\n' +
                '• No personal data collected\n' +
                '• No cookies or tracking\n' +
                '• Anonymized error reports only\n' +
                '• View privacy policy at /legal/privacy');

})();