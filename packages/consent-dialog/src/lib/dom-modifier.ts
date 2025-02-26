import { CookieGroup } from './interfaces';

const getAffectedDomElements = () => {
  const groupElements1 = document.querySelectorAll('[data-cookie-group]');
  const groupElements2 = document.querySelectorAll('[data-cookie]');
  return Array.from(groupElements1).concat(Array.from(groupElements2));
}

export const domModifier = (cookieGroups: CookieGroup[]) => {
  const elements = getAffectedDomElements();
  elements.forEach(element => {
    const cookieGroup = cookieGroups.find(group =>
      group.value === element.getAttribute('data-cookie-group') ||
      group.value === element.getAttribute('data-cookie') ||
      group.value === 'all'
    );

    if (cookieGroup) {
      if (element.tagName.toLowerCase() === 'script' && element.getAttribute('type') === 'text/plain') {
        const newScript = document.createElement('script');
        Array.from(element.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.setAttribute('type', 'text/javascript');
        newScript.textContent = element.textContent;
        element.parentNode?.replaceChild(newScript, element);
      }
      if (element.tagName.toLowerCase() === 'iframe') {
        element.setAttribute('src', element.getAttribute('cookie-src') || '');
      }
    }
  });
}
