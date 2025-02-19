interface CookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export const cookieManager = {

  getCookie: (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      const lastPart = parts.pop()
      if (lastPart) {
        return lastPart.split(';')[0]
      }
    }
    return null
  },

  setCookie: (name: string, value: string, options: CookieOptions) => {
    const { expires, path, domain, secure } = options
    const cookieString = `${name}=${value}; ${expires ? `expires=${expires.toUTCString()}` : ''}; ${path ? `path=${path}` : ''}; ${domain ? `domain=${domain}` : ''}; ${secure ? 'secure' : ''};`
    document.cookie = cookieString
  },

  removeCookie: (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  },

}
