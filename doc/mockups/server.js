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
            name: parts[parts.length - 1].replace('.html', '').replace('-v1', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            path: m,
            isNew: m.includes('v1') || groupName === 'Geral'
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Outfit', sans-serif; }
            .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
        </style>
    </head>
    <body class="bg-[#fcfaf8] text-stone-900 min-h-screen">
        <div class="max-w-6xl mx-auto px-6 py-12 md:py-20">
            <header class="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-slide-up">
                <div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-600/30">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10h10V2z"/><path d="M22 12H12v10h10V12z"/><path d="M12 12H2v10h10V12z"/><path d="M22 2H12v10h10V2z"/></svg>
                        </div>
                        <span class="text-xs uppercase tracking-[0.2em] font-black text-amber-600">Ateliê Bonjour</span>
                    </div>
                    <h1 class="text-5xl font-black tracking-tight text-stone-900 mb-4 bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent">Design Portal</h1>
                    <p class="text-xl text-stone-500 font-medium max-w-xl leading-relaxed">Central de referências visuais e protótipos funcionais para a experiência do artesão.</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="bg-white/50 border border-stone-200 px-4 py-2 rounded-2xl font-bold text-xs text-stone-500 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sistema Ativo
                    </div>
                </div>
            </header>

            <div class="grid grid-cols-1 gap-20">
                ${Object.entries(groups).sort(([a], [b]) => a === 'Geral' ? -1 : 1).map(([group, list]) => `
                    <section class="animate-slide-up">
                        <div class="flex items-center gap-4 mb-8">
                            <h2 class="text-xs uppercase tracking-[0.3em] font-black text-stone-400 whitespace-nowrap">
                                ${group.replace(/-/g, ' ')}
                            </h2>
                            <div class="h-px bg-stone-200 w-full"></div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${list.map(m => `
                                <a href="/${m.path}" target="_blank" class="group relative bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 flex flex-col justify-between overflow-hidden">
                                    <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50/50 to-transparent -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                                    
                                    <div class="relative z-10">
                                        <div class="flex items-start justify-between mb-6">
                                            <div class="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                            </div>
                                            ${m.isNew ? `<span class="bg-amber-100 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Novo</span>` : ''}
                                        </div>
                                        <h3 class="font-bold text-2xl text-stone-800 group-hover:text-stone-900 transition-colors tracking-tight">${m.name}</h3>
                                        <p class="text-stone-400 font-medium mt-2 text-sm">Visualizar protótipo interativo</p>
                                    </div>
                                    
                                    <div class="relative z-10 mt-10 flex items-center text-stone-400 group-hover:text-amber-600 transition-colors font-bold text-xs uppercase tracking-widest gap-2">
                                        Explorar <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </section>
                `).join('')}
            </div>

            <footer class="mt-40 pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 text-xs font-bold uppercase tracking-widest animate-slide-up">
                <div>Ateliê Bonjour &copy; 2026</div>
                <div class="flex items-center gap-6">
                    <span class="hover:text-stone-600 cursor-pointer transition-colors">Styleguide</span>
                    <span class="hover:text-stone-600 cursor-pointer transition-colors">EPICs</span>
                    <div class="bg-stone-100 px-3 py-1 rounded-full text-[10px]">v1.2.0</div>
                </div>
            </footer>
        </div>
        <script src="https://unpkg.com/lucide@latest"></script>
        <script>lucide.createIcons();</script>
    </body>
    </html>
    `;
    res.send(html);
});

app.listen(port, () => {
    console.log(`Mockup Portal listening at http://localhost:${port}`);
});
