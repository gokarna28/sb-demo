# Landing Page Documentation - Starbuck Group

## Overview
This document provides a comprehensive breakdown of all components, sections, and features implemented on the Starbuck Group landing page.

---

## 🎨 Core Components

### 1. **Page Loading Animation (Preloader)**

**Location:** Lines 19-31 in `index.html`

**Description:**
A sophisticated preloader that displays while the page loads, providing visual feedback to users.

**Features:**
- **Animated Logo Display**: Shows the Starbuck white logo with fade-in animation
- **Percentage Counter**: Real-time loading percentage display (0% to 100%)
- **Custom Loader Animation**: Unique conic gradient loader with rotating elements
- **Smooth Fade-out**: Elegant transition when page is fully loaded

**Technical Implementation:**
- Uses CSS animations (`fadeInDown`, `fadeInUp`, `l22-0`, `l22-1`)
- JavaScript simulates loading progress over 2 seconds
- Automatically hides after page load or 3-second fallback
- Background: Gradient from `#1a1a1a` to `#242D45`

**Key Classes:**
- `.preloader-content` - Main container
- `.preloader-logo` - Logo wrapper
- `.loader` - Animated spinner
- `.loading-percentage` - Percentage display
- `.loading-label` - "Loading..." text

---

### 2. **Header Component (Sticky Header)**

**Location:** Lines 33-101 in `index.html`

**Description:**
A fixed navigation header that transforms on scroll, providing seamless navigation throughout the page.

**Features:**
- **Fixed Positioning**: Always visible at the top of the viewport
- **Sticky Behavior**: Changes appearance when scrolled past 100px
- **Transparent to Solid**: Transitions from transparent to glassmorphic design
- **Active Link Highlighting**: Automatically highlights the current section
- **Responsive Design**: Hamburger menu for mobile devices

**Visual States:**

**Initial State (Top of Page):**
- Transparent background
- White text and logo
- No shadow

**Scrolled State:**
- Glassmorphic background (blur + transparency)
- Dark text and logo
- Subtle shadow and border
- Backdrop filter blur effect

**Technical Implementation:**
- JavaScript scroll listener adds `.scrolled` class at 100px scroll
- Smooth transitions using CSS `transition` property
- Backdrop filter for modern glass effect
- Logo filter changes from white to dark on scroll

**Key Classes:**
- `.header` - Main header container
- `.header.scrolled` - Scrolled state styling
- `.navbar` - Navigation wrapper
- `.nav-menu` - Navigation links container
- `.nav-link` - Individual navigation links
- `.nav-link.active` - Active section indicator

---

### 3. **Mega Menu Component**

**Location:** Lines 44-88 in `index.html`

**Description:**
Advanced dropdown menus that appear on hover for navigation items with sub-items.

**Features:**
- **Hover Activation**: Appears on hover over parent nav item
- **Glassmorphic Design**: Matches header's glassmorphic style
- **Multi-column Layout**: Supports single and multi-column layouts
- **Smooth Animations**: Fade and slide animations on reveal
- **Organized Structure**: Grouped menu items with titles

**Menu Structure:**

1. **ABOUT Menu:**
   - Overview
   - Our Story
   - Values
   - Partnerships

2. **PROJECTS Menu:**
   - Categories

3. **SERVICES Menu (Wide Layout):**
   - **Excavation Column:**
     - Overview
     - Bulk Excavation
   - **Plant Hire Column:**
     - Truck Hire
     - Equipment Hire
     - Material Hire

**Technical Implementation:**
- CSS `:hover` pseudo-class for activation
- Transform and opacity transitions
- Positioned absolutely below parent nav item
- Centered alignment using `translateX(-50%)`
- Z-index: 1000 for proper layering

**Key Classes:**
- `.nav-item-dropdown` - Parent container
- `.mega-menu` - Dropdown container
- `.mega-menu-wide` - Wide layout variant (500px)
- `.mega-menu-content` - Content wrapper
- `.mega-menu-column` - Column container
- `.mega-menu-title` - Section title
- `.mega-menu-list` - Menu items list

**Animation Details:**
- Initial: `opacity: 0`, `translateY(-10px)`
- Hover: `opacity: 1`, `translateY(0)`
- Transition: `0.4s cubic-bezier(0.4, 0, 0.2, 1)`

---

### 4. **Custom Cursor**

**Location:** Lines 13-17 in `index.html`

**Description:**
A custom animated cursor that replaces the default cursor on desktop devices.

**Features:**
- **Smooth Following Animation**: Cursor dot follows mouse with fluid motion
- **Hover Effects**: Expands and changes color on interactive elements
- **Click Animation**: Shrinks on click for visual feedback
- **Mobile Detection**: Automatically hidden on touch devices
- **Interactive Element Detection**: Detects buttons, links, inputs, etc.

**Visual States:**

**Default:**
- 10px orange dot
- Glowing shadow effect
- Smooth following motion

**Hover:**
- Expands to 12px
- Changes to white
- Enhanced glow

**Click:**
- Shrinks to 8px
- Scale animation

**Technical Implementation:**
- Uses `requestAnimationFrame` for smooth animation
- Easing factor: 0.15 for smooth following
- Detects interactive elements automatically
- Only active on desktop (>768px width)

**Key Classes:**
- `.custom-cursor` - Main cursor container
- `.cursor-dot` - Animated dot
- `.cursor-outline` - (Currently hidden)
- `.custom-cursor.hover` - Hover state
- `.custom-cursor.click` - Click state

---

## 📄 Page Sections

### 5. **Hero Section**

**Location:** Lines 103-150 in `index.html`

**Description:**
The main landing section featuring a full-screen background image, compelling headline, and call-to-action.

**Features:**
- **Full-screen Background**: Parallax background image
- **Overlay Effect**: Dark overlay for text readability
- **Animated Title**: Large headline with orange highlights
- **Video Play Button**: Circular play button with ring animation
- **Video Modal**: Full-screen video player modal
- **Call-to-Action**: "View Our Work" button

**Content Elements:**
- Vertical label: "OUR COMPANY"
- Main title with orange highlights
- Company description
- Tagline: "100% Australian Owned and Operated"
- CTA button

**Video Modal Features:**
- Supports both local video files (.mov, .mp4) and YouTube embeds
- Full-screen overlay
- Close button and ESC key support
- Auto-play functionality

**Key Classes:**
- `.hero` - Main section
- `.hero-background` - Background image container
- `.hero-overlay` - Dark overlay
- `.hero-content` - Content wrapper
- `.hero-title` - Main headline
- `.highlight-orange` - Orange text highlight
- `.hero-play-button` - Video play button
- `.video-modal` - Video modal container

---

### 6. **Stats Section**

**Location:** Lines 152-177 in `index.html`

**Description:**
Animated statistics counter displaying company achievements.

**Features:**
- **Animated Counters**: Numbers count up from 0 to target value
- **Intersection Observer**: Animates when scrolled into view
- **Visual Separators**: Divider lines between stats
- **Responsive Grid**: 4-column layout

**Statistics Displayed:**
1. **15+ Years of Excellence**
2. **100+ Daily Trucks**
3. **500K+ Tonnes Moved**
4. **3 ISO Certified**

**Technical Implementation:**
- Uses `IntersectionObserver` API
- Counter animation with `requestAnimationFrame`
- Supports integer and decimal values
- Custom suffixes (+, K+)

**Key Classes:**
- `.stats` - Section container
- `.stats-grid` - Grid layout
- `.stat-item` - Individual stat
- `.stat-number` - Animated number
- `.stat-label` - Stat description
- `.stat-separator` - Visual divider

---

### 7. **About Section**

**Location:** Lines 179-222 in `index.html`

**Description:**
Company overview with image and feature highlights.

**Features:**
- **Two-column Layout**: Text on left, image on right
- **Vertical Label**: "About Us" side label
- **Feature Boxes**: Two highlighted features with icons
- **Scroll Animations**: Elements animate on scroll
- **Parallax Image**: Image has parallax effect

**Content:**
- Company description
- Two feature boxes:
  - Heavy Earthworks Specialists
  - On Time. On Budget. Built to Last.

**Animation Details:**
- Title slides in from left
- Description fades in from bottom
- Feature boxes stagger animation
- Image slides in from right

**Key Classes:**
- `.about` - Section container
- `.about-content` - Content wrapper
- `.about-text` - Text column
- `.about-image` - Image column
- `.about-feature-box` - Feature highlight box
- `.about-feature-icon` - Icon container

---

### 8. **Services Section**

**Location:** Lines 224-283 in `index.html`

**Description:**
Showcase of company services with card-based layout.

**Features:**
- **Three-column Grid**: Service cards in responsive grid
- **Icon Integration**: SVG icons for each service
- **Hover Effects**: Cards have interactive hover states
- **View All Button**: Link to full services page

**Services Displayed:**
1. **Truck Hire** - Diverse range of truck hire options
2. **Equipment Hire** - Large fleet of earthmoving equipment
3. **Specialty Equipment** - Specialized equipment for any project size

**Key Classes:**
- `.services` - Section container
- `.services-header` - Header with title and button
- `.services-grid` - Grid layout
- `.service-card` - Individual service card
- `.service-card-icon` - Icon container
- `.service-card-link` - Learn more link

---

### 9. **Directors Quotes Section**

**Location:** Lines 285-309 in `index.html`

**Description:**
Full-width section with background image featuring director's quote.

**Features:**
- **Parallax Background**: Background image with parallax effect
- **Overlay Effect**: Dark overlay for text readability
- **Quote Display**: Director's testimonial
- **Signature**: Director's name attribution

**Content:**
- Vertical label: "DIRECTORS"
- Main quote from Director James Starbuck
- Director's name

**Key Classes:**
- `.directors-quotes` - Section container
- `.directors-background` - Background image
- `.directors-overlay` - Dark overlay
- `.directors-content` - Content wrapper
- `.directors-description` - Quote text
- `.directors-name` - Director signature

---

### 10. **Certification Section**

**Location:** Lines 311-361 in `index.html`

**Description:**
Displays ISO certifications and management system information.

**Features:**
- **Two-column Layout**: Text and certification cards
- **ISO Badges**: Visual certification badges
- **Card Grid**: Three certification cards
- **Accreditation Details**: Description of management systems

**Certifications:**
1. **ISO 14001:2015** - Environmental Management Systems
2. **ISO 45001:2018** - Occupational Health and Safety
3. **ISO 9001:2015** - Quality Management Systems

**Key Classes:**
- `.certification` - Section container
- `.certification-content` - Content wrapper
- `.certification-left` - Left column
- `.certification-grid` - Right column grid
- `.certification-card` - Individual certification card
- `.certification-icon` - Badge image

---

### 11. **Excavation Section**

**Location:** Lines 363-402 in `index.html`

**Description:**
Detailed information about excavation services.

**Features:**
- **Two-column Layout**: Text on left, image on right
- **Feature Highlights**: Two feature boxes with icons
- **Parallax Image**: Image with parallax scrolling
- **Scroll Animations**: Animated on scroll

**Features Highlighted:**
- **Transport**: Fast, reliable machinery delivery
- **GPS System**: Advanced GPS for precise excavation

**Key Classes:**
- `.excavation` - Section container
- `.excavation-content` - Content wrapper
- `.excavation-text` - Text column
- `.excavation-image` - Image column
- `.excavation-feature-box` - Feature highlight

---

### 12. **Plant Hire Section**

**Location:** Lines 404-430 in `index.html`

**Description:**
Information about plant hire services with reversed layout.

**Features:**
- **Reversed Layout**: Image on left, text on right
- **Company History**: Timeline and growth story
- **Service Description**: Detailed service information

**Key Classes:**
- `.pant-hire` - Section container (uses excavation styles)
- `.excavation-content` - Content wrapper
- `.excavation-image` - Image column
- `.excavation-text` - Text column

---

### 13. **Our Values Section**

**Location:** Lines 435-487 in `index.html`

**Description:**
Displays company core values with visual cards.

**Features:**
- **Two-column Layout**: Image and value cards
- **Four Value Cards**: Core company values
- **Icon Integration**: SVG icons for each value
- **Grid Layout**: Responsive card grid

**Values Displayed:**
1. **Innovation** - Embracing new technology
2. **Efficiency** - Precision and exceeding expectations
3. **Safety** - Exceeding industry standards
4. **Integrity** - Building trust through transparency

**Key Classes:**
- `.our-values` - Section container
- `.values-content` - Content wrapper
- `.values-image` - Image column
- `.values-grid` - Values grid
- `.value-card` - Individual value card
- `.value-icon` - Icon container

---

### 14. **Partnerships Section**

**Location:** Lines 488-543 in `index.html`

**Description:**
Showcases strategic partnerships with alternating layouts.

**Features:**
- **Alternating Layouts**: Image left/right alternation
- **Partnership Cards**: Detailed partnership information
- **List Format**: Bullet points for initiatives

**Partnerships:**
1. **NAWIC** - National Association of Women in Construction
2. **Kinaway** - Aboriginal and Torres Strait Islander business support

**Key Classes:**
- `.partnerships` - Section container
- `.partnerships-content` - First partnership layout
- `.partnerships-content-reversed` - Reversed layout
- `.partnerships-image` - Image container
- `.partnerships-text` - Text content
- `.partnerships-cards` - Partnership card

---

### 15. **Self-Perform Section**

**Location:** Lines 546-573 in `index.html`

**Description:**
Highlights self-performance capabilities.

**Features:**
- **Two-column Layout**: Text and image
- **Feature Images**: Multiple feature images
- **Service Description**: Self-perform model benefits

**Key Classes:**
- `.what-we-do` - Section container
- `.what-we-do-content` - Content wrapper
- `.what-we-do-text` - Text column
- `.what-we-do-image` - Image column
- `.feature-item` - Feature image container

---

### 16. **Projects Section**

**Location:** Lines 576-645 in `index.html`

**Description:**
Showcase of featured projects with hover effects.

**Features:**
- **Three-column Grid**: Project cards
- **Hover Interactions**: Reveals additional details on hover
- **Background Images**: Project images as backgrounds
- **View Project Links**: Links to project details

**Projects Displayed:**
1. **Westgate Tunnel Project** - California, USA
2. **Level Crossing Removal Projects** - New York, USA
3. **Bulk Excavation Projects** - New Jersey, USA

**Hover Features:**
- Location display
- Project name
- Detailed description
- View project link

**Key Classes:**
- `.projects` - Section container
- `.projects-grid` - Grid layout
- `.project-card` - Individual project card
- `.project-image` - Background image
- `.project-info-area` - Default info display
- `.project-hover-details` - Hover state details

---

### 17. **Vision Section**

**Location:** Lines 651-669 in `index.html`

**Description:**
Full-width section with background image displaying company vision.

**Features:**
- **Parallax Background**: Background image with parallax
- **Overlay Effect**: Dark overlay for text
- **Vision Statement**: Company vision text

**Key Classes:**
- `.vision-section` - Section container
- `.vision-background` - Background image
- `.vision-overlay` - Dark overlay
- `.vision-content` - Content wrapper

---

### 18. **Podcasts & Interviews Section**

**Location:** Lines 671-767 in `index.html`

**Description:**
Grid of video cards for podcasts and interviews.

**Features:**
- **Six-column Grid**: Video cards in responsive grid
- **Play Button Overlay**: Play button on each video
- **Video Modal Integration**: Opens videos in modal
- **Video Information**: Title and subtitle for each video

**Videos:**
1. Industry Insights - Construction Excellence
2. Project Spotlight - Major Infrastructure
3. Expert Interview - Innovation in Earthmoving
4. Building the Future - Starbuck Group
5. Earthmoving Excellence - Victoria Projects
6. Heavy Machinery - Equipment Showcase

**Key Classes:**
- `.podcasts-interviews` - Section container
- `.podcasts-grid` - Grid layout
- `.podcast-video-card` - Video card
- `.video-wrapper` - Video container
- `.podcast-play-button` - Play button
- `.video-info` - Video information

---

### 19. **Contact Section**

**Location:** Lines 769-823 in `index.html`

**Description:**
Contact form and company information in split layout.

**Features:**
- **Two-column Layout**: Form and info side-by-side
- **Contact Form**: Name, email, message fields
- **Company Information**: Address, phone, email, hours
- **Orange Accent Strip**: Visual divider

**Form Fields:**
- Name (required)
- Email (required)
- Message (required)

**Company Info:**
- Email: admin@starbuckgroup.com.au
- Phone: 03 8535 3070
- Address: 15/882-900 Cooper Street, Somerton VIC 3064
- Hours: 09:00 - 18:00

**Key Classes:**
- `.contact` - Section container
- `.contact-wrapper` - Wrapper
- `.contact-form-section` - Form column
- `.contact-info-section` - Info column
- `.contact-form` - Form element
- `.contact-info-card` - Info card
- `.contact-orange-strip` - Accent strip

---

### 20. **Footer**

**Location:** Lines 825-882 in `index.html`

**Description:**
Comprehensive footer with links, contact info, and social media.

**Features:**
- **Four-column Layout**: Logo, links, contact, social
- **Social Media Buttons**: LinkedIn, Facebook, YouTube
- **Useful Links**: Navigation and legal links
- **Scroll to Top Button**: Floating button to return to top
- **Copyright Information**: Year and company name

**Footer Columns:**
1. **Logo & Slogan** - Company branding
2. **Useful Links** - Navigation and legal
3. **Contact Information** - Address and contact details
4. **Social Media** - Social platform links

**Key Classes:**
- `.footer` - Footer container
- `.footer-content` - Content wrapper
- `.footer-column` - Column container
- `.footer-links` - Links list
- `.footer-social-buttons` - Social buttons
- `.scroll-to-top` - Scroll to top button

---

## 🎯 Interactive Features

### Smooth Scrolling
- All anchor links use smooth scroll behavior
- Offset calculation for fixed header
- Active link highlighting based on scroll position

### Parallax Effects
- Multiple elements have parallax scrolling
- Different speeds for different elements
- Optimized with `requestAnimationFrame`

### Scroll Animations
- Intersection Observer API for performance
- Multiple animation types:
  - Slide up
  - Fade in
  - Slide left/right
  - Scale
- Staggered animations for grid items

### Video Modal System
- Supports local video files and YouTube embeds
- Full-screen overlay
- Keyboard support (ESC to close)
- Auto-play functionality

### Counter Animations
- Animated number counting
- Intersection Observer triggered
- Supports suffixes and decimals

---

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px (Full features)
- **Mobile**: ≤ 768px (Hamburger menu, simplified layouts)

### Mobile Features
- Hamburger menu for navigation
- Stacked layouts
- Hidden custom cursor
- Touch-optimized interactions

---

## 🎨 Design System

### Colors
- **Primary Orange**: `#ff6b35`
- **Secondary Dark**: `#1a1a1a`
- **Text Color**: `#333`
- **Text Light**: `#666`
- **Background Light**: `#f8f9fa`
- **White**: `#ffffff`
- **Overlay**: `#242D45`

### Typography
- System font stack for optimal performance
- Font weights: 400, 500, 600, 700
- Responsive font sizes

### Spacing
- Consistent padding and margins
- Container max-width: 1200px
- Section padding: Variable

### Effects
- Glassmorphism (backdrop blur)
- Box shadows
- Transitions: `0.3s ease`
- Border radius: Variable

---

## 🔧 Technical Stack

### HTML5
- Semantic HTML structure
- Accessibility considerations
- SEO-friendly markup

### CSS3
- Modern CSS features
- CSS Grid and Flexbox
- CSS Animations
- Custom Properties (CSS Variables)

### JavaScript (Vanilla)
- ES6+ features
- Intersection Observer API
- Event delegation
- Performance optimizations

### External Libraries
- Font Awesome 6.4.0 (Icons)

---

## 📝 File Structure

```
demo/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # All JavaScript functionality
├── images/             # Image assets
├── icons/              # SVG icons
└── LANDING_PAGE_DOCUMENTATION.md  # This file
```

---

## 🚀 Performance Optimizations

1. **Lazy Loading**: Images and content load on scroll
2. **Throttled Scroll Events**: Optimized scroll handlers
3. **RequestAnimationFrame**: Smooth animations
4. **Intersection Observer**: Efficient scroll detection
5. **CSS Transforms**: Hardware-accelerated animations
6. **Minimal Dependencies**: Vanilla JavaScript

---

## 📋 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

---

## 🔄 Future Enhancements

Potential improvements:
- Lazy loading for images
- Service Worker for offline support
- Advanced form validation
- Analytics integration
- A/B testing capabilities

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** Development Team
