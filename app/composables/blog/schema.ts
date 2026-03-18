// composables/useBlogSchema.js
import type { BlogPostFull } from '../../models/blog'

import { useReading } from "./reading";
import { useBlogTags } from "./tags";

const getBlogPostLink = (slug: string): string => {
  return `/news/blog/post/${slug}`
}

export const useBlogSchema = () => {
  const { getTagCategory } = useBlogTags();
  const { getWordCount } = useReading();
  const runtimeConfig = useRuntimeConfig();
  
  const generateBlogSchema = (post: BlogPostFull | null | undefined) => {
    if (!post) return null;
    
    // Determine if this should be medical or general based on tags
    const category = getTagCategory(post.tags || []);
    const isMedical = category === 'medical';
    
    // Base schema properties that both types share
    const baseSchema = {
      "@context": "https://schema.org",
      "headline": post.title,
      "name": post.title,
      "description": post.seoDescription,
      "url": `${runtimeConfig.public.siteUrl}${getBlogPostLink(post.slug)}`,
      "image": post.thumbnail ? `${runtimeConfig.public.siteUrl}${post.thumbnail}` : `${runtimeConfig.public.siteUrl}/images/blog/default-blog-image.jpg`,
      "author": {
        "@type": "Person",
        "name": post.author || "Golden Gate Manor Staff",
        "url": `${runtimeConfig.public.siteUrl}/about`
      },
      "publisher": {
        "@type": "Organization",
        "@id": `${runtimeConfig.public.siteUrl}#organization`
      },
      "datePublished": post.publishTimestamp,
      "dateModified": post.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${runtimeConfig.public.siteUrl}${getBlogPostLink(post.slug)}`
      }
    };
    
    if (isMedical) {
      // Medical Web Page Schema
      return {
        ...baseSchema,
        "@type": "MedicalWebPage",
        "medicalAudience": {
          "@type": "PeopleAudience",
          "audienceType": "Patient"
        },
        "medicalSpecialty": getArticleSection(post.tags),
        "lastReviewed": post.updatedAt,
        "reviewedBy": {
          "@type": "Person",
          "name": "Golden Gate Manor Medical Team"
        },
        // Add medical-specific properties if available
        ...(post.tags && {
          "keywords": post.tags.join(", ")
        })
      };
    } else {
      // General Article Schema
      return {
        ...baseSchema,
        "@type": "Article",
        "articleSection": getArticleSection(post.tags),
        "wordCount": getWordCount(post.content),
        "about": {
          "@type": "Thing",
          "name": post.title
        },
        "mentions": [
          {
            "@type": "Organization",
            "@id": `${runtimeConfig.public.siteUrl}#organization`
          }
        ],
        // Add keywords from tags
        ...(post.tags && post.tags.length > 0 && {
          "keywords": post.tags.join(", ")
        })
      };
    }
  };
  
  // Helper function to get article section from tags
  type ArticleSection =
  | "Healthcare"
  | "Community"
  | "Business"
  | "Events"
  | "General"
  | "Medical Transportation"
  | "Senior Care"
  | "Assisted Living"
  | "Medical Equipment"
  | "Healthcare Coverage"
  | "Disability Support"
  | "Medical Care"
  | "Company News"
  | "Staff Stories"
  | "Tips & Guides"
  | "Safety & Quality"
  | "Customer Service"

type TagCategory = "medical" | "general"

type SectionRule = {
  section: ArticleSection
  keywords: string[]
}

const MEDICAL_SECTION_RULES: SectionRule[] = [
  { section: "Medical Transportation", keywords: ["transport", "nemt"] },
  { section: "Senior Care", keywords: ["senior", "elderly", "geriatric"] },
  { section: "Assisted Living", keywords: ["assisted living", "memory care"] },
  { section: "Medical Equipment", keywords: ["equipment", "dme", "supplies"] },
  { section: "Healthcare Coverage", keywords: ["medicaid", "medicare", "insurance"] },
  { section: "Disability Support", keywords: ["disability", "mobility"] },
  { section: "Medical Care", keywords: ["medication", "therapy"] }
]

const GENERAL_SECTION_RULES: SectionRule[] = [
  { section: "Community", keywords: ["community", "local"] },
  { section: "Company News", keywords: ["news", "announcement", "update"] },
  { section: "Staff Stories", keywords: ["staff", "employee"] },
  { section: "Events", keywords: ["event", "celebration"] },
  { section: "Tips & Guides", keywords: ["tip", "guide", "how to"] },
  { section: "Safety & Quality", keywords: ["safety", "quality"] },
  { section: "Customer Service", keywords: ["service", "customer"] }
]

const matchesAnyKeyword = (text: string, keywords: string[]): boolean => {
  return keywords.some(keyword => text.includes(keyword))
}

const findMatchingSection = (
  text: string,
  rules: SectionRule[],
  fallback: ArticleSection
): ArticleSection => {
  const match = rules.find(rule => matchesAnyKeyword(text, rule.keywords))
  return match?.section ?? fallback
}

const getArticleSection = (tags: string[] | undefined): ArticleSection => {
  if (!tags?.length) return "General"

  const category = getTagCategory(tags) as TagCategory
  const tagString = tags.join(" ").toLowerCase()

  if (category === "medical") {
    return findMatchingSection(tagString, MEDICAL_SECTION_RULES, "Healthcare")
  }

  if (category === "general") {
    return findMatchingSection(tagString, GENERAL_SECTION_RULES, "Business")
  }

  return "General"
}
  
  return {
    generateBlogSchema
  };
};