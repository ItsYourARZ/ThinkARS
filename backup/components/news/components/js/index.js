function toggleInfo(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");

  }

  document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.style.animation = "fadeUp 1s ease";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(section => {
      observer.observe(section);
    });

    document.body.style.opacity = 1;
  });

  window.addEventListener("scroll", function() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    document.getElementById("progressBar").style.width = `${scrollPercentage}%`;
  });
