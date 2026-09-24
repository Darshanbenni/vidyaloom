# EduNex — Reference-Matched Website Build Prompts

Prepared for Darshan • 20 September 2026

**Goal:** Build the website in the supplied EduNex image, with closely matched desktop composition, colors, photography, gradients and typography; polished motion; responsive layouts; and a working “Book a Demo” form that emails the owner through Resend.

**What this file contains:** one master instruction, 12 implementation prompts, six core image-generation prompts, two optional image prompts, exact upload paths, a design specification, email requirements, and verification steps. It is a build guide, not an already implemented website.

The reference was inspected at **714 × 2048 pixels**. Its colors were sampled where practical. The font, original CSS and original separate photographs are not available: the values below are reconstruction targets, not recovered source code. Generating new photographs can reproduce their composition but cannot guarantee the identical faces or pixels. The coding agent must compare its actual browser output with the reference and refine it.

## 1. Start here

1. Create or open your website project folder in Antigravity, Copilot or another coding agent.
2. Save this file inside the project as `docs/EduNex_Website_Build_Prompts.md`.
3. Save your attached reference image as `design/reference/edunex-homepage-reference.png`. Keep its original 714 × 2048 resolution.
4. Generate Images A–F below, one at a time. Attach the reference image to the image generator each time. Put the downloaded PNG files in the paths in the asset table. Images G and H are optional.
5. Paste **Prompt 00** into your coding agent once. Then paste **Prompts 01–12 individually, in order**. Each prompt depends on the previous completed step.
6. Let the agent inspect the browser and fix the current step before proceeding. Prompts 05 and 10 contain broader regression checkpoints.
7. Add your domain, receiving email and private credentials locally when Prompt 10 needs them. Never put secrets into this document, chat, source control or a public folder.

You can generate the images first, or run Prompt 01 to create their folders and then upload them. If an image is missing, the agent can build the surrounding layout, but it must report that visual matching is incomplete.

**Brand name:** keep **EduNex** exactly as shown for this reconstruction. Store the name and contact details centrally so you can change them later. Do not silently rename it to another company.

## 2. Where to upload every asset

All paths below are relative to your project’s root folder, the folder containing `package.json`.

| Item | Your upload location | Website-ready output created by the agent | Required? |
|---|---|---|---|
| Original reference screenshot | `design/reference/edunex-homepage-reference.png` | Never used as the website itself | Yes |
| A: hero students | `assets/source/hero-students-desktop.png` | `public/images/hero-students-desktop.webp` | Yes |
| B: training students | `assets/source/training-students.png` | `public/images/training-students.webp` | Yes |
| C: campus aerial photograph | `assets/source/campus-aerial.png` | `public/images/campus-aerial.webp` | Yes |
| D: principal portrait | `assets/source/avatar-principal.png` | `public/images/avatar-principal.webp` | For reference preview |
| E: student portrait | `assets/source/avatar-student.png` | `public/images/avatar-student.webp` | For reference preview |
| F: director portrait | `assets/source/avatar-director.png` | `public/images/avatar-director.webp` | For reference preview |
| G: mobile hero variant | `assets/source/hero-students-mobile.png` | `public/images/hero-students-mobile.webp` | Only if the desktop crop fails |
| H: dashboard illustration | `assets/source/dashboard-preview.png` | `public/images/dashboard-preview.webp` | Optional fallback; code is preferred |
| Actual introduction video | `public/videos/edunex-overview.mp4` | Same file, with poster and captions | Optional |
| Actual video captions | `public/videos/edunex-overview.en.vtt` | Same file | If video contains speech |
| Your approved EduNex logo | `public/brand/edunex-logo.svg` | Same SVG | Agent can recreate the simple mark if absent |
| Technology logos | `public/brand/technology/google.svg`, `amazon.svg`, `microsoft.svg`, `meta.svg`, `openai.svg` | Same SVG files | Use official approved artwork |
| Approved school logos | `public/brand/schools/oakridge.svg`, `greenwood-high.svg`, `vidyashilp.svg`, `inventure.svg`, `tisb.svg`, `stonehill.svg` | Same SVG files | Reference preview; real usage needs confirmation |

**Do not simply change `.png` to `.webp` in the filename.** The agent must actually convert and optimize the images. If your generator downloads JPEG instead, keep its genuine extension and tell the agent to detect it. Do not put original full-resolution photographs in the public folder.

The agent must create `src/content/assets.ts` with paths, intrinsic dimensions, alt text and focal points, plus `docs/asset-manifest.md` recording each asset’s origin. Use local files, never random hotlinked stock images.

### What should be built in code

The hero gradients, headline, buttons, handwritten notes, check icons, floating glass cards, training badges, school dashboard, charts, navigation and all body copy should be HTML/CSS/SVG. Generating these inside a photograph makes them blurry, unresponsive and difficult to edit.

Logos should use approved vector artwork. Do not ask the image generator to invent Google, Amazon, Microsoft, Meta, OpenAI or school logos. If a logo is unavailable, record the missing asset; a neutral text placeholder is acceptable during development, but it does not count as a finished visual match.

## 3. Image-generation prompts

Generate **one image per prompt**, not a collage of multiple website sections. Attach the supplied website reference and ask the generator to use it for visual composition. Request the listed ratio; if the tool offers only standard sizes, select the nearest larger size and let the agent crop without stretching people.

### Image A — Hero students

**Save as:** `assets/source/hero-students-desktop.png`  
**Target:** 2400 × 1400, approximately 12:7. Keep a high-resolution original.

```text
Use the attached EduNex website reference to create ONLY the photographic layer of its top hero section. Do not create a website screenshot or any interface.

Create a premium, photorealistic school prospectus photograph on a bright modern Indian international-school campus. On the RIGHT foreground, show a cheerful teenage Indian female student with natural long dark hair, a light powder-blue school shirt, a navy tie, a royal-blue lanyard and a dark backpack. Her shoulders and upper torso are visible. She is looking slightly upward toward the right of the frame with an optimistic natural smile. Keep her entire head and hair inside the image with comfortable space above. Her face should sit near x=79%, y=28% of the canvas.

Behind her, near x=59%, show a slightly out-of-focus teenage Indian male student in a blue school uniform and backpack. Include one smaller, softly blurred student farther back. Modern pale-blue campus windows and a little greenery are softly blurred in the background. Natural daylight, believable skin texture and anatomy, refined blue color grading, editorial school photography, shallow depth of field.

COMPOSITION IS ESSENTIAL: the students belong mainly in the rightmost 48% of the picture. The leftmost 44% must remain bright, clean and nearly empty, using a very soft off-white and pale icy-blue architectural blur. This is negative space for real website text. Leave the lower-left area quiet. Avoid a visible hard division between the empty space and the photograph.

Match the reference's welcoming, aspirational mood and placement, not a generic centered stock photo. The main student's face should have the same visual prominence as in the reference. Wide landscape, target 2400 by 1400 pixels, approximately 12:7.

No text, no lettering, no watermarks, no logos, no school crests, no badges, no website buttons, no graphic gradient headline, no handwriting, no play button, no glass cards, no borders. No waxy skin, exaggerated eyes, artificial smiles, extra fingers or distorted faces. Do not add an opaque white shape over the student.
```

**Crop check:** after the agent positions this image, the foreground girl must remain on the right, and the heading must sit on a quiet light background. Use CSS to create the final white-to-photo fade and lavender glow.

### Image B — AI, coding and robotics training

**Save as:** `assets/source/training-students.png`  
**Target:** 2400 × 1100, approximately 24:11.

```text
Use the attached EduNex reference to create ONLY the photographic background for the dark navy “AI, Coding, Robotics & Industry Training” section.

Photorealistic premium education advertising photograph, wide landscape. Three Indian senior-school or college-age students collaborate around a laptop on a desk in a modern technology lab. Position the entire group mainly in the RIGHTMOST 43% of the frame. A young male student with glasses sits at the left of this group, a young female student with long dark hair smiles in the middle, and a young male student leans in from the far right. They wear coordinated navy and light-blue formal school or college clothing and look at their project together. Show believable hands and a realistic laptop. The laptop lid has no manufacturer logo.

Behind them, toward the upper-right, show a softly focused monitor with abstract colored coding lines. Do not make the code legible. Cool blue light, deep midnight-navy shadows, subtle cyan highlights, natural faces, realistic depth. Friendly, practical learning rather than science-fiction spectacle.

The LEFTMOST 58% must be mostly quiet deep navy, approximately #0F2748, with only faint out-of-focus classroom detail. Leave it clear for multiple lines of real website copy, logos and a button. Keep the left area consistently dark and avoid bright objects beneath the future text. Leave lower-right breathing space for separate HTML badges.

Match the reference's group placement and cinematic blue school-lab atmosphere. Target 2400 by 1100 pixels, approximately 24:11.

No text, no words, no captions, no readable code, no logos, no watermark, no handwriting, no website layout, no icons, no floating badges, no UI cards. No neon cyberpunk colors, no robots in the foreground, no exaggerated holograms, no distorted hands or faces.
```

### Image C — Campus aerial for the closing banner

**Save as:** `assets/source/campus-aerial.png`  
**Target:** 2400 × 700, approximately 24:7.

```text
Create only a wide aerial campus photograph for the bottom call-to-action banner in the attached EduNex website reference.

Photorealistic elevated drone view of a modern Indian international-school campus surrounded by lush trees. Low-rise academic buildings with warm tan walls, attractive blue-green roofs, a curved internal road and landscaped lawns. Use an oblique aerial angle, not a straight-down map. Let buildings and foliage extend naturally beyond all image edges. Place larger buildings toward the left and right so the central band stays visually calm behind future white text.

Natural late-afternoon daylight, believable architecture, tasteful institutional prospectus photography, broad horizontal panorama. Match the reference's lush campus atmosphere. Target 2400 by 700 pixels, approximately 24:7; keep useful detail in the central 50% vertically so a narrow banner crop remains attractive.

Create a normally exposed photograph. The website will apply the dark navy overlay in CSS, so do not crush the shadows or bake in a black overlay. No people close to camera, no readable signs, no brand names, no logos, no watermark, no words, no buttons, no graphic frame, no handwriting.
```

### Image D — Principal portrait for the reference preview

**Save as:** `assets/source/avatar-principal.png`  
**Target:** 768 × 768, 1:1.

```text
Create a photorealistic square head-and-shoulders portrait for a fictional education website design preview. A friendly Indian woman in her late thirties or early forties, long neatly styled dark hair, professional understated clothing, gentle natural smile, looking toward the camera. Soft neutral pale-gray studio background, even natural light, realistic skin texture, premium professional headshot. Center the face, keep the complete head visible, and leave comfortable circular-crop margins around it. Match the warm approachable character of the small principal avatar in the attached EduNex reference. 768 by 768 pixels, square. No text, no logos, no watermark, no border, no other people. This is an illustrative fictional person, not a portrait of an actual named client.
```

### Image E — Student portrait for the reference preview

**Save as:** `assets/source/avatar-student.png`  
**Target:** 768 × 768, 1:1.

```text
Create a photorealistic square head-and-shoulders portrait for a fictional education website design preview. A cheerful Indian teenage male school student with short neatly styled black hair, a light-blue collared school shirt and dark tie, looking toward the camera. Natural friendly smile, soft pale-blue studio background, flattering even daylight and realistic skin texture. Center the face with the whole head visible and generous margins for a circular avatar crop. Match the warm student-avatar style in the attached EduNex reference. 768 by 768 pixels, square. No crest, no text, no logos, no watermark, no border, no other people. This is an illustrative fictional person, not a portrait of an actual named customer.
```

### Image F — Director portrait for the reference preview

**Save as:** `assets/source/avatar-director.png`  
**Target:** 768 × 768, 1:1.

```text
Create a photorealistic square head-and-shoulders portrait for a fictional education website design preview. A professional Indian man in his mid-forties, short neatly groomed dark hair, subtle well-groomed facial hair, navy suit jacket and white shirt, looking toward the camera with a welcoming natural smile. Soft neutral light-gray background, studio-quality daylight, realistic skin and proportion, understated premium corporate headshot. Center the face and keep the complete head within generous circular-crop margins. Match the director-avatar mood in the attached EduNex reference. 768 by 768 pixels, square. No words, no brand logos, no watermark, no frame, no other people. This is an illustrative fictional person, not a portrait of an actual named client.
```

### Image G — Optional mobile hero, using Image A as a second reference

**Save as:** `assets/source/hero-students-mobile.png`  
**Target:** 1200 × 1500, 4:5. Generate only if Image A cannot crop well on a phone.

```text
Use my generated hero photograph and the EduNex website reference as visual references. Create a portrait-format adaptation of the SAME main female student, same face, hairstyle, blue shirt, navy tie, blue lanyard and backpack, with the same male student softly blurred behind her. Preserve their appearance and the original bright school-campus atmosphere.

Recompose the main female student slightly right of center with her entire head, shoulders and upper torso comfortably visible. Keep the male student behind her on the left. Pale icy-blue campus background, subtle greenery, natural daylight, premium editorial photography. Leave a little clear space above the heads. Target 1200 by 1500 pixels, 4:5.

Only create the photograph. No headings, captions, buttons, logos, handwriting, badges, watermarks or interface elements. The mobile website will place its headline ABOVE this picture, not across her face.
```

### Image H — Optional dashboard illustration

**Preferred route:** the coding agent builds the dashboard with real HTML and SVG using Prompt 06. This preserves readable labels and supports subtle chart animation. This optional image is only for a static fallback.

**Save as:** `assets/source/dashboard-preview.png`  
**Target:** 1800 × 1100, approximately 18:11.

```text
Create an isolated premium school-management dashboard product illustration based on the dashboard section of the attached EduNex reference. Show one large white rounded desktop dashboard panel with very slight perspective, no laptop hardware and no surrounding website. A dark navy vertical sidebar on the left, compact light-blue selected navigation row, clean pale-blue workspace, generous white cards, a blue attendance bar chart, a teal circular progress chart and a recent-activity list. Use restrained cyan, teal, navy and white, delicate borders and soft shadows.

Use these labels carefully if rendering text: EduNex; Dashboard; Students; Attendance; Fees; Exams; Timetable; Transport; Reports; Settings; Good Morning, Principal! Four summary values: 1,248 Total Students; 95% Attendance; ₹12.6L Fees Collected; 320 New Enquiries. A teal ring contains 95%. No invented additional statistics. Show a faint second panel behind the main panel to create the subtle layered perspective visible in the reference.

Near-front view with only slight rotation, crisp professional product presentation, balanced proportions, broad landscape canvas, target 1800 by 1100 pixels. White or extremely pale icy-blue background, no scene, no people, no hands, no desk, no glossy 3D plastic, no dramatic perspective, no watermark. Leave all interface edges visible and unclipped.
```

If any dashboard labels are malformed, rebuild the dashboard in code. Do not ship unreadable AI-generated interface text.

## 4. Visual specification — the screenshot is the design authority

### 4.1 Desktop proportions

Treat the 714-pixel-wide image as a compact representation of a desktop composition, **not** evidence that the real website should display tiny three-column content at 714 CSS pixels. Use a **1428 CSS pixel desktop viewport** as the initial comparison canvas, then downsample that screenshot uniformly to 714 pixels wide for comparison. This 2× mapping is a reconstruction assumption; validate it visually.

| Section | Approximate vertical range in the reference | Initial height at 1428 CSS px |
|---|---:|---:|
| Header | 0–49 | 98 px |
| Technology logo rail | 49–92 | 86 px |
| Hero | 92–430 | 676 px |
| Solutions | 430–837 | 814 px |
| Training | 837–1153 | 632 px |
| Dashboard/about | 1153–1426 | 546 px |
| Testimonials | 1426–1710 | 568 px |
| School logos | 1710–1840 | 260 px |
| Campus CTA | 1840–1998 | 316 px |
| Footer | 1998–2048 | 100 px |

These are alignment guides, not fixed heights to force at every viewport. Use natural content height, suitable padding and sensible minimum heights. Do not truncate text to satisfy a number. The target desktop page is approximately 4096 pixels high at 1428 pixels wide before any necessary content adjustments.

Desktop content starts about 64–70 CSS pixels from either edge. Use a centered content container around 1296–1312 pixels wide. At wider screens, keep text widths capped and let section backgrounds span the screen. Preserve the exact section order and the compact rhythm of the reference.

### 4.2 Colors and surfaces

Representative surface samples from the uploaded image are included below. Photograph blending, antialiasing and compression create many nearby colors; the implementation tokens intentionally consolidate these.

| Use | Starting value | Basis |
|---|---|---|
| Main heading/navy | `#081F44` | Representative dark text pixels |
| Body text | `#50627E` | Visual reconstruction target |
| Page | `#FFFFFF` | Reference white base |
| Technology rail | `#F0F4FE` | Sampled pale rail area |
| Primary button left | `#0098FF` | Visual gradient target |
| Primary button right | `#123BFF` | Visual gradient target |
| Button center blue | Around `#0B55FD` | Sampled button area |
| Hero lower pale blue | `#E5F1FE` | Sampled lower hero area |
| Hero lavender glow | `#DCE2FB` | Sampled lower-center hero area |
| Blue solution card | `#EAF4FE` | Sampled card area |
| Mint solution card | `#E9FBF4` | Sampled card area |
| Lavender solution card | `#F2EDFD` | Sampled card area |
| Training navy | `#0F2748` | Sampled left training area |
| Testimonial background | `#F6F9FE` | Sampled background area |
| Border | `#E3EAF4` | Visual reconstruction target |
| Blue / green / violet checks | `#0787FF` / `#00B990` / `#8745FF` | Accent targets |
| Review stars | `#FFAF00` | Visual reconstruction target |

Use these initial CSS values, then adjust against browser screenshots. The hero has **two different gradients**: its pale atmospheric background and its vivid headline. Do not make the whole hero a saturated purple banner.

```css
:root {
  --color-ink: #081f44;
  --color-body: #50627e;
  --color-page: #ffffff;
  --color-rail: #f0f4fe;
  --color-card-blue: #eaf4fe;
  --color-card-mint: #e9fbf4;
  --color-card-violet: #f2edfd;
  --color-training: #0f2748;
  --color-testimonials: #f6f9fe;
  --color-border: #e3eaf4;
  --gradient-primary: linear-gradient(105deg, #0098ff 0%, #0664ff 48%, #123bff 100%);
  --gradient-headline: linear-gradient(95deg, #009cff 0%, #3475ff 38%, #8054ff 70%, #ba35f5 100%);
}

.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 40% 76%, rgb(190 194 255 / 46%) 0%, transparent 35%),
    radial-gradient(ellipse at 26% 100%, rgb(206 238 255 / 74%) 0%, transparent 50%),
    linear-gradient(115deg, #ffffff 0%, #f8fbff 35%, #edf6ff 70%, #e5effb 100%);
}

.hero__photo {
  position: absolute;
  inset: 0 0 0 auto;
  width: 62%;
  height: 100%;
  z-index: 0;
  /* Starting crop only; adjust using the actual generated asset. */
  object-fit: cover;
  object-position: 76% 45%;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 100%);
}

.hero__photo-wash {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, #ffffff 0%, rgb(255 255 255 / 94%) 30%, rgb(250 252 255 / 42%) 48%, transparent 67%),
    linear-gradient(0deg, rgb(222 241 255 / 50%) 0%, transparent 25%);
}

.hero__content { position: relative; z-index: 2; }
.hero__gradient-word {
  background: var(--gradient-headline);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.button-primary {
  background: var(--gradient-primary);
  color: #ffffff;
  border-radius: 999px;
  box-shadow: 0 8px 22px rgb(18 78 255 / 17%);
}
.training {
  background-color: var(--color-training);
  /* Image layer sits behind a separate left-to-right navy CSS overlay. */
}
.campus-cta__overlay { background: rgb(2 13 23 / 74%); }
```

The source photo includes negative space, so `width`, `object-position` and the mask must be tuned together. Do not accept a crop that hides the girl behind the content. On mobile, put the photo in normal flow beneath the hero copy and replace the horizontal mask with a gentle top fade. Do not retain the desktop absolute-positioned overlap on a narrow screen.

### 4.3 Typography, shapes and detail

- Begin with **Inter** for interface/body/headings, self-hosted through the framework font tooling. It is a visual starting point, not an identified original font. Compare letter shapes, weight and line breaks before changing families.
- Use one small handwriting font, such as **Caveat**, only for the decorative notes. Keep notes as separate text/SVG elements. Do not place important information only in handwriting.
- At the comparison desktop width: hero heading around 64 px, weight 750–800, line-height 1.04–1.09; section titles about 36–40 px; card titles about 24 px; body around 17–19 px.
- Hero headline has three desktop lines: “Empowering” / “Education for a” / “Smarter Tomorrow”. Only the third line has the blue–violet gradient. Allow natural wrapping on phones.
- Use small uppercase section eyebrows with tracking around 0.14–0.18em. Keep letters readable rather than reproducing screenshot compression.
- Solution cards have gentle 18–22 px corners, almost-flat pastel surfaces and equal desktop heights. Buttons are full pills. Testimonial cards have subtle borders and shadows.
- Icons are a consistent fine-stroke SVG family. The colorful solution icons sit in small rounded gradient squares; the bullet checks sit in matching filled circles.
- No extra sections, pricing grids, giant animated blobs, dark-mode switch, oversized floating navigation, full-screen intro, cursor trails or unrelated visual effects.

### 4.4 Responsive interpretation

| Width | Required behavior |
|---|---|
| 320–639 px | Single-column page; menu button; headline then photograph; stacked solution cards; training copy above its photo; dashboard above explanation; stacked testimonials; wrapping school logos |
| 640–1023 px | Use two columns only where content remains comfortable; preserve all features and CTAs; avoid one excessively narrow third card |
| 1024–1279 px | Compact desktop composition with adjusted heading and gaps; check photo/text overlap and menu fit |
| 1280 px and above | Three solution columns and three testimonial columns; match the supplied desktop composition closely |

Use a 16 px minimum comfortable mobile form input size. Make primary touch targets roughly 44 × 44 CSS pixels or larger. At 200% browser zoom and at 320 CSS px width, content must remain usable without whole-page horizontal scrolling. A mobile page should reflow, not shrink the whole desktop screenshot.

## 5. Content and section details

Keep the following in typed content objects, not scattered through components. The screenshot's numbers, testimonials, named people, schools and implied relationships are **reference-preview content, not established facts about your startup**. Keep the exact preview for visual comparison; before public launch, populate a separate production content file with verified claims and approved assets. Do not publish fictional reviews as real customer feedback. This changes content when necessary, not the design system.

### Header and technology rail

Header: EduNex cube/shield-style navy-and-cyan mark, “EduNex” wordmark, and small tagline “Smarter Schools. Brighter Futures.” Keep the visual spelling from the supplied image if its original brand file is provided.

Navigation, in order: Home; Solutions; AI & Training; About; Testimonials; Contact. Right-hand blue pill: Book a Demo, with a fine right-arrow icon.

Below it, an inset pale-blue rounded rail. Left: two-line small uppercase “TRUSTED & INSPIRED BY / INDUSTRY LEADERS” in reference-preview mode. Then Google, amazon, Microsoft, Meta, OpenAI, “and more...” and a small circular arrow. Preserve native multicolor logos, normal proportions, quiet dividers and balanced optical widths.

For production, use a factual rail label such as “TECHNOLOGY & LEARNING ECOSYSTEM” unless an actual relationship supports the original wording. Showing a logo must not imply that its company is your customer or sponsor. Do not append additional brands just to fill space.

### Hero

Eyebrow: END-TO-END SOLUTIONS FOR SCHOOLS & COLLEGES

Headline:

```text
Empowering
Education for a
Smarter Tomorrow
```

Supporting copy:

```text
Technology. Training. Transformation.
Complete solutions to run, grow and future-ready
your institution.
```

Primary button: Book a Demo →  
Secondary outline button: play icon, Watch Video

Three reference-preview statistics: **500+** Institutions Trust Us; **100K+** Students Impacted; **98%** Customer Satisfaction. Use small separators between the groups.

Right-side details: “Future / Ready / Students” near the left edge of the photo; “Technology / Today. / Brighter / Tomorrow” at its upper-right with a small green underline; a floating white translucent card reading “Learn / Build / Innovate / Belong”; a wider translucent lower-right card with a violet play circle and “See how we are / transforming education”. These are separate layered HTML elements, not text inside the generated photo.

### Three solution cards

Eyebrow: OUR SOLUTIONS  
Title: Everything Your Institution Needs. In One Place.  
Subtitle: From daily operations to future-ready skills, we provide complete solutions for schools and colleges.

| Blue card | Mint card | Lavender card |
|---|---|---|
| **School ERP & Process Automation** | **Website + Admissions CRM + Parent/Student Experience** | **AI Solutions + Management Dashboards** |
| Simplify operations. Save time. Focus on what matters – students. | A modern digital presence with end-to-end admission management. | Smarter decisions. Higher impact. Powered by AI. |
| Admissions & Enquiries | Stunning Website for Your Institution | AI Assistants for Management, Teachers & Parents |
| Attendance & Exams | Enquiry & Lead Management | Automated Workflows |
| Fees & Finance | Online Admissions & Payments | Document Intelligence (ID, forms, etc.) |
| Timetable & Transport | WhatsApp Follow-ups | Dashboards for Attendance, Fees, Admissions & Academics |
| HR & Staff Management | Parent & Student Portal | Predictive Insights |
| Reports & Analytics | Mobile App Experience | Custom AI Solutions for Your Institution |
| Parent & Student Management | Real-time Notifications & Updates | — |

The final em dash means there are six bullets on the violet card. Do not render a dash or invent a seventh bullet. Match title wrap, icon placement, compact descriptions, right-arrow circles and bullet spacing to the image.

### Dark training section

Eyebrow: FUTURE-READY LEARNING  
Title: AI, Coding, Robotics & Industry Training  
Subheading: Hands-on. Practical. Real-World Skills.

Reference copy: “We conduct workshops and training programs in schools and colleges, where students build live applications with guidance from industry experts from Google, Amazon, Microsoft and more.” Keep the employment claim only if confirmed for production; otherwise use “with guidance from experienced software and AI engineers.”

Logo row: Google; amazon; Microsoft; and more...

| Feature | Supporting text |
|---|---|
| Live Projects | Build real applications |
| Learn from Experts | Industry professionals |
| Deploy to the Internet | See your app live |
| Certificates | Add value to your future |

CTA: Request a Workshop for Your School →

Right: Image B with the handwritten note “Students / Today / Innovators / Tomorrow” and three white rounded badges: Build Live Apps; Work with AI; Deploy to the Cloud. Preserve the dark blue photographic atmosphere and a clear contrast boundary behind the copy.

### Dashboard / about section

Left: wide light dashboard product preview with a navy sidebar and faint rear panel. Right:

```text
A Smarter Way
to Manage Education

Powerful dashboards, real-time insights and automation
to help you make better decisions, faster.

Real-time Analytics
Role-based Access
Custom Reports
Accessible on Web & Mobile

Book a Demo →
```

Decorative note: “See the difference” with a curved arrow toward the CTA.

Dashboard content: Good Morning, Principal!; 1,248 Total Students; 95% Attendance; ₹12.6L Fees Collected; 320 New Enquiries; attendance bars; a 95% teal donut; and recent activity. These are illustrative product-demo values. This is a marketing preview, not a request to build the ERP or a real login system.

### Testimonials

Eyebrow: VOICES THAT MATTER  
Title: Trusted by Educators. Loved by Students.  
Subtitle: Hear from school leaders and students who are experiencing the difference with EduNex.

Three equal white cards with gray quote marks, five small gold stars, a circular portrait and the following reference-preview copy:

1. “EduNex has simplified our entire school operations. The support team is excellent and the platform is very easy to use.” — **Dr. Anjali Rao**, Principal, Greenwood International School, Bangalore.
2. “The AI and coding workshop was amazing! I built my first web app and deployed it online. It was so much fun and I learned real-world skills.” — **Arjun Mehta**, Grade 10 Student, Oakridge International School, Bangalore.
3. “The admissions process is now smooth and digital. Parents love the portal and communication has improved a lot.” — **Mr. R. K. Sharma**, Director, Vidyashilp Academy, Bangalore.

### School logos, closing banner and footer

Eyebrow: OUR PARTNERS & CLIENTS  
Title: Leading Schools. Progressive Institutions. Growing Together.

Reference school order: Oakridge International School; Greenwood High; Vidyashilp Academy; Inventure Academy; International School Bangalore (TISB); Stonehill International School. Use approved real clients for the public site. The supplied screenshot alone is not proof of a customer relationship.

Closing banner over Image C with a dark overlay:

```text
LET'S BUILD A BRIGHTER FUTURE TOGETHER
Ready to Transform Your Institution?
Book a free demo or invite us for a webinar/workshop at your school.

Book a Demo →       Contact Us
```

Right handwritten stack: Partner / Educate / Innovate / Grow.

Footer: compact EduNex wordmark/tagline left, repeated navigation in the center, LinkedIn/YouTube/Instagram icons right. Social links come from configuration and must point to your actual profiles. Include a discreet Privacy link needed by the enquiry form; keep the footer compact.

## 6. Stack and useful research

Recommended implementation: **Next.js App Router + React + TypeScript + Tailwind CSS**, **Motion for React**, **Lucide icons**, a styled **shadcn/ui Dialog**, **Zod validation**, and the **Resend server SDK**. Add **Turnstile** for bot checks and a small durable **Redis** service for rate limiting and submission deduplication. There is no requirement for a CMS, ERP backend, authentication system or lead-management dashboard.

Next.js is selected here because the same project can serve the marketing page and run the email endpoint. A static-only deployment cannot run that endpoint; deploy to a supported Node/serverless runtime. Check the installed release and use compatible current APIs. [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying)

| Resource | How to use it in this project |
|---|---|
| [UI UX Pro Max repository](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) and [skill instructions](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md) | Apply its responsive, interaction and review workflow; keep the supplied reference's layout and palette authoritative |
| [Motion repository](https://github.com/motiondivision/motion), [LazyMotion](https://motion.dev/docs/react-lazy-motion) and [accessible motion](https://motion.dev/docs/react-accessibility) | Use one animation system, small client components, lazy feature loading where useful, and reduced-motion handling |
| [shadcn/ui Dialog](https://ui.shadcn.com/docs/components/base/dialog) | Use its dialog behavior for the demo form, while restyling the surface and buttons to match this reference |
| [Magic UI repository](https://github.com/magicuidesign/magicui) and [Marquee](https://magicui.design/docs/components/marquee) | Optional source for a compact logo rail; do not import an entire template |
| [Animata repository](https://github.com/codse/animata) and [Marquee](https://animata.design/docs/container/marquee) | Alternative logo-strip reference; select one approach rather than both |
| [Next.js Image documentation](https://nextjs.org/docs/app/api-reference/components/image) | Responsive image sizing, reserved dimensions, correct hero loading priority |
| [Resend with Next.js](https://resend.com/docs/send-with-nextjs) | Server-side email integration |
| [Resend domain management](https://resend.com/docs/dashboard/domains/manage-domains) | Verify your actual sender domain using the DNS records currently shown in your account |
| [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys) | Reuse a submission's email key on safe retries; provider keys currently last 24 hours |
| [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) | Verify the challenge on the server; tokens expire after five minutes and are single-use |
| [Upstash rate-limit features](https://upstash.com/docs/redis/sdks/ratelimit-ts/features) | Persistent limits across serverless instances; inspect failure/timeout behavior |
| [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) | Repeatable browser screenshots and regression baselines |

These resources provide suitable building blocks. A paid template is not necessary to reproduce this composition. Check the license of any copied component and retain required notices. Premium template collections and subscriptions are optional, and their availability does not mean their contents are free.

### UI UX Pro Max setup for your coding environment

The published instructions were reviewed for this guide; the skill was not installed or its search engine executed in your separate coding project. Install it there before running the sequence if it is not already available. The official README currently specifies `ui-ux-pro-max-cli`, which installs the `uipro` command; older `uipro-cli` instructions are stale. [Official installation instructions](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill#installation)

Run this once in your own development environment:

```bash
npm install -g ui-ux-pro-max-cli
```

Then, from your project root, run **only the line for your editor**:

```bash
uipro init --ai antigravity
# OR
uipro init --ai copilot
# OR
uipro init --ai codex
```

Read the installed `SKILL.md`. The agent must locate its real `scripts/search.py` path rather than assume every editor uses the same directory. For a fresh design-system search, a suitable small query is `education SaaS landing`. A targeted query is `keyboard focus modal`; a separate stack query can use `responsive images` with `--stack nextjs`. Recommendations are supporting guidance; do not let them replace the screenshot's established style.

## 7. Copy-and-paste implementation prompts

Paste the following prompts in order. Keep this entire guide and the reference image accessible to the agent. Each prompt deliberately covers a bounded part of the build so visual mistakes can be corrected before they spread.

### Prompt 00 — Master instruction, paste once

```text
Act as the frontend engineer and product designer implementing my EduNex website.

Read docs/EduNex_Website_Build_Prompts.md completely. Open and visually inspect design/reference/edunex-homepage-reference.png. This screenshot is my approved desktop design. Read any existing repository instructions and preserve unrelated work.

My goal is a close, carefully verified reconstruction of that screenshot with responsive layouts, fast loading, tasteful motion and a working Resend enquiry form. Do not reinterpret it as a generic SaaS template. Keep the same brand, section order, approximate proportions, typography character, pastel cards, photo placement, navy training band, glass cards and gradients. Build semantic editable components; do not render the whole reference as a background image.

Use the installed UI UX Pro Max skill for applicable UI work. Locate and read its actual SKILL.md. Apply its relevant workflow and searches, but the explicit reference takes priority over any suggested palette or layout. Do not claim the skill ran if it did not. Record a missing installation clearly and continue all unblocked work using this specification.

Default architecture: Next.js App Router, React, TypeScript, Tailwind CSS, Motion for React, Lucide, an accessible dialog primitive, Zod and server-side Resend. Use compatible stable packages and a lockfile. If this is an existing repository, inspect its stack first, reuse suitable infrastructure and explain material deviations. Do not replace the project wholesale.

Use docs/EduNex_Website_Build_Prompts.md as the complete content, asset, gradient, form and quality specification. Save decisions in docs/implementation-notes.md and task status in docs/build-progress.md so later prompts can resume consistently. Do not create an ERP backend, login system, admin panel, blog or unrelated pages.

At the end of each implementation step:
1. Run relevant type/lint checks and focused behavior checks for the change.
2. For visible UI, open a real browser, inspect desktop and mobile output, and correct obvious errors. Save screenshots in artifacts/qa/step-XX/.
3. Report what changed, what was actually checked, and concrete remaining blockers. Do not claim checks passed if they were not run.
4. Keep the settled appearance of earlier completed sections intact.

Do a broader regression after Steps 05 and 10, then the final audit in Step 11. Do not add meaningless tests that merely repeat component markup. Use behavior tests for the form and visual review for composition.

The supplied screenshot contains sample proof, quotes and logos. Keep a faithful reference-preview dataset for local visual comparison, and a separate production dataset for verified business content. Never claim fictional testimonials or unverified partnerships are real. This must not add warning banners or implementation jargon to the product design.

Use configuration for genuine business details, recipient email, social URLs and video URL. Secrets stay server-side. Build all available work before reporting any owner-only setup that remains.

Now confirm the files you inspected and wait for Prompt 01. Do not implement all 12 steps in a single unchecked pass.
```

### Prompt 01 — Project foundation, skill and asset preparation

```text
Implement Step 01 using the master instruction and guide.

Inspect the existing repository, package manager and framework. For a new project, create a clean Next.js App Router application with TypeScript, Tailwind CSS and src/ organization. Use stable mutually compatible versions, inspect the generated configuration and commit the dependency lockfile if git is in use. Do not mix incompatible Tailwind setup conventions or use a deprecated framework lint command without checking available scripts.

Read the installed UI UX Pro Max skill. If its scripts are available, run a narrowly scoped education SaaS landing design-system query and relevant Next.js guidance. Treat its suggestions as subordinate to this image. Save a concise reference-based design specification at docs/design-spec.md. Respect existing skill output files; do not overwrite an existing design system blindly.

Create the asset directories from the guide. Inspect every supplied image, record dimensions and focal points, and convert source PNG/JPEG files to optimized WebP. Preserve original files in assets/source/. Produce a list of missing assets. Create src/content/assets.ts. Do not substitute unrelated stock photos.

Create typed content/config files for navigation, services, training, statistics, testimonials, schools, contact and social links. Separate reference-preview content from publishable production content. Never infer that the sample school relationships are verified.

Implement CSS variables for the sampled colors, spacing, radii and gradient definitions. Configure Inter and a small handwriting font, with reliable fallbacks and appropriate font loading. Build shared Container, SectionEyebrow, PrimaryButton, SecondaryButton, IconBadge and CheckList components.

Suggested structure: src/app, src/components/sections, src/components/ui, src/components/forms, src/components/motion, src/content, src/lib/server, src/emails and tests. Keep the landing page server-rendered; isolate client interactivity in small components. Use the project’s established equivalent paths if already present.

Create a page skeleton with the exact section order. Add a skip link and semantic landmarks. Add .env.example with placeholder names only and ensure private environment files are ignored by git. Do not integrate real email yet.

Verify that the application starts, the assets load and the skeleton has no horizontal overflow at 390 px and 1428 px. Report actual checks and missing assets.
```

### Prompt 02 — Header and technology logo rail

```text
Implement only the header and technology rail, matching the corresponding top part of the reference.

At the 1428 px comparison width, aim for a roughly 98 px white header and an 86 px rail region. Place the compact EduNex mark/wordmark left, navigation centered and blue gradient Book a Demo pill right. Match optical spacing, not just equal mathematical gaps. The default header is in normal document flow to preserve the reference. Do not turn it into an oversized floating island.

Build the pale blue rounded logo rail immediately below it with inset side margins, tiny two-line label, divider strokes, Google, amazon, Microsoft, Meta, OpenAI, “and more...” and the small circular arrow. Use local approved SVG assets with object-fit: contain, correct native colors and individually tuned optical widths. The rail should initially match the static reference.

Do not add an endless marquee by default. If the logos overflow on smaller screens, use a keyboard-operable horizontal scroll region with discreet controls; focus must not be clipped. The arrow should scroll to additional real configured items, or open a small ecosystem information dialog if all items are already visible. No dead button or fake brand partnership claim.

On mobile, use an accessible menu button and a styled menu panel with working links. Preserve the logo and a usable Book a Demo control. Closing the menu must restore focus, Escape must work, and link activation must close it. Navigation anchors: home, solutions, training, about, testimonials and contact. Empty future anchors must be documented until their section is implemented.

Use the shared demo-action interface so all Book a Demo buttons can connect to the dialog added in Step 09. Give controls proper button/link semantics and visible keyboard focus. Use real pointer targets larger than the tiny visible icons.

Open desktop and mobile browsers, inspect the header and rail against the reference, and fix alignment, overflow and logo sizing before finishing.
```

### Prompt 03 — Hero, background blend and glass overlays

```text
Implement the hero as the highest-priority visual match. Reopen the reference and inspect its hero before editing.

Use Section 4's CSS and Section 5's copy as starting points. At 1428 px, the hero is approximately 676 px high. The left text begins around x=70 px. The heading uses three desktop lines: Empowering / Education for a / Smarter Tomorrow. Only the last line receives the blue-to-violet gradient. Match its width and line-height before adding motion.

Create the background as separate layers: pale white/icy-blue base, soft lower lavender radial glow, right-side student photograph, subtle horizontal white blend, slight bottom blue wash. The left side remains mostly white. The photo must blend into the surface without a rectangular image border. Keep the girl's face and shoulders clear and visually prominent on the right.

Place the eyebrow, supporting copy, two pill buttons and three stat groups exactly as specified. Build the Learn/Build/Innovate/Belong glass card and the lower-right video card in HTML with restrained backdrop blur, pale borders and soft shadow. Add the two handwritten notes and underline as separate decorative elements. Do not bake text into the photograph or let labels cover faces.

Use actual image dimensions and responsive sizes. Load the hero eagerly using the installed Next.js version’s appropriate documented approach. Do not preload every image or combine contradictory image-loading props. Avoid hiding the heading or LCP image behind an initial animation.

At phone widths, use headline and actions first, photograph beneath, and reflowed stat groups. If the source crop is unsuitable, use the optional mobile asset. Floating cards may reposition within the photo region, but meaningful copy cannot disappear. Prevent horizontal scroll and maintain readable type.

Wire the photo video card and Watch Video button to the same future overview action. Keep actions functional as each later feature is added.

Capture and inspect the hero at 1428, 1024 and 390 px. Compare the desktop crop, text line breaks, face placement and gradient hue against the reference. Adjust actual CSS rather than merely asserting a match. Leave ambient motion for Step 08.
```

### Prompt 04 — Three solution cards

```text
Implement the solutions section from the exact content table in the guide.

Match the small blue eyebrow, centered dark heading and restrained subtitle. Use three equal-width pastel cards at wide desktop: blue, mint and lavender in that order. Their outer edges, headings, icons, descriptions and bullet rows must align like the reference. Start around 24 px gaps and 32 px internal padding at 1428 px, then tune visually. Preserve the subtle surfaces and avoid excessive shadows.

Use the matching gradient icon squares, right-arrow circles and filled check icons. Retain every feature; the third card correctly has six bullets. Titles may wrap naturally. Use CSS Grid with flexible tracks, not absolute positions or manually inserted space characters.

Make each arrow a meaningful action that opens a compact details dialog with the card's information and a Book a Demo button that preselects the related solution. Use a reusable dialog primitive, preserve keyboard focus and do not nest interactive elements. Keep the section itself compact; do not add new page sections or invented capabilities.

Stack cards on small screens. A tablet two-column layout may use the third card across both columns only if the visual balance works; do not squeeze the third into an unreadable narrow column. Maintain all text at comfortable sizes.

Open the browser at 1428 and 390 px. Verify the bullet count, long title wrapping, equal desktop card heights, dialog keyboard behavior and no overflow. Check that the hero and top rail still match their prior screenshots.
```

### Prompt 05 — Training section and first regression checkpoint

```text
Implement the dark navy AI, Coding, Robotics & Industry Training band.

Use the supplied training image on the right, with a separate CSS navy overlay strong on the left and fading toward the students. Match the reference's dark #0F2748 atmosphere, roughly 632 px initial desktop height, clear left copy and bright right faces. Do not use a flat generic dark card instead of the photographic composition.

Add the exact eyebrow, title, practical-skills subheading, descriptive paragraph, technology logos, thin divider, four compact feature groups and blue Workshop CTA from the guide. Preserve the relative hierarchy and density. Add the handwriting and three white right-side badges as real HTML. Keep the copy readable over every image crop.

The Workshop CTA must call the shared enquiry action with requestType=workshop and interest=training. Use the verified production wording if actual employment/affiliations are not established; preserve reference copy in preview data.

On mobile, let the copy lead and the students appear below. Reflow feature groups into a comfortable grid. Keep the CTA within the viewport and all badges clear of faces.

Now run Regression Checkpoint 1 across Steps 01–05. Check the header/menu, logo rail, hero, solution dialogs, workshop action, all supplied image paths and navigation anchors that exist. Inspect 390, 768, 1024 and 1428 px. Check console errors and image failures, and run the configured type/lint/build checks. Save screenshots and a concise defect/result record. Fix regressions before continuing.
```

### Prompt 06 — Dashboard product preview and about section

```text
Implement the dashboard/about section to match the reference: wide dashboard illustration left, focused explanatory copy right, on a very pale surface.

Build the dashboard primarily with HTML, CSS and simple inline SVG charts. Use a navy sidebar, a light workspace, four KPI cards, blue attendance bars, a teal 95% ring and a recent-activity panel. Use the exact sample values from the guide. Add a faint offset rear panel and very mild perspective only if it improves matching; no dramatic 3D rotation.

The preview is illustrative. Its sidebar controls should not pretend to be a working ERP: present a clearly described product preview rather than dead focusable navigation. Provide a concise accessible summary for the charts, and keep purely decorative internals out of the keyboard tab sequence. Do not install a heavy chart library for two small demonstration charts.

Right-hand content: A Smarter Way / to Manage Education; supporting paragraph; four teal-check features; Book a Demo; and the handwritten See the difference note with curved arrow. Match line breaks, spacing, photo-to-copy ratio and button treatment.

Use id=about for the navigation link. On mobile, place the dashboard first and copy next, preserving useful detail without forcing tiny body text. It may behave as a non-interactive product illustration with an accessible description; do not make the entire page horizontally scroll.

Use optional dashboard artwork only if explicitly configured as a static fallback. Do not display garbled generated labels. Inspect screenshots at 1428 and 390 px and verify all earlier sections remain intact.
```

### Prompt 07 — Testimonials, school logos, campus CTA and footer

```text
Finish the remaining visual sections in the exact reference order.

1. Testimonials: pale #F6F9FE background, centered eyebrow/title/subtitle, three equal white bordered cards, soft gray quotation marks, five gold stars and circular portraits. Use the provided reference-preview copy and respect the separate verified production data. Keep card text legible and do not convert this into an autoplay carousel.

2. Schools: white background, centered eyebrow and headline, then the six approved/reference-preview logo positions in the supplied order. Use intrinsic vector proportions with comparable optical size. On mobile, wrap the row into a balanced grid instead of making every logo tiny.

3. Closing CTA: campus aerial fills a short wide banner with a strong navy-black CSS overlay. Center the eyebrow, heading, sentence and two buttons; place the handwritten Partner/Educate/Innovate/Grow stack at the right on desktop. Preserve the reference's compact height and contrast. Book a Demo opens the shared demo action; Contact Us opens it with requestType=contact. Add id=contact.

4. Footer: compact white row with EduNex left, navigation center and configured LinkedIn/YouTube/Instagram links right. Use actual configured URLs, safe external-link behavior and accessible icon names. Do not invent social profiles or use href='#' as a substitute. Include the unobtrusive Privacy link and a simple privacy page describing this site's actual enquiry handling; mark missing company details in developer documentation for the owner to finish.

Create a production-content readiness report identifying unverified metrics, quotations, school relationships, affiliations, social URLs and missing original logos. Keep implementation notes out of the visible page. Do not silently treat illustrative content as verified.

Inspect the full page at 1428 and 390 px. Compare the overall sequence, section color transitions and density to the reference. Fix premature section breaks, oversized padding and footer overflow.
```

### Prompt 08 — Fast, restrained motion and responsive polish

```text
Apply motion to the completed page without changing its settled appearance or layout.

Use Motion for React as the one animation library. Where it reduces the bundle, use LazyMotion and its lightweight m components with the installed package’s documented imports; do not accidentally import the full motion component inside a strict lazy boundary. Keep static section content server-rendered where practical.

Motion specification:
- Buttons: 140–180 ms hover/press feedback, arrow translation around 3 px, no width change.
- Solution cards: at most 3–4 px lift on hover-capable pointers, about 180 ms; keep shadows restrained.
- Section entry: one-time 260–380 ms opacity/translateY reveal, 10–16 px travel, sibling stagger around 50–70 ms. The hero heading and photo must be visible on first paint.
- Hero glass cards: a short 250–350 ms settling entrance after the main content; optional tiny hover response. No perpetual bobbing required.
- Dashboard: bars/ring may reveal once when in view, then settle to the reference values. Avoid animation that changes surrounding layout.
- Dialog/menu: 160–220 ms entrance and a slightly quicker exit, with focus behavior independent of animation completion.
- Decorative hero background stays static; preserve the exact soft hue arrangement.

Respect prefers-reduced-motion using the motion configuration and CSS. Disable transform/parallax effects and smooth scrolling when reduction is requested. Essential content must remain visible if JavaScript fails or reduced motion is enabled. Do not leave server-rendered sections hidden at opacity:0 waiting for JavaScript.

No scroll-jacking, pinned narrative, loading intro, magnetic cursor, heavy WebGL, background video or large animated blur. Leave logo rows static by default; if automatic movement is explicitly enabled later, provide an actual pause control and stop on keyboard focus and reduced motion.

Refine responsive behavior at 320, 390, 768, 1024, 1280, 1428 and 1920 px. Check 200% zoom, landscape phones, long labels and real image crops. Main mobile content must remain complete. Verify animations on a realistic mobile profile and look for dropped frames and layout shifts. Save settled-state comparison screenshots with animations disabled for reproducibility.
```

### Prompt 09 — Book a Demo / workshop / contact form

```text
Implement the shared enquiry dialog and connect every relevant CTA on the page. Read the form contract in Section 8 first.

Use a controlled accessible dialog with a white/light-blue surface, navy heading, generous labels and the same gradient submit button. Desktop: an approximately 600–680 px wide panel, with paired short fields where comfortable. Mobile: single-column, scrollable within the visible viewport, safe-area aware, with a reachable close control. Do not add a permanent large form to the landing page, because that changes the reference composition.

Book a Demo opens requestType=demo. The training CTA opens requestType=workshop and preselects training. Contact Us opens requestType=contact. Solution dialogs preselect their relevant interest. Record a known CTA source identifier from a fixed list, not an arbitrary tracking URL.

Use the fields, limits and state behavior in Section 8. Require name, email, institution, interest and permission to respond. Keep phone, role, city, preferred date and free-text requirements optional. Do not restrict valid users to corporate email domains. Show inline errors, focus the first invalid field, preserve typed values on failure and show a pending state during submission.

Implement the client contract for POST /api/demo with a stable random submissionId for one attempted request and a Turnstile token. A retry of unchanged business data reuses its submissionId; after the user edits the data for a new attempt, generate a new one. Do not implement pretend success before the backend exists. For this step's browser tests, mock the endpoint explicitly in the test harness.

Show success only after the server returns accepted status. Say the team will contact the person to arrange the demo; do not say a meeting has been booked. No calendar integration is required. Keep the form data in memory, not localStorage, analytics or URL query strings.

Implement the overview dialog for Watch Video and the hero play card. If a real configured MP4/approved video URL exists, load it only when opened, expose controls, support captions and stop playback on close. If no video exists, show an accessible three-panel product walkthrough based on the existing sections. In production, label those triggers “Explore Overview” until an actual video is supplied; preserve the reference-preview label only for comparison. Never use a broken video player.

Test every CTA, preselected interest, mobile keyboard behavior, tab containment, Escape, focus restoration, submit/loading/error/success states and the walkthrough/video fallback in a real browser. No live external email should be sent by these mocked tests.
```

### Prompt 10 — Secure Resend endpoint and second regression checkpoint

```text
Implement the server-side email workflow described in Section 8. Use the official Resend Node SDK inside a Next.js Node-runtime POST /api/demo route. Validate environment configuration on the server and keep all secrets out of client imports and bundles. Use server-only modules for email, bot verification and Redis.

Before sending: require JSON and POST, limit actual request-body size, validate the exact Origin against configured allowed origins, parse/normalize with the shared strict schema, enforce length/enumeration rules, reject header control characters, inspect the honeypot, and apply durable server-side rate limits. Origin validation is defense-in-depth, not authentication. Do not enable wildcard CORS. Derive client IP only from the selected host's trusted ingress metadata; do not trust arbitrary forwarded headers.

Verify Turnstile on the server, including success and expected hostname/action, with a bounded timeout. Obtain a fresh token for a retry that requires revalidation; tokens are single-use. The application must fail safely if required protections are unavailable, while preserving the user's form for a later retry. Local test keys and mocks must never silently activate on the public production endpoint.

Use Redis-backed duplicate protection with a stable submission ID, a digest of normalized business fields, a short atomic processing lock and a retained result. Repeated accepted submissions return the same safe result. Same ID with changed data returns conflict. Concurrent retries must not cause duplicate emails. Keep the original server submission time and exact email payload stable across retries; do not regenerate a different timestamp or random value inside an idempotent email.

Persist only the transient data needed for submission/retry handling with the documented expiration. Rate keys use a keyed hash of email/IP, not raw values. Apply the same Resend idempotency key for retries of the same email; respect its documented retention window. Distinguish known provider rejection from an uncertain timeout. Do not claim success or fire-and-forget a send after returning the HTTP response.

Send a branded, safely escaped HTML email and a plain-text equivalent to LEADS_TO_EMAIL. FROM is a fixed verified-domain address; REPLY-TO is the validated visitor email. Subject is server-built from a fixed request-type label and sanitized institution name. Include every collected field, source CTA, submission ID and server submission time. The browser cannot override recipient, sender, template or headers. Do not automatically send visitor confirmation emails in this first version.

Handle both SDK returned errors and thrown errors. Return stable public error codes and useful safe messages; never expose provider responses, credentials or raw contact data in logs. Log request identifiers and redacted diagnostics. Missing mail configuration must produce a truthful unavailable state, not a fake success.

Add focused tests for valid requests, validation errors, HTML/header injection, oversized bodies, forged recipients, bad origins, missing/expired bot tokens, rate limiting, protection-service failure, provider errors, timeout-and-retry, concurrent duplicate requests and changed-payload conflicts. Mock outbound delivery for automated tests. Include an integration test that verifies the endpoint produces the exact expected owner notification fields.

Now run Regression Checkpoint 2 across the whole page and all form entry points. Inspect the desktop/mobile UI, console, dialogs, links, image requests and reduced-motion behavior. Run type/lint/build and the endpoint tests. When real credentials are available, perform one explicitly identified test submission to the configured owner inbox and record the provider message ID. Report email acceptance separately from actual inbox receipt. Do not declare real delivery tested when credentials were absent.
```

### Prompt 11 — Reference comparison, accessibility and performance

```text
Perform the final quality pass, using observed results rather than a self-assigned “pixel-perfect” claim.

VISUAL MATCH:
Render the complete page at 1428 CSS px wide and deviceScaleFactor=1. Use the reference-preview data, wait for fonts and images, and disable transitions and motion for deterministic screenshots. Capture the full page. Downsample it uniformly to 714 px wide for comparison with design/reference/edunex-homepage-reference.png. Do not independently stretch its height to hide incorrect proportions.

Create a side-by-side and 50% opacity overlay. Inspect section boundaries, gutters, type size and wrapping, logo optical widths, hero facial crop, background fade, gradients, card dimensions, dark training composition, dashboard angle, testimonials, CTA and footer. Fix the largest real differences first. Compare individual section crops when a full-page comparison hides detail. Generated-photo differences must be documented rather than masked into a misleading perfect score.

Do not use 714 CSS px browser width as the desktop test; it must use the real responsive tablet rules. Do not approve a screenshot just by saving it. Open and inspect the images. Keep the original reference unchanged. Create browser regression baselines only after reviewing the rendered result, and do not automatically accept failed baselines.

ACCESSIBILITY AND BEHAVIOR:
Check 320, 390, 768, 1024, 1428 and 1920 px; 200% zoom; keyboard-only navigation; focus visibility and modal focus; meaningful alt text; sensible heading order; form labels/errors; reduced motion; and no page-wide horizontal overflow. Check text against actual composited backgrounds, including the bright part of the hero gradient and the photo overlays. If matching a tiny screenshot detail conflicts with readable accessible text, make the smallest necessary adjustment and document it.

PERFORMANCE:
Measure a production build with stated device/network settings. Aim for mobile Lighthouse performance >=90, accessibility >=95, LCP <=2.5 s and CLS <=0.1 under the recorded test conditions. Treat these as targets, not guarantees. Assess interaction responsiveness in-browser; long-term field INP needs real traffic, so do not claim a field INP result from a single Lighthouse run.

Optimize served image variants, dimensions, fonts and client JavaScript. Initial mobile transfer target is about 1 MB excluding lazy-loaded below-fold assets, with a hero variant ideally around 150–300 KB if visual quality permits. Lazy-load offscreen photos and video. Do not load both desktop and mobile hero sources unnecessarily. Next.js image APIs must match the installed version. Remove unused packages, excessive blur and unrelated motion effects.

Use HTTP security headers appropriate to the deployment. Test any Content Security Policy with Next.js hydration, fonts, images and Turnstile; do not paste a policy that breaks the form. Check secrets, privacy-page links, API responses and caching behavior. Rate limits and idempotency must survive multiple server instances.

Deliver docs/qa-report.md with actual commands/results, screenshots, measured metrics, fixed defects and remaining limitations. Re-run tests only where a fix changes behavior or satisfies a required gate. Do not call the work fully verified if the browser or required credentials were unavailable.
```

### Prompt 12 — Deployment preparation, inbox verification and handoff

```text
Prepare the finished website for deployment and owner handoff.

Use the existing approved hosting target when present. Otherwise provide a concise deployment guide for a Next.js-capable Node/serverless host; do not configure a static-only export because /api/demo needs a server runtime. Confirm the host's current commercial-use terms and quotas rather than assuming every free plan is suitable for a company website.

Complete the production-content file using owner-supplied verified data. Keep unverified client claims, invented testimonials and unfinished placeholders out of the public deployment. Preserve the established composition when replacing copy. Private previews should be access-controlled and noindex; noindex alone is not access control. Add an explicit content-readiness check to the production-release process.

Document setup for the sender domain and exact DNS records shown by Resend, the server-only API key, receiving inbox, Turnstile keys and allowed hostname, Redis, allowed origins and the final site URL. Use account-provided DNS values; do not invent SPF/DKIM/CNAME records or replace existing mailbox DNS. Configure preview and production values separately. Do not expose secrets in screenshots, logs or git.

Set accurate metadata, canonical URL, favicon, robots and sitemap. Use truthful organization structured data only after real company details are supplied. Create an OG image by rendering the completed website or a code-built branded composition. Do not invent ratings, addresses or customer counts in structured data. Keep preview URLs out of production metadata.

Provide a deployment-ready build and instructions. If hosting access and a deployment destination have been supplied for this work, deploy and verify that destination. Otherwise complete all local preparation and list the exact owner setup items remaining without claiming it is live.

After deployment, test the real URL on desktop and phone: image loading, navigation, all CTA forms, one invalid submission, one genuine test submission, success state, and an unchanged retry. Verify Resend accepted the email and ask the owner to confirm it arrived in the configured inbox, including spam if needed. Verify Reply replies to the visitor. A provider-accepted response alone is not proof of inbox receipt or a booked appointment.

Supply a compact handoff: run/build/test commands; where to edit content and replace images; environment variable names without values; domain/email setup; actual QA results; production URL if deployed; outstanding items; and how to redeploy or roll back. Do not add unnecessary features at this stage.
```

## 8. Demo enquiry contract and Resend setup

### 8.1 Form fields

| Field | Required? | Validation / behavior |
|---|---|---|
| Full name | Yes | Trimmed, 2–100 characters; allow ordinary international names |
| Email | Yes | Valid email, max 254 characters; allow Gmail and other real domains |
| Phone / WhatsApp | No | Max 32 characters; accept country code, spaces and normal phone punctuation; normalize carefully |
| School / college / institution | Yes | Trimmed, 2–160 characters |
| Your role | No | Principal, Management, Administrator, Teacher, IT Team, Other |
| City | No | Up to 100 characters |
| Interested in | Yes | School ERP; Website & Admissions CRM; AI & Dashboards; Training & Workshops; Complete Solution; Other |
| Requirements | No | Plain text, up to 2000 characters |
| Preferred demo date | No | Valid non-past date interpreted in Asia/Kolkata; explicitly a preference, not a booking |
| Permission to respond | Yes | Unchecked initially: “I agree to be contacted about this enquiry and have read the Privacy Policy.” |
| requestType | Hidden enum | demo, workshop or contact |
| source | Hidden enum | Known CTA identifiers: header, hero, solution-erp, solution-crm, solution-ai, training, dashboard, final-cta, contact |
| submissionId | Hidden | Secure random UUID retained across an unchanged retry |
| Turnstile token | Hidden | Verified on server; refreshed as required |
| Honeypot | Hidden from people and assistive navigation | Must remain empty; supplementary bot signal only |

Do not collect student personal records, payment details or unnecessary sensitive information. This is an enquiry form for institution representatives. Keep the privacy page consistent with the actual services and retention choices.

### 8.2 Server behavior

Suggested starting limits: **5 attempts per trusted client IP per 10 minutes** and **3 per email address per hour**, configurable after observing real usage. Schools may share an IP; tune limits if legitimate users are affected. Cap the request body at **16 KB of actual bytes**, including chunked bodies, not just a user-provided Content-Length header. Restrict field lengths and reject unknown recipient/header fields.

Use durable counters rather than an in-memory map. Some rate-limit libraries have fail-open timeout behavior; configure/check it explicitly. If the protection service is unavailable, return a retryable unavailable response rather than sending unlimited email. [Upstash feature documentation](https://upstash.com/docs/redis/sdks/ratelimit-ts/features)

For duplicate handling, retain submission state for a documented window aligned with provider idempotency. A workable first version stores the normalized email payload, payload digest, first-received timestamp, processing state and safe result temporarily in Redis with a **24-hour expiration**, over an authenticated encrypted connection. The owner email remains in the owner's mailbox according to their retention settings. Explain the temporary storage in the privacy notice. Do not log the message body, email address or phone.

An atomic lock prevents concurrent sends; Resend idempotency covers uncertain transport retries. Reuse the same immutable email request and idempotency key within the provider's supported window. Do not retry indefinitely after that window or turn a provider failure into a fake success. [Resend idempotency documentation](https://resend.com/docs/dashboard/emails/idempotency-keys)

Expected response behavior:

| Condition | Response behavior |
|---|---|
| Valid, provider accepted | 200 with a safe accepted state and submission reference |
| Same accepted ID and same business payload | Same success result, no second email |
| Same ID with changed payload | 409 conflict; guide client to submit a new request |
| Duplicate currently processing | Retryable response with bounded retry guidance |
| Invalid fields / bot verification | Safe validation error; retain typed values |
| Wrong method / media type / oversized body | 405 / 415 / 413 respectively |
| Origin rejected | 403 |
| Rate limit | 429 plus Retry-After |
| Provider/protection unavailable or missing configuration | Appropriate 5xx with a safe retry message; no false success |

The exact response types should be centralized and tested. A timeout may mean the provider received the email, so retries must reuse the original identity and payload. Reset Turnstile when revalidation is needed. An already recorded accepted result may be returned without sending again. [Turnstile verification requirements](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

### 8.3 Email you will receive

Example subject: **[EduNex] Demo request — Example International School**

The email should contain a small EduNex header, request type, name, email, phone if supplied, institution, role, city, interests, requirements, preferred date with timezone, permission-to-contact value, originating CTA, submission ID and server timestamp. Include a readable plain-text version. Safely escape all visitor content. Preserve line breaks in requirements as text, without executing HTML.

Use your verified domain as the sender and the visitor's validated address as Reply-To. The recipient comes only from server configuration. There is no need for a visitor auto-reply in the initial release. [Resend Next.js integration](https://resend.com/docs/send-with-nextjs)

### 8.4 Environment variables

The coding agent should create `.env.example` with **empty secret values**, for example:

```dotenv
# Public values
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TURNSTILE_SITE_KEY=

# Server-only values: use .env.local locally and host secrets after deployment
RESEND_API_KEY=
EMAIL_FROM=
LEADS_TO_EMAIL=
TURNSTILE_SECRET_KEY=
TURNSTILE_EXPECTED_HOSTNAME=localhost
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
LEAD_HASH_SECRET=
ALLOWED_ORIGINS=http://localhost:3000

# Local reference mode; public release must use verified production content
CONTENT_MODE=reference-preview
```

`EMAIL_FROM` can eventually look like `EduNex Website <website@notify.your-domain.example>` after you verify the real domain you own. `LEADS_TO_EMAIL` is the actual inbox where you want enquiries. These examples are not real configured addresses. Only the Turnstile site key and site URL are public; private keys must never receive a `NEXT_PUBLIC_` prefix.

### 8.5 Your one-time setup

1. Open Resend and add a domain or sending subdomain that you own, such as `notify.<your-real-domain>`.
2. Copy the **exact DNS records currently displayed in your Resend dashboard** into the DNS provider managing that domain. Depending on the current account configuration, records may include TXT/MX/CNAME values; do not reuse guessed examples. Keep existing mailbox records intact. Wait for successful verification. [Current Resend domain setup](https://resend.com/docs/dashboard/domains/manage-domains)
3. Create the appropriate sending API key and save it as a server secret. Set the verified sender and your receiving inbox.
4. Configure Turnstile for the real website hostname; place the site key in the public setting and the secret in server settings. Use documented development keys only for local tests.
5. Configure the Redis connection used for counters and temporary deduplication state. Set a securely generated random `LEAD_HASH_SECRET` privately.
6. Set allowed origins to exact site origins. Configure any preview host explicitly; do not allow all hosts. Use the hosting provider's actual trusted client-IP mechanism.
7. Redeploy/restart after environment changes. Submit one clearly labeled test enquiry, verify the Resend result, confirm the actual email in your inbox, and test Reply-To.

An email API acceptance means the message was accepted for sending; it does not guarantee placement in the inbox. Checking your inbox is part of completion. If delivery-event tracking is added later, validate provider webhook signatures before processing events; it is not necessary to build an admin dashboard for this first release. [Resend delivered event](https://resend.com/docs/webhooks/emails/delivered), [webhook verification](https://resend.com/docs/webhooks/verify-webhooks-requests)

## 9. Final acceptance checklist

- [ ] The original reference is available to the agent and has been visually inspected.
- [ ] Header, logo rail and all eight following sections appear in the right order.
- [ ] Desktop heading wrap, white/blue/lavender hero atmosphere and blue–violet headline match the reference closely.
- [ ] Foreground student placement, training group and campus crop are correct; image differences are honestly recorded.
- [ ] Floating cards, handwriting, dashboard and all copy are crisp and independently editable.
- [ ] Colors use centralized tokens; the pastel cards and navy band retain the reference appearance.
- [ ] Every navigation item, card action, demo/workshop/contact CTA and overview trigger works.
- [ ] Phone layouts reflow cleanly; forms work with keyboard and touch; reduced motion is respected.
- [ ] Automated tests use mocked outbound email; the real integration has a separate owner-inbox test.
- [ ] Repeated submissions do not generate duplicate notifications within the supported window.
- [ ] Unavailable mail/protection services show a truthful recoverable error.
- [ ] Real email acceptance and inbox receipt are recorded separately.
- [ ] Private credentials stay server-side; sensitive data is absent from logs and public files.
- [ ] Public content contains verified company claims and approved customer assets.
- [ ] Browser screenshots were opened and compared, not merely generated.
- [ ] Performance results state the actual test conditions and remaining limitations.
- [ ] The final handoff clearly distinguishes completed local work from any pending deployment/account setup.

**The most important instruction for the coding agent:** reproduce the supplied design, inspect the rendered result, and refine the visible differences. Choosing a fashionable component library alone will not make the website look like the reference.
