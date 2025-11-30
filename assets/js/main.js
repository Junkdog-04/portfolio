const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});


const GITHUB_USER = "Junkdog-04";
const projectCards = document.querySelectorAll(".project-card");


const repoNames = [
  "Kata-tetris",
  "page-",
];

async function loadGitHubInfo() {
  try {
    for (let i = 0; i < repoNames.length; i++) {
      const repo = repoNames[i];
      const card = projectCards[i];


      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USER}/${repo}`
      );

      if (!response.ok) continue;

      const data = await response.json();

      const createdDate = new Date(data.created_at).toLocaleDateString("es-MX");
      const updatedDate = new Date(data.updated_at).toLocaleDateString("es-MX");

      const language = data.language || "Sin lenguaje detectado";

      // Creamos un bloque extra debajo de la descripción
      const extraInfo = document.createElement("div");
      extraInfo.classList.add("repo-extra-info");

      extraInfo.innerHTML = `
        <p><strong>📅 Creado:</strong> ${createdDate}</p>
        <p><strong>⏱ Última actualización:</strong> ${updatedDate}</p>
        <p><strong>💻 Tecnología principal:</strong> ${language}</p>
      `;

      // Insertamos ese bloque en la tarjeta
      card.querySelector(".project-card-content").appendChild(extraInfo);
    }
  } catch (error) {
    console.error("Error al cargar repos:", error);
  }
}

loadGitHubInfo();
