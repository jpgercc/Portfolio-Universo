/**
 * Tradutor Automático - Portfólio
 * Configuração: PT -> EN (Automático para gringos)
 */

// 1. Inicialização global do Widget do Google
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
};

// 2. Lógica de tradução automática baseada no navegador
function autoTranslate() {
    const userLang = navigator.language || navigator.userLanguage;
    const isPortuguese = userLang.startsWith('pt');

    if (!isPortuguese) {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = 'en';
            combo.dispatchEvent(new Event('change'));
            
            // Limpa o topo do layout após traduzir
            setTimeout(() => {
                document.body.style.top = "0px";
                const frame = document.querySelector('.goog-te-banner-frame');
                if (frame) frame.style.display = 'none';
            }, 1000);
        } else {
            // Tenta novamente caso o widget demore a injetar o Select
            setTimeout(autoTranslate, 500);
        }
    }
}

// 3. Carregamento Seguro
(function() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    
    document.head.appendChild(script);

    window.addEventListener('load', () => {
        // Aguarda 2 segundos para dar tempo ao Google de carregar em conexões lentas
        setTimeout(autoTranslate, 2000);
    });
})();