# Cookie consent banner for Neos CMS and Neos Flow

A Neos CMS/Neos Flow package that provides a cookie consent banner for Neos CMS and Neos Flow.

## Installation

Just run:

```
composer require neosrulez/neos-cookieconsent
```

## Configuration

### Neos Fusion

#### Override the fusion configuration
```neosfusion
prototype(NeosRulez.Neos.CookieConsent:Component.DialogContent) {
    header = 'Cookies and external content'
    text = 'We use cookies on our website. Some of them are essential, while others help us to improve this website and your experience. External content is e.g. that of Google Maps, YouTube or Vimeo and these can improve the user experience.'
    additionalHeader = 'Cookies'
    settings = Neos.Fusion:DataStructure {
        bannerDelayTime = '1000'
        showDeclineButton = true
    }
    buttons = Neos.Fusion:DataStructure {
        settings = Neos.Fusion:DataStructure {
            label = 'Settings'
            additionalLabelText = 'Save Settings'
        }
        confirm = Neos.Fusion:DataStructure {
            label = 'Accept all cookies incl. US partners'
        }
        decline = Neos.Fusion:DataStructure {
            label = 'Reject all'
        }
    }
    links = Neos.Fusion:DataStructure {
        legalnotice = Neos.Fusion:DataStructure {
            label = 'Legal notice'
            href = '/legal-notice'
        }
        dataprivacy = Neos.Fusion:DataStructure {
            label = 'Data privacy'
            href = '/data-privacy'
        }
    }
    groups = Neos.Fusion:DataStructure {
        essential = Neos.Fusion:DataStructure {
            name = 'Essential'
            cookies = Neos.Fusion:DataStructure {
                # required!
                __cookie_consent = Neos.Fusion:DataStructure {
                    description = 'This cookie must be set in order to call up your cookie settings and to either prohibit or allow cookies.'
                    lifetime = '6 months'
                }
                # required!
            }
        }
    }
}
```

#### Override or extend the React package
```yaml
NeosRulez:
  Neos:
    CookieConsent:
      bundle:
        styles:
          - 'resource://NeosRulez.Neos.CookieConsent/Public/bundle/static/css/main.adc0658e.css'
        scripts:
          - 'resource://NeosRulez.Neos.CookieConsent/Public/bundle/static/js/main.ca2a187c.js'
```

## Author

* E-Mail: mail@patriceckhart.com
* URL: http://www.patriceckhart.com 
