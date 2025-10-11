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

export default function Link({ children, href, ...other }) {
    // Check if it's an anchor link (starts with #)
    const isAnchor = href?.startsWith('#');
    
    // Pass Any internal link to Next.js Link, for anything else, use <a> tag
    const internal = /^\/(?!\/)/.test(href);
    
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
