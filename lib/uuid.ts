// https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js

export const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .split('')
    .map((c) => {
      if (c === 'x') return Math.floor(Math.random() * 16).toString(16)
      if (c === 'y') return (Math.floor(Math.random() * 4) + 8).toString(16)
      return c
    })
    .join('')
}
