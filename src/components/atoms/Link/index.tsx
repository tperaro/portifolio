/**
 * Link Component
 * Feature: 001-adicionar-animações-interativas
 * Task: T030 - Apply smooth scroll to navigation links
 * 
 * Enhanced Next.js Link wrapper with smooth scroll support for anchor links.
 * Handles three types of links:
 * - Internal routes: Pass to Next.js Link for client-side navigation
 * - Anchor links: Apply smooth scroll behavior with offset for fixed headers
 * - External links: Use standard <a> tag
 */

import * as React from 'react';
import NextLink from 'next/link';
import { handleAnchorClick } from '../../../utils/smooth-scroll';

// Files served straight out of public/ (a PDF deck, an image, a download). These
// live outside the i18n routing table, so NextLink would locale-prefix them into
// a 404 — e.g. /palestras/deck.pdf becoming /pt/palestras/deck.pdf.
const STATIC_FILE = /\.[a-z0-9]{2,5}(?:[?#].*)?$/i;

export default function Link({ children, href, ...other }) {
    // Check if it's an anchor link (starts with #)
    const isAnchor = href?.startsWith('#');

    // Pass Any internal link to Next.js Link, for anything else, use <a> tag
    const internal = /^\/(?!\/)/.test(href) && !STATIC_FILE.test(href);

    if (internal) {
        return (
            <NextLink href={href} {...other}>
                {children}
            </NextLink>
        );
    }
    
    // Handle anchor links with smooth scroll
    if (isAnchor) {
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            // Apply smooth scroll with offset for fixed header (80px)
            handleAnchorClick(e, { offset: -80, duration: 800 });
            
            // Call any existing onClick handler
            if (other.onClick) {
                other.onClick(e);
            }
        };
        
        return (
            <a href={href} {...other} onClick={handleClick}>
                {children}
            </a>
        );
    }

    return (
        <a href={href} {...other}>
            {children}
        </a>
    );
}
