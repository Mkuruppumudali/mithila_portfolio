/**
 * Portfolio Website - Main TypeScript Entry Point
 * Handles DOM interactions, smooth scrolling, animations, and form submissions
 */

import './styles.css';

class PortfolioApp {
  private header: HTMLElement | null;
  private mobileMenuBtn: HTMLElement | null;
  private navLinks: HTMLElement | null;
  private sections: NodeListOf<HTMLElement>;
  private navLinksArray: NodeListOf<HTMLAnchorElement>;
  private contactForm: HTMLFormElement | null;

  constructor() {
    this.header = document.getElementById('header');
    this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    this.navLinks = document.querySelector('.nav-links');
    this.sections = document.querySelectorAll('section');
    this.navLinksArray = document.querySelectorAll('.nav-links a');
    this.contactForm = document.getElementById('contactForm') as HTMLFormElement;

    this.init();
  }

  /**
   * Initialize all event listeners and animations
   */
  private init(): void {
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveNavLink();
    this.setupTimelineAnimations();
    this.setupCertificationCards();
    this.setupSkillTags();
    this.setupProjectCards();
    this.setupContactForm();
  }

  /**
   * Header scroll effect and timeline/certification animations
   */
  private setupScrollEffects(): void {
    window.addEventListener('scroll', () => {
      this.updateHeaderScroll();
      this.animateTimelineItems();
      this.animateCertificationCards();
    });
  }

  /**
   * Update header styling on scroll
   */
  private updateHeaderScroll(): void {
    if (this.header) {
      if (window.scrollY > 100) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    }
  }

  /**
   * Animate timeline items on scroll
   */
  private animateTimelineItems(): void {
    const timelineItems: NodeListOf<HTMLElement> = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: HTMLElement) => {
      const itemTop: number = item.getBoundingClientRect().top;
      const windowHeight: number = window.innerHeight;

      if (itemTop < windowHeight * 0.8) {
        item.classList.add('visible');
      }
    });
  }

  /**
   * Animate certification cards on scroll
   */
  private animateCertificationCards(): void {
    const certificationCards: NodeListOf<HTMLElement> = document.querySelectorAll('.certification-card');
    certificationCards.forEach((card: HTMLElement) => {
      const cardTop: number = card.getBoundingClientRect().top;
      const windowHeight: number = window.innerHeight;

      if (cardTop < windowHeight * 0.8) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  }

  /**
   * Mobile menu toggle functionality
   */
  private setupMobileMenu(): void {
    if (this.mobileMenuBtn && this.navLinks) {
      this.mobileMenuBtn.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close menu when clicking a link
      this.navLinksArray.forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.navLinks!.style.display = 'none';
          }
        });
      });
    }
  }

  /**
   * Toggle mobile menu visibility
   */
  private toggleMobileMenu(): void {
    if (!this.navLinks) return;

    const isVisible: boolean = this.navLinks.style.display === 'flex';
    this.navLinks.style.display = isVisible ? 'none' : 'flex';

    if (!isVisible) {
      this.applyMobileMenuStyles();
    }
  }

  /**
   * Apply mobile menu styling
   */
  private applyMobileMenuStyles(): void {
    if (!this.navLinks) return;

    Object.assign(this.navLinks.style, {
      flexDirection: 'column',
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      backgroundColor: 'rgba(15, 15, 30, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '30px 20px',
      gap: '25px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    });
  }

  /**
   * Smooth scrolling for anchor links
   */
  private setupSmoothScrolling(): void {
    const anchorLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();

        const targetId: string | null = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement: HTMLElement | null = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  /**
   * Update active nav link based on scroll position
   */
  private setupActiveNavLink(): void {
    window.addEventListener('scroll', () => {
      this.updateActiveNavLink();
    });
  }

  /**
   * Highlight active nav link
   */
  private updateActiveNavLink(): void {
    let currentSection: string = '';

    this.sections.forEach((section: HTMLElement) => {
      const sectionTop: number = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id') || '';
      }
    });

    this.navLinksArray.forEach((link: HTMLAnchorElement) => {
      link.classList.remove('active');
      const href: string = link.getAttribute('href')?.substring(1) || '';
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Initialize timeline animations
   */
  private setupTimelineAnimations(): void {
    const timelineItems: NodeListOf<HTMLElement> = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item: HTMLElement, index: number) => {
      item.style.transitionDelay = `${index * 0.2}s`;

      const itemTop: number = item.getBoundingClientRect().top;
      const windowHeight: number = window.innerHeight;

      if (itemTop < windowHeight * 0.8) {
        item.classList.add('visible');
      }
    });
  }

  /**
   * Initialize certification card animations and modal functionality
   */
  private setupCertificationCards(): void {
    const certificationCards: NodeListOf<HTMLElement> = document.querySelectorAll('.certification-card');
    const modal: HTMLElement | null = document.getElementById('certificateModal');
    const modalClose: HTMLElement | null = document.querySelector('.modal-close');
    const modalOverlay: HTMLElement | null = document.querySelector('.modal-overlay');
    const certificateImage: HTMLImageElement | null = document.getElementById('certificateImage') as HTMLImageElement;
    const certificateTitle: HTMLElement | null = document.getElementById('certificateTitle');
    const certificateIssuer: HTMLElement | null = document.getElementById('certificateIssuer');

    // Certificate mapping (index based on card order)
    const certificateMap: { [key: number]: { image: string; title: string; issuer: string } | null } = {
      0: { image: 'images/AI ML engineer 01.jpg', title: 'AI/ML Engineer - Stage 1', issuer: 'Sri Lanka Institute of Information Technology (SLIIT)' },
      1: { image: 'images/AI ML engineer 02.jpg', title: 'AI/ML Engineer - Stage 2', issuer: 'Sri Lanka Institute of Information Technology (SLIIT)' },
      2: { image: 'images/Python Programing.png', title: 'Programming in Python', issuer: 'University of Moratuwa' },
      3: { image: 'images/Front End Development.png', title: 'Front-End Web Development', issuer: 'University of Moratuwa' },
      4: { image: 'images/Machine learning.png', title: 'Machine Learning Using Python', issuer: 'Simplilearn' },
      5: { image: 'images/Full Stack Java.png', title: 'Full Stack Java Development', issuer: 'Simplilearn' },
      6: { image: 'images/Flutter.jpg', title: 'Mobile App Development With Flutter', issuer: 'Alison' }
    };

    certificationCards.forEach((card: HTMLElement, index: number) => {
      card.style.transition = 'all 0.6s ease';
      card.style.transitionDelay = `${index * 0.1}s`;
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';

      const cardTop: number = card.getBoundingClientRect().top;
      const windowHeight: number = window.innerHeight;

      if (cardTop < windowHeight * 0.8) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }

      // Add click handler to open modal
      card.addEventListener('click', (): void => {
        if (modal && certificateMap[index] !== null && certificateMap[index]) {
          const cert = certificateMap[index];
          if (cert && certificateImage) certificateImage.src = cert.image;
          if (cert && certificateImage) certificateImage.alt = cert.title;
          if (cert && certificateTitle) certificateTitle.textContent = cert.title;
          if (cert && certificateIssuer) certificateIssuer.textContent = `Issued by ${cert.issuer}`;
          modal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close modal functionality
    const closeModal = (): void => {
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    };

    // Close button
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // Overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    // Escape key
    document.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /**
   * Setup skill tag hover effects
   */
  private setupSkillTags(): void {
    const skillTags: NodeListOf<HTMLElement> = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag: HTMLElement, index: number) => {
      tag.style.animationDelay = `${index * 0.05}s`;

      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-5px) scale(1.1)';
      });

      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  /**
   * Setup project card animations
   */
  private setupProjectCards(): void {
    const projectCards: NodeListOf<HTMLElement> = document.querySelectorAll('.project-card');

    projectCards.forEach((card: HTMLElement, index: number) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }

  /**
   * Setup contact form submission (Web3Forms)
   */
  private setupContactForm(): void {
    if (!this.contactForm) return;

    this.contactForm.addEventListener('submit', async (e: SubmitEvent) => {
      e.preventDefault();

      try {
        const formData = new FormData(this.contactForm!);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          alert('Message sent successfully! I will get back to you soon.');
          this.contactForm!.reset();
        } else {
          alert('Error sending message. Please try again.');
        }
      } catch (error) {
        alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    });
  }
}

/**
 * Initialize the portfolio app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
