// composables/useBlogTags.js

export const useBlogTags = () => {
const medicalTags = [
  'Medical',
  'Healthcare',
  'NEMT',
  'Transportation',
  'Patient',
  'Wheelchair',
  'Medicaid',
  'Medicare',
  'Appointments',
  'Access',
  'Senior',
  'Elderly',
  'Geriatric',
  'Assisted',
  'Living',
  'Aging',
  'Health',
  'Memory',
  'Care',
  'Medication',
  'Activities',
  'ADL',
  'Equipment',
  'DME',
  'Supplies',
  'Mobility',
  'Hospital',
  'Oxygen',
  'Coverage',
  'Rights',
  'Navigation',
  'Insurance',
  'Accessibility',
  'Diabetes',
  'Heart',
  'Disease',
  'Chronic',
  'Conditions',
  'Disability',
  'Support',
  'Surgery',
  'Therapy',
  'Colorado',
  'Pueblo',
  'Rural',
  'Community'
];

  // General/normal tags
const generalTags = [
  'Business',
  'Family',
  'Local',
  'Service',
  'Customer',
  'Updates',
  'News',
  'Announcements',
  'Events',
  'Staff',
  'Spotlight',
  'Quality',
  'Reliability',
  'Safety',
  'Convenience',
  'Independence',
  'Dignity',
  'Compassion',
  'Trust',
  'Experience',
  'Professional',
  'Certified',
  'Licensed',
  'Affordable',
  'Comprehensive',
  'Personalized',
  'Flexible',
  'Emergency',
  'Scheduling',
  'Appointment',
  'Fleet',
  'Vehicles',
  'Drivers',
  'Training',
  'Certification',
  'Tips',
  'Advice',
  'Guide',
  'Resources'
];

  // Get all tags combined
  const getAllTags = () => [...medicalTags, ...generalTags];

  // Get tags by category
  const getMedicalTags = () => medicalTags;
  const getGeneralTags = () => generalTags;

  // Search for tags containing a term
  const searchTags = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    return getAllTags().filter(tag => 
      tag.toLowerCase().includes(term)
    );
  };

  // Get suggested tags based on content
  const getSuggestedTags = (content: string) => {
    const contentLower = content.toLowerCase();
    const suggested = [];
    
    // Check medical keywords
    if (contentLower.includes('medical') || contentLower.includes('healthcare')) {
      suggested.push(...medicalTags.slice(0, 10));
    }
    
    // Check transportation keywords
    if (contentLower.includes('transport') || contentLower.includes('nemt')) {
      suggested.push('Medical Transportation', 'NEMT', 'Patient Transport');
    }
    
    // Check senior care keywords
    if (contentLower.includes('senior') || contentLower.includes('elderly')) {
      suggested.push('Senior Care', 'Elderly Care', 'Assisted Living');
    }
    
    return [...new Set(suggested)]; // Remove duplicates
  };

  // Check if a tag belongs to medical or general category
  const getTagCategory = (tagOrTags: string | string[]) => {
    // Handle single tag
    if (typeof tagOrTags === 'string') {
      if (medicalTags.includes(tagOrTags)) {
        return 'medical';
      } else if (generalTags.includes(tagOrTags)) {
        return 'general';
      }
      return null; // Tag not found in either category
    }
    
    // Handle array of tags
    if (Array.isArray(tagOrTags)) {
      // If any tag is medical, return 'medical'
      const hasMedicalTag = tagOrTags.some(tag => medicalTags.includes(tag));
      if (hasMedicalTag) {
        return 'medical';
      }
      
      // If no medical tags but has general tags, return 'general'
      const hasGeneralTag = tagOrTags.some(tag => generalTags.includes(tag));
      if (hasGeneralTag) {
        return 'general';
      }
      
      return null; // No tags found in either category
    }
    
    return null; // Invalid input
  };

  return {
    medicalTags,
    generalTags,
    getAllTags,
    getMedicalTags,
    getGeneralTags,
    searchTags,
    getSuggestedTags,
    getTagCategory
  };
};