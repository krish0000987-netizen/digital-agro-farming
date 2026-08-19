/* -------------------------------------------------------------
 * Digital Agro Farming Services - Main JS Behaviors
 * Handles: Sticky Header, Mobile Menu Toggle, Interactive Tabs, 
 * Scroll spy active navigation link, and inquiry form submission.
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Header Scroll Effect
  const header = document.getElementById('site-header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
      header.classList.remove('header-glass');
    } else {
      header.classList.remove('header-scrolled');
      header.classList.add('header-glass');
    }
  };
  window.addEventListener('scroll', handleScroll);
  // Run once on load in case page is refreshed scrolled down
  handleScroll();


  // 2. Mobile Menu Navigation Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const menuIcon = menuToggle.querySelector('i');

  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
    
    // Toggle between bars and xmark icons
    if (siteNav.classList.contains('active')) {
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
    } else {
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when clicking any nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    });
  });


  // 3. Interactive Service Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      // Update active button state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update visible tab pane with cross-fade animation
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetTabId) {
          pane.classList.add('active');
        }
      });
    });
  });


  // 4. Scroll Spy: Highlight Active Section in Navigation
  const sections = document.querySelectorAll('section');
  
  const scrollSpy = () => {
    const scrollPos = window.scrollY + 100; // Offset for header height
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);


  // 5. Inquiry Form Submission Mock Handler
  const inquiryForm = document.getElementById('inquiry-form');
  const formResponseMsg = document.getElementById('form-response-msg');
  const submitBtn = document.getElementById('form-submit-btn');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('input-name').value.trim();
      const phone = document.getElementById('input-phone').value.trim();
      const location = document.getElementById('input-location').value.trim();
      const crop = document.getElementById('input-crop').value.trim();
      const service = document.getElementById('input-service').value;
      const message = document.getElementById('input-message').value.trim();

      // Simple Validation
      if (!name || !phone || !location) {
        formResponseMsg.className = 'form-status-message error-message';
        formResponseMsg.style.backgroundColor = '#fee2e2';
        formResponseMsg.style.color = '#b91c1c';
        formResponseMsg.style.border = '1px solid #fecaca';
        formResponseMsg.style.display = 'block';
        formResponseMsg.textContent = 'Please fill out all required fields (Name, Phone, Location).';
        return;
      }

      // Visual feedback: disable button and change state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Inquiry <i class="fa-solid fa-circle-notch fa-spin"></i>';

      // Mock API delay (1.5 seconds)
      setTimeout(() => {
        // Build descriptive confirmation response
        formResponseMsg.className = 'form-status-message form-status-success';
        formResponseMsg.style.display = 'block';
        formResponseMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your inquiry for <strong>${service.replace('-', ' ')}</strong> regarding crops (<strong>${crop || 'General Crops'}</strong>) at <strong>${location}</strong> has been received. Our agricultural tech expert will call you at <strong>${phone}</strong> within 2 hours.`;

        // Reset form controls
        inquiryForm.reset();

        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

        // Auto-dismiss confirmation after 15 seconds
        setTimeout(() => {
          formResponseMsg.style.display = 'none';
        }, 15000);

      }, 15000 / 10); // 1.5 seconds mock latency
    });
  }

  // 6. Hero Background Slideshow (3-second cycle)
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    let currentSlideIndex = 0;
    setInterval(() => {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      slides[currentSlideIndex].classList.add('active');
    }, 3000);
  }

  // 7. Hero Enquiry Form Mock Handler
  const heroForm = document.getElementById('hero-enquiry-form');
  const heroFormMsg = document.getElementById('hero-form-msg');
  const heroSubmitBtn = document.getElementById('hero-submit-btn');

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('hero-input-name').value.trim();
      const phone = document.getElementById('hero-input-phone').value.trim();
      const location = document.getElementById('hero-input-location').value.trim();
      const service = document.getElementById('hero-input-service').value;

      if (!name || !phone || !location || !service) {
        showHeroStatus('Please fill in all fields.', 'error');
        return;
      }

      // 10-digit phone validation
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        showHeroStatus('Please enter a valid 10-digit phone number.', 'error');
        return;
      }

      // Disable submit during loading
      heroSubmitBtn.disabled = true;
      heroSubmitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';
      showHeroStatus('Sending inquiry...', 'success');

      setTimeout(() => {
        console.log('Hero Enquiry Submitted:', { name, phone, location, service });
        
        showHeroStatus(`<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! We will call you on <strong>${phone}</strong> shortly regarding <strong>${service}</strong>.`, 'success');
        
        heroForm.reset();
        heroSubmitBtn.disabled = false;
        heroSubmitBtn.innerHTML = 'Get Callback Now <i class="fa-solid fa-phone-flip"></i>';
        
        setTimeout(() => {
          heroFormMsg.style.display = 'none';
        }, 12000);
      }, 1500);
    });
  }

  function showHeroStatus(msg, type) {
    if (heroFormMsg) {
      heroFormMsg.innerHTML = msg;
      heroFormMsg.className = `hero-form-status ${type}`;
      heroFormMsg.style.display = 'block';
    }
  }

});
