// 1. Configurar a ligação com o projeto Supabase (URL limpa padrão)
const SUPABASE_URL = "https://snjgrkqvehryxiuuxfjx.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuamdya3F2ZWhyeGl1dXV4Zmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzU2ODksImV4cCI6MjA5NDY1MTY4OX0.6_0viyyXJsh5EnrBhz0uQERnbGEKGgdjNnSba-IRpyc"; 

// Instancia a conexão usando o cliente padrão do CDN
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Dicionário de mapeamento para as categorias ficarem amigáveis
const categoriesMap = {
    'ui-ux': 'Design',
    'performance': 'Performance',
    'features': 'Funcionalidades',
    'bugs': 'Bugs'
};

// --- Funções de Ação Globais (Conectadas ao Banco) ---

async function deleteComment(id) {
    if (confirm("Deseja realmente excluir este feedback permanente do banco?")) {
        try {
            const { error } = await supabaseClient
                .from('feedbacks')
                .delete()
                .eq('id', id);

            if (error) throw error;

            const el = document.getElementById('feedback-' + id);
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'scale(0.95)';
                setTimeout(() => el.remove(), 300);
            }
        } catch (err) {
            console.error("Erro ao deletar:", err);
            alert("Não foi possível excluir o feedback: " + err.message);
        }
    }
}

async function editComment(id) {
    const el = document.getElementById('feedback-' + id);
    const p = el.querySelector('.comment-text');
    const novoTexto = prompt("Edite sua sugestão:", p.innerText);
    
    if (novoTexto !== null && novoTexto.trim() !== "") {
        try {
            const { error } = await supabaseClient
                .from('feedbacks')
                .update({ comment: novoTexto.trim() })
                .eq('id', id);

            if (error) throw error;

            p.innerText = novoTexto.trim();
        } catch (err) {
            console.error("Erro ao atualizar:", err);
            alert("Não foi possível salvar a alteração: " + err.message);
        }
    }
}

// --- Inicialização do App ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const muralList = document.getElementById('muralList');

    if (!form) {
        console.error("Erro: Formulário '#feedbackForm' não foi encontrado no HTML!");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Pegando os dados usando os names do seu HTML
        const formData = new FormData(form);
        const ratingSelected = formData.get('rating'); 
        const categorySelected = formData.get('category'); 
        const commentText = formData.get('message'); 

        if (!ratingSelected) {
            alert('Por favor, selecione uma nota! ⭐');
            return;
        }

        const btn = form.querySelector('.btn-submit') || form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.innerText : 'Enviar Feedback';
        
        if (btn) {
            btn.innerText = 'Enviando... 🚀';
            btn.disabled = true;
        }

        try {
            // Enviar para o banco de dados
            const { data, error } = await supabaseClient
                .from('feedbacks')
                .insert([
                    { 
                        rating: parseInt(ratingSelected), 
                        category: categorySelected || 'ui-ux', 
                        comment: commentText || "Apenas avaliou."
                    }
                ]);

            if (error) throw error;

            alert('Feedback enviado com sucesso!');
            form.reset(); 
            atualizarMural(); 

        } catch (err) {
            console.error("Erro capturado no envio:", err);
            alert("Erro ao conectar com o Supabase: " + (err.message || "Falha na rede"));
        } finally {
            if (btn) {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        }
    });

    function renderFeedbackItem(item) {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.id = 'feedback-' + item.id;

        const labelCategoria = categoriesMap[item.category] || item.category || 'Geral';

        div.innerHTML = `
            <span class="badge">Nota: ${item.rating}/5</span>
            <span class="badge" style="background:#e6daf2; color:#4c2875; margin-left:5px;">${labelCategoria}</span>
            <p class="comment-text" style="margin-top:10px; font-size:0.95rem; color:#475569;">${item.comment}</p>
            <div class="comment-actions">
                <button class="btn-action btn-edit" onclick="editComment('${item.id}')">Editar</button>
                <button class="btn-action btn-delete" onclick="deleteComment('${item.id}')">Excluir</button>
            </div>
        `;
        if (muralList) muralList.appendChild(div);
    }

    async function atualizarMural() {
        if (!muralList) return;

        try {
            const { data: feedbacks, error } = await supabaseClient
                .from('feedbacks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            muralList.innerHTML = '';
            feedbacks.forEach(item => {
                renderFeedbackItem(item);
            });
        } catch (err) {
            console.error("Erro ao carregar o mural:", err);
        }
    }

    // Carrega o mural automaticamente ao abrir a página
    atualizarMural();
});