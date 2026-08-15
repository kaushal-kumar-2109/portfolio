// Default portfolio content — seeded into localStorage on first admin visit
export const DEFAULT_CONTENT = {
  settings: {
    siteTitle: 'Alex Smith — Portfolio',
    metaDescription: 'Personal portfolio of Alex Smith, UI/UX Designer and Web Developer.',
    favicon: '/assets/img/favicon.png',
    email: 'info@example.com',
    phone: '+1 5589 55488 55',
    address: 'A108 Adam Street, New York, NY 535022',
    website: 'www.example.com',
    socialLinks: {
      twitter:   '',
      facebook:  '',
      instagram: '',
      linkedin:  '',
      github:    '',
    },
  },

  sections: [
    { id: 'hero',         name: 'Hero',         key: 'hero',         visible: true,  order: 1 },
    { id: 'about',        name: 'About',         key: 'about',        visible: true,  order: 2 },
    { id: 'stats',        name: 'Stats',         key: 'stats',        visible: true,  order: 3 },
    { id: 'skills',       name: 'Skills',        key: 'skills',       visible: true,  order: 4 },
    { id: 'resume',       name: 'Resume',        key: 'resume',       visible: true,  order: 5 },
    { id: 'portfolio',    name: 'Portfolio',     key: 'portfolio',    visible: true,  order: 6 },
    { id: 'services',     name: 'Services',      key: 'services',     visible: true,  order: 7 },
    { id: 'testimonials', name: 'Testimonials',  key: 'testimonials', visible: false, order: 8 },
    { id: 'contact',      name: 'Contact',       key: 'contact',      visible: true,  order: 9 },
    { id: 'footer',       name: 'Footer',        key: 'footer',       visible: true,  order: 10 },
  ],

  hero: {
    greeting: "Hello, I'm",
    name: 'Alex Smith',
    typedStrings: ['UI/UX Designer', 'Web Developer', 'Freelancer'],
    description: 'Passionate full stack developer with 5 years of experience creating beautiful and functional web applications.',
    profileImage: '/assets/img/my-profile-img.jpg',
    heroBg: '/assets/img/hero-bg.jpg',
    btn1Text: 'Download CV',
    btn1Link: '/assets/cv.pdf',
    btn2Text: 'Contact Me',
    btn2Link: '#contact',
    socialLinks: {
      twitter:   '#',
      facebook:  '#',
      instagram: '#',
      linkedin:  '#',
      github:    '#',
    },
  },

  about: {
    title: 'About',
    subtitle: 'Who I Am',
    description: "Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.",
    bioText: "A passionate full stack developer with a love for innovative solutions. With expertise in modern web technologies, I build applications that are fast, secure, and user-friendly.",
    profileImage: '/assets/img/my-profile-img.jpg',
    birthday: '1 May 1995',
    website: 'www.example.com',
    phone: '+123 456 7890',
    city: 'New York, USA',
    age: '30',
    degree: 'Master',
    email: 'email@example.com',
    freelance: 'Available',
  },

  stats: [
    { id: 's1', icon: 'bi-emoji-smile',      value: 232,  label: 'Happy Clients',    suffix: '' },
    { id: 's2', icon: 'bi-journal-richtext', value: 521,  label: 'Projects',         suffix: '' },
    { id: 's3', icon: 'bi-headset',          value: 1453, label: 'Hours of Support', suffix: '' },
    { id: 's4', icon: 'bi-people',           value: 32,   label: 'Hard Workers',     suffix: '' },
  ],

  skills: [
    { id: 'sk1', name: 'HTML/CSS', percentage: 95, category: 'Frontend', visible: true, order: 1 },
    { id: 'sk2', name: 'JavaScript', percentage: 90, category: 'Frontend', visible: true, order: 2 },
    { id: 'sk3', name: 'React.js', percentage: 88, category: 'Frontend', visible: true, order: 3 },
    { id: 'sk4', name: 'Node.js', percentage: 80, category: 'Backend', visible: true, order: 4 },
    { id: 'sk5', name: 'MongoDB', percentage: 75, category: 'Database', visible: true, order: 5 },
    { id: 'sk6', name: 'UI/UX Design', percentage: 85, category: 'Design', visible: true, order: 6 },
    { id: 'sk7', name: 'PHP', percentage: 70, category: 'Backend', visible: true, order: 7 },
    { id: 'sk8', name: 'WordPress/CMS', percentage: 80, category: 'CMS', visible: true, order: 8 },
  ],

  resume: {
    education: [
      {
        id: 'e1',
        degree: 'Master of Fine Arts & Graphic Design',
        institution: 'Rochester Institute of Technology, Rochester, NY',
        startYear: '2015',
        endYear: '2016',
        description: 'Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit.',
        order: 1,
      },
      {
        id: 'e2',
        degree: 'Bachelor of Fine Arts & Graphic Design',
        institution: 'Rochester Institute of Technology, Rochester, NY',
        startYear: '2010',
        endYear: '2014',
        description: 'Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis.',
        order: 2,
      },
    ],
    experience: [
      {
        id: 'x1',
        position: 'Senior Graphic Design Specialist',
        company: 'Experion, New York, NY',
        startYear: '2019',
        endYear: 'Present',
        description: 'Lead in the design, development, and implementation of the graphic, layout, and production communication materials.',
        order: 1,
      },
      {
        id: 'x2',
        position: 'Graphic Design Specialist',
        company: 'Stepping Stone Advertising, New York, NY',
        startYear: '2017',
        endYear: '2018',
        description: 'Developed numerous marketing programs (logos, brochures, infographics, presentations, and advertisements).',
        order: 2,
      },
    ],
  },

  services: [
    { id: 'sv1', icon: 'bi-briefcase',      title: 'Lorem Ipsum',           description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.', link: '#', visible: true, order: 1 },
    { id: 'sv2', icon: 'bi-card-checklist', title: 'Dolor Sitema',          description: 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.', link: '#', visible: true, order: 2 },
    { id: 'sv3', icon: 'bi-bar-chart',      title: 'Sed ut perspiciatis',   description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.', link: '#', visible: true, order: 3 },
    { id: 'sv4', icon: 'bi-binoculars',     title: 'Magni Dolores',         description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.', link: '#', visible: true, order: 4 },
    { id: 'sv5', icon: 'bi-brightness-high','title': 'Nemo Enim',           description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.', link: '#', visible: true, order: 5 },
    { id: 'sv6', icon: 'bi-calendar4-week', title: 'Eiusmod Tempor',        description: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.', link: '#', visible: true, order: 6 },
  ],

  testimonials: [
    {
      id: 't1',
      name: 'Saul Goodman',
      position: 'Ceo & Founder',
      company: 'ABC Corp',
      message: 'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id.',
      image: '/assets/img/testimonials/testimonials-1.jpg',
      rating: 5,
      visible: true,
      order: 1,
    },
    {
      id: 't2',
      name: 'Sara Wilsson',
      position: 'Designer',
      company: 'Studio XYZ',
      message: 'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit.',
      image: '/assets/img/testimonials/testimonials-2.jpg',
      rating: 5,
      visible: true,
      order: 2,
    },
  ],

  contact: {
    address: 'A108 Adam Street, New York, NY 535022',
    phone: '+1 5589 55488 55',
    email: 'info@example.com',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Alex Smith`,
    creditsText: 'Designed by BootstrapMade',
    creditsLink: 'https://bootstrapmade.com/',
  },

  projects: [
    {
      id: 'p1',
      title: 'E-Commerce Website',
      shortDescription: 'A full-featured online shopping platform.',
      fullDescription: 'Built with React, Node.js, and MongoDB. Features include product listings, cart, checkout, and admin panel.',
      category: 'Web Development',
      client: 'Retail Corp',
      projectDate: '2024-01-15',
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      featuredImage: '/assets/img/portfolio/app-1.jpg',
      galleryImages: [],
      status: 'published',
      filter: 'filter-app',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      title: 'Task Management App',
      shortDescription: 'A productivity app for teams.',
      fullDescription: 'A collaborative task management tool built with React and Firebase.',
      category: 'Web Development',
      client: 'StartupXYZ',
      projectDate: '2024-03-10',
      projectUrl: '',
      githubUrl: '',
      technologies: ['React', 'Firebase', 'Tailwind'],
      featuredImage: '/assets/img/portfolio/product-1.jpg',
      galleryImages: [],
      status: 'published',
      filter: 'filter-product',
      createdAt: new Date().toISOString(),
    },
  ],

  messages: [],
  media: [],
}

// localStorage keys
export const STORAGE_KEY = 'iportfolio_cms'
export const SESSION_KEY = 'iportfolio_session'

// Load content from localStorage (with defaults)
export function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_CONTENT
    const stored = JSON.parse(raw)
    // Deep merge with defaults to handle new keys
    return deepMerge(DEFAULT_CONTENT, stored)
  } catch {
    return DEFAULT_CONTENT
  }
}

// Save full or partial content to localStorage
export function saveContent(updates) {
  try {
    const current = loadContent()
    const merged = { ...current, ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    return merged
  } catch (e) {
    console.error('Failed to save content:', e)
    return null
  }
}

// Save a specific section (e.g. 'hero', 'skills')
export function saveSection(key, data) {
  return saveContent({ [key]: data })
}

function deepMerge(defaults, stored) {
  const result = { ...defaults }
  for (const key in stored) {
    if (stored[key] !== null && typeof stored[key] === 'object' && !Array.isArray(stored[key])) {
      result[key] = deepMerge(defaults[key] || {}, stored[key])
    } else {
      result[key] = stored[key]
    }
  }
  return result
}

export function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
