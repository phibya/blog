export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    titleHeader: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Phi Bya',
    titleHeader: 'Phi Bya',
    description: 'My blog',
    headerNavLinks: [
        {
            text: 'About',
            href: '/'
        },
        {
            text: 'Writing',
            href: '/writing'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Scholar',
            href: 'https://scholar.google.com/citations?user=yw6kjSYAAAAJ&hl=en'
        }
    ],
    footerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Writing',
            href: '/writing'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Data Scientist Resume',
            href: '/PhiBya-Resume.pdf'
        },
        {
            text: 'Software Engineer Resume',
            href: '/PhiBya-Resume-SE.pdf'
        },
        {
            text: 'Scholar',
            href: 'https://scholar.google.com/citations?user=yw6kjSYAAAAJ&hl=en'
        }
    ],
    socialLinks: [
        {
            text: 'LinkedIn',
            href: 'https://linkedin.com/in/phibya'
        },
        {
            text: 'GitHub',
            href: 'https://github.com/phibya'
        },
    ],
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
