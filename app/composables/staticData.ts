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
        slug: "/news/community",
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
      { id: "site-map", name: "Site Map", slug: "/sitemap_index.xml" },
      // { id: "", name: "", slug: ""}
    ];

    const socialHandles = [
      {
        id: "google-social",
        name: "Google",
        icon: "akar-icons:google-contained-fill",
        url: "https://www.google.com/search?q=golden+gate+manor+inc",
        alt: "Look us up on Google",
      },
      {
        id: "facebook-social",
        name: "Facebook",
        icon: "mdi:facebook",
        url: "https://www.facebook.com/GoldenGateTransportation",
        alt: "Follow us on Facebook",
      },
      // {
      //   id: "twitter-social",
      //   name: "",
      //   icon: "line-md:twitter-x-alt",
      //   url: "https://x.com/GoldenGateManor",
      //   alt: "Follow us on Twitter",
      // },
      // {
      //   id: "linkedin-social",
      //   name: "",
      //   icon: "brandico:linkedin-rect",
      //   url: "https://www.linkedin.com/company/golden-gate-manor/",
      //   alt: "Follow us on LinkedIn",
      // },
      // {
      //   id: "instagram-social",
      //   name: "",
      //   icon: "simple-icons:instagram",
      //   url: "https://www.instagram.com/goldengatemanor/",
      //   alt: "Follow us on Instagram",
      // },
      {
        id: "youtube-social",
        name: "",
        icon: "mdi:youtube",
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

    const company = {
      name: "Golden Gate Manor, Inc.",
      phone: "719-544-3231",
      hours: "8:00AM-4:00PM Monday to Friday",
      address: "648 S. Union Ave., Pueblo CO, 81004",
      admin: {
        address: "612 S. Union Ave., Pueblo CO, 81004",
        phone: "719-696-8032",
        fax: "719-696-8548",
        hours: "8:00AM-4:00PM Monday to Friday",
      },
      trans: {
        address: "648 S. Union Ave., Pueblo CO, 81004",
        phone: {
          dispatch: "719-543-2525",
          office: "719-544-3231",
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
        phone: "719-924-9932",
        fax: "719-696-8548",
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
      company,
      houses,
    };
  } catch (err) {
    console.error("Composable error (StaticData):", err);
  }
};
