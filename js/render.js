/* ==========================================================================
   render.js
   Turns the `skills` and `projects` arrays from js/data.js into DOM markup,
   reusing the exact same classes the page's CSS already styles. Runs
   before main.js so its scroll-reveal observer picks up the generated
   [data-reveal] cards like any other section.
   ========================================================================== */
(function () {
  "use strict";

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------------------------------------------------------------
     Skills — grouped by category, in first-seen order
     --------------------------------------------------------------------- */
  function renderSkills() {
    const container = document.getElementById("skillsGrid");
    if (!container || typeof skills === "undefined") return;

    const order = [];
    const groups = {};
    skills.forEach(function (skill) {
      const cat = skill.category || "Other";
      if (!groups[cat]) { groups[cat] = []; order.push(cat); }
      groups[cat].push(skill);
    });

    container.innerHTML = order.map(function (category) {
      const cards = groups[category].map(function (skill) {
        return (
          '<div class="skill-card">' +
            '<span class="skill-name">' + escapeHTML(skill.name) + "</span>" +
            '<span class="skill-level">' + escapeHTML(skill.level || "Learning") + "</span>" +
          "</div>"
        );
      }).join("");

      return (
        '<div class="skill-group" data-reveal>' +
          '<h3 class="skill-group-title">' + escapeHTML(category) + "</h3>" +
          '<div class="skill-cards">' + cards + "</div>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------------------------------------------------------------------
     Projects
     --------------------------------------------------------------------- */
  function linkButton(label, url, btnClass, comingSoonText) {
    if (!url) {
      // No real link yet — show a clearly-labeled placeholder instead of a
      // dead "#" link, or skip the button entirely if no placeholder text
      // was given (graceful handling of a missing demo link, for example).
      if (!comingSoonText) return "";
      return (
        '<a href="#" class="btn btn-small ' + btnClass + '">' +
          escapeHTML(label) + ' <span class="placeholder-tag">' + escapeHTML(comingSoonText) + "</span>" +
        "</a>"
      );
    }
    return (
      '<a href="' + escapeHTML(url) + '" class="btn btn-small ' + btnClass +
      '" target="_blank" rel="noopener">' + escapeHTML(label) + "</a>"
    );
  }

  function renderProjects() {
    const container = document.getElementById("projectsGrid");
    if (!container || typeof projects === "undefined") return;

    container.innerHTML = projects.map(function (project, index) {
      const visualNum = project.visual || ((index % 5) + 1);
      const cardClass = "project-card" + (project.isAchievement ? " project-card-achievement" : "");

      const techTagsHTML = (project.technologies && project.technologies.length)
        ? '<ul class="tech-tags">' + project.technologies.map(function (t) {
            return "<li>" + escapeHTML(t) + "</li>";
          }).join("") + "</ul>"
        : "";

      let linksHTML;
      if (project.isAchievement && Array.isArray(project.links)) {
        linksHTML = project.links.map(function (l) {
          return linkButton(l.label, l.url, "btn-outline", l.comingSoonText);
        }).join("");
      } else {
        linksHTML =
          linkButton("GitHub", project.github, "btn-outline") +
          (project.demo ? linkButton("Live Demo", project.demo, "btn-ghost") : "");
      }

      const achievementLabelHTML = (project.isAchievement && project.achievementLabel)
        ? '<p class="achievement-label">' + escapeHTML(project.achievementLabel) + "</p>"
        : "";

      return (
        '<article class="' + cardClass + '" data-reveal>' +
          '<div class="project-visual project-visual-0' + visualNum + '" aria-hidden="true">' +
            '<div class="visual-glyph">' + escapeHTML(project.glyph || "◇") + "</div>" +
          "</div>" +
          '<div class="project-body">' +
            "<h3>" + escapeHTML(project.title) + "</h3>" +
            achievementLabelHTML +
            "<p>" + escapeHTML(project.description) + "</p>" +
            techTagsHTML +
            '<div class="project-links">' + linksHTML + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  renderSkills();
  renderProjects();
})();
