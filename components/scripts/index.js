function toggleInfoforWhoAmI(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");
  }
  function toggleInfoforProjects(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");
  }
  function toggleInfoforLetsMeet(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");

  }
  function toggleInfoforSong(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");
  }
  function toggleInfoforTouch(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");
  }
  function toggleInfoforCaptcha(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");
  }
  function toggleInfoforHTMLCompiler(link) {
    const section = link.closest('.section');
    section.classList.toggle("active");
  }
  function toggleInfoforNewsWeb(link) {
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


function fitTextToBox(element, maxSize = 50) {
  let size = maxSize;
  const box = element.parentElement;

  element.style.fontSize = size + "1.5px";

  while ((element.scrollWidth > box.clientWidth || element.scrollHeight > box.clientHeight) && size > 5) {
    size--;
    element.style.fontSize = size + "1.5px";
  }
}