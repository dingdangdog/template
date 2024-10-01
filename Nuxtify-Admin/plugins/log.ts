export default defineNuxtPlugin({
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    "page:finish": async () => {
      // console.log("page:finish");

      // 获取当前访问的URL
      const url = window.location.href;
      // console.log("url", url);
      const regex = /^https?:\/\/[^\/]+(\/.*)?$/;
      const match = url.match(regex);
      const uri = match ? match[1] || "/" : "/";
      // console.log("uri", uri);
      if (uri.startsWith("/admin")) {
        return;
      }

      $fetch("https://ipapi.co/json/", {}).then((ipResponse) => {
        //   ipResponse:
        // {
        //     "ip": "198.12.95.225",
        //     "network": "198.12.88.0/21",
        //     "version": "IPv4",
        //     "city": "Buffalo",
        //     "region": "New York",
        //     "region_code": "NY",
        //     "country": "US",
        //     "country_name": "United States",
        //     "country_code": "US",
        //     "country_code_iso3": "USA",
        //     "country_capital": "Washington",
        //     "country_tld": ".us",
        //     "continent_code": "NA",
        //     "in_eu": false,
        //     "postal": "14205",
        //     "latitude": 42.8856,
        //     "longitude": -78.8736,
        //     "timezone": "America/New_York",
        //     "utc_offset": "-0400",
        //     "country_calling_code": "+1",
        //     "currency": "USD",
        //     "currency_name": "Dollar",
        //     "languages": "en-US,es-US,haw,fr",
        //     "country_area": 9629091.0,
        //     "country_population": 327167434,
        //     "asn": "AS36352",
        //     "org": "AS-COLOCROSSING"
        // }
        // console.log("ipResponse", ipResponse);
        // @ts-ignore
        const ip = ipResponse?.ip;
        window.localStorage.setItem("ip", ip);
        // console.log("ip", ip);

        // 获取用户设备
        const userAgent = navigator.userAgent;
        // console.log("userAgent", userAgent);

        $fetch("/viewerlog", {
          method: "POST",
          body: {
            ip: ip || "",
            uri,
            time: String(new Date().getTime()),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent,
          },
        });
      });
    },
  },
});
