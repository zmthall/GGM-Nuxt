export const useStaticData = () => {
  try {
    const navLinks = [
      {
        id: "home",
        name: "Home",
        slug: "/",
      },
      {
        id: "assisted-living",
        name: "Assisted Living",
        slug: "/assisted-living",
      },
      {
        id: "non-medical",
        name: "Non-Medical",
        slug: "/non-medical",
      },
      {
        id: "nemt",
        name: "NEMT",
        slug: "/nemt",
      },
      {
        id: "medical-supplies",
        name: "Medical Supplies",
        slug: "/medical-supplies",
      },
      {
        id: "company",
        name: "Company",
        slug: "/company/about-us",
        sublinks: [
          { id: "about-us", name: "About Us", slug: "/company/about-us" },
          { id: "location", name: "Find Us", slug: "/company/location" },
          { id: "policies", name: "Policies", slug: "/company/policies" },
          { id: "contact", name: "Contact Us", slug: "/company/contact-us" },
          { id: "join", name: "Join Our Team", slug: "/company/join-our-team" },
        ],
      },
      {
        id: "news",
        name: "News",
        slug: "/news",
        sublinks: [
          { id: "blog", name: "Blog", slug: "/news/blog" },
          { id: "community", name: "Community", slug: "/news/community" },
        ],
      },
      {
        id: "resources",
        name: "Resources",
        slug: "/resources",
        sublinks: [
          { id: "community-resources", name: "Community Resources", slug: "/resources/community-resources" },
          { id: "support-center", name: "Support Center", slug: "/resources/support-center" },
          { id: "faq", name: "FAQ", slug: "/resources/faq" },
          { id: "map", name: "Service Area Map", slug: "/resources/service-area-map" },
          { id: "forms", name: "Forms & Documents", slug: "/resources/forms-and-documents" },
          { id: "schedule", name: "Schedule a Ride", slug: "/resources/schedule-a-ride" },
        ],
      },
    ];
  
    const footerNavLinks = [
      { id: "footer-schedule-a-ride", name: "Schedule a Ride", slug: "/resources/schedule-a-ride", icon: "akar-icons:schedule" },
      { id: "footer-join-our-team", name: "Join Our Team", slug: "/company/join-our-team", icon: "fluent:people-team-add-20-filled" },
      { id: "footer-contact-us", name: "Contact Us", slug: "/company/contact-us", icon: "material-symbols:stacked-email"},
      { id: "footer-support-center", name: "Support Center", slug: "/resources/support-center", icon: "material-symbols:contact-support-rounded" },
      { id: "footer-assisted-living", name: "Assisted Living Information", slug: "/assisted-living", icon: "material-symbols:family-home" },
      { id: "footer-locations", name: "View Locations", slug: "/company/location", icon: "material-symbols:location-on" },
      { id: "footer-medical-supplies", name: "Shop Medical Supplies", url: "https://www.goldengatemedicalsupply.com", icon: "material-symbols:medical-information"},
    ];
  
    const footerPolicyLinks = [
      { id: "ride-cancellation-policy", name: "Ride Cancellation Policy", slug: "/company/policies/ride-cancellation"},
      { id: "terms-and-conditions", name: "Terms & Conditions", slug: "/company/policies/terms-and-conditions"},
      { id: "privacy-policy", name: "Privacy Policy", slug: "/company/policies/privacy"},
      { id: "accessibility-statement", name: "Accessibility", slug: "/company/policies/accessibility"},
      { id: "site-map", name: "Site Map", slug: "/sitemap.xml"},
      // { id: "", name: "", slug: ""}
    ];
  
    const socialHandles = [
      { id: "google-social", name: "Google", icon: "uim:google", url: "https://www.google.com/search?q=golden+gate+manor+inc" },
      { id: "facebook-social", name: "Facebook", icon: "bi:facebook", url: "https://www.facebook.com/GoldenGateTransportation" },
      { id: "twitter-social", name: "", icon: "line-md:twitter-x-alt", url: "https://x.com/GoldenGateManor" },
      { id: "linkedin-social", name: "", icon: "brandico:linkedin-rect", url: "https://www.linkedin.com/company/golden-gate-manor/"},
      { id: "instagram-social", name: "", icon: "simple-icons:instagram", url: "https://www.instagram.com/goldengatemanor/" },
      { id: "youtube-social", name: "", icon: "entypo-social:youtube", url: "https://www.youtube.com/@GoldenGateManor" },
    ];
  
    const contactServices = [
      { id: 'Non-Medical', name: "Non-Medical", number: "(719) 543-2525" },
      { id: 'NEMT', name: "NEMT", number: "(719) 544-3231" },
      { id: 'Assisted Living', name: "Assisted Living", number: "(719) 696-8032" },
      { id: 'Medical Supplies', name: "Medical Supplies", number: "(719) 569-7361" },
      { id: 'Gas & Goods 1', name: "Gas & Goods 1", number: "(719) 561-0062" },
      { id: 'Gas & Goods 2', name: "Gas & Goods 2", number: "(719) 253-9840" },
    ];
  
    const runtimeConfig = useRuntimeConfig();
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "Golden Gate Manor Inc.",
      "url": `${runtimeConfig.public.siteUrl}`,
      "logo": `${runtimeConfig.public.siteUrl}/images/logo.png`,
      "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
      "description": "Golden Gate Manor Inc. provides Non-Emergency Medical Transportation (NEMT), assisted living, and medical supply services across Southern Colorado.",
      "telephone": "(719) 696-8032",
      "email": "info@goldengatemanor.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "612 S. Union Ave.",
        "addressLocality": "Pueblo",
        "addressRegion": "CO",
        "postalCode": "81004",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.2701,
        "longitude": -104.6106
      },
      "openingHours": "Mo-Fr 08:00-16:00",
      "sameAs": [
        "https://www.facebook.com/GoldenGateTransportation",
        "https://www.facebook.com/GoldenGateMedicalSupply/",
        "https://www.linkedin.com/in/golden-gate-manor-inc/",
        "https://x.com/GoldenGateManor",
        "https://www.youtube.com/@GoldenGateMedicalSupplies",
        "https://www.youtube.com/@GoldenGateManor",
        "https://nextdoor.com/pages/golden-gate-manor-pueblo-co-1/",
        "https://www.alignable.com/pueblo-co/golden-gate-medical-supply?user=11514877",
        "https://www.goldengatemedicalsupply.com",
        "https://www.goldengatemedicalsupplies.com",
        "https://www.pueblocitycab.com"
  
      ],
      "department": [
        {
          "@type": "MedicalClinic",
          "name": "Non-Emergency Transportation",
          "url": `${runtimeConfig.public.siteUrl}/nemt`,
          "telephone": "(719) 544-3231",
          "priceRange": "Free with medicaid",
          "openingHours": "Mo-Su 00:00-23:59",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "648 S. Union Ave.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81004",
            "addressCountry": "US"
          },
        },
        {
          "@type": "MedicalClinic",
          "name": "Golden Gate Manor I",
          "url": `${runtimeConfig.public.siteUrl}/assisted-living#ggmi`,
          "telephone": "(719) 583-9132",
          "priceRange": "Free with medicaid",
          "openingHours": "Mo-Su 00:00-23:59",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "606 W. Abriendo Ave.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81004",
            "addressCountry": "US"
          },
        },
        {
          "@type": "MedicalClinic",
          "name": "Golden Gate Manor II",
          "url": `${runtimeConfig.public.siteUrl}/assisted-living#ggmii`,
          "telephone": "(719) 542-0201",
          "priceRange": "Free with medicaid",
          "openingHours": "Mo-Su 00:00-23:59",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1219 Lake Ave.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81004",
            "addressCountry": "US"
          },
        },
        {
          "@type": "MedicalClinic",
          "name": "Golden Valley",
          "url": `${runtimeConfig.public.siteUrl}/assisted-living#valley`,
          "telephone": "(719) 545-0152",
          "priceRange": "Free with medicaid",
          "openingHours": "Mo-Su 00:00-23:59",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1033 E. Evans Ave.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81004",
            "addressCountry": "US"
          },
        },
        {
          "@type": "MedicalClinic",
          "name": "Golden Horizon",
          "url": `${runtimeConfig.public.siteUrl}/assisted-living#horizon`,
          "telephone": "(719) 564-8110",
          "priceRange": "Free with medicaid",
          "openingHours": "Mo-Su 00:00-23:59",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2109 Chautard Dr.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81005",
            "addressCountry": "US"
          },
        },
        {
          "@type": "MedicalClinic",
          "name": "Golden View",
          "url": `${runtimeConfig.public.siteUrl}/assisted-living#view`,
          "telephone": "(719) 543-7320",
          "priceRange": "Free with medicaid",
          "openingHours": "Mo-Su 00:00-23:59",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "525 W. 9th St.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81003",
            "addressCountry": "US"
          },
        },
        {
          "@type": "MedicalClinic",
          "name": "Golden Gate Medical Supply - Medical Supply Store",
          "url": "https://www.goldengatemedicalsupplies.com",
          "telephone": "(719) 569-7361",
          "priceRange": "Free with specific insurances, HSA, FSA",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
          "openingHours": "Mo-Fr 08:00-16:00",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "612 S. Union Ave.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81004",
            "addressCountry": "US"
          },
          "sameAs": ["https://www.goldengatemanor.com/medical-supplies", "https://www.goldengatemedicalsupply.com"]
        },
        {
          "@type": "Organization",
          "name": "Pueblo City Cab - Non-medical Transportation",
          "url": `${runtimeConfig.public.siteUrl}/non-medical`,
          "telephone": "(719) 543-2525",
          "priceRange": "Varies by distance",
          "openingHours": "Mo-Su 00:00-23:59",
          "areaServed": {
            "@type": "Place",
            "name": "Pueblo, Colorado"
          },
          "provider": {
            "@type": "Organization",
            "name": "Golden Gate Manor Inc."
          },
          "serviceType": "DSS-approved Non-Medical Transportation including errands, shopping, and personal appointments. We also provide out of pocket trips that are charged based on distance.",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "648 S. Union Ave.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81004",
            "addressCountry": "US"
          },
          "sameAs": ["https://www.pueblocitycab.com"]
        },
        {
          "@type": "Organization",
          "name": "Golden Gate Gas & Goods I",
          "url": `${runtimeConfig.public.siteUrl}/gas-and-goods#g&gi`,
          "telephone": "(719) 561-0062",
          "priceRange": "Varies by item",
          "openingHours": "Mo-Su 04:00-02:00 gas: Mo-Su 00:00-23:59",
          "areaServed": {
            "@type": "Place",
            "name": "Pueblo, Colorado"
          },
          "provider": {
            "@type": "Organization",
            "name": "Golden Gate Manor Inc."
          },
          "serviceType": "Gas station and C-Store. We accept ebt and other payment options, just inquire.",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1242 S. Prairie Ave.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81005",
            "addressCountry": "US"
          }
        },
        {
          "@type": "Organization",
          "name": "Golden Gate Gas & Goods II",
          "url": `${runtimeConfig.public.siteUrl}/gas-and-goods#g&gii`,
          "telephone": "(719) 253-9840",
          "priceRange": "Varies by item",
          "openingHours": "Mo-Su 04:00-02:00 gas: Mo-Su 00:00-23:59",
          "areaServed": {
            "@type": "Place",
            "name": "Pueblo, Colorado"
          },
          "provider": {
            "@type": "Organization",
            "name": "Golden Gate Manor Inc."
          },
          "serviceType": "Gas station and C-Store. We accept ebt and other payment options, just inquire.",
          "image": `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1103 N. Elizabeth St.",
            "addressLocality": "Pueblo",
            "addressRegion": "CO",
            "postalCode": "81003",
            "addressCountry": "US"
          }
        }
      ]
    }
  
    return {
      navLinks,
      footerNavLinks,
      footerPolicyLinks,
      socialHandles,
      contactServices,
      orgSchema
    };
  } catch (err) {
    console.error('Composable error (StaticData):', err)
  }
};
