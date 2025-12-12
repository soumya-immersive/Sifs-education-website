// app/fonts.ts
import localFont from 'next/font/local'

export const euclidCircularA = localFont({
  src: [
    // Light
    {
      path: '../public/fonts/EuclidCircularA-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/EuclidCircularA-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    
    // Regular
    {
      path: '../public/fonts/EuclidCircularA-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/EuclidCircularA-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    
    // Medium
    {
      path: '../public/fonts/EuclidCircularA-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/EuclidCircularA-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    
    // SemiBold (600)
    {
      path: '../public/fonts/EuclidCircularA-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/EuclidCircularA-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    
    // Bold
    {
      path: '../public/fonts/EuclidCircularA-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/EuclidCircularA-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-euclid',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
})