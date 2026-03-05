// JavaScript for Plastik Köşebent Website

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Image Gallery for Product Pages
const galleryItems = document.querySelectorAll('.gallery-item');
const mainImage = document.querySelector('.main-image img');

if (galleryItems.length > 0 && mainImage) {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const newSrc = item.querySelector('img').src.replace('/100/100', '/500/400');
            mainImage.src = newSrc;
            
            // Update active state
            galleryItems.forEach(gi => gi.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Product Quantity Selector
const minusBtn = document.querySelector('.quantity-minus');
const plusBtn = document.querySelector('.quantity-plus');
const quantityInput = document.getElementById('product-quantity');

if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
}

// Product Tabs
const tabHeaders = document.querySelectorAll('.tab-header');
const tabContents = document.querySelectorAll('.tab-content');

if (tabHeaders.length > 0 && tabContents.length > 0) {
    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tabId = header.getAttribute('data-tab');
            
            // Update active state for headers
            tabHeaders.forEach(h => h.classList.remove('active'));
            header.classList.add('active');
            
            // Update active state for content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(fi => {
                fi.classList.remove('active');
                fi.querySelector('.faq-answer').style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
        
        // Set initial height for active items
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Simulate form submission
        formMessage.classList.remove('success', 'error');
        formMessage.classList.add('success');
        formMessage.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Product Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Product Slider (Auto-scrolling)
const productSlider = document.querySelector('.product-slider');

if (productSlider) {
    let scrollPosition = 0;
    const scrollSpeed = 1;
    
    function autoScroll() {
        scrollPosition += scrollSpeed;
        
        if (scrollPosition >= productSlider.scrollWidth - productSlider.clientWidth) {
            scrollPosition = 0;
        }
        
        productSlider.scrollLeft = scrollPosition;
        requestAnimationFrame(autoScroll);
    }
    
    // Start auto-scrolling
    requestAnimationFrame(autoScroll);
    
    // Pause on hover
    productSlider.addEventListener('mouseenter', () => {
        cancelAnimationFrame(autoScroll);
    });
    
    productSlider.addEventListener('mouseleave', () => {
        requestAnimationFrame(autoScroll);
    });
}

// Catalog Table Search and Filter
const catalogSearch = document.getElementById('catalog-search');
const catalogFilter = document.getElementById('catalog-filter');
const catalogTable = document.querySelector('.catalog-data');

if (catalogTable && (catalogSearch || catalogFilter)) {
    const catalogRows = catalogTable.querySelectorAll('tbody tr');
    
    function filterCatalog() {
        const searchTerm = catalogSearch ? catalogSearch.value.toLowerCase() : '';
        const filterCategory = catalogFilter ? catalogFilter.value : 'all';
        
        catalogRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const category = row.getAttribute('data-category');
            
            const matchesSearch = searchTerm === '' || text.includes(searchTerm);
            const matchesFilter = filterCategory === 'all' || category === filterCategory;
            
            row.style.display = matchesSearch && matchesFilter ? '' : 'none';
        });
    }
    
    if (catalogSearch) {
        catalogSearch.addEventListener('input', filterCatalog);
    }
    
    if (catalogFilter) {
        catalogFilter.addEventListener('change', filterCatalog);
    }
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Scroll to top functionality
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const scrollToTopStyles = document.createElement('style');
scrollToTopStyles.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background-color: #0d6efd;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .scroll-to-top.active {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background-color: #0b5ed7;
    }
`;
document.head.appendChild(scrollToTopStyles);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Product image zoom on click (for product detail pages)
if (document.querySelector('.product-detail')) {
    const mainImage = document.querySelector('.main-image img');
    
    if (mainImage) {
        mainImage.addEventListener('click', () => {
            // Create modal for zoomed image
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            
            const modalImg = document.createElement('img');
            modalImg.src = mainImage.src.replace('/500/400', '/1200/800');
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('modal-close');
            closeBtn.innerHTML = '&times;';
            
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', () => {
                modal.remove();
            });
            
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                modal.remove();
            });
        });
    }
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        }
        
        .image-modal img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .modal-close:hover {
            color: #ccc;
        }
    `;
    document.head.appendChild(modalStyles);
}

// External link handling
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});