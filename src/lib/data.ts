const u = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const ph = (n: string) => `/photos/${n}.jpg`

export const IMG = {
  classroom: ph('20251007_095806'),
  classroom2: ph('20251008_181545'),
  lab: ph('dsc_6766'),
  ict: u('1719159381981-1327b22aff9b'),
  boarding: ph('dsc_6742'),
  sports: ph('1668146607606'),
  clinic: u('1584432810601-6c7f27d2362b'),
  graduation: ph('20251007_135139'),
  graduation2: ph('20251014_165748'),
  career: ph('20251026_072338'),
  mentor: ph('20251007_135025'),
  lecture: ph('20251006_132243'),
  grads: ph('20251026_100425'),
}

export const SCHOOL = {
  name: 'Royalpalm International College',
  short: 'RICO',
  motto: 'Raising Kings and Queens through Excellence',
  tagline: 'Effective Education, Assured Future',
  vision: 'Educating leaders for God, Country, and Society',
  mission:
    'To provide a holistic education, develop moral character grounded in divine values, and prepare champions for local and international leadership.',
  address: 'Opposite Federal Training Centre, Kulende Estate, Sango, Ilorin, Kwara State, Nigeria',
  phones: ['+234 706 897 6866', '+234 802 943 2993'],
  email: 'royalpalmcollegeilorin@gmail.com',
  facebook: 'https://facebook.com/royalpalmrico',
  instagram: 'https://instagram.com/royalpalmintlcollege',
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/student-life', label: 'Student Life' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/contact', label: 'Contact' },
]

export const STATS = [
  { value: 100, suffix: '%', label: 'WAEC / NECO / UTME pass rate since inception' },
  { value: 1500, suffix: '+', label: 'Active students' },
  { value: 4570, suffix: '+', label: 'Graduated alumni' },
  { value: 100, suffix: '+', label: 'Professional teachers' },
]

export const SLIDES = [
  {
    image: IMG.graduation,
    eyebrow: 'Co-educational Day & Boarding College',
    title: 'Raising Kings and Queens through Excellence',
    text: 'An elite, co-educational institution providing world-class education at an affordable price, since July 14, 2018.',
    cta: { label: 'Request Info', to: '/admissions' },
  },
  {
    image: IMG.classroom,
    eyebrow: 'Registered Cambridge International School',
    title: 'Nigerian roots. International reach.',
    text: 'A hybrid curriculum blending the Nigerian National Curriculum with Cambridge Lower and Upper Secondary pathways for ages 11–16.',
    cta: { label: 'Explore Academics', to: '/academics' },
  },
  {
    image: IMG.sports,
    eyebrow: 'Class of 2026',
    title: '100% straight credits and above.',
    text: 'All 30 registered candidates passed with credits and above, including a clean sweep in English Language and Mathematics.',
    cta: { label: 'Visit Us', to: '/contact' },
  },
]

export type CardItem = {
  title: string
  text: string
  image?: string
  eyebrow?: string
  meta?: string
  to?: string
}

export const TRACKS: CardItem[] = [
  {
    eyebrow: 'Core Track',
    title: 'Science',
    text: 'Taught in ultra-modern Physics, Chemistry and Biology laboratories built to international standard.',
    image: IMG.lab,
    to: '/academics',
  },
  {
    eyebrow: 'Core Track',
    title: 'Arts',
    text: 'Language, literature and the humanities, led by our Language Department under Mrs. Ikubaani.',
    image: IMG.lecture,
    to: '/academics',
  },
  {
    eyebrow: 'Core Track',
    title: 'Entrepreneurship',
    text: 'Real-world skills: financial management, cooking and independent budgeting.',
    image: IMG.mentor,
    to: '/student-life',
  },
]

export const FACILITIES: CardItem[] = [
  { title: 'Air-conditioned Classrooms', text: 'Fully air-conditioned classrooms for focused learning.', image: IMG.classroom2 },
  { title: 'Science Laboratories', text: 'Ultra-modern Physics, Chemistry and Biology labs at international standard.', image: IMG.lab },
  { title: 'ICT & Coding Hub', text: 'Hands-on coding and AI training; students have built their own software games.', image: IMG.ict },
  { title: 'Boarding Facilities', text: 'Ensuite, highly secured hostels with a strict no-bullying zone policy.', image: IMG.boarding },
  { title: 'Sporting Arena', text: 'Mini-stadium with pavilion, football pitch, tennis, basketball and indoor courts.', image: IMG.sports },
  { title: 'School Clinic', text: 'On-site clinic managed by qualified healthcare staff.', image: IMG.clinic },
]

export const INITIATIVES: CardItem[] = [
  {
    eyebrow: 'Flagship Event',
    title: 'RICO Annual Career Day',
    text: 'Industry executives in medicine, engineering, architecture, law and corporate finance mentor our students.',
    image: IMG.career,
  },
  {
    eyebrow: 'Vocational',
    title: 'Entrepreneurship & Vocational Program',
    text: 'Financial management, cooking and independent budgeting taught as real-world skills.',
    image: IMG.mentor,
  },
  {
    eyebrow: 'Leadership',
    title: 'Mentorship & Role Reversal Weeks',
    text: 'Active peer mentorship and Role Reversal / Feedback Weeks where students take the lead.',
    image: IMG.graduation2,
  },
  {
    eyebrow: 'Support',
    title: 'Specialized Academic Support',
    text: 'Dedicated experts working with academically weaker students until they thrive.',
    image: IMG.classroom,
  },
]

export const STAFF: CardItem[] = [
  { title: 'Bosun Adeoye', eyebrow: 'Principal', text: 'Leads RICO’s academic and pastoral vision.', image: '/photos/principal.png' },
  { title: 'Mike Oluribido', eyebrow: 'Sports Director', text: 'Directs the sporting arena and athletics programmes.', image: '/photos/sports-director.jpg' },
  { title: 'Mrs. Ikubaani', eyebrow: 'Language Department', text: 'Heads the Language Department.', image: '/photos/ikubaani.jpg' },
]

export const NEWS: CardItem[] = [
  {
    eyebrow: 'School News',
    title: 'Class of 2026: 100% credit pass',
    text: 'All 30 registered candidates achieved straight credits and above, with a clean sweep in English and Mathematics.',
    image: IMG.grads,
    meta: 'Placeholder article · date to be confirmed',
  },
  {
    eyebrow: 'Events',
    title: 'RICO Annual Career Day',
    text: 'Our flagship event brings industry executives to mentor students across professions.',
    image: IMG.career,
    meta: 'Placeholder article · date to be confirmed',
  },
  {
    eyebrow: 'Exam Timetables',
    title: 'Exam timetable posts',
    text: 'Administrative exam schedules will be published in this category.',
    image: IMG.lecture,
    meta: 'Placeholder · supplied by the school',
  },
]
