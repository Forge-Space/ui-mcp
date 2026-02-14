export function getPrototypeShell(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UIForge Prototype</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: #2563eb;
      --primary-foreground: #ffffff;
      --secondary: #64748b;
      --background: #ffffff;
      --foreground: #0f172a;
      --muted: #f1f5f9;
      --muted-foreground: #64748b;
      --border: #e2e8f0;
      --radius: 0.5rem;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Inter, system-ui, sans-serif;
      background-color: var(--background);
      color: var(--foreground);
    }
    .screen {
      display: none;
      flex-direction: column;
      min-height: 100vh;
    }
    .screen.active {
      display: flex;
    }
    .screen.fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
  </style>
</head>
<body>
  <!-- SCREENS GO HERE -->

  <script>
    function navigateTo(screenId) {
      document.querySelectorAll('.screen').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active', 'fade-in');
      });
      const target = document.getElementById(screenId);
      if (target) {
        target.style.display = 'flex';
        target.classList.add('active', 'fade-in');
      }
    }

    // Show first screen
    const firstScreen = document.querySelector('.screen');
    if (firstScreen) {
      firstScreen.style.display = 'flex';
      firstScreen.classList.add('active');
    }
  </script>
</body>
</html>`;
}
