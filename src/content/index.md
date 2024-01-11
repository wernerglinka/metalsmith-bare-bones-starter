---
layout: home-page.njk
date: 2023-12-06 21:48:57
createdAt: 2010-10-26 04:39:33

bodyClass: "homepage"
title: André J. Kelling

seo:
  title: Home - André J. Kelling
  description: "This starter should get you up and running with your new favorite static site generator Metalsmith"
---

<p>Software Developer // Fullstack / FrontEnd</p>
<style>
  @keyframes cycle {
    0%  { top:0; }
    5%  { top:0; }
    25% { top:0; opacity:1; z-index:0; }
    30% { top:78px; opacity:0; z-index:0; }
    50% { top:-157px; opacity:0; z-index:-1; }
    90% { top:-157px; opacity:0; z-index:0; }
    85% { top:-157px; opacity:0; }
    90%{ top:0; opacity:1; }
    100%{ top:0; opacity:1; }

  }
  @keyframes cycletwo {
    0%  { top:-157px; opacity:0; }
    25% { top:-157px; opacity:0; }
    30% { top:0; opacity:1; }
    35% { top:0; opacity:1; }
    55% { top:0; opacity:1; z-index:0; }
    60% { top:78px; opacity:0; z-index:0; }
    65% { top:-157px; opacity:0; z-index:-1; }
    100%{ top:-157px; opacity:0; z-index:-1; }
  }
  @keyframes cyclethree {
    0%  { top:-157px; opacity:0; }
    55% { top:-157px; opacity:0; }
    60% { top:0; opacity:1; }
    65% { top:0; opacity:1; }
    85% { top:0; opacity:1; }
    90% { top:78px; opacity:0; z-index:0; }
    95% { top:-157px; opacity:0; z-index:-1; }
    100%{ top:-157px; opacity:0; z-index:-1; }
  }
  .quotesslider {
    position:relative;
    margin: 4rem auto;
  }
  .mask {
    overflow:hidden;
    height:157px;
  }
  .quotesslider ul {
    position:relative;
    margin: 0;
    padding: 0;
  }
  .quotesslider li {
    width: 100%;
    position:absolute;
    top:-157px;
    list-style:none;
  }

  .quotesslider li.firstanimation {
    animation:cycle 20s linear infinite;
  }
  .quotesslider li.secondanimation {
    animation:cycletwo 20s linear infinite;
  }
  .quotesslider li.thirdanimation {
    animation:cyclethree 20s linear infinite;
  }
</style>
<div class="quotesslider">
  <div class="mask">
    <ul>
      <li class="firstanimation">
        <blockquote>
          The smallest possible changes.
        </blockquote>
      </li>
      <li class="secondanimation">
        <blockquote>
          Get clear goals, create tasks and work them down.
        </blockquote>
      </li>
      <li class="thirdanimation">
        <blockquote>
          Parachuting on Website Island and digging into Code Mountain.
        </blockquote>
      </li>
    </ul>
  </div>
</div>
<p>Software + Workflow + Graphic</p>
