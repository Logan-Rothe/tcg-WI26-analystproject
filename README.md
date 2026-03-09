TCG TechTrack Website – Documentation

Live Site: https://tcg-techtrack-site.vercel.app/

Repository: https://github.com/F3rando/tcg-techtrack-site

1. Overview

The TCG TechTrack website is a full-stack Next.js project representing Triton Consulting Group. It showcases the organization’s mission, services, team, recruitment pipeline, portfolio, and community culture.

This documentation outlines each page’s structure, content, assets, and update instructions for future developers.

2. Home Page (app/page.tsx)
CSS Structure

home.module.css – All homepage styling (primary CSS module)

layout.tsx – Global font/layout wrapper

globals.css – Legacy CSS; homepage code should not rely on this

Sections
Hero Banner

A modern hero with mission text and CTAs directing to About or Contact pages.
Image: Home_Page_Front.jpg

Services Preview

Interactive cards representing four service lines:

Operations & Strategy

Financial Advisory

Technology

Market Research
Images:
operations.png, finance.png, technology.png, market_research.png

About Us Preview

Intro text + team photo with CTA to full About page.
Image: About_Us_Home_Page.jpg

Community Events

Highlights culture and member activities.
Image: Community_Events_Home_Page.jpg

Featured Projects

Hover-enabled client collaboration cards.
Images:
cari_health.png, tag.png, vektor.png, md_rev.png

Meet the Team

Interactive profile previews linking to full team directory.
Image: community-header.png

Homepage Impact Summary

Summarizes TCG’s value: professional consulting, student development, community-driven culture.

3. About Us Page
3.1 About Us Section

Hero image + organizational overview.
Images:
Giesel_close.png, bainbridge.png, bain&company.png, deloitte.png
Worked Alongside uses hoverable company partner logos.

3.2 Meet the Team
Hero Section

Tagline introducing the team.
Background: /Fall24-pic.avif

Team Intro

Explains TCG’s interdisciplinary membership and consulting experience.

Executive Board

Each board member has an individual card with image, name, and title.
Images:
/RiaS-pic.avif, /EdmondH-pic.avif, … (all listed in user doc)

Associates (Cohort Photos)

Cohorts include Winter 2025 → Winter 2021.
Each contains:

Group image

Quarter title

Exact caption text from code
Images: /Winter25-pic.avif, /Fall24-pic.avif, … /Winter21-pic.avif

Impact Summary

Showcases team structure, history, and membership growth.

3.3 Community Engagement Page
Programs & Events

Each program includes a description + image:

Recruitment – /recruitment-tcg.png

Mentor & Mentee – /mentor-mentee.png

Winter Retreat – /Winter-retreat.png

Spring Banquet – /Spring banquet tcg.png

TCG Ladies Picnic – /TCG-Ladies-Picnic.png

Reunion – /reunion.png

Senior Sunset – /senior-sunset.png

Impact Summary

Illustrates how events support community, development, and cohesion.

4. Services Page
Hero

Text: “TCG Consulting provides strategic planning…”
Image: /services-hero.jpg

Section 1: Project Process

Four-step lifecycle:

First Client Interaction

Plan

Research & Analysis

Delivery

Includes summary explaining PM + VP leadership and workshop structure.

Section 2: What We Do (Service Cards)

Each service includes image, description, and specialization tags.

Operations & Strategy

Image: /operations-strategy.jpg
Tags: Strategic Analysis, Growth Development, Org Development

Technology

Image: /technology.jpg
Tags: Data Analytics, Machine Learning, Website Development

Financial Advisory

Image: /financial-advisory.jpg
Tags: Budget Forecasting, Audit & Advisory, Financial Modeling

Market Research

Image: /market-research.jpg
Tags: Market Sizing, Industry Analysis, Competitor Analysis

Impact Summary

Explains TCG’s service capabilities and structured methodology.

5. Portfolio Page
Hero

Text: “Explore the impact and innovation…”
Image: /portfolio-hero.jpg

Section 1: Previous Projects

Auto-scrolling carousel of logos:

TAG Biosciences

Vektor Medical

Cari Health

MD Revolution

Section 2: Case Studies

Alternating image/text layout.

TAG Biosciences

Logo: /tag-biosciences-logo.png
Case Image: /tag-biosciences-case.jpg

Vektor Medical

Logo: /vektor-medical-logo.png
Case Image: /vektor-medical-case.jpg

Cari Health

Logo: /cari-health-logo.png
Case Image: /cari-health-case.jpg

MD Revolution

Logo: /md-revolution-logo.png
Case Image: /md-revolution-case.jpg

Impact Summary

Highlights 100+ client engagements and TCG’s value creation.

6. Recruitment Page
Hero

Title: Recruitment
Tagline: “Unlock your potential…”
CTA: Apply Now → https://tcg-application-portal.vercel.app/

First Info Section

Includes CSS-set image: /Recruitment1Photo.avif

Second Info Section

Explains applicant eligibility, quarter timing, and Analyst Program.
Image: /Recruitment2Photo.avif
Button → Case Prep Resources playlist.

Case Learning

Explains the first round of interview, and summarizes the case learning tool
Image: /recruitment-tecg.png
Button → Case Practice Page

Recruitment Timeline

Five steps, exactly matching code text:

Info Night

Case Study Night

Coffee Chat

Social Night

Individual Interviews

Instagram Section

Includes placeholder + follow-us description.

Impact Summary

Explains recruitment flow, culture fit, training, and community integration.

7. Careers Page
Career Resources:

Resume workshops

Mock interviews

Networking sessions

Full-Time Roles:

Names + roles + logos:
Example:

Alise Bruevich – Data Engineer @ Meta – /alise-fulltime.png

Internships:

Example:

Kelly Yu – Business Intelligence Engineer Intern @ Roku – /kelly-intern.png

Member Impact Logos:

Google, Amazon, Tesla, Salesforce, Deloitte, Bain, etc.
Images: /googlefix-logo.png, /amazon-logo.jpg, …

8. Contact Page
Contact Info

Email: board.tcg@gmail.com

Instagram: https://www.instagram.com/tcgatucsd/

LinkedIn: https://www.linkedin.com/company/triton-consulting-group-tcg-/

Facebook: https://www.facebook.com/UCSDTCG/

Website (legacy): https://tcgatucsd.org/

Contact Form Fields

Name

Email

Phone

Company

Subject

Message

9. Case Practice

Practice Case Items
  Button → Takes to opener page for the respective case
Example: City Public Transit Sustainability Case

10. Setup, Maintenance & Deployment
10.1 Project Structure

Suggested folder layout (fill in as needed):

/src
/components
/pages
/assets
/public

10.2 Tech Stack

Next.js

React

TypeScript

CSS Modules

Vercel hosting
(Add more if using Prisma, Tailwind, Sanity, etc.)

10.3 Local Setup
git clone https://github.com/F3rando/tcg-techtrack-site.git
cd tcg-techtrack-site
npm install
npm run dev

10.4 Updating Content

Editing text: Edit corresponding page in /app/...

Updating images: Save new images in /public/ and update references

Adding new sections: Follow existing component structure + CSS module patterns

10.5 Deployment
Hosting

Vercel

Build Command
npm run build

Environment Variables

(none right now)

Deployment Steps

Push code to GitHub main

Vercel auto-deploys

Validate production build
