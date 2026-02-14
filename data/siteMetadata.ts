const siteMetadata = {
    title: 'Trigger - 일상의 변화를 만드는 방아쇠',
    author: 'Kim Nam-tae',
    headerTitle: 'TRIGGER.KR',
    description: '12년차 백엔드 개발자 김남태의 기술 블로그. 비즈니스 가치를 창출하는 개발 이야기.',
    language: 'ko-KR',
    theme: 'system', // system, dark or light
    siteUrl: 'https://trigger.kr',
    siteRepo: 'https://github.com/skymanla/trigger-blog',
    siteLogo: '/static/images/logo.png',
    image: '/static/images/avatar.png',
    socialBanner: '/static/images/twitter-card.png',
    email: 'skymanla@naver.com',
    github: 'https://github.com/skymanla',
    twitter: 'https://twitter.com/Twitter',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://www.linkedin.com',
    locale: 'ko-KR',
    analytics: {
      plausibleDataDomain: '',
      simpleAnalytics: false,
      umamiWebsiteId: '',
      googleAnalyticsId: '',
      posthogAnalyticsId: '',
    },
    newsletter: {
      provider: 'buttondown',
    },
    comment: {
      provider: 'giscus',
      giscusConfig: {
        repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
        repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
        category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
        categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
        mapping: 'pathname',
        reactions: '1',
        metadata: '0',
        theme: 'light',
        inputPosition: 'bottom',
        lang: 'en',
        darkTheme: 'transparent_dark',
        themeURL: '',
      },
      utterancesConfig: {
        repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
        issueTerm: '',
        label: '',
        theme: '',
        darkTheme: '',
      },
      disqusConfig: {
        shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
      },
    },
  }

  export default siteMetadata
