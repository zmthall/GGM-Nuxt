// composables/useBlogSchema.js
import type { BlogPost } from '../../models/blog'

import { useReading } from "./reading";
import { useBlogTags } from "./tags";

export const useBlogSchema = () => {
  const { getTagCategory } = useBlogTags();
  const { getWordCount } = useReading();
  const runtimeConfig = useRuntimeConfig();
  
  const generateBlogSchema = (post: BlogPost | null | undefined) => {
    if (!post) return null;
    
    // Determine if this should be medical or general based on tags
    const category = getTagCategory(post.tags || []);
    const isMedical = category === 'medical';
    
    // Base schema properties that both types share
    const baseSchema = {
      "@context": "https://schema.org",
      "headline": post.title,
      "name": post.title,
      "description": post.description,
      "url": `${runtimeConfig.public.siteUrl}${post.path}`,
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
      "datePublished": post.date || post.createdAt,
      "dateModified": post.updatedAt || post.date || post.createdAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${runtimeConfig.public.siteUrl}${post.path}`
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
        "lastReviewed": post.date || post.updatedAt || post.createdAt,
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
        "wordCount": getWordCount(post.body),
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
  const getArticleSection = (tags: string[] | undefined) => {
    if (!tags || tags.length === 0) return "General";
    
    const category = getTagCategory(tags);
    const tagString = tags.join(" ").toLowerCase();
    
    if (category === 'medical') {
      // Medical subcategories
      if (tagString.includes('transport') || tagString.includes('nemt')) return "Medical Transportation";
      if (tagString.includes('senior') || tagString.includes('elderly') || tagString.includes('geriatric')) return "Senior Care";
      if (tagString.includes('assisted living') || tagString.includes('memory care')) return "Assisted Living";
      if (tagString.includes('equipment') || tagString.includes('dme') || tagString.includes('supplies')) return "Medical Equipment";
      if (tagString.includes('medicaid') || tagString.includes('medicare') || tagString.includes('insurance')) return "Healthcare Coverage";
      if (tagString.includes('disability') || tagString.includes('mobility')) return "Disability Support";
      if (tagString.includes('medication') || tagString.includes('therapy')) return "Medical Care";
      return "Healthcare";
    } else if (category === 'general') {
      // General subcategories
      if (tagString.includes('community') || tagString.includes('local')) return "Community";
      if (tagString.includes('news') || tagString.includes('announcement') || tagString.includes('update')) return "Company News";
      if (tagString.includes('staff') || tagString.includes('employee')) return "Staff Stories";
      if (tagString.includes('event') || tagString.includes('celebration')) return "Events";
      if (tagString.includes('tip') || tagString.includes('guide') || tagString.includes('how to')) return "Tips & Guides";
      if (tagString.includes('safety') || tagString.includes('quality')) return "Safety & Quality";
      if (tagString.includes('service') || tagString.includes('customer')) return "Customer Service";
      return "Business";
    }
    
    return "General";
  };
  
  return {
    generateBlogSchema
  };
};