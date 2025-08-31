import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  setPageTitle(title: string): void {
    this.title.setTitle(`${title} | 台北市警察局人事查詢系統`);
  }

  setMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonical?: string;
  }): void {
    if (config.title) {
      this.setPageTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.ogTitle) {
      this.meta.updateTag({ property: 'og:title', content: config.ogTitle });
    }

    if (config.ogDescription) {
      this.meta.updateTag({ property: 'og:description', content: config.ogDescription });
    }

    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }

    if (config.canonical) {
      // 移除現有的canonical link
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }

      // 添加新的canonical link
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = config.canonical;
      document.head.appendChild(link);
    }

    // 設定基本的OpenGraph標籤
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'zh_TW' });
  }

  setStructuredData(data: any): void {
    // 移除現有的結構化資料
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // 添加新的結構化資料
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  setPoliceOfficerStructuredData(officer: any): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': officer.name,
      'jobTitle': officer.position,
      'worksFor': {
        '@type': 'GovernmentOrganization',
        'name': officer.unit,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': '台北市',
          'addressCountry': '台灣'
        }
      },
      'alumniOf': officer.education?.map((edu: string) => ({
        '@type': 'EducationalOrganization',
        'name': edu
      }))
    };

    this.setStructuredData(structuredData);
  }

  setOrganizationStructuredData(): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'GovernmentOrganization',
      'name': '台北市政府警察局',
      'url': 'https://police.gov.taipei',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '台北市中正區延平南路96號',
        'addressLocality': '台北市',
        'addressRegion': '中正區',
        'postalCode': '100',
        'addressCountry': '台灣'
      },
      'sameAs': [
        'https://www.facebook.com/TaipeiPolice',
        'https://police.gov.taipei'
      ]
    };

    this.setStructuredData(structuredData);
  }
}
