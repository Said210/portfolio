// src/main.js
document.addEventListener('DOMContentLoaded', () => {
  const sliderContent = document.getElementById('slider-content');
  const prevButton = document.getElementById('prev-slide');
  const nextButton = document.getElementById('next-slide');
  let projects = [];
  let currentIndex = 0;

  async function fetchProjects() {
      try {
          const response = await fetch('./projects.json'); // Ensure projects.json is in public or root
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          projects = await response.json();
          
          if (projects.length > 0) {
              renderSlider();
              prevButton.style.display = 'flex'; // Show buttons if projects exist
              nextButton.style.display = 'flex';
          } else {
              sliderContent.innerHTML = "<p class='p-6 text-center text-gray-500'>No AI projects to display at the moment. Check back soon!</p>";
              prevButton.style.display = 'none';
              nextButton.style.display = 'none';
          }
      } catch (error) {
          console.error("Could not fetch projects:", error);
          sliderContent.innerHTML = "<p class='p-6 text-center text-red-600'>Oops! Could not load AI projects. Please try again later.</p>";
          prevButton.style.display = 'none';
          nextButton.style.display = 'none';
      }
  }

  function renderSlider() {
      if (projects.length === 0) return;

      const project = projects[currentIndex];
      // The HTML structure here includes Tailwind classes
      sliderContent.innerHTML = `
          <div class="project-card bg-white rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
              <img src="${project.image_url}" alt="Image for ${project.title}" class="w-full h-64 object-cover">
              <div class="p-6">
                  <h3 class="text-2xl font-semibold mb-3 text-slate-800">${project.title}</h3>
                  <p class="text-slate-600 mb-4 min-h-[6rem]">${project.description}</p>
                  ${project.link && project.link !== "#" ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="inline-block text-sky-600 font-medium hover:text-sky-700 hover:underline transition-colors">View Project &rarr;</a>` : ''}
              </div>
          </div>
      `;
  }

  prevButton.addEventListener('click', () => {
      if (projects.length === 0) return;
      currentIndex = (currentIndex - 1 + projects.length) % projects.length;
      renderSlider();
  });

  nextButton.addEventListener('click', () => {
      if (projects.length === 0) return;
      currentIndex = (currentIndex + 1) % projects.length;
      renderSlider();
  });

  // Initially hide buttons until projects are loaded
  prevButton.style.display = 'none';
  nextButton.style.display = 'none';
  
  fetchProjects();
});