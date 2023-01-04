import Script from "next/script";
import React from "react";

const GoogleAdsense = () => {
    return (
        <>
            {process.env.APP_ENV === "production" ?
                <Script
                    id="Adsense-id"
                    data-ad-client="ca-pub-1586372003132738"
                    async
                    strategy="afterInteractive"
                    onError={ (e) => { console.error('Script failed to load', e) }}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                    crossOrigin="anonymous"
                />
                : <script>console.log(12345)</script>
            }
        </>
    )
}

export default GoogleAdsense