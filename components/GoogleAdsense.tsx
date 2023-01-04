import Script from "next/script";
import React from "react";

const GoogleAdsense = () => {
    return (
        <>
            <Script
                id="Adsense-id"
                data-ad-client="ca-pub-1586372003132738"
                async
                strategy="afterInteractive"
                onError={ (e) => { console.error('Script failed to load', e) }}
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                crossOrigin="anonymous"
            />
        </>
    )
}

export default GoogleAdsense