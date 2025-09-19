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
        id: "gas-and-goods",
        name: "Gas",
        slug: "/gas-and-goods",
      },
      {
        id: "news",
        name: "News",
        slug: "/news",
        sublinks: [
          { id: "community", name: "Community", slug: "/news/community" },
          { id: "blog", name: "Blog", slug: "/news/blog" },
        ],
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
          { id: "join", name: "Join Our Team", slug: "/company/employment" },
        ],
      },
      {
        id: "resources",
        name: "Resources",
        slug: "/resources",
        sublinks: [
          // { id: "community-resources", name: "Community Resources", slug: "/resources/community-resources" },
          { id: "faq", name: "FAQ", slug: "/resources/faq" },
          {
            id: "map",
            name: "Service Area Map",
            slug: "/resources/service-area-map",
          },
          {
            id: "forms",
            name: "Forms & Documents",
            slug: "/resources/forms-and-documents",
          },
          {
            id: "schedule",
            name: "Schedule a Ride",
            slug: "/resources/schedule-a-ride",
          },
        ],
      },
    ];

    const footerNavLinks = [
      {
        id: "footer-schedule-a-ride",
        name: "Schedule a Ride",
        slug: "/resources/schedule-a-ride",
        icon: "akar-icons:schedule",
      },
      {
        id: "footer-join-our-team",
        name: "Join Our Team",
        slug: "/company/employment",
        icon: "fluent:people-team-add-20-filled",
      },
      {
        id: "footer-contact-us",
        name: "Contact Us",
        slug: "/company/contact-us",
        icon: "material-symbols:stacked-email",
      },
      {
        id: "footer-assisted-living",
        name: "Assisted Living Information",
        slug: "/assisted-living",
        icon: "material-symbols:family-home",
      },
      {
        id: "footer-locations",
        name: "View Locations",
        slug: "/company/location",
        icon: "material-symbols:location-on",
      },
      {
        id: "footer-medical-supplies",
        name: "Shop Medical Supplies",
        url: "https://www.goldengatemedicalsupply.com",
        icon: "material-symbols:medical-information",
      },
    ];

    const footerPolicyLinks = [
      {
        id: "ride-cancellation-policy",
        name: "Ride Cancellation Policy",
        slug: "/company/policies/ride-cancellation",
      },
      {
        id: "terms-and-conditions",
        name: "Terms & Conditions",
        slug: "/company/policies/terms-and-conditions",
      },
      {
        id: "privacy-policy",
        name: "Privacy Policy",
        slug: "/company/policies/privacy",
      },
      {
        id: "accessibility-statement",
        name: "Accessibility",
        slug: "/company/policies/accessibility",
      },
      { id: "site-map", name: "Site Map", slug: "/sitemap.xml" },
      // { id: "", name: "", slug: ""}
    ];

    const socialHandles = [
      {
        id: "google-social",
        name: "Google",
        icon: "uim:google",
        url: "https://www.google.com/search?q=golden+gate+manor+inc",
        alt: "Look us up on Google",
      },
      {
        id: "facebook-social",
        name: "Facebook",
        icon: "bi:facebook",
        url: "https://www.facebook.com/GoldenGateTransportation",
        alt: "Follow us on Facebook",
      },
      {
        id: "twitter-social",
        name: "",
        icon: "line-md:twitter-x-alt",
        url: "https://x.com/GoldenGateManor",
        alt: "Follow us on Twitter",
      },
      {
        id: "linkedin-social",
        name: "",
        icon: "brandico:linkedin-rect",
        url: "https://www.linkedin.com/company/golden-gate-manor/",
        alt: "Follow us on LinkedIn",
      },
      {
        id: "instagram-social",
        name: "",
        icon: "simple-icons:instagram",
        url: "https://www.instagram.com/goldengatemanor/",
        alt: "Follow us on Instagram",
      },
      {
        id: "youtube-social",
        name: "",
        icon: "entypo-social:youtube",
        url: "https://www.youtube.com/@GoldenGateManor",
        alt: "Follow our content on YouTube",
      },
    ];

    const adminLinks = [
    {
      id: "blog-link",
      name: "Blogging",
      slug: "/admin/blog",
      icon: "streamline:hand-held-tablet-writing-solid",
    },
    {
      id: "community-link",
      name: 'Community',
      slug: '/admin/community',
      icon: 'material-symbols:family-home-rounded'
    },
    {
      id: 'event-link',
      name: 'Events',
      slug: '/admin/events',
      icon: 'material-symbols:edit-calendar-rounded'
    },
    {
      id: 'messaging-link',
      name: 'Correspondence',
      slug: '/admin/correspondence',
      icon: 'material-symbols:chat'
    },
    {
      id: 'users-link',
      name: 'User Management',
      slug: '/admin/users',
      icon: 'fluent:people-community-12-filled'
    },
  ]

    const contactServices = [
      { id: "Non-Medical", name: "Non-Medical", number: "(719) 543-2525" },
      { id: "NEMT", name: "NEMT", number: "(719) 544-3231" },
      {
        id: "Assisted Living",
        name: "Assisted Living",
        number: "(719) 924-9932",
      },
      {
        id: "Medical Supplies",
        name: "Medical Supplies",
        number: "(719) 569-7361",
      },
      { id: "Gas & Goods 1", name: "Gas & Goods 1", number: "(719) 561-0062" },
      { id: "Gas & Goods 2", name: "Gas & Goods 2", number: "(719) 253-9840" },
    ];

    const runtimeConfig = useRuntimeConfig();
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "@id": `${runtimeConfig.public.siteUrl}#organization`,
      name: "Golden Gate Manor Inc.",
      url: `${runtimeConfig.public.siteUrl}`,
      logo: `${runtimeConfig.public.siteUrl}/images/logo.png`,
      image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
      description:
        "Golden Gate Manor Inc. is a family-owned umbrella company providing Medicaid-approved Non-Emergency Medical Transportation (NEMT), assisted living facilities, durable medical equipment, and convenience services across Southern Colorado. Serving the community for over 20 years with 40+ vehicles and 5 assisted living locations.",
      foundingDate: "2008",
      legalName: "Golden Gate Manor Inc.",
      alternateName: [
        "Golden Gate Manor",
        "GGM",
        "Golden Gate Medical Supply",
        "Golden Gate Transportation",
        "Golden Gate Gas & Goods",
      ],
      telephone: "+1-719-696-8032",
      email: "info@goldengatemanor.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "612 S. Union Ave.",
        addressLocality: "Pueblo",
        addressRegion: "CO",
        postalCode: "81004",
        addressCountry: "US",
        hasMap:
          "https://www.google.com/maps/place/612+S+Union+Ave,+Pueblo,+CO+81004",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.2701,
        longitude: -104.6106,
      },
      openingHours: "Mo-Fr 08:00-16:00",
      sameAs: [
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
        "https://www.pueblocitycab.com",
      ],
      department: [
        {
          "@type": "MedicalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/nemt#service`,
          name: "Non-Emergency Medical Transportation (NEMT)",
          url: `${runtimeConfig.public.siteUrl}/nemt`,
          telephone: "+1-719-544-3231",
          priceRange: "Free with medicaid",
          openingHours: "Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          areaServed: [
            {
              "@type": "State",
              name: "Colorado",
            },
            {
              "@type": "AdministrativeArea",
              name: "Southern Colorado",
            },
          ],
          eligibility: "Medicaid beneficiaries and private pay patients",
          serviceOutput: "Door-to-door medical appointment transportation",
          availableChannel: {
            "@type": "ServiceChannel",
            servicePhone: "+1-719-544-3231",
            availableLanguage: ["English"],
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Fleet Size",
              value: "40+ vehicles",
            },
            {
              "@type": "PropertyValue",
              name: "Accessibility",
              value: "Wheelchair accessible vans available",
            },
            {
              "@type": "PropertyValue",
              name: "Service Area",
              value: "Statewide Colorado coverage",
            },
            {
              "@type": "PropertyValue",
              name: "Insurance",
              value: "Medicaid approved provider",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "648 S. Union Ave.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81004",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/648+S+Union+Ave,+Pueblo,+CO+81004",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.2595792,
            "longitude": -104.6186705
          }
        },
        {
          "@type": "MedicalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/assisted-living#golden-gate-manor-1`,
          name: "Golden Gate Manor I",
          url: `${runtimeConfig.public.siteUrl}/assisted-living#ggmi`,
          telephone: "(719) 583-9132",
          priceRange: "Free with medicaid",
          serviceType: "Assisted Living Facility",
          paymentAccepted: "Medicaid",
          currenciesAccepted: "USD",
          openingHours: "Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          medicalSpecialty: [
            "Elderly Care",
            "Disability Support",
            "Medication Management",
          ],
          availableService: [
            {
              "@type": "MedicalService",
              name: "24/7 Supervised Care",
            },
            {
              "@type": "MedicalService",
              name: "Medication Administration",
            },
            {
              "@type": "MedicalService",
              name: "Daily Living Assistance",
            },
            {
              "@type": "MedicalService",
              name: "Meal Services",
            },
            {
              "@type": "MedicalService",
              name: "Transportation Coordination",
            },
          ],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Certification",
              value: "Medicaid-certified assisted living facility",
            },
            {
              "@type": "PropertyValue",
              name: "Staffing",
              value: "24/7 trained staff on-site",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "606 W. Abriendo Ave.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81004",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/606+W+Abriendo+Ave,+Pueblo,+CO+81004",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.2645315,
            "longitude": -104.6281247
          }
        },
        {
          "@type": "MedicalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/assisted-living#golden-gate-manor-2`,
          name: "Golden Gate Manor II",
          url: `${runtimeConfig.public.siteUrl}/assisted-living#ggmii`,
          telephone: "(719) 542-0201",
          priceRange: "Free with medicaid",
          serviceType: "Assisted Living Facility",
          paymentAccepted: "Medicaid",
          currenciesAccepted: "USD",
          openingHours: "Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          medicalSpecialty: [
            "Elderly Care",
            "Disability Support",
            "Medication Management",
          ],
          availableService: [
            {
              "@type": "MedicalService",
              name: "24/7 Supervised Care",
            },
            {
              "@type": "MedicalService",
              name: "Medication Administration",
            },
            {
              "@type": "MedicalService",
              name: "Daily Living Assistance",
            },
            {
              "@type": "MedicalService",
              name: "Meal Services",
            },
            {
              "@type": "MedicalService",
              name: "Transportation Coordination",
            },
          ],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Certification",
              value: "Medicaid-certified assisted living facility",
            },
            {
              "@type": "PropertyValue",
              name: "Staffing",
              value: "24/7 trained staff on-site",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1219 Lake Ave.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81004",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/1219+Lake+Ave,+Pueblo,+CO+81004",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.2451131,
            "longitude": -104.625675
          }
        },
        {
          "@type": "MedicalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/assisted-living#golden-valley`,
          name: "Golden Valley",
          url: `${runtimeConfig.public.siteUrl}/assisted-living#valley`,
          telephone: "(719) 545-0152",
          priceRange: "Free with medicaid",
          serviceType: "Assisted Living Facility",
          paymentAccepted: "Medicaid",
          currenciesAccepted: "USD",
          openingHours: "Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          medicalSpecialty: [
            "Elderly Care",
            "Disability Support",
            "Medication Management",
          ],
          availableService: [
            {
              "@type": "MedicalService",
              name: "24/7 Supervised Care",
            },
            {
              "@type": "MedicalService",
              name: "Medication Administration",
            },
            {
              "@type": "MedicalService",
              name: "Daily Living Assistance",
            },
            {
              "@type": "MedicalService",
              name: "Meal Services",
            },
            {
              "@type": "MedicalService",
              name: "Transportation Coordination",
            },
          ],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Certification",
              value: "Medicaid-certified assisted living facility",
            },
            {
              "@type": "PropertyValue",
              name: "Staffing",
              value: "24/7 trained staff on-site",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1033 E. Evans Ave.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81004",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/1033+E+Evans+Ave,+Pueblo,+CO+81004",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.248322,
            "longitude": -104.6152667
          }
        },
        {
          "@type": "MedicalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/assisted-living#golden-horizon`,
          name: "Golden Horizon",
          url: `${runtimeConfig.public.siteUrl}/assisted-living#horizon`,
          telephone: "(719) 564-8110",
          priceRange: "Free with medicaid",
          serviceType: "Assisted Living Facility",
          paymentAccepted: "Medicaid",
          currenciesAccepted: "USD",
          openingHours: "Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          medicalSpecialty: [
            "Elderly Care",
            "Disability Support",
            "Medication Management",
          ],
          availableService: [
            {
              "@type": "MedicalService",
              name: "24/7 Supervised Care",
            },
            {
              "@type": "MedicalService",
              name: "Medication Administration",
            },
            {
              "@type": "MedicalService",
              name: "Daily Living Assistance",
            },
            {
              "@type": "MedicalService",
              name: "Meal Services",
            },
            {
              "@type": "MedicalService",
              name: "Transportation Coordination",
            },
          ],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Certification",
              value: "Medicaid-certified assisted living facility",
            },
            {
              "@type": "PropertyValue",
              name: "Staffing",
              value: "24/7 trained staff on-site",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "2109 Chautard Dr.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81005",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/2109+Chautard+Dr,+Pueblo,+CO+81005",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.2282454,
            "longitude": -104.6685071
          }
        },
        {
          "@type": "MedicalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/assisted-living#golden-view`,
          name: "Golden View",
          url: `${runtimeConfig.public.siteUrl}/assisted-living#view`,
          telephone: "(719) 543-7320",
          priceRange: "Free with medicaid",
          serviceType: "Assisted Living Facility",
          paymentAccepted: "Medicaid",
          currenciesAccepted: "USD",
          openingHours: "Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          medicalSpecialty: [
            "Elderly Care",
            "Disability Support",
            "Medication Management",
          ],
          availableService: [
            {
              "@type": "MedicalService",
              name: "24/7 Supervised Care",
            },
            {
              "@type": "MedicalService",
              name: "Medication Administration",
            },
            {
              "@type": "MedicalService",
              name: "Daily Living Assistance",
            },
            {
              "@type": "MedicalService",
              name: "Meal Services",
            },
            {
              "@type": "MedicalService",
              name: "Transportation Coordination",
            },
          ],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Certification",
              value: "Medicaid-certified assisted living facility",
            },
            {
              "@type": "PropertyValue",
              name: "Staffing",
              value: "24/7 trained staff on-site",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "525 W. 9th St.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81003",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/525+W+9th+St,+Pueblo,+CO+81003",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.2754501,
            "longitude": -104.6143892
          }
        },
        {
          "@type": "MedicalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/medical-supplies#store`,
          name: "Golden Gate Medical Supply - Medical Supply Store",
          url: "https://www.goldengatemedicalsupplies.com",
          telephone: "(719) 569-7361",
          priceRange: "Insurance accepted: HSA, FSA, specific insurances",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          availableService: [
            {
              "@type": "MedicalService",
              name: "Home Delivery Service",
            },
            {
              "@type": "MedicalService",
              name: "Equipment Consultation",
            },
          ],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Delivery Area",
              value: "Statewide Colorado delivery and shipping",
            },
            {
              "@type": "PropertyValue",
              name: "Payment Options",
              value: "Insurance, HSA, FSA, private pay",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
          openingHours: "Mo-Fr 08:00-16:00",
          address: {
            "@type": "PostalAddress",
            streetAddress: "612 S. Union Ave.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81004",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/612+S+Union+Ave,+Pueblo,+CO+81004",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 38.2701,
            longitude: -104.6106,
          },
          sameAs: [
            "https://www.goldengatemanor.com/medical-supplies",
            "https://www.goldengatemedicalsupply.com",
          ],
        },
        {
          "@type": "LocalBusiness",
          "@id": `${runtimeConfig.public.siteUrl}/non-medical#service`,
          name: "Pueblo City Cab - Non-medical Transportation",
          serviceType: "Non-Medical Transportation",
          url: `${runtimeConfig.public.siteUrl}/non-medical`,
          telephone: "+1-719-543-2525",
          priceRange: "Varies by distance",
          openingHours: "Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          areaServed: [
            {
              "@type": "City",
              name: "Pueblo",
              addressRegion: "Colorado",
            },
            {
              "@type": "AdministrativeArea",
              name: "Pueblo County",
            },
          ],
          serviceOutput:
            "Transportation for personal errands, shopping, and social activities",
          eligibility:
            "Disabled and elderly community members receiving Medicaid assistance",
          availableChannel: {
            "@type": "ServiceChannel",
            servicePhone: "+1-719-543-2525",
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Approval",
              value: "DSS-approved transportation provider",
            },
            {
              "@type": "PropertyValue",
              name: "Service Types",
              value:
                "Errands, shopping, personal appointments, recreational trips",
            },
            {
              "@type": "PropertyValue",
              name: "Coverage Area",
              value: "Pueblo County including Pueblo West",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "648 S. Union Ave.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81004",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/648+S+Union+Ave,+Pueblo,+CO+81004",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.2595792,
            "longitude": -104.6186705
          },
          sameAs: ["https://www.pueblocitycab.com"],
        },
        {
          "@type": "GasStation",
          "@id": `${runtimeConfig.public.siteUrl}/gas-and-goods#location1`,
          name: "Golden Gate Gas & Goods I",
          url: `${runtimeConfig.public.siteUrl}/gas-and-goods#g&gi`,
          telephone: "(719) 561-0062",
          priceRange: "Competitive fuel and convenience pricing",
          openingHours: "Mo-Su 04:00-02:00 gas: Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          areaServed: {
            "@type": "City",
            name: "Pueblo",
            addressRegion: "Colorado",
          },
          serviceType: "Gas station and convenience store",
          paymentAccepted: ["Cash", "Credit Card", "EBT", "SNAP"],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Store Type",
              value: "Full-service gas station with convenience store",
            },
            {
              "@type": "PropertyValue",
              name: "Special Services",
              value: "EBT and SNAP benefits accepted",
            },
            {
              "@type": "PropertyValue",
              name: "Fuel Availability",
              value: "24/7 automated fuel pumps",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1242 S. Prairie Ave.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81005",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/1242+S+Prairie+Ave,+Pueblo,+CO+81005/",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.2442758,
            "longitude": -104.6435239
          }
        },
        {
          "@type": "GasStation",
          "@id": `${runtimeConfig.public.siteUrl}/gas-and-goods#location2`,
          name: "Golden Gate Gas & Goods II",
          url: `${runtimeConfig.public.siteUrl}/gas-and-goods#g&gii`,
          telephone: "(719) 253-9840",
          priceRange: "Varies by item",
          openingHours: "Mo-Su 04:00-02:00 gas: Mo-Su 00:00-23:59",
          provider: {
            "@type": "MedicalOrganization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`,
          },
          areaServed: {
            "@type": "City",
            name: "Pueblo",
            addressRegion: "Colorado",
          },
          serviceType: "Gas station and convenience store",
          paymentAccepted: ["Cash", "Credit Card", "EBT", "SNAP"],
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Store Type",
              value: "Full-service gas station with convenience store",
            },
            {
              "@type": "PropertyValue",
              name: "Special Services",
              value: "EBT and SNAP benefits accepted",
            },
            {
              "@type": "PropertyValue",
              name: "Fuel Availability",
              value: "24/7 automated fuel pumps",
            },
          ],
          image: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1103 N. Elizabeth St.",
            addressLocality: "Pueblo",
            addressRegion: "CO",
            postalCode: "81003",
            addressCountry: "US",
            hasMap:
              "https://www.google.com/maps/place/1103+N+Elizabeth+St,+Pueblo,+CO+81003",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.277396,
            "longitude": -104.6152351
          }
        },
      ],
      areaServed: [
        {
          "@type": "City",
          name: "Pueblo",
          addressRegion: "Colorado",
        },
        {
          "@type": "AdministrativeArea",
          name: "Southern Colorado",
        },
        {
          "@type": "State",
          name: "Colorado",
        },
      ],
      serviceType: [
        "Non-Emergency Medical Transportation",
        "Assisted Living Services",
        "Durable Medical Equipment",
        "Convenience Store Services",
      ],
    };

    const company = {
      name: "Golden Gate Manor, Inc.",
      phone: "+1-719-544-3231",
      hours: "8:00AM-4:00PM Monday to Friday",
      address: "648 S. Union Ave., Pueblo CO, 81004",
      admin: {
        address: "612 S. Union Ave., Pueblo CO, 81004",
        phone: "+1-719-696-8032",
        fax: "719-696-8548",
        hours: "8:00AM-4:00PM Monday to Friday",
      },
      trans: {
        address: "648 S. Union Ave., Pueblo CO, 81004",
        phone: {
          dispatch: "+1-719-543-2525",
          office: "+1-719-544-3231",
          tollFree: "844-543-2525",
        },
        fax: "719-544-4187",
        hours: "8:00AM-4:00PM Monday to Friday",
      },
      medical: {
        name: "Golden Gate Medical Supply",
        address: "612 S. Union Ave., Pueblo CO, 81004",
        phone: "719-569-7361",
        fax: "719-696-8548",
        hours: "8:00AM-4:00PM Monday to Friday",
      },
      assitedLiving: {
        name: "Golden Gate Manor Assisted Living",
        address: "612 S. Union Ave., Puebo CO, 81004",
        phone: "+1-719-924-9932",
        fax: "+1-719-696-8548",
        houses: {
          ggm1: {
            address: "606 W. Abriendo Ave., Pueblo CO, 81004",
            phone: "719-583-9132",
          },
          ggm2: {
            address: "1219 Lake Ave., Pueblo CO, 81004",
            phone: "719-542-0201",
          },
          valley: {
            address: "1033 E. Evans Ave., Pueblo CO, 81004",
            phone: "719-545-0152",
          },
          horizon: {
            address: "2109 Chautard Dr., Pueblo CO, 81005",
            phone: "719-564-8110",
          },
          view: {
            address: "525 W. 9th St., Pueblo CO, 81003",
            phone: "719-543-7320",
          },
        },
      },
      gasStation: {
        ggmc1: {
          address: "1242 S. Prairie Ave., Pueblo CO, 81005",
          phone: "719-561-0062",
        },
        ggmc2: {
          address: "1103 N. Elizabeth St., Pueblo CO, 81003",
          phone: "719-253-9840",
        },
      },
    };

    const houses = [
      {
        id: "ghorizon",
        images: [],
        name: "Golden Horizon",
        address: "2109 Chautard Drive Pueblo, CO 81005",
        additional: "",
        mapsURL:
          "https://www.google.com/maps/place/2109+Chautard+Dr,+Pueblo,+CO+81005/",
      },
      {
        id: "ggmi",
        images: [],
        name: "Golden Gate Manor I",
        address: "606 West Abriendo Ave. Pueblo, CO 81004",
        additional: "",
        mapsURL:
          "https://www.google.com/maps/place/606+W+Abriendo+Ave,+Pueblo,+CO+81004/",
      },
      {
        id: "gview",
        images: [],
        name: "Golden View",
        address: "525 West 9th Street Pueblo, CO 81003",
        additional: "*Handicap accessible facility",
        mapsURL:
          "https://www.google.com/maps/place/525+W+9th+St,+Pueblo,+CO+81003/",
      },
      {
        id: "gvalley",
        images: [],
        name: "Golden Valley",
        address: "1033 East Evans Pueblo, CO 81004",
        additional: "*Offering private bedrooms & bathrooms",
        mapsURL:
          "https://www.google.com/maps/place/1033+E+Evans+Ave,+Pueblo,+CO+81004/",
      },
      {
        id: "ggmii",
        images: [],
        name: "Golden Gate Manor II",
        address: "1219 Lake Ave Pueblo, CO 81004",
        additional: "",
        mapsURL:
          "https://www.google.com/maps/place/1219+Lake+Ave,+Pueblo,+CO+81004/",
      },
    ];

    return {
      navLinks,
      footerNavLinks,
      footerPolicyLinks,
      socialHandles,
      adminLinks,
      contactServices,
      orgSchema,
      company,
      houses,
    };
  } catch (err) {
    console.error("Composable error (StaticData):", err);
  }
};
