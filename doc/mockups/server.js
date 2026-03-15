const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory (which is doc/mockups/)
app.use(express.static(__dirname));

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html') && file !== 'index.html') {
            const relativePath = path.relative(__dirname, filePath);
            fileList.push(relativePath);
        }
    });
    return fileList;
}

app.get('/', (req, res) => {
    const mockups = getHtmlFiles(__dirname);
    
    // Group mockups by directory
    const groups = {};
    mockups.forEach(m => {
        const parts = m.split('/');
        const groupName = parts.length > 1 ? parts[0] : 'Geral';
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push({
            name: parts[parts.length - 1].replace('.html', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            path: m
        });
    });

    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Design Hub | Ateliê Bonjour</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
            body { font-family: 'Outfit', sans-serif; }
            .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
        </style>
    </head>
    <body class="bg-[#fcfaf8] text-slate-900 min-h-screen">
        <div class="max-w-5xl mx-auto px-6 py-12">
            <header class="mb-16 flex items-center justify-between">
                <div>
                    <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Design Portal</h1>
                    <p class="text-lg text-slate-500 font-medium">Explore as opções de interface e caminhos visuais do projeto.</p>
                </div>
                <div class="bg-amber-600 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg shadow-amber-600/20">
                    Agentic First
                </div>
            </header>

            <div class="space-y-12">
                ${Object.entries(groups).map(([group, list]) => `
                    <section>
                        <h2 class="text-xs uppercase tracking-widest font-bold text-amber-600 mb-6 flex items-center gap-2">
                            <span class="w-8 h-px bg-amber-200"></span>
                            ${group.replace('-', ' ')}
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${list.map(m => `
                                <a href="/${m.path}" target="_blank" class="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex items-center justify-between">
                                    <div>
                                        <h3 class="font-bold text-lg text-slate-800 group-hover:text-amber-700 transition-colors capitalize">${m.name}</h3>
                                        <p class="text-sm text-slate-400 font-medium mt-1">Clique para abrir o protótipo</p>
                                    </div>
                                    <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </section>
                `).join('')}
            </div>

            <footer class="mt-24 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm font-medium">
                Gerado dinamicamente via Docker | Ateliê Bonjour &copy; 2026
            </footer>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

app.listen(port, () => {
    console.log(`Mockup Portal listening at http://localhost:${port}`);
});
